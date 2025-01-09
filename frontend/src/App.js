import { useState } from "react";
import axios from "axios";
import Auth from "./components/Auth";

const App = () => {
    return (
        <div>
            <Auth />
        </div>
    );
    
    //TODO : If using node server for login and signup then uncomment this code

/*    
    const [formType, setFormType] = useState("login"); // "login" or "signup"
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("Processing...");

        const endpoint = formType === "login" ? "http://localhost:3001/api/login" : "http://localhost:3001/api/signup"; // Call backend APIs

        try {
        const response = await axios.post(endpoint, { phone, password });
        setMessage(response.data.message || "Success!");
        } catch (error) {
        setMessage(
            error.response?.data?.message || "An error occurred. Please try again."
        );
        }
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>{formType === "login" ? "Login" : "Signup"}</h1>

        <div>
            <button onClick={() => setFormType("login")}>Login</button>
            <button onClick={() => setFormType("signup")}>Signup</button>
        </div>

        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
            <div>
            <label htmlFor="phone">Phone Number:</label>
            <input
                type="text"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
            />
            </div>

            <div>
            <label htmlFor="password">Password:</label>
            <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            </div>

            <button type="submit">
            {formType === "login" ? "Login" : "Signup"}
            </button>
        </form>

        {message && <p>{message}</p>}
        </div>
    );
*/

};

export default App;
