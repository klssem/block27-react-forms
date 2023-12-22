import { useState } from "react";
import PropTypes from "prop-types";

export default function Authenticate({token}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const user = successMessage !== null &&successMessage.data ? successMessage.data.username: "";

    async function handleSubmit(event){
        event.preventDefault()
        try {

            const apiCall = await fetch(
                "https://fsa-jwt-practice.herokuapp.com/authenticate",{
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }, 
            });
            const toJson = await apiCall.json();
            setSuccessMessage(toJson);
            console.log(toJson);
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <section>
            <h2>Authenticate</h2>
            {error && <p>Please verify your username and password! <br/>{error}</p>}
            <form id="authForm" onSubmit={handleSubmit}>
            {(successMessage && !successMessage.success) && <p id="notSuccessMessage">
                Username or password not found! <br/>
            </p>}
                <label >
                    Username: <input type="text" 
                                value={username}
                                onChange={(event)=>{setUsername(event.target.value)}}
                                required
                    />
                </label><br /><br />
                <label >
                    Password: <input 
                                type="password" 
                                value={password}
                                onChange={(event)=>{setPassword(event.target.value)}}
                                required
                    />
                </label><br /><br />
                <input type="submit" />
            </form>
            {(successMessage && successMessage.success) && <p id="successMessage">
                Hi, <span id="userName">{user}</span>! <br/>
                You have {successMessage.message}
            </p>}
        </section>
    );
}


Authenticate.propTypes = {
    token: PropTypes.string,
}