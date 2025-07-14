import { Layout, theme } from "antd";
import React from "react";

const { Footer } = Layout;

function FooterComponent() {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Footer
      style={{
        textAlign: "center",
        position: "fixed",
        background: colorBgContainer,
        bottom: 0,
        zIndex: 1,
        width: "100%",
        padding: "0.5rem",
      }}
    >
      Copyright ©{new Date().getFullYear()} | Powered by Chirag Patel.
    </Footer>
  );
}

export default FooterComponent;
