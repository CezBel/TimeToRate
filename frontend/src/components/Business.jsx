import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from './Rating';

const Business = ({ business }) => {
  return (
    <Card className='my-3 p-3'>
      <Link to={`/business/${business._id}`}>
        <Card.Img src={business.image}/>
      </Link>

      <Card.Body>
        <Link to={`/business/${business._id}`}>
          <Card.Title className='business-title' as='h4'>
            <strong>{business.name}</strong>
          </Card.Title>
        </Link>
        
        <Card.Text className='mb-2' as='h5'>
          {business.category}
        </Card.Text>

        <Card.Text as='span' className='px-1 py-1' style={{backgroundColor: 'rgb(255,201,0)', borderRadius: '7px'}}>
          {business.sub_category}
        </Card.Text>

        <Card.Text className='mt-2' as='div'>
          <Rating value={business.rating} text={`${business.numReviews} reviews`} />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
export default Business;