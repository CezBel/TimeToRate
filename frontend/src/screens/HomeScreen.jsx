import { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Business from '../components/Business';

const HomeScreen = () => {
  const [businesses, setBusinesses] = useState([]);

  useEffect(() => {
    const getBusinesses = async () => {
      const { data} = await axios.get('/api/businesses');
      setBusinesses(data);
    };
    getBusinesses();
  }, []);

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