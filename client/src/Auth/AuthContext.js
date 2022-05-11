import { createContext } from "react";

export const AuthContext = createContext({
  isLoggedIn: false,
  token: null,
  user: {},
  // login: () => {},
  // logout: () => {},
});
