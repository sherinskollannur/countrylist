import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCountries } from "../store/countrySlice";
import { useClerk } from "@clerk/clerk-react";
import CountryCard from "../components/countries/CountryCard";
import React from "react";
import {
  Container,
  Row,
  Col,
  Navbar,
  Nav,
  Card,
  Carousel,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./HomePage.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import { color } from "framer-motion";

const HomePage = () => {
  // const dispatch = useDispatch();
  // const { setActive, signOut } = useClerk();
  // const { countries, loading } = useSelector((state) => state.countries);
  // const [visible, setVisible] = useState(10);
  // const [activeTab, setActiveTab] = useState("All");

  // useEffect(() => {
  //   dispatch(fetchCountries());
  // }, [dispatch]);

  const [countries, setCountries] = useState([]);
  const [visible, setVisible] = useState(10);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    fetch("https://restcountries.com/v2/all?fields=name,region,flag")
      .then((res) => res.json())
      .then((data) => setCountries(data));
  }, []);

  return (
    <Container fluid className="p-0">
      {/* Navbar */}

      <Navbar expand="sm" className="py-3 w-100">
        <Container>
          {/* Brand Name */}
          <Navbar.Brand href="#" className="fw-bold country-text-color">
            Countries
          </Navbar.Brand>

          {/* Toggle Button for Mobile */}
          <Navbar.Toggle aria-controls="navbar-nav" />

          {/* Collapsible Menu */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ms-auto">
              {["All", "Asia", "Europe"].map((menu) => (
                <Nav.Link
                  key={menu}
                  href="#"
                  onClick={() => setActiveTab(menu)}
                  className={
                    activeTab === menu ? "active-tab" : "non-active-tab"
                  }
                >
                  {menu}
                </Nav.Link>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Welcome Section */}

      <Container className="mt-4 text-center">
        <Row className="align-items-center">
          {/* First Line */}
          <Col xs={12} lg={5} sm={4} className="mb-4 ">
            <div className="line"></div>
          </Col>

          {/* WELCOME Text */}
          <Col xs={12} lg={2} sm={4}>
            <h1 className="welcome-text">WELCOME</h1>
          </Col>

          {/* Second Line */}
          <Col xs={12} lg={5} sm={4} className="mt-3 ">
            <div className="line"></div>
          </Col>
        </Row>
      </Container>

      {/* Carousel and Frame */}
      <Container>
        <Row className="justify-content-center">
          <Col md={8} className="mb-3">
            <Carousel>
              <Carousel.Item>
                <div
                  className="d-flex align-items-center justify-content-center bg-light p-5"
                  style={{ height: "200px" }}
                >
                  <img src="src\assets\dummyImg.jpg" />
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div
                  className="d-flex align-items-center justify-content-center bg-light p-5"
                  style={{ height: "200px" }}
                >
                  <img src="src\assets\dummyImg.jpg" />
                </div>
              </Carousel.Item>
            </Carousel>
          </Col>
          <Col md={4} className="mb-3">
            <div
              className="d-flex align-items-center justify-content-center bg-light p-5"
              style={{ height: "200px" }}
            >
              <img
                src="src\assets\dummyImg.jpg"
                style={{
                  width: "100%",
                  height: "200px",
                }}
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Cards Grid */}
      <Container>
        {/* {loading && <p>Loading...</p>} */}
        <Row className="mt-4 g-3">
          {countries.slice(0, visible).map((country, index) => (
            <Col xs={12} sm={6} key={index}>
              <Card className="custom-card shadow-sm">
                <Row className="g-0 align-items-center">
                  {/* Left Side - Image Placeholder */}
                  <Col xs={4} className="p-2">
                    <img
                      src="src\assets\dummyImg.jpg"
                      style={{
                        width: "100%",
                        height: "80px",
                      }}
                    />
                  </Col>

                  {/* Right Side - Text */}
                  <Col xs={8}>
                    <Card.Body className="py-2 ">
                      <Card.Title className="fw-bold mb-1 country-text-color">
                        {country.name}
                      </Card.Title>
                      <Card.Text className="text-muted">
                        {country.region}
                      </Card.Text>
                    </Card.Body>
                  </Col>
                </Row>
              </Card>
            </Col>
          ))}

          {visible < countries.length && (
            <div className="d-flex justify-content-center ">
              <Button
                className="px-4 py-2 mb-4 rounded-0"
                style={{ width: "150px", backgroundColor: "#3C3C3C" }}
                onClick={() => setVisible(visible + 10)}
              >
                Load more
              </Button>
            </div>
          )}
        </Row>
      </Container>

      <Container className="text-center my-5">
        {/* Social Icons */}
        <Row className="justify-content-center mb-3">
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

        {/* Email and Copyright */}
        <p
          className="mb-1 text-muted small"
          style={{ color: "#3D3D3D", fontWeight: 700, fontSize: "13px" }}
        >
          Example@email.com
        </p>
        <p
          className="text-muted small"
          style={{ color: "#3D3D3D", fontWeight: 700, fontSize: "13px" }}
        >
          Copyright © 2020 Name. All rights reserved.
        </p>

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
    </Container>
  );
};

export default HomePage;
