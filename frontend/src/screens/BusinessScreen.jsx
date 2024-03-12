import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Row, Col, Image, ListGroup, Form, Button } from 'react-bootstrap';
import { useGetBusinessDetailsQuery, useCreateReviewMutation } from '../slices/businessesApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Rating from '../components/Rating';

const BusinessScreen = () => {
  const { id: businessId } = useParams();

  const { data: business, isLoading, refetch, error } = useGetBusinessDetailsQuery(businessId);
  const [createReview, { isLoading: loadingCreateReview }] = useCreateReviewMutation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const { userInfo } = useSelector((state) => state.auth);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        businessId,
        rating,
        comment,
        businessName: business.name,
      }).unwrap();

      refetch();

      toast.success('Review Submitted');

      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

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
              <ListGroup className='text-center' variant='flush'>
                <ListGroup.Item>
                  <h3>{business.name}</h3>
                </ListGroup.Item>

                <ListGroup.Item style={{backgroundColor: '#ff0000c8', borderRadius: '10px'}} className='text-center my-2 py-1'>
                  <span className='businessDescription'>{business.description ? business.description : 'no description'}</span>
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

            <Col md={5}>
              <ListGroup  className='mt-5' variant='flush'>
                {userInfo ? (
                  <>
                    <ListGroup className='mb-2'>
                      <ListGroup.Item>
                        <h3 className='text-center'>Write a review</h3>
                        {loadingCreateReview && <Loader />}
                        <Form onSubmit={submitHandler}>
                          <Form.Group controlId='rating' className='my-2'>
                            <Form.Label>Rating ⭐️</Form.Label>
                            <Form.Control
                              as='select'
                              value={rating}
                              onChange={(e) => setRating(Number(e.target.value))}

                            >
                              <option value="">Select...</option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </Form.Control>
                          </Form.Group>
                          <Form.Group>
                            <Form.Label>Comment 📝</Form.Label>
                            <Form.Control
                              placeholder='Write a review...'
                              as='textarea'
                              row='3'
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                          </Form.Group>
                          <Button
                            disabled={loadingCreateReview}
                            type='submit'
                            className='mt-4'
                          >
                            Add a Review
                          </Button>
                        </Form>
                      </ListGroup.Item>
                    </ListGroup>
                  </>
                ) : (
                  <Message className='message-center' variant='warning'>Register to write a review</Message>
                )}
              </ListGroup>
            </Col>
            <Col md={3}>
              <>
                {business.reviews.length === 0 ? (
                  <Message className='m-2' variant='warning'>No Reviews, Be the first one to review {business.name}</Message>
                ) : (
                  <ListGroup>
                    <h2 className='text-center mb-3 pt-1'>
                      Reviews
                    </h2>

                    {business.reviews.map(review => (
                      <ListGroup.Item key={review._id}>
                        <strong>{review.name}</strong>
                        <Rating value={review.rating} />
                        <p>{review.createdAt.substring(0, 10)}</p>
                        <p>{review.comment}</p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </>
            </Col>
          </Row>

        </>
      )}
    </>
  );
};
export default BusinessScreen;