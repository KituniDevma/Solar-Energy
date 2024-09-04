import React, {useState} from "react";
import backgroundImage from '../Components/Assets/Background.png'
import RalewayWoff2 from '../Components/Assets/Fonts/Raleway-Regular.woff2';
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

//Login the page
function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const route = "/api/token/"

    const handleSubmit = async (e) => {
      setLoading(true)
      e.preventDefault();

      try {
        const res = await api.post(route, {username, password})
        localStorage.setItem(ACCESS_TOKEN, res.data.access)
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
        navigate("/")
      }
      catch (error) {
        alert(error)
      } finally {
        setLoading(false)
      }
    }

    return(
        <div style={styles.container}>
            <div style={styles.welcomeContainer}>
                <h2 style={styles.title}>
                  Welcome back to<br />
                  <span style={styles.highlight}>Solar Vision!</span>
                </h2>
                <p style={styles.description}>
                    Harness the power of accurate solar forecasts to optimize your energy management.
                </p>
            </div>
            <div style={styles.loginContainer}>
                <h2 style={styles.loginTitle}>Login</h2>
                <form onSubmit={handleSubmit} style={styles.form}>
                  <input 
                    type="text" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)} 
                    style={styles.input}
                  />
                  <input 
                    type="password" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={styles.input}
                  />
                  <button type="submit" style={styles.loginButton}>Login</button>
                  <a href="#" style={styles.forgotPassword}>Forgot your password?</a>
                </form>
                <p style={styles.newAccount}>
                    New here? <Link to="/Signup" style={styles.createAccount}>Create new account</Link>
                </p>
            </div>
        </div>
    )
}

const styles = {
    container: {
      backgroundImage: `url(${backgroundImage})`, 
      display: 'flex',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      justifyContent: 'space-between',
      alignItems: 'center',
      width:'100%',
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
    loginContainer: {
      flex: 1,
      padding: '2rem',
      backgroundColor: 'rgba(255,255,255,0.5',
      borderRadius: '15px',
      boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.4)',
      height: '60vh',
      width: '375px',
      margin: '0 200px 0 100px',
      fontFamily: '"Raleway", sans-serif',
    },
    title: {
      fontSize: '3rem',
      color: '#333',
      marginTop: '6rem',
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
    loginTitle: {
      fontSize: '3rem',
      color: '#333',
      marginTop: '6rem',
      fontFamily: '"Raleway", sans-serif',
    },
    input: {
      width: '85%',
      height: '5px',
      padding: '1rem',
      marginBottom: '1rem',
      fontSize: '1rem',
      borderRadius: '100px',
      border: '1px solid #ddd',
      background: 'linear-gradient(to right, #ffff00, #fff9c4)',
      color: '#333',
    },
    loginButton: {
      width: '50%',
      padding: '1rem',
      fontSize: '1rem',
      fontWeight: 'bold',
      background: 'linear-gradient(to right, #ffff00, #8B8000)',
      color: 'black',
      border: 'none',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
      cursor: 'pointer',
      marginTop: '1rem',
      marginLeft: '80px',
      transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
    },
    forgotPassword: {
      display: 'block',
      textAlign: 'center',
      color: '#666',
      textDecoration: 'none',
      marginTop: '1rem',
      fontSize: '0.75rem',
    },
    newAccount: {
      marginTop: '5rem',
      textAlign: 'center',
      color: '#666',
      fontSize: '0.75rem',
    },
    createAccount: {
      color: '#fca326',
      textDecoration: 'none',
    },
  };
  
  export default Login;