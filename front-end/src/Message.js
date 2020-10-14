const React = require('react');


function MessageInfo (props){
    return(
        <div className="message-info-container">
            <label className="message-info-pseudo">{props.userName}</label>
            <label className="message-info-date">{props.date}</label>
        </div>
    )
}


/**
 * 
 * @param {user, message} props 
 */
function Message (props){
    return(
        <div className="message-container">
            <img alt="Prof. Pic." src={props.user.srcImg}></img>
            <div className="message-text-container">
                <MessageInfo userName={props.user.name} date={props.message.creation}/>
                <label>{props.message.content}</label>
            </div>

        </div>
    )
    
}

module.exports = Message;