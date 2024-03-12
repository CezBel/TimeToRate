import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useGetUserDetailsQuery, useUpdateUserMutation} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  
  const [name, setName] = useState('');
  const [isAdmin, SetIsAdmin] = useState(false);
  const [email, setEmail] = useState('');

  const { data: user, isLoading, refetch, error } = useGetUserDetailsQuery(userId);
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();
  
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      SetIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await updateUser({ userId, name, email, isAdmin }).unwrap();
      toast.success('User updated');
      navigate('/admin/users');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/users' className="btn btn-light">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label className="my-2">Name</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="email">
              <Form.Label className="my-2">Email</Form.Label>
              <Form.Control 
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-2" controlId="isAdmin">
              <Form.Check 
                type="checkbox"
                label='Is Admin'
                checked={isAdmin}
                onChange={(e) => SetIsAdmin(e.target.checked)}
              />
            </Form.Group>

            <Button 
              type="submit"
              className="mt-2"
            >
              Update
            </Button>
            {loadingUpdate && <Loader />}
            {isLoading && <Loader />}
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default UserEditScreen;