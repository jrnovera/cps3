import { useEffect, useState, useContext } from "react";
import ProductCard from "../components/ProductCard";
// import coursesData from '../data/coursesData';
import UserContext from "../UserContext";
import UserView from "../components/UserView";
import AdminView from "../components/AdminView";
// import ProductSearch from '../components/ProductSearch';

export default function Product() {
  const { user } = useContext(UserContext);

  // Checks to see if the mock data was captured
  // console.log(coursesData);
  // console.log(coursesData[0]);

  // State that will be used to store the courses retrieved from the database
  const [product, setProduct] = useState([]);

  const fetchData = () => {
    // Allows to have a dynamic url depending whether the user that's logged in is an admin or not
    let fetchUrl =
      user.isAdmin === true
        ? `${process.env.REACT_APP_API_URL}/all`
        : `${process.env.REACT_APP_API_URL}/products`;

    // headers is included for both /courses/all and /courses/ to allow flexibility even if it is not needed.
    fetch(fetchUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(typeof data.message);

        // Sets the "courses" state to map the data retrieved from the fetch request into several "CourseCard" components
        // If the data.message is not a string or equal to undefined it will set the courses state with the courses from fetch
        if (data) {
          setProduct(data);
        } else {
          setProduct([]);
        }
        console.log(product);
      });
  };

  // Retrieves the courses from the database upon initial render of the "Courses" component
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* <ProductSearch /> */}
      {user.isAdmin === true ? (
        <AdminView productData={product} fetchData={fetchData} />
      ) : (
        <UserView productData={product} />
      )}
    </>
  );
}
