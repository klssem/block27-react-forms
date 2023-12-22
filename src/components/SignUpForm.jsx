import { useState } from "react";
import PropTypes from 'prop-types';

export default function SignUpForm({getToken}){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    async function handleSubmit(){
        // event.preventDefault();
        try {
            const apiCall = await fetch("https://fsa-jwt-practice.herokuapp.com/signup",{
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password})
            });
            const toJson = await apiCall.json();
            getToken(toJson.token)
        } catch (err) {
            setError(err.message);
        }
    }
    return (
        <div>
            <h2>Signup</h2>
            {error && <p>{error}</p>}
            <form id="signupForm" onSubmit={(event)=>{
                event.preventDefault();
                const min = 8, max=15;
                const name= username.length >= min && username.length <= max;
                const pass= password.length >= min && password.length <= max;
                !name && setUsernameError("8-15 characters");
                !pass && setPasswordError("8-15 characters");
                if(name && pass){
                    setUsername("");
                    setPassword("");
                    setUsernameError(null);
                    setPasswordError(null);
                    handleSubmit(event);
                }
                console.log(pass);
            }}>
                <label>
                   Username: <input type="text" 
                                    value={username}
                                    onChange={(event)=>{setUsername(event.target.value)}}
                                    placeholder="8-15 characters"
                                    required
                            />
                            <span id="badUsername"><br/>{usernameError}</span>
                </label><br/>
                <label>
                    Password: <input type="password"
                                value={password}
                                onChange={(event)=>{setPassword(event.target.value)}}
                                placeholder="8-15 characters"
                                required
                              />
                              <span id="badPassword"><br/>{passwordError}</span>
                </label><br/><br />
                <input type="submit" />
            </form>
        </div>
        )
}

SignUpForm.propTypes = {
    getToken: PropTypes.func.isRequired,
}