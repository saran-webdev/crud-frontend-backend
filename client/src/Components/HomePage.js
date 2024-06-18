import React, { useState, useEffect } from "react";
import axios from "axios";
import { PencilSquare, Trash } from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [userData, setUserData] = useState([]);
  // console.log(userData);

  useEffect(() => {
    axios
      .get("http://localhost:5000")
      .then((response) => {
        setUserData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onDelete = async (id) => {
    // console.log(id);
    // return;
    try {
      await axios.delete(`http://localhost:5000/${id}`, id);
      setUserData(userData.filter((user) => user._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 flex-column">
      <h3>User Data</h3>
      <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">User Name</th>
              <th scope="col">Email ID</th>
              <th scope="col">Phone Number</th>
              <th scope="col">Update</th>
              <th scope="col">Delete</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={user._id}>
                <th scope="row">{index + 1}</th>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.phoneNumber}</td>

                <td>
                  <Link
                    to={"/update/" + user._id}
                    style={{ textDecoration: "none" }}
                  >
                    <PencilSquare />
                  </Link>
                </td>

                <td onClick={() => onDelete(user._id)}>
                  <Trash />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HomePage;
