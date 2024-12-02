import { useState } from "react";
import User from "../interfaces/User";
import axios from "axios";

export const UseLogin = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const login = async (data: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.ok) {
        return json;
      } else {
        setError(json.error as string);
      }
    } catch (error: any) {
      setError(error.message as string);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { login, error, loading };
};

export const UseRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const register = async (data: {
    email: string;
    password: string;
    username: string;
  }) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const json = await response.json();
      if (response.ok) {
        return json;
      } else {
        setError(json.error as string);
      }
    } catch (error: any) {
      setError(error.message as string);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { register, error, loading };
};

export const useUpdateProfile = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const updateProfile = async (data: User) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token") as string;
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
      });

      const json = await response.json();
      if (response.ok) {
        return json;
      } else {
        setError(json.error);
      }
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return { updateProfile, loading, error };
};

export const useUpdateProfileImage = () => {
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const updateProfileImage = async (data: any) => {
    try {
      setLoading(true);
      setError("");

      const token = localStorage.getItem("token") as string;
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const response = await axios.put("/user/profile/image", data, {
        headers: {
          authorization: "Bearer " + token,
        },
      });
      const json = await response.data;
      if (response.status === 200) {
        return json;
      } else {
        setError(json.error as string);
      }
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return { updateProfileImage, error, loading };
};
