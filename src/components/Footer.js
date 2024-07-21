import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './css/YourFooterStyles.css'; // Import your custom footer styles (optional)


const Footer = () => {
    return (
      <footer className="footer">
        <Container>
          <Row>
            <Col>
                <p>&copy; {new Date().getFullYear()} BsKart</p>
                <p>বর্গভীমা মন্দির থেকে ৮ KM এর মধ্যে আমাদের ষ্টোর</p>
            </Col>
          </Row>
        </Container>
      </footer>
    );
  };
  
  export default Footer;
  