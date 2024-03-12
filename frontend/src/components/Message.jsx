import { Alert } from 'react-bootstrap'; 

const Message = ({ variant, children }) => {
  return (
    <Alert className='text-center' variant={variant}>
      {children}
    </Alert>
  );
};


export default Message;