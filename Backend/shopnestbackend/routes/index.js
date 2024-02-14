var express = require('express');
var router = express.Router();
const Razorpay = require("razorpay");
const productModel = require("./users");
const userModel = require("./userdata");
const actualUsers = require("./E-commerceUsers");
const Cart = require("./Cart");
const multer = require('multer');
const path = require('path');
const app = require('../app');
const localStrategy = require("passport-local");
const passport = require('passport');
const crypto = require("crypto");
const OrderData = require("./OrderData");

const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt; 
const JwtStrategy = passportJWT.Strategy;

const instance = new Razorpay({
  key_id: 'rzp_test_dxWr7puwaxDajl',
  key_secret: 'D0qma2rlXtbYr7ax6s9YiuUX',
});

//for admins
passport.use("admin-local", new localStrategy(userModel.authenticate()));
//for admins
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'admin-your-secret-key', // Replace with your secret key
};
//for admins
passport.use(new JwtStrategy(jwtOptions, function (jwtPayload, done) {
  // Find the user based on the decoded token
  userModel.findOne({ username: jwtPayload.username }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));




router.get("/",(req,res)=>{
  res.status(200).json({message:"hello"});
})
router.get("/home",(req,res)=>{
  res.status(200).json("home");
})
//for admins
router.post("/register", function (req, res) {
  const userdata = new userModel({
    username: req.body.username,
    email: req.body.email
  })
  userModel.register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("admin-local")(req, res, function () {
        res.sendStatus(200);
      })
    })
})

router.post("/login", passport.authenticate("admin-local"), function (req, res) {
  // res.cookie('cookie_token', token, { maxAge: 900000 }) 
  const token = jwt.sign({ username: req.user.username }, 'admin-your-secret-key', { expiresIn: '1h' });

  // Send the token in the response
  res.status(200).json({ token });
})
router.get("/logout", function (req, res, next) {
  req.logout(async function (err) {
    if (err) {
      return next(err);
    }

    res.clearCookie('connect.sid');
    res.status(200).json({ mssg: "success logout" });
  })
})











//for users
passport.use("user-local", new localStrategy(actualUsers.authenticate()));



// for users
const userjwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'your-secret-key', // Replace with your secret key 
}





//for users
passport.use(new JwtStrategy(userjwtOptions, function (jwtPayload, done) {
  // Find the user based on the decoded token
  actualUsers.findOne({ username: jwtPayload.username }, function (err, user) {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  });
}));


//for users
router.post("/user/register", function (req, res) {
  const userdata = new actualUsers({
    username: req.body.username,
    email: req.body.email
  })
  actualUsers.register(userdata, req.body.password)
    .then(function (registereduser) {
      passport.authenticate("user-local")(req, res, function () {
        res.sendStatus(200);
      })
    })
})

router.post("/user/login", passport.authenticate("user-local"), function (req, res) {
  // res.cookie('cookie_token', token, { maxAge: 900000 }) 
  const token = jwt.sign({ username: req.user.username }, 'your-secret-key', { expiresIn: '1h' });

  // Send the token in the response
  res.status(200).json({ token });
})

function isLoggedIn(req, res, next) {
  console.log("in", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(500);
}

const uploadDirectory = path.join(__dirname, 'Uploads');

// Configure multer to store files in the specified directory

const Storage = multer.diskStorage({
  destination: "./public/images",
  filename: (req, file, cb) => {
    return cb(null, Date.now() + '-' + file.originalname);
  }
})



const upload = multer({ storage: Storage })








router.post("/addproduct", isLoggedIn, upload.single('image'), async function (req, res) {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }
    const { price, BrandNames, inStock, productDescription } = req.body;

    // Create a new product object
    const newProduct = new productModel({
      price: price,
      BrandNames: BrandNames,
      inStock: inStock,
      productDescription: productDescription,
      image: req.file.path
    });

    // Save the product to the database
    await newProduct.save();

    // Send a success response
    res.status(201).json({ message: 'Product uploaded successfully.' });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
})




router.get("/products", async function (req, res) {
  try {
    const products = await productModel.find();
    console.log(products);
    const productsWithAbsoluteURLs = products.map(product => ({
      ...product._doc,
      image: `${req.protocol}://${req.get('host')}/images/${path.basename(product.image).replace(/\\/g, '/')}`
    }));

    res.status(200).json(productsWithAbsoluteURLs)
  } catch (error) {
    res.status(500).json({ message: "Inernal server error" });
  }
})


