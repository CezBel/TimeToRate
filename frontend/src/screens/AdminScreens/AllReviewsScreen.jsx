import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useGetReviewsQuery } from "../../slices/businessesApiSlice";
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Rating from '../../components/Rating';

const AllReviewsScreen = () => {

  const { data: reviews, isLoading, error } = useGetReviewsQuery();

  return (
    <>
      <h1>User Reviews</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table className="table-sm" striped bordered hover responsive>
          <thead>
            <tr>
              <th>DATE</th>
              <th>USER ID</th>
              <th>USER</th>
              <th>RATING</th>
              <th>COMMENT</th>
              <th>BUSINESS</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>
                <td>{review.createdAt.substring(0, 10)}</td>
                <td>{review.user}</td>
                <td>{review.name}</td>
                <td><Rating value={review.rating} /></td>
                <td>{review.comment}</td>
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
    </>
  );
};
export default AllReviewsScreen;