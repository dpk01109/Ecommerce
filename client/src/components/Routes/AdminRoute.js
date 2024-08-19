import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminRoute() {
  const [ok, setOk] = useState(false);
  const [auth,setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      const now = auth.token;
      console.log(now)
      const headers = {
        'Authorization': now,
        'Content-Type': 'application/json'
      }
      const res = await axios.get("/api/v1/auth/admin-auth", {headers });
      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };
    if (auth?.token) authCheck();
  }, [auth?.token]);

  return ok ? <Outlet/>: <Spinner path=""/>;

}