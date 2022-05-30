import { Component } from "react";

class Resume extends Component{
    render(){
        const {lastName} = this.props;
        return <h1>This is a class component :{lastName}</h1>
    }
}

export default Resume;