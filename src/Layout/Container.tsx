import { Layout, theme } from "antd";
import { Content } from "antd/es/layout/layout";
import { useState } from "react";
import FooterComponent from "./Footer";
import HeaderComponent from "./Header";
import Sidebar from "./Sidebar";
import React from "react";

function ContainerComponent(props: any) {
  const { children } = props;

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout hasSider>
      <Layout style={{ height: "100%" }}>
        <div>{children}</div>
      </Layout>
    </Layout>
  );
}

export default ContainerComponent;
