import { Row, Col } from 'react-bootstrap';
import businesses from '../businesses';
import Business from '../components/Business';

const HomeScreen = () => {
  return (
    <>
      <h1>Browse Businesses</h1>
      <Row>
        {businesses.map((business) => (
          <Col sm={12} md={6} lg={4} xl={3}>
             <Business business={business} />
          </Col>
        ))}
      </Row>
    </>
  );
};
export default HomeScreen;