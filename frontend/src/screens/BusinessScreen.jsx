import { useParams, Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card } from 'react-bootstrap';
import { useGetBusinessDetailsQuery } from '../slices/businessesApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';

const BusinessScreen = () => {
  const { id: businessId } = useParams();

  const { data: business, isLoading, error } = useGetBusinessDetailsQuery(businessId);

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
          <Link className='btn btn-danger mb-4' to='/'>
            Go Back
          </Link>

          <Row>
            <Col md={4}>
              <Image style={{ borderRadius: '200px' }} src={business.image} alt={business.name} fluid />
            </Col>

            <Col md={8}>
              <ListGroup variant='flush'>
                <ListGroup.Item className='text-center mb-3 pt-1'>
                  <span className='businessDescription'>{business.description ? business.description : 'no description'}</span>
                </ListGroup.Item>

                <Card>
                  <ListGroup.Item className='text-center'>
                    <h5>Write a review will be here</h5>
                  </ListGroup.Item>
                  <ListGroup.Item className='text-center'>
                    <h5>Reviews will be here</h5>
                  </ListGroup.Item>
                </Card>
              </ListGroup>
            </Col>
          </Row>

          <Row>
            <Col md={4}>
              <ListGroup className='text-center mt-3' variant='flush'>
                <ListGroup.Item>
                  <h3>{business.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item className='py-1'>
                  <h5>Address:</h5>
                  <h6>{`${business.address?.addressLocality}, ${business.address?.streetAddress}, ${business.address?.postalCode}`}</h6>
                </ListGroup.Item>

                <ListGroup.Item style={{ fontSize: '20px' }}>
                  <Rating value={business.rating} text={`${business.numReviews} reviews`} />
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default BusinessScreen;