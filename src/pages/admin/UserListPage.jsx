import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import EditIcon from "../../assets/images/edit-icon.svg";
import DeleteIcon from "../../assets/images/delete-icon.svg";

function UserListPage() {
  const [userList, setUserList] = useState([]);

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
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`
      );
      if (response.status === 204) {
        console.log('ok')
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="UserListPage">
      {userList.map((user) => {
        return (
          <li key={user.user_id}>
            {user.pseudo} - {user.email}
            <Link to={`/admin/user/${user.user_id}`}>
              <img src={EditIcon} alt="Edit Icon" />
            </Link>
            <button type="button" onClick={() => handleDelete(user.user_id)}>
              <img src={DeleteIcon} alt="Delete Icon" />
            </button>
          </li>
        );
      })}
    </div>
  );
}

export default UserListPage;
