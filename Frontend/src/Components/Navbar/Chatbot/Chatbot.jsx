import React, { useRef, useState } from 'react';
import "./Chatbot.css";
import ChatIcon from '@mui/icons-material/Chat';
import ClearIcon from '@mui/icons-material/Clear';
export default function Chatbot() {
    const iframeRef = useRef();
    const chatRef = useRef();
    const clearRef = useRef();
    const [isOpen, setIsopen] = useState(false);

    const open_chat = ()=>{
        setIsopen((prevstate)=>!prevstate);
    }
    const close_chat =()=>{
        setIsopen(false);
    }
    
    return (
        <div className='chatbot'>
            <ChatIcon className='chaticon' onClick={open_chat} ref={chatRef} style={{display: isOpen ? "none":"block"}} />
            <ClearIcon ref={clearRef} style={{display: isOpen ? "block":"none"}} onClick={close_chat} className='cross'/>
            <iframe
                style={{display: isOpen ? "block":"none"}}
                ref={iframeRef}
                allow="microphone;"
                width="350"
                height="430"
                src="https://console.dialogflow.com/api-client/demo/embedded/9cff2114-03e2-45ef-a1b0-f547ff6d2b1c">
            </iframe>
        </div>
    )
}
