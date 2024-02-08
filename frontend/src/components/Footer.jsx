import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {

  const currentYear = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p>TimeToRate &copy; {currentYear}</p>
            <p>Designed By <span style={{backgroundColor: 'lightblue', borderRadius: '8px', padding: '6px'}}>Ariel Edri</span></p>
          </Col>

        </Row>
      </Container>
    </footer>
  );
};
export default Footer;