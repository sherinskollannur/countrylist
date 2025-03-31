import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSignUp, useClerk } from "@clerk/clerk-react";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import "./auth.css";
import loginImg from "../assets/loginImg.jpg";

const Signup = () => {
  const { signUp } = useSignUp();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signOut } = useClerk();

  const validatePassword = (password) => {
    return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // signOut();

    if (!validatePassword(password)) {
      setError(
        "Password must be at least 8 characters, 1 capital letter, 1 number, and 1 symbol."
      );
      return;
    }

    try {
      // Start signup process
      const result = await signUp.create({
        username, // OR use 'email_address' if required
        password,
      });

      console.log("Signup Result:", result);

      // Check if user was created
      if (result && result.createdSessionId) {
        navigate("/login");
      } else {
        setError("Signup verification required. Check your email or phone.");
      }
    } catch (err) {
      console.error("Signup error:", err);
      setError(err.errors?.[0]?.message || "Signup failed. Try again.");
    }
  };

  return (
    <Container fluid className="auth-container">
      <Row className="auth-box">
        <Col md={6} className="auth-form">
          <h2>Sign Up</h2>
          <p style={{ color: "black", fontWeight: 600 }}>
            Already have an account?&nbsp;&nbsp; <a href="/login">Sign In</a>
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

            <Button
              type="submit"
              className="px-4 py-2 mb-4 rounded-0"
              style={{ width: "250px", backgroundColor: "#3C3C3C" }}
            >
              Sign Up
            </Button>
          </Form>
        </Col>

        <Col md={6} className="auth-image">
          <img src={loginImg} alt="Illustration" />
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
