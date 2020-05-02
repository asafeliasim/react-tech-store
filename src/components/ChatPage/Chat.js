import React,{useRef,useEffect,useState,useContext} from "react";
import socketIOClient from 'socket.io-client';
import Title from '../Title';
import AuthContext from '../../context/auth/AuthContext';
import './chat.css';


const Chat = () =>{
    const socketRef = useRef();
    const messageInputRef = useRef();
    //const handleInputRef = useRef();
    const [name,setName] = useState("");
    const[handle,setHandle]= useState("");
    const [typing, setTyping] = useState([]);
    const [message, setMessage] = useState("");
    const [chat, setChat] = useState([]);
    const {user} = useContext(AuthContext);
    
    
    
    
    
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
    },[name]);
    
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
        console.log(user.name);    
    };
    const handleSubmit = (e) =>{
        e.preventDefault();
        socketRef.current.emit('chat',{
            handle: user.name,
            message: message
        });
        messageInputRef.current.value=" ";
        console.log(user);
        messageInputRef.current.focus();
    };
    const allMessages = chat.map((msg,index)=>
        <div key={index} className="message">
            <p id="handler">{msg.handle}:</p>
            <p><strong>{msg.message}</strong></p>
        </div>
    );
    //const someOneTyping = typing ? <p><em>{typing} is typing a message...</em></p>: "";
   
    return(
        <>
        <Title title="Chat with us" center/>
        <div className="tech-chat">
            <div className="row justify-content-center mt-5">
                <div className="message-box list-group justify-content-center">
                    {allMessages}
                </div>
            </div>
            <div className="feed-back">
              
            </div>
        </div>
        <div className="row justify-content-center mt-5">
             <form className="message-input form-group my-auto mb-4" onSubmit={handleSubmit}>
                   <input type="text" className="form-control" ref={messageInputRef} placeholder="message" id="message"  onChange={messageChange}/>
                   <button type="submit" className="btn btn-send">Send</button>
             </form>
        </div>
        </>

    )
};

export default Chat;
