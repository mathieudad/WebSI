const React = require('react');

function InputMessage (props){
    const [text, setText] = useState("Message");

    function handleTextChange(event) {
        setText(event.target.value);
    }

    function handleSendMessage(){
       
    }

    return(
        <div>
            <button onClick={handleSendMessage}>Send</button>
            <input onChange={handleTextChange} type="text">{text}</input>
        </div>
    )
    
}

module.exports = {
    InputMessage : InputMessage
}