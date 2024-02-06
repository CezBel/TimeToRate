import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri';

const Rating = ({ value, text }) => {
  return (
    <div className='rating'>
      <span>
        {value >= 1 ? <RiStarFill /> : value >= 0.5 ? <RiStarHalfFill /> : <RiStarLine/> } 
      </span>
      <span>
        {value >= 2 ? <RiStarFill /> : value >= 1.5 ? <RiStarHalfFill /> : <RiStarLine/> } 
      </span>
      <span>
        {value >= 3 ? <RiStarFill /> : value >= 2.5 ? <RiStarHalfFill /> : <RiStarLine/> } 
      </span>
      <span>
        {value >= 4 ? <RiStarFill /> : value >= 3.5 ? <RiStarHalfFill /> : <RiStarLine/> } 
      </span>
      <span>
        {value >= 5 ? <RiStarFill /> : value >= 4.5 ? <RiStarHalfFill /> : <RiStarLine/> } 
      </span>
      <span className='rating-text'>{text && text}</span>
    </div>
  );
};

export default Rating;