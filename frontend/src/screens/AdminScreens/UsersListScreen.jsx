import { LinkContainer } from "react-router-bootstrap";
import { Table, Button } from "react-bootstrap";
import { useGetUsersQuery, useDeleteUserMutation } from "../../slices/usersApiSlice";
import { AiFillEdit, AiFillDelete, AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";

const UsersListScreen = () => {

  const { data: users, isLoading, error, refetch } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure?')) {
      try {
        await deleteUser(id);
        refetch();
        toast.success('user deleted successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th>EDIT</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td>{user.isAdmin ? <AiOutlineCheck style={{color: 'green'}}/> : <AiOutlineClose style={{color: 'red'}}/>}</td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm me-1">
                        <AiFillEdit  style={{color: 'black'}}/>
                      </Button>
                    </LinkContainer>
                      <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                        <AiFillDelete  style={{color: 'white'}}/>
                      </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {loadingDelete && <Loader />}
        </>
      )}
    </>
  );
};
export default UsersListScreen;