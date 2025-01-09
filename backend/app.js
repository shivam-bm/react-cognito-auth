const express = require("express");
const { CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, GetUserCommand } = require("@aws-sdk/client-cognito-identity-provider");
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Initialize the Cognito client
const cognitoClient = new CognitoIdentityProviderClient({
    region: ""
});

const CLIENT_ID = "";

app.post("/api/signup", async (req, res) => {
    const { phone, password } = req.body;

    const params = {
        ClientId: CLIENT_ID,
        Username: phone,
        Password: password,
        UserAttributes: [
            {
                Name: "phone_number",
                Value: phone,
            },
        ],
    };

    try {
        await cognitoClient.send(new SignUpCommand(params));
        res.status(200).json({ message: "Signup successful!" });
    } catch (error) {
        res.status(400).json({ message: error.message || "Signup failed!" });
    }
});

app.post("/api/login", async (req, res) => {
    const { phone, password } = req.body;

    const authParams = {
        AuthFlow: "USER_PASSWORD_AUTH",
        ClientId: CLIENT_ID,
        AuthParameters: {
            USERNAME: phone,
            PASSWORD: password,
        },
    };

    try {
        // First, authenticate the user
        const authResponse = await cognitoClient.send(new InitiateAuthCommand(authParams));
        
        // Then, get user details using the access token
        const userParams = {
            AccessToken: authResponse.AuthenticationResult.AccessToken
        };
        
        const userData = await cognitoClient.send(new GetUserCommand(userParams));
        
        // Send both token and user information
        res.status(200).json({
            message: "Login successful!",
            token: authResponse.AuthenticationResult.IdToken,
            user: {
                attributes: userData.UserAttributes.reduce((acc, attr) => {
                    acc[attr.Name] = attr.Value;
                    return acc;
                }, {})
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message || "Login failed!" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});














