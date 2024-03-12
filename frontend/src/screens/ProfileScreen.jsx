import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useProfileMutation } from '../slices/usersApiSlice';
import { useGetMyReviewQuery } from '../slices/businessesApiSlice';
import { setCredentials } from '../slices/authSlice';
import { LinkContainer } from 'react-router-bootstrap';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader'; 
import Rating from '../components/Rating';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useProfileMutation();
  const {data: reviews, isLoading: loadingReviwes, error } = useGetMyReviewQuery(); 

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Password do not match');
      return;
    } else {
      try {
        const res = await updateProfile({ _id: userInfo._id, name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }))
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' className='my-2'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='email' className='my-2'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='password' className='my-2'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='confirmPassword' className='my-2'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button type='submit' className='my-2'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2 className='text-center mb-4'>My Reviews</h2>
        {loadingReviwes ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error?.data?.message}</Message>
        ) : (
          <Table striped hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>DATE</th>
                <th>COMMENT</th>
                <th>RATING</th>
                <th>BUSINESS</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review._id}>
                  <td>{review.createdAt.substring(0, 10)}</td>
                  <td>{review.comment}</td>
                  <td><Rating value={review.rating} /></td>
                  <td>
                    <LinkContainer to={`/business/${review.business}`}>
                      <Button variant='warning' className='btn-sm'>
                        {review.businessName}
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
      {isLoading && <Loader />}
    </Row>
  );
};
export default ProfileScreen;