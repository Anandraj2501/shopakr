import React from 'react'
import Navbar from '../Navbar'
import Carousel from '../Carousel/Carousel'
import FeatureSection from '../Features_Section/FeatureSection'
import FeaturedProduct from '../Featured-Product/FeaturedProduct'
import FirstBanner from '../Banners/FirstBanner'
import NewArrivals from '../NewArrivals/NewArrivals'
import SecondBanner from '../Banners/SecondBanner'

export default function Main() {
    return (
        <div>
            <Navbar />
            <Carousel />
            <FeatureSection />
            <FeaturedProduct />
            <FirstBanner />
            <NewArrivals />
            <SecondBanner />
        </div>
    )
}
