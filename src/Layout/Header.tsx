/* eslint-disable @typescript-eslint/no-unused-expressions */
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme } from "antd";
import {  useRef, useState } from "react";
import { NavLink } from "react-router";

import React from "react";

const { Header } = Layout;
function HeaderComponent(props: any) {
  const { collapsed, setCollapsed } = props;
  const [isOpen, setIsOpen] = useState(false);
  const actionsRef = useRef<HTMLDivElement | null>(null);

  // const { data, error, isLoading, refetch } = useGetProfileQuery();
  // debugger
  // console.log("data, error, isLoading ", data, error, isLoading);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const onLogout = () => {
    console.log("onLogout");
    // persistor.purge();
    // dispatch(logout());
    window.dispatchEvent(new Event("logout")); // Dispatch event
  };

  // useEffect(() => {
  //   refetch();
  // }, []);
  return (
    <Header
      style={{
        padding: 30,
        background: colorBgContainer,
        position: "sticky",
        top: 0,
        zIndex: 1,
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <div className="h-10 flex items-center justify-end w-full">
        <UserOutlined
          onClick={() => setIsOpen((prev) => !prev)}
          alt={"ProfileIcon"}
          className="w-[35px] h-[35px] rounded-full cursor-pointer "
        />
      </div>
      <div className="relative inline-block text-left" ref={actionsRef}>
        <div>
          <div
            className={`${
              isOpen ? `block` : `hidden`
            } absolute right-[-26px] z-10 mt-5 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-indigo-600 ring-opacity-5 focus:outline-none`}
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabIndex={-1}
          >
            <div className="py-1" role="none">
              <NavLink
                to="/profile"
                className="!text-primary px-4 py-2 text-sm flex justify-between"
                onClick={() => setIsOpen(false)}
              >
                My Profile
                <EditOutlined
                  className="-mr-1 h-5 w-5 text-gray-400 -rotate-90"
                  alt=""
                />
              </NavLink>
              <div className="p-2">
                <div onClick={() => onLogout()}>
                  <Button
                    type="primary"
                    className="w-full focus:outline-none text-white bg-[#00A48B] font-medium rounded-lg text-sm px-5 py-2.5"
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-3"
                  >
                    Logout
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Header>
  );
}

export default HeaderComponent;
