import { Layout } from "antd";
import { useState } from "react";
import Sidebar from "./Sidebar";
import React from "react";

function ContainerComponent(props: any) {
  const { children } = props;

  const [collapsed] = useState(false);

  return (
    <Layout hasSider>
       <Sidebar collapsed={collapsed} />
      <Layout style={{ height: "100%" }}>
        <div>
          {children}
        </div>
      </Layout>
    </Layout>
  );
}

export default ContainerComponent;
