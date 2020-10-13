const React = require('react');

class SendButton extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <button onClick={this.props.handleClick}></button>
        )
    }
}

class InputMessage extends React.Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
            <div>
                <SendButton onClick/>
            </div>
        )
    }
}

export default InputMessage;