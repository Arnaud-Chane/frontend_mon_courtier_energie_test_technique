import { createContext, useMemo, useState } from "react";

export const UserInfoContext = createContext({});

function UserInfoProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    email: "",
    user_id: "",
  });

  const contextAllInfoUser = useMemo(
    () => ({
      userInfo,
      setUserInfo,
    }),
    [userInfo]
  );

  return (
    <UserInfoContext.Provider value={contextAllInfoUser}>
      {children}
    </UserInfoContext.Provider>
  );
}

export default UserInfoProvider;
