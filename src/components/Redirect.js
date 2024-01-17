import { Navigate } from "react-router-dom";
// import UserContext from '../UserContext';
// import {useContext, useEffect } from 'react';

export default function Redirect() {
  // Redirect back to login
  return <Navigate to="/cart" />;
}
