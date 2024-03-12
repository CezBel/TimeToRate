import { useState } from "react"
import { Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";

const SearchBox = () => {
  const navigate = useNavigate();
  const { keyword: urlKeyword } = useParams(); 
  const [keyword, setKeyword] = useState(urlKeyword || '');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex justify-content-center">
      <Form.Control 
        type="text" 
        name="q" 
        onChange={(e) => setKeyword(e.target.value)} 
        value={keyword}  
        placeholder="Search Business..."
        style={{border: 'solid 2px'}}
      />
      <Button type="submit"  variant='outline-dark' style={{color: 'black', border: 'solid 2px'}} className="p-2 mx-2">
        Search
      </Button>
    </Form>
  );
};
export default SearchBox;