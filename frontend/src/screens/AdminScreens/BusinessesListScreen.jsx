import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { Row, Col, Table, Button } from "react-bootstrap";
import { useGetBusinessesQuery, useCreateBusinessMutation, useDeleteBusinessMutation } from "../../slices/businessesApiSlice";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Paginate from "../../components/Paginate";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Rating from "../../components/Rating";
import { toast } from "react-toastify";

const BusinessesListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetBusinessesQuery({ pageNumber });
  const [createBusiness, { isLoading: loadingCreate }] = useCreateBusinessMutation();
  const [deleteBusiness, {isLoading: loadingDelete }] = useDeleteBusinessMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete business?')) {
      try {
        await deleteBusiness(id);
        refetch();
        toast.success('Business deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createBusinessHandler = async () => {
    if (window.confirm('Are you sure you want to add business?')) {
      try {
        await createBusiness();
        refetch();
        toast.success('Business added');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Businesees</h1>
        </Col>
        <Col className="text-end">
          <Button className="btn-sm m-3" onClick={createBusinessHandler}>
            Create Business <AiFillEdit />
          </Button>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error.data.message}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>CATEGORY</th>
                <th>SUB CATEGORY</th>
                <th>PHONE</th>
                <th>CITY</th>
                <th>RATING</th>
                <th>BUSINESS PAGE</th>
                <th>EDIT</th>
              </tr>
            </thead>
            <tbody>
              {data.businesses.map((business) => (
                <tr key={business._id}>
                  <td>{business._id}</td>
                  <td>{business.name}</td>
                  <td>{business.category}</td>
                  <td>{business.sub_category}</td>
                  <td>{business.phone}</td>
                  <td>{business.address.addressLocality}</td>
                  <td><Rating value={business.rating}/></td>
                  <td>
                    <LinkContainer to={`/business/${business._id}`}>
                      <Button variant="light" className="btn-sm">
                        {business.name}
                      </Button>
                    </LinkContainer>
                  </td>
                  <td>
                    <LinkContainer to={`/admin/business/${business._id}/edit`}>
                      <Button variant="warning" className="btn-sm me-1">
                        <AiFillEdit  style={{color: 'white'}}/>
                      </Button>
                    </LinkContainer>
                      <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(business._id)}>
                        <AiFillDelete  style={{color: 'white'}}/>
                      </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Paginate pages={data.pages} page={data.page} isAdmin={true} />
          {loadingCreate && <Loader />}
          {loadingDelete && <Loader />}
        </>
      )}
    </>
  );
};
export default BusinessesListScreen;