import React, { createContext, useEffect, useReducer } from "react";
import User from "../interfaces/User";

const fetchUser = async (token: string): Promise<User> => {
  const response = await fetch("/api/profile", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: "Bearer " + token,
    },
  });
  const json = await response.json();
  if (response.ok) {
    return json.user as User;
  } else {
    return {} as User;
  }
};

export interface AuthState {
  token: string;
  isAuthenticated: boolean;
  user?: User;
  dispatch?: React.Dispatch<any>;
}

export const AuthContext = createContext({} as AuthState);

export const AuthReducer = (state: AuthState, action: any): AuthState => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("token", action.payload.token as string);
      return {
        isAuthenticated: true,
        token: action.payload.token as string,
        user: action.payload.user as User,
      };
    case 'UPDATE':
      return {
        isAuthenticated: true,
        token: state.token as string,
        user: action.payload.user as User,
      }
    case "LOGOUT":
      localStorage.removeItem("token");
      return {
        isAuthenticated: false,
        token: "",
        user: {},
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, {} as AuthState);

  useEffect(() => {
    async function start() {
      const token = localStorage.getItem("token");
      if (token) {
        const user = await fetchUser(token);
        dispatch({ type: "LOGIN", payload: { token, user} });
      }
    }
    start();
  }, [dispatch]);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
