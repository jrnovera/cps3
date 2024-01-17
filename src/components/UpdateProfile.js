import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const UpdateProfile = ({ userDetails }) => {
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newMobileNo, setNewMobileNo] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    if (userDetails) {
      setNewFirstName(userDetails.firstName || "");
      setNewLastName(userDetails.lastName || "");
      setNewMobileNo(userDetails.mobileNo || "");
      setNewEmail(userDetails.email || "");
    }
  }, [userDetails]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/users/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`, // Use directly here
        },
        body: JSON.stringify({
          firstName: newFirstName,
          lastName: newLastName,
          mobileNo: newMobileNo,
          email: newEmail,
        }),
      });

      if (response.ok) {
        // Show success message with SweetAlert
        Swal.fire({
          icon: "success",
          title: "Profile Updated!",
          text: "Your profile has been updated successfully.",
        }).then(() => {
          // Refresh the page after the SweetAlert is closed
          window.location.reload();
        });
      } else {
        const errorData = await response.json();
        // Show error message with SweetAlert
        Swal.fire({
          icon: "error",
          title: "Error!",
          text:
            errorData.message ||
            "An error occurred while updating the profile.",
        });
      }
    } catch (error) {
      // Show network error message with SweetAlert
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred. Please try again.",
      });
      console.error("An error occurred. Please try again.", error);
    }
  };

  return (
    <div className="container">
      <h2>Update Profile</h2>
      <form onSubmit={handleUpdateProfile}>
        <div className="mb-3">
          <label htmlFor="newFirstName" className="form-label">
            New First Name
          </label>
          <input
            type="text"
            className="form-control"
            id="newFirstName"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newLastName" className="form-label">
            New Last Name
          </label>
          <input
            type="text"
            className="form-control"
            id="newLastName"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newMobileNo" className="form-label">
            New Mobile Number
          </label>
          <input
            type="text"
            className="form-control"
            id="newMobileNo"
            value={newMobileNo}
            onChange={(e) => setNewMobileNo(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newEmail" className="form-label">
            New Email
          </label>
          <input
            type="email"
            className="form-control"
            id="newEmail"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-danger">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
