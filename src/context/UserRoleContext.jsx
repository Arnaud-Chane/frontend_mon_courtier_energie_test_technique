import { createContext, useState } from "react";

export const UserInfoContext = createContext({});

function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    user_id: "",
  });

  return <UserInfoContext.Provider>{children}</UserInfoContext.Provider>;
}

export default UserInfoProvider;
