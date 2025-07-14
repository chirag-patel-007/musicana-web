import { Button } from "antd";
import React from "react";
import { NavLink } from "react-router-dom";

const PageNotFound = () => {
  return (
    // <Layout>
    <div>
      <div className="flex gap-5 w-full mt-5 items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-y-8">
          <h1>Page Not Found</h1>
          <NavLink to="/">
            <Button>Home</Button>
          </NavLink>
        </div>
      </div>
    </div>
    // </Layout>
  );
};

export default PageNotFound;
