import { Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Business from '../components/Business';
import BusinessCarousel from '../components/BusinessCarousel';
import { useGetBusinessesQuery } from '../slices/businessesApiSlice';

const HomeScreen = () => {
  const  { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetBusinessesQuery({ keyword, pageNumber });
  return (
    <>
      {!keyword ? <BusinessCarousel /> : (
        <Link to='/' className='btn btn-warning mb-2'>
          Go Back
        </Link>
      )}
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
            {data.businesses.map((business) => (
              <Col sm={12} md={6} lg={4} xl={3}>
                <Business business={business} />
              </Col>
            ))}
          </Row>
          <Paginate 
            pages={data.pages}
            page={data.page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};
export default HomeScreen;