import React, { useState } from "react";
import backgroundImage from '../Components/Assets/Background.png';
import RalewayWoff2 from '../Components/Assets/Fonts/Raleway-Regular.woff2';
import { Link, useNavigate } from "react-router-dom";
import api from '../api';

function Signup() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const route = "/api/user/register/"

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match!");
        } else {
            // onSignup();
            try {
                const res = await api.post(route, { username, email, password })
                alert("Signup successful!");
                navigate("/login")
            }
            catch (error) {
                alert(error)
            } finally {
                setLoading(false);                
            }
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.welcomeContainer}>
                <h2 style={styles.title}>
                    Welcome to <br />
                    <span style={styles.highlight}>Solar Vision!</span>
                </h2>
                <p style={styles.description}>
                    Harness the power of accurate solar forecasts to optimize your energy management.
                </p>
            </div>
            <div style={styles.signupContainer}>
                <h2 style={styles.signupTitle}>Sign Up</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={styles.input}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        style={styles.input}
                    />
                    <button type="submit" style={styles.signupButton}>Sign Up</button>
                </form>
                <p style={styles.alreadyAccount}>
                    Already have an account? <Link to="/Login" style={styles.loginLink}>Login</Link>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        backgroundImage: `url(${backgroundImage})`,
        display: 'flex',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
    },
    welcomeContainer: {
        flex: 1,
        marginRight: '2rem',
        padding: '2rem',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: '15px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.4)',
        height: '60vh',
        width: '375px',
        margin: '0 100px 0 200px',
    },
    signupContainer: {
        flex: 1,
        padding: '2rem',
        backgroundColor: 'rgba(255,255,255,0.5)',
        borderRadius: '15px',
        boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.4)',
        height: '60vh',
        width: '375px',
        margin: '0 200px 0 100px',
        fontFamily: '"Raleway", sans-serif',
    },
    title: {
        fontSize: '2.75rem',
        color: '#333',
        marginTop: '7rem',
        fontFamily: '"Raleway", sans-serif',
    },
    highlight: {
        color: '#fca326',
        fontFamily: '"Raleway", sans-serif',
    },
    description: {
        fontSize: '1.2rem',
        color: '#666',
        fontFamily: 'Lato',
    },
    signupTitle: {
        fontSize: '2.5rem',
        color: '#333',
        marginTop: '2rem',
        fontFamily: '"Raleway", sans-serif',
        textAlign: 'center',
    },
    form: {
        marginTop: '2rem',
    },
    input: {
        width: '85%',
        padding: '1rem',
        marginBottom: '1rem',
        fontSize: '1rem',
        borderRadius: '50px',
        border: '1px solid #ddd',
        background: 'linear-gradient(to right, #ffff00, #fff9c4)',
        color: '#333',
    },
    signupButton: {
        width: '60%',
        padding: '1rem',
        fontSize: '1rem',
        fontWeight: 'bold',
        background: 'linear-gradient(to right, #ffff00, #8B8000)',
        color: 'black',
        border: 'none',
        borderRadius: '50px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        textAlign: 'center',
        marginLeft: '4.5rem',
    },
    alreadyAccount: {
        marginTop: '1rem',
        textAlign: 'center',
        color: '#666',
        fontSize: '0.875rem',
        marginBottom: '0.1rem', // Adjust bottom spacing
        width: '100%',
    },
    loginLink: {
        color: '#fca326',
        textDecoration: 'none',
    },
};

export default Signup;
