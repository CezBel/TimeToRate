import Header from "./components/Header";
import Footer from "./components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const App = () =>  {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container style={{paddingTop: '160px'}}>
          <Outlet />
        </Container>
      </main>
      <Footer/>
      <ToastContainer />
    </>
  );
};
export default App;