router.get("/products/:id", async (req, res) => {
  const productId = req.params.id;
  console.log(productId, "id");
  try {
    const product = await productModel.findById(productId);



    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    const productWithAbsoluteURL = {
      ...product._doc,
      image: `${req.protocol}://${req.get('host')}/images/${path.basename(product.image)}`
    };
    res.json(productWithAbsoluteURL);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

function verifyToken(req, res, next) {
  const authtoken = req.headers.authorization;
  console.log(req.headers.authorization);
  if (!authtoken) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authtoken.split(" ")[1]; // Extracting token from "Bearer <token>"
  console.log(token, "token")

  jwt.verify(token, 'your-secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.user = decoded; // Attach the decoded payload to the request object
    next();
  });
}

router.post("/addtocart", verifyToken, async function (req, res) {
  try {
    const { productId, size, quantity } = req.body;
    console.log(productId, "productid");
    console.log(req.user, "user");

    // Find the user by username
    const user = await actualUsers.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Find the cart by user's ObjectId
    let cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      cart = new Cart({ user: user._id, items: [] });
    }
    
    
    // Check if the product is already in the cart
    const productIndex = cart.items.findIndex(item => item.product.toString() === productId && item.size === size);
    if (productIndex !== -1) {
      // Product already exists in the cart
      const existingItem = cart.items[productIndex];
      console.log(existingItem ,"price");
      console.log(size,"size2");
      if (existingItem.size === size) {
        // Same size selected, increment quantity
        existingItem.quantity += parseInt(quantity);
        // existingItem.subTotal+ = parse
      } else {
        // Different size selected, add as a new item
        console.log(size,"size3");
        cart.items.push({ product: productId, quantity: parseInt(quantity), size: size });
      }
    } else {
      // Product doesn't exist, add it to the cart
      cart.items.push({ product: productId, quantity: parseInt(quantity), size: size });
    }


    // Save the updated cart
    await cart.save();
    res.status(200).json({ message: 'Product added to cart successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// routes.js
router.put("/cart/update/:itemId", verifyToken, async function (req, res) {
  try {
    const { itemId } = req.params;
    const { quantity } = req.body;

    // Find the user by username
    const user = await actualUsers.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Find the cart by user's ObjectId
    let cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the item in the cart
    const item = cart.items.find(item => item._id.toString() === itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    // Update the quantity of the item
    item.quantity = quantity;

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item quantity updated successfully', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/cart/remove/:itemId", verifyToken, async function (req, res) {
  try {
    // Extract item ID from request parameters
    const itemId = req.params.itemId;

    // Find the user's cart
    const user = await actualUsers.findOne({ username: req.user.username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    let cart = await Cart.findOne({ user: user._id });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    // Remove the item from the cart items array
    cart.items = cart.items.filter(item => item._id.toString() !== itemId);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: 'Item removed from cart successfully', cart });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});


// Fetch cart route
router.get('/cart', verifyToken, async (req, res) => {
  try {
    // Find the cart for the authenticated user
    const user = await actualUsers.findOne({ username: req.user.username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(req.user.username);
    const cart = await Cart.findOne({ user: user._id }).populate('items.product');

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    console.log(cart);
    const updatedCart = {
      ...cart.toObject(),
      items: await Promise.all(cart.items.map(async (item) => {
        const product = await productModel.findById(item.product._id);
        const productWithAbsoluteURL = {
          ...product._doc,
          image: `${req.protocol}://${req.get('host')}/images/${path.basename(product.image)}`
        };
        return {
          ...item.toObject(),
          product: productWithAbsoluteURL
        };
      }))
    };

    res.status(200).json({ cart: updatedCart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post("/checkout",verifyToken,async (req,res)=>{
  console.log(req.body.total);
  const amount = req.body.total;
  const cartId = req.body.cartId;

  var options = {
    amount: Number(amount*100),  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  const order = await instance.orders.create(options);

  const user = await actualUsers.findOne({ username: req.user.username });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Find the user's cart
  const cart = await Cart.findById(cartId).populate('items.product');
  if (!cart) {
    return res.status(404).json({ message: 'Cart not found' });
  }

  const orderData = {
    user: user._id,
    orderTotal: amount,
    items: cart.items.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      size: item.size
    })),
    razorpayOrderId: order.id,
    paymentStatus: 'pending' // We can update this once payment is successful
  };
  console.log(orderData,"order");
  const newOrder = await OrderData.create(orderData);

  // Clear the user's cart
  cart.items = [];
  await cart.save();

  console.log(order);
  res.status(200).json({order});
})

router.post("/paymentverification",async(req,res)=>{
  console.log(req.body);
  const {razorpay_payment_id,razorpay_order_id,razorpay_signature} = req.body;

  const secret = "D0qma2rlXtbYr7ax6s9YiuUX";

  const generated_signature = crypto.createHmac('sha256', secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest('hex');

    if (generated_signature === razorpay_signature) {
      console.log("payment is successful");

      // Find the order with the provided Razorpay order ID
      const order = await OrderData.findOne({ razorpayOrderId: razorpay_order_id });
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }

      // Update the payment status to 'completed'
      order.paymentStatus = 'completed';
      await order.save();
    } else {
      console.log("payment verification failed");
    }
  res.status(200).json({success:true});
})

module.exports = router;
