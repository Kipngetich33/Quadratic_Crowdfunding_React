function Profile(props){
    const {firstName, lastName} = props;
    return (
        <div>
            <h1>Name: {firstName} {lastName}</h1>
            {props.children}
        </div>
    )
}

export default Profile;