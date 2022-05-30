import { Component } from "react";

class ClassEvent extends Component {
    handleClick(){
        console.log("Class based event handling")
    }

    render () {
        return (
            <div>
                <h3>This is a class based component</h3>
                <button onClick={this.handleClick}>Click</button>
            </div>
        )
    }
}
export default ClassEvent;