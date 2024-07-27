import React, { useState, useEffect } from "react";
import { useNavigate, useLocation} from "react-router-dom";
const Spinner = ({path = "login"}) => {
  const [count, setCount] = useState(3);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    let item = localStorage.getItem("auth");
    // item = JSON.parse(item);
    // console.log(item)
    item = JSON.parse(item)
    let success;
    try{
    success = item.success;
    }
    catch(err)
    {
        success = false;
    }
    // console.log(item.success)
    const interval = setInterval(() => {
      setCount((prevValue) => --prevValue);
    }, 1000);
    // (count === 0  && !(success)) &&
    //   navigate('/login')
    (count === 0  && !(success)) &&
    navigate(`/${path}`, {
        state: location.pathname,
    });

    if(success)
    {
        clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [count, navigate, location, path]);
  return (
    <>
       <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h1 className="Text-center">redirecting to you in {count} second </h1>
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
         </div>
      </div>
    </>
  );  
};

export default Spinner;