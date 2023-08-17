import { useState, useEffect } from "react";
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

  return (
    <div className="UserListPage">
      {userList.map((user) => {
        return (
          <li key={user.user_id}>
            {user.pseudo} - {user.email}
            <img src={EditIcon} alt="Edit Icon" />
            <img src={DeleteIcon} alt="Delete Icon" />
          </li>
        );
      })}
    </div>
  );
}

export default UserListPage;
