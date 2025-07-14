import {
  UserAddOutlined,
  UserOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { Sider } = Layout;
const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};
interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  children?: MenuItem[];
}

function Sidebar(props: any) {
  const { collapsed } = props;
  const navigate = useNavigate();
  const location = useLocation();
  const [current, setCurrent] = useState("");
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const items: MenuItem[] = [
    {
      key: "/home",
      icon: <UserOutlined />,
      label: "Audio",
      onClick: () => navigate("/home"),
    },
    // {
    //   key: "/users",
    //   icon: <UserAddOutlined />,
    //   label: "Users",
    //   onClick: () => navigate("/users"),
    // },

    {
      key: "/tasks",
      icon: <ScheduleOutlined />,
      label: "Tasks ",
      onClick: () => navigate("/tasks"),
    },
  ];

  useEffect(() => {
    const path = location.pathname;
    setCurrent(path);
    // Find the parent key if a submenu is active
    let parentKey = items.find((item) =>
      item.children?.some((child) => child.key === path)
    )?.key;

    if (parentKey === undefined) {
      parentKey = path.split("/").slice(0, 2).join("/");
      setCurrent(parentKey);
    }

    //console.log("parentKey: ", parentKey);
    if (parentKey) {
      setOpenKeys([parentKey]);
    }
  }, [location.pathname]);

  // Handle submenu open/close
  const handleOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
  };

  return (
    <Sider trigger={null} collapsible collapsed={collapsed} style={siderStyle}>
      <div className="flex justify-center items-center p-4">&nbsp;</div>
      <Menu
        theme="dark"
        mode="inline"
        inlineCollapsed={collapsed}
        selectedKeys={[current]}
        openKeys={openKeys}
        onOpenChange={handleOpenChange}
        items={items}
      />
    </Sider>
  );
}

export default Sidebar;
