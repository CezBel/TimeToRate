import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useUpdateBusinessMutation, useGetBusinessDetailsQuery, useUploadBusinessImageMutation } from "../../slices/businessesApiSlice";
import { toast } from "react-toastify";
import FormContainer from "../../components/FormContainer";
import Loader from "../../components/Loader";
import Message from "../../components/Message";

const BusinessEditScreen = () => {
  const { id: businessId } = useParams();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [sub_category, setSub_category] = useState('');
  const [addressCity, setAddressCity] = useState('');
  const [addressStreet, setAddressStreet] = useState('');
  const [addressPC, setAddressPC] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');

  const { data: business, isLoading, refetch, error } = useGetBusinessDetailsQuery(businessId);

  const [updateBusiness, { isLoading: loadingUpdate }] = useUpdateBusinessMutation();
  const [uploadImage, { isLoading: loadingUpload }] = useUploadBusinessImageMutation();
  

  const navigate = useNavigate();

  useEffect(() => {
    if (business) {
      setName(business.name);
      setDescription(business.description);
      setImage(business.image);
      setCategory(business.category);
      setSub_category(business.sub_category);
      setAddressCity(business.address.addressLocality);
      setAddressStreet(business.address.streetAddress);
      setAddressPC(business.address.postalCode);
      setPhone(business.phone);
      setEmail(business.email);
      setUrl(business.url);
    }
  }, [business]);

  const submitHandler = async (e) => {
    e.preventDefault();

    const updatedBusiness = {
      businessId,
      name,
      description,
      image,
      category,
      sub_category,
      address: {
        addressLocality: addressCity,
        streetAddress: addressStreet,
        postalCode: addressPC,
      },
      phone,
      email,
      url
    };

    const res = await updateBusiness(updatedBusiness).unwrap();
    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success('Business updated');
      navigate('/admin/businesses');
      refetch();
    }
  };

  const uploadHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    console.log(e.target.files[0]);
    try {
      const res = await uploadImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link to='/admin/businesses' className="btn btn-light">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Business</h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error.data.message}</Message>
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

            <Form.Group controlId="description">
              <Form.Label className="my-2">Description</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="image">
              <Form.Label className="my-2">Image</Form.Label>
              <Form.Control 
                type="file"
                label="Choose file"
                onChange={uploadHandler}
              />
              <Form.Control 
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="category">
              <Form.Label className="my-2">Category</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Enter category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="sub_category">
              <Form.Label className="my-2">Sub Category</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Enter sub category"
                value={sub_category}
                onChange={(e) => setSub_category(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="address">
              <Form.Label className="my-2">City</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Enter city"
                value={addressCity}
                onChange={(e) => setAddressCity(e.target.value)}
              />
              <Form.Label className="my-2">Street</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Enter street address"
                value={addressStreet}
                onChange={(e) => setAddressStreet(e.target.value)}
              />
              <Form.Label className="my-2">Postal Code</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Enter postal code"
                value={addressPC}
                onChange={(e) => setAddressPC(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="phone">
              <Form.Label className="my-2">Phone number</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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

            <Form.Group controlId="url">
              <Form.Label className="my-2">Url</Form.Label>
              <Form.Control 
                type="text"
                placeholder="Enter Url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Form.Group>

            <Button 
              type="submit"
              className="my-3"
            >
              Update
            </Button>

            {loadingUpdate && <Loader />}
            {loadingUpload && <Loader />}
          </Form>
        )}
      </FormContainer>
    </>
  );
};
export default BusinessEditScreen;