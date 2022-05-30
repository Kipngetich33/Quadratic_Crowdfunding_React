import { Component } from "react";

class Message extends Component{
    constructor(){
        super();
        this.state = {
            counter:0,
        };
    }

    increment = () => {
        this.setState(
            {
                counter: this.state.counter += 1
            }
        )
    }

    decrement = () =>{
        this.setState(
            {
                counter: this.state.counter -= 1
            }
        )
    }

    render(){
        return(
            <div>
                <h3>Counter Value is: {this.state.counter} </h3>
                <button onClick={this.increment}>Increment</button>
                <button onClick={this.decrement}>Decrement</button>
            </div>
            )
    }
}

export default Message;