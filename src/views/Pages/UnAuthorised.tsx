import { Button, Result } from "antd";
import React from "react";
import { Navigate, NavLink } from "react-router-dom";
// import { useAppState } from "../context";

const UnAuthorizedAccess = () => {
  //   const { isLoggedIn, getLatestToken } = useAppState("auth");
  //   const { accessToken } = getLatestToken();

  //   const validLogin = /* accessToken && isLoggedIn; */
  const validLogin = true;

  return !validLogin ? (
    <Navigate to={"/"} />
  ) : (
    <Result
      status="404"
      title="UnAuthorized Access"
      subTitle="Please visit verified routes only"
      extra={
        <NavLink to="/home">
          <Button type="primary">Home</Button>
        </NavLink>
      }
    />
  );
};
export default UnAuthorizedAccess;
