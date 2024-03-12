import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import HomeScreen from './screens/HomeScreen';
import BusinessScreen from './screens/BusinessScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoutes from './components/PrivateRoutes';
import AdminRoutes from './components/AdminRoutes';
import AllReviewsScreen from './screens/AdminScreens/AllReviewsScreen';
import BusinessesListScreen from './screens/AdminScreens/BusinessesListScreen';
import UsersListScreen from './screens/AdminScreens/UsersListScreen';
import BusinessEditScreen from './screens/AdminScreens/BusinessEditScreen';
import UserEditScreen from './screens/AdminScreens/UserEditScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/search/:keyword' element={<HomeScreen />} />
      <Route path='/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/search/:keyword/page/:pageNumber' element={<HomeScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='/business/:id' element={<BusinessScreen />} />
      {/* {Private Routes} */}
      <Route path='' element={<PrivateRoutes />}>
        <Route path='/profile' element={<ProfileScreen />} />
      </Route>
      {/* {Admin Routes} */}
      <Route path='' element={<AdminRoutes />}>
        <Route path='/admin/reviews' element={<AllReviewsScreen />} />
        <Route path='/admin/businesses' element={<BusinessesListScreen />} />
        <Route path='/admin/businesses/:pageNumber' element={<BusinessesListScreen />} />
        <Route path='/admin/business/:id/edit' element={<BusinessEditScreen />} />
        <Route path='/admin/user/:id/edit' element={<UserEditScreen />} />
        <Route path='/admin/users' element={<UsersListScreen />} />
      </Route>
    </Route>
  )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);