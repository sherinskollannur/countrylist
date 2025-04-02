import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./auth.css";
import { useSignIn, useClerk } from "@clerk/clerk-react";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import loginImg from "../assets/loginImg.jpg";

const Login = () => {
  const { signIn } = useSignIn();
  const { setActive, signOut } = useClerk();
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const signInAttempt = await signIn.create({
        identifier: username,
        password,
      });

      console.log("Sign-in Response:", signInAttempt); // Debugging API response

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        navigate("/home", { replace: true });
      } else {
        setError("Unexpected error. Please try again.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.errors?.[0]?.message || "Login failed. Try again.");
    }
  };

  return (
    <Container fluid className="auth-container">
      <Row className="auth-box">
        {/* Sign In Form */}
        <Col md={6} className="auth-form">
          <div className="auth-header">
            <h2>Sign In</h2>
            <p>
              New user? &nbsp;&nbsp;<a href="/signup">Create an account</a>
            </p>
          </div>

          {/* Custom Styles */}
          <style>
            {`
    .auth-header {
      text-align: left; /* Ensures left alignment */
      width: 100%;
    }

    .auth-header h2 {
      margin-bottom: 8px;
      font-weight: bold;
    }

    .auth-header p {
      color: black;
      font-weight: 600;
    }

    .auth-header a {
      color: blue;
      text-decoration: none;
    }

    .auth-header a:hover {
      text-decoration: underline;
    }
  `}
          </style>
          {error && <p className="error">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" style={{ width: "100%" }}>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-control-custom"
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: "100%" }}>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control-custom"
              />
            </Form.Group>

            <Form.Group className="mb-3 d-flex align-items-center">
              <Form.Check type="checkbox" id="keepSignedIn" className="me-2" />
              <Form.Label htmlFor="keepSignedIn" className="m-0">
                Keep me signed in
              </Form.Label>
            </Form.Group>

            <Button type="submit" className="btn-custom">
              Sign In
            </Button>
          </Form>

          {(isSignedIn || error == "Session already exists") && (
            <button className="btn-custom" onClick={() => signOut()}>
              Logout
            </button>
          )}

          <Container className="social-login-container text-center my-4">
            <Row className="text-center my-2">
              <Col>
                <p className="social-login-text">— Or Sign In With —</p>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col xs="auto">
                <div className="social-icon">
                  <FaFacebookF />
                </div>
              </Col>
              <Col xs="auto">
                <div className="social-icon">
                  <FaTwitter />
                </div>
              </Col>
              <Col xs="auto">
                <div className="social-icon">
                  <FaLinkedinIn />
                </div>
              </Col>
              <Col xs="auto">
                <div className="social-icon">
                  <FaYoutube />
                </div>
              </Col>
            </Row>

            {/* Custom Styles */}
            <style>
              {`
      .social-login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .social-login-text {
        font-weight: 600;
        color: black;
        text-transform: uppercase;
        font-size: 14px;
        letter-spacing: 1px;
        text-align: center;
      }

      .social-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 45px;
        height: 45px;
        border: 2px solid black;
        border-radius: 50%;
        font-size: 20px;
        transition: all 0.3s ease-in-out;
      }

      .social-icon:hover {
        background-color: black;
        color: white;
      }
    `}
            </style>
          </Container>
        </Col>

        {/* Login Image (Hidden on Mobile) */}
        <Col
          md={6}
          className="auth-image d-none d-md-flex align-items-center justify-content-center"
        >
          <img src={loginImg} alt="Illustration" className="login-img" />
        </Col>
      </Row>

      {/* Custom Styles */}
      <style>
        {`
        .auth-container {
          display: flex;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
          
        }
        .auth-box {
          width: 100%;
          max-width: 900px;
          background: #fff;
          padding: 40px;
          
        }
        .auth-form {
          text-align: center;
        }
        .form-control-custom {
          width: 100%;
          padding: 12px;
          border: 2px solid black;
          border-radius: 5px;
        }
        .btn-custom {
          width: 100%;
          padding: 12px;
          background-color: #3C3C3C;
          color: white;
          border: none;
          border-radius: 5px;
        }
        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border: 1px solid black;
          border-radius: 50%;
          font-size: 18px;
        }
        .login-img {
          max-width: 100%;
          height: auto;
          object-fit: cover;
        }
      `}
      </style>
    </Container>
  );
};

export default Login;
