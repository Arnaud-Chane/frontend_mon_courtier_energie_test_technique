import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Button } from "antd";

import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";

function UserListPage() {
  const [userList, setUserList] = useState([]);
  const [fetchData, setFetchData] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users`
        );
        setUserList(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUser();
  }, [fetchData]);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`
      );
      if (response.status === 204) {
        setFetchData(!fetchData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="UserListPage">
      <table className="user-list">
        <thead className="task-header">
          <tr>
            <th className="Membres">Membres</th>
            <th className="Options">Options</th>
          </tr>
        </thead>
        <tbody className="task-body">
          {userList.map((user) => {
            return (
              <tr className="user" key={user.user_id}>
                <td>
                  {user.pseudo} - {user.email}
                </td>
                <td>
                  <Link to={`/admin/user/${user.user_id}`}>
                    <img className="edit-icon" src={EditIcon} alt="Edit Icon" />
                  </Link>

                  <Button
                    type="button"
                    onClick={() => handleDelete(user.user_id)}
                  >
                    <img
                      className="del-icon"
                      src={DeleteIcon}
                      alt="Delete Icon"
                    />{" "}
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default UserListPage;
