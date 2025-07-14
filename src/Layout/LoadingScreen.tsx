import { Spin } from "antd";
import React from "react";

const LoadingScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <Spin size="large" />
    </div>
  );
};

export default LoadingScreen;
