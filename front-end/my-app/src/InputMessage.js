const React = require('react');
const {useState} = require('react');

function InputMessage (props){
    const [text, setText] = useState("Message");

    function handleTextChange(event) {
        setText(event.target.value);
    }

    function handleSendMessage(){
       console.log("Send : " + text);
    }

    return(
        <div className="input-message-container">
            <button onClick={handleSendMessage}>Send</button>
            <input className="input-message-input-text" onChange={handleTextChange} type="text" placeholder={text}/>
        </div>
    )
    
}

module.exports = {
    InputMessage : InputMessage
}