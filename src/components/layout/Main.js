import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
import "../../assets/styles/main.css";
import { ButtonBase } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from '@mui/icons-material/Menu';

const { Header: AntHeader, Content, Sider } = Layout;

function Main({ children }) {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [sidenavColor, setSidenavColor] = useState("#fffff");
  const [sidenavType, setSidenavType] = useState("transparent");
  const [fixed, setFixed] = useState(true);

  const openDrawer = () => setVisible(visible);
  const handleSidenavType = (type) => setSidenavType(type);
  const handleSidenavColor = (color) => setSidenavColor(color);
  const handleFixedNavbar = (type) => setFixed(type);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer     
        title={false}
        
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement === "right" ? "left" : "right"}
        width={230}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Sider
            trigger={null}
            width={230}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav color={sidenavColor} />
          </Sider>
        </Layout>
      </Drawer>

      <div className="max-width-sider">
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }}
          trigger={null}
          width={230}
          theme="light"
          className={`sider-primary ant-layout-sider-primary ${
            sidenavType === "#fff" ? "active-route" : ""
          }`}
          style={{ height: "100%" }}
        >
          <Sidenav color={sidenavColor} />
        </Sider>
      </div>

      <Layout>
        <ButtonBase className="button-left-arrow-header" 
          sx={{
            position: "fixed",
            borderRadius: "10px",
            overflow: "hidden",     
            color: "#ff4d4f",  
            top: "25px",
            left: "18px",       
            zIndex: "999",
            transition: 'background-color 0.3s ease', 
            '&:hover': {
              backgroundColor: '#bfbfbf', 
            },
          }}
        onClick={() => setVisible(true)}
 
        >
          <MenuIcon className="menu-icon" sx={{ fontSize: '30px' }} />
        </ButtonBase>
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        )}

        <div>
          <Content className="content-ant">{children}</Content>
        </div>
        <div className="footer-css">
          <Footer />
        </div>
      </Layout>
    </Layout>
  );
}

export default Main;
