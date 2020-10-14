const React = require('react');
const {useState} = require('react');

function InputMessage (props){
    const [text, setText] = useState("");

    function handleTextChange(event) {
        setText(event.target.value);
    }

    function handleSendMessage(){
       console.log("Send : " + text);
       setText("");
       props.onSendMessage(text);
    }

    return(
        <div className="input-message-container">
            <button onClick={handleSendMessage}>Send</button>
            <input className="input-message-input-text" onChange={handleTextChange} type="text" onFocus={text} value={text} placeholder="Message"/>
        </div>
    )
    
}

module.exports = {
    InputMessage : InputMessage
}