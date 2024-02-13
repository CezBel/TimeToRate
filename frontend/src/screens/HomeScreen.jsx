import { Row, Col } from 'react-bootstrap';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Business from '../components/Business';
import { useGetBusinessesQuery } from '../slices/businessesApiSlice';

const HomeScreen = () => {
  const { data: businesses, isLoading, error } = useGetBusinessesQuery();
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error?.data?.message || error.error}
        </Message>
      ) : (
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
      )}
    </>
  );
};
export default HomeScreen;