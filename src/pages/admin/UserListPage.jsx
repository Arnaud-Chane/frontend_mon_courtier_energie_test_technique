import { useState, useEffect } from "react";
import axios from "axios";

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
          </li>
        );
      })}
    </div>
  );
}

export default UserListPage;
