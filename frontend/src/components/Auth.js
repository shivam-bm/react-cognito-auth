import React, { useState } from "react";
import { CognitoUser, AuthenticationDetails, CognitoUserPool} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "",  // Your User Pool ID
  ClientId: "", // Your App Client ID
};  

const userPool = new CognitoUserPool(poolData);

const Auth = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const [error, setError] = useState("");
    const [userData, setUserData] = useState(null); // For storing user data
    const [tokens, setTokens] = useState(null); // For storing tokens

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phoneNumber") {
        setPhoneNumber(value);
        } else if (name === "password") {
        setPassword(value);
        }
    };

    const handleAuthAction = (e) => {
        e.preventDefault();

        const userData = {
        Username: phoneNumber,
        Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);

        if (isSignup) {
        // Sign up logic
        const signUpData = {
            Username: phoneNumber,
            Password: password,
            // You can add other attributes like email, etc., based on your pool settings
            UserAttributes: [
            {
                Name: "phone_number",
                Value: phoneNumber,
            },
            ],
        };

        userPool.signUp(signUpData.Username, signUpData.Password, signUpData.UserAttributes, [], (err, result) => {
            if (err) {
            setError(err.message || JSON.stringify(err));
            } else {
            alert("Sign up successful!");
            }
        });
        } else {
        // Login logic
        const authenticationDetails = new AuthenticationDetails({
            Username: phoneNumber,
            Password: password,
        });

        cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (result) => {
            // On successful login, we will retrieve the user data and tokens
            const idToken = result.getIdToken().getJwtToken();
            const accessToken = result.getAccessToken().getJwtToken();
            const refreshToken = result.getRefreshToken().getToken();

            // You can get additional user details like username or email
            const userAttributes = result.getIdToken().payload; // This contains the user's attributes
            
            // Store the tokens and user data in state or localStorage (for persistence)
            setUserData(userAttributes);
            setTokens({ idToken, accessToken, refreshToken });
            },
            onFailure: (err) => {
            setError(err.message || JSON.stringify(err));
            },
        });
        }
    };

    return (
        <div>
        <h1>{isSignup ? "Sign Up" : "Login"}</h1>
        <form onSubmit={handleAuthAction}>
            <div>
            <label>Phone Number</label>
            <input
                type="tel"
                name="phoneNumber"
                value={phoneNumber}
                onChange={handleInputChange}
                required
            />
            </div>
            <div>
            <label>Password</label>
            <input
                type="password"
                name="password"
                value={password}
                onChange={handleInputChange}
                required
            />
            </div>
            <button type="submit">{isSignup ? "Sign Up" : "Login"}</button>
        </form>
        <div>
            <button onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? "Already have an account? Login" : "Don't have an account? Sign Up"}
            </button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Displaying user data and tokens */}
        {userData && (
            <div>
            <h3>User Data:</h3>
            <pre>{JSON.stringify(userData, null, 2)}</pre>
            </div>
        )}

        {tokens && (
            <div>
            <h3>Tokens:</h3>
            <pre>{JSON.stringify(tokens, null, 2)}</pre>
            </div>
        )}
        </div>
    );
};

export default Auth;
