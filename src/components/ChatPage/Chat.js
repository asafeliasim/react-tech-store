import React,{useRef,useEffect,useState} from "react";
import socketIOClient from 'socket.io-client';
import Title from '../Title';
import './chat.css';

const Chat = () =>{
    const socketRef = useRef();
    const messageInputRef = useRef();
    //const handleInputRef = useRef();
    const[handle,setHandle]= useState("");
    const [typing, setTyping] = useState("");
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);

    useEffect(()=>{
        socketRef.current = socketIOClient('http://localhost:3001');
        socketRef.current.on('chat',data=>{
            setTyping('');
            setChat(chat=>[...chat,{
                handle: data.handle,
                message: data.message
            }]);
        });
        socketRef.current.on("typing",data=>{
            setTyping(data.handle);
        })
    },[]);
    const handleChange = (e) => {
        e.preventDefault();
        const hdl = e.target.value;
        setHandle(hdl);
        console.log(handle);
    };
    const messageChange = (e) =>{
        e.preventDefault();
        const msg = e.target.value;
        setMessage(msg);
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        socketRef.current.emit('chat',{
            handle: handle,
            message: message
        });
        messageInputRef.current.value=" ";

        messageInputRef.current.focus();
    };
    const allMessages = chat.map((msg,index)=>
        <div key={index} className="message">
            <p id="handler">{msg.handle}:</p>
            <p><strong>{msg.message}</strong></p>
        </div>
    );
    const someOneTyping = typing ? <p><em>{typing} is typing a message...</em></p>: "";

    return(
        <>
        <Title title="Chat with us"/>
        <div className="tech-chat">
            <div className="row justify-content-center mt-5">
                <div className="message-box list-group justify-content-center">
                    {allMessages}
                </div>
            </div>
            <div className="feed-back">
                {someOneTyping}
            </div>
        </div>
        <div className="row justify-content-center mt-5">
             <form className="message-input form-group my-auto mb-4">
                   <input type="text" className="handler form-control"   placeholder="handler" id="handle" onChange={handleChange}/>
                   <input type="text" className="form-control" ref={messageInputRef} placeholder="message" id="message"  onChange={messageChange}/>
                   <button type="button" className="btn btn-send" onClick={handleSubmit}>Send</button>
             </form>
        </div>
        </>

    )
};

export default Chat;
