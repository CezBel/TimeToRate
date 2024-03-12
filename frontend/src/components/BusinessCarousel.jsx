import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Rating from "./Rating";
import Message from "./Message";
import { useGetTopBusinessesQuery } from "../slices/businessesApiSlice";

const BusinessCarousel = () => {
  const { data: businesses, isLoading, error } = useGetTopBusinessesQuery();

  return (
    <>
      {isLoading ? <Loader />
        : error ?
          <Message variant='danger'>{error}</Message>
          : (
            <Carousel style={{ border: '2px solid', borderRadius: '50px' }} pause='hover' className="bg-dark mb-4">
              {businesses.map((business) => (
                <Carousel.Item key={business._id}>
                  <Link to={`/business/${business._id}`}>
                    <Image style={{ borderRadius: '50px' }} src={business.image} alt={business.name} fluid />
                    <Carousel.Caption className="carousel-caption">
                      <h5>
                        <span className="px-1 carouselSpan">{business.name}</span> {<Rating value={business.rating} />}
                      </h5>
                    </Carousel.Caption>
                  </Link>
                </Carousel.Item>
              ))}
            </Carousel>
          )}
    </>
  )
};
export default BusinessCarousel;