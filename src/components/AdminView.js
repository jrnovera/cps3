import { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import EditProduct from "./EditProduct";
import ArchiveProduct from "./ArchiveProduct";
import DeleteProductButton from "./DeleteProductButton";
export default function AdminView({ productData, fetchData }) {
  const [product, setProduct] = useState([]);

  //Getting the coursesData from the courses page
  useEffect(() => {
    console.log(productData);

    const productArr = productData.map((product) => {
      return (
        <tr key={product._id}>
          <td>{product._id}</td>
          <td>{product.name}</td>
          <td>{product.description}</td>
          <td>{product.price}</td>
          <td className={product.isActive ? "text-success" : "text-danger"}>
            {product.isActive ? "Available" : "Unavailable"}
          </td>
          {/*<td> <button className="btn btn-primary"> Edit </button></td>*/}
          <td>
            {" "}
            <EditProduct product={product._id} fetchData={fetchData} />
          </td>
          <td>
            {" "}
            <ArchiveProduct
              productId={product._id}
              fetchData={fetchData}
              isActive={product.isActive}
            />{" "}
          </td>
          <td>
            <DeleteProductButton />
          </td>
        </tr>
      );
    });

    setProduct(productArr);
  }, [productData]);

  return (
    <>
      <h1 className="text-center my-4"> Admin Dashboard</h1>

      <Table striped bordered hover responsive>
        <thead>
          <tr className="text-center">
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Price</th>
            <th>Availability</th>
            <th colSpan="2">Actions</th>
          </tr>
        </thead>

        <tbody>{product}</tbody>
      </Table>
    </>
  );
}
