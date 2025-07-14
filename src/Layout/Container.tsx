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
      <Sidebar collapsed={collapsed} />
      <Layout style={{ height: "100%" }}>
        <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} />
        <div /* className="h-100" */>
          <Content
            style={{
              margin: "16px 16px",
              padding: 16,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              marginBottom: 100,
            }}
          >
            {children}
          </Content>
        </div>
        <FooterComponent />
      </Layout>
    </Layout>
  );
}

export default ContainerComponent;
