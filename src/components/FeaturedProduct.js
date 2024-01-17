// import { useState, useEffect } from "react";
// import { CardGroup } from "react-bootstrap";
// import PreviewProduct from "./PreviewProduct";

// export default function FeaturedProduct() {
//   // This state is to store the featured courses
//   const [previews, setPreviews] = useState([]);

//   useEffect(() => {
//     fetch(`http://localhost:4000/products/`)
//       .then((res) => res.json())
//       // 0           1            2
//       .then((data) => {
//         // [{course 1}, {course 2}, {course 3} ....]

//         // to store random indeces and featured course previews
//         const numbers = [];
//         const featured = [];

//         // This function is to generate unique random indeces
//         const generateRandomNums = () => {
//           let randomNum = Math.floor(Math.random() * data.length);

//           if (numbers.indexOf(randomNum) === -1) {
//             // If the random index is not in the array, add it
//             numbers.push(randomNum);
//             console.log("Numbers state");
//             console.log(numbers);
//           } else {
//             // If the random index is already in the array, generate a new one
//             generateRandomNums();
//           }
//         };

//         // This loop will generate 5 random numbers / indeces through the use of generateRandomNums function
//         for (let i = 0; i < 5; i++) {
//           generateRandomNums();

//           console.log("shuffled product");
//           console.log(numbers);
//           console.log(data[numbers[i]]._id); // This is to get the id of the object
//           console.log(data[numbers[i]]); // This is the actual object retrieved using the index number

//           // Push a PreviewCourses component with the data of the randomly selected course
//           featured.push(
//             <PreviewProduct
//               key={data[numbers[i]]._id}
//               data={data[numbers[i]]}
//               breakPoint={2}
//             />
//           );
//         }

//         // featured state will contain 5 PreviewCourses component, then it is assigned to previews state.
//         setPreviews(featured);
//       });
//   }, []);

//   return (
//     <>
//       <h2 className="text-center">Featured Product</h2>
//       <CardGroup className="justify-content-center">
//         {/* This will render the 5 PreviewCourses component stored in previews state */}
//         {previews}
//       </CardGroup>
//     </>
//   );
// }
import { useState, useEffect } from "react";
import { CardGroup } from "react-bootstrap";
import PreviewProduct from "./PreviewProduct";
import { useNavigate } from "react-router-dom";

export default function FeaturedProduct() {
  const navigate = useNavigate();
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    console.log("Fetching featured products...");
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
      .then((res) => res.json())
      .then((data) => {
        const numbers = [];
        const featured = [];

        const generateRandomNums = () => {
          let randomNum = Math.floor(Math.random() * data.length);

          if (numbers.indexOf(randomNum) === -1) {
            numbers.push(randomNum);
          } else {
            generateRandomNums();
          }
        };

        for (let i = 0; i < 5; i++) {
          generateRandomNums();

          featured.push(
            <PreviewProduct
              key={data[numbers[i]]._id}
              data={data[numbers[i]]}
              breakPoint={2}
              onBuy={() => {
                // Use the navigate function to redirect to ProductView
                navigate(`/product/${data[numbers[i]]._id}`);
              }}
            />
          );
        }

        setPreviews(featured);
        console.log("Featured products fetched:", featured);
      });
  }, [navigate]);

  return (
    <>
      <h2 className="text-center">Featured Product</h2>

      <CardGroup className="justify-content-center">{previews}</CardGroup>
    </>
  );
}
