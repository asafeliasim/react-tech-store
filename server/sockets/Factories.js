const createMessage = ({message}={})=>(
    {
        time: getTime(new Date(Date.now())),
        message
    }
);
const createChat=(messages)=>({
    messages: messages,
    typingUsers:[]
});
const getTime = (date)=>{
    return `${date.getHours()}:${("0"+date.getMinutes()).slice(-2)}`;
};

module.exports = {
  createMessage,
  createChat
};
