import { createContext } from "react";

export const UserInfoContext = createContext({});

function UserInfoProvider({ children }) {
  return <UserInfoContext.Provider>{children}</UserInfoContext.Provider>;
}

export default UserInfoProvider;
