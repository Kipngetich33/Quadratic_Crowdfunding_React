function FunctionEvent(){
    const handleClick = () => {
        console.log("button is clicked")
    }

    return(
        <div>
            Functional Component
            <button onClick={handleClick} >Click Here</button>
        </div>
    );
}

export default FunctionEvent;