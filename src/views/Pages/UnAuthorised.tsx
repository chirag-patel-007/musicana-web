import { Button, Result } from "antd";
import { Navigate, NavLink } from "react-router-dom";

const UnAuthorizedAccess = () => {
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
