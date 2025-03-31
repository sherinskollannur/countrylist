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
        <Col md={6} className="auth-form">
          <h2>Sign In</h2>
          <p style={{ color: "black", fontWeight: 600 }}>
            New user? &nbsp;&nbsp;<a href="/signup">Create an account</a>
          </p>
          {error && <p className="error">{error}</p>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" style={{ width: "250px" }}>
              <Form.Control
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ border: "2px solid black", borderRadius: "0" }}
              />
            </Form.Group>

            <Form.Group className="mb-3" style={{ width: "250px" }}>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ border: "2px solid black", borderRadius: "0" }}
              />
            </Form.Group>
            <Form.Group
              className="mb-3 d-flex align-items-center"
              style={{ width: "250px" }}
            >
              <Form.Check type="checkbox" id="keepSignedIn" className="me-2" />
              <Form.Label htmlFor="keepSignedIn" className="m-0">
                Keep me signed in
              </Form.Label>
            </Form.Group>

            <Button
              type="submit"
              className="px-4 py-2 mb-4 rounded-0"
              style={{ width: "250px", backgroundColor: "#3C3C3C" }}
            >
              Sign In
            </Button>
          </Form>
          {(isSignedIn || error == "Session already exists") && (
            <button
              className="px-4 py-2 mb-4 rounded-0"
              style={{
                width: "250px",
                backgroundColor: "#3C3C3C",
                color: "white",
              }}
              onClick={() => signOut()}
            >
              Logout
            </button>
          )}
          <Container className="text-center my-4">
            <Row
              className="text-center my-4"
              style={{ color: "black", fontWeight: 600 }}
            >
              ---------- Or Sign In With ----------
            </Row>
            {/* Social Icons */}
            <Row>
              <Col xs="auto">
                <div className="social-icon">
                  <FaFacebookF
                    style={{
                      color: "black",
                      fill: "none",
                      stroke: "black",
                      strokeWidth: 20,
                    }}
                  />
                </div>
              </Col>
              <Col xs="auto">
                <div className="social-icon">
                  <FaTwitter
                    style={{
                      color: "black",
                      fill: "none",
                      stroke: "black",
                      strokeWidth: 20,
                    }}
                  />
                </div>
              </Col>
              <Col xs="auto">
                <div className="social-icon">
                  <FaLinkedinIn
                    style={{
                      color: "black",
                      fill: "none",
                      stroke: "black",
                      strokeWidth: 20,
                    }}
                  />
                </div>
              </Col>
              <Col xs="auto">
                <div className="social-icon">
                  <FaYoutube
                    style={{
                      color: "black",
                      fill: "none",
                      stroke: "black",
                      strokeWidth: 20,
                    }}
                  />
                </div>
              </Col>
            </Row>

            {/* Custom Styles */}
            <style>
              {`
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
                 `}
            </style>
          </Container>
        </Col>

        <Col md={6} className="auth-image">
          <img src={loginImg} alt="Illustration" />
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
