import { Layout, Row, Col } from "antd";
import logo from "../../assets/images/utils/aethenos_logo.jpg";
import exonlogo from "../../assets/images/utils/exon_icon1.jpg";

function Footer() {
  const { Footer: AntFooter } = Layout;

  return (
    <AntFooter className="footer-ant" style={{ backgroundColor: "white" }}>
      <Row justify="space-between" align="middle">
        <Col xs={14} md={2} lg={12}>
          <div style={{zIndex: "999", position: "relative", marginLeft: "25px" }}>
            <img width="150" src={logo} alt="LOGO" />
          </div>
        </Col>
        <Col xs={24} md={2} lg={10}>
          <div className="float-right mx-5" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", }}> 

            <div className="float-right">
              <span>
                Copyrights © 2024. <br></br>
                Exon Software Solutions
              </span>
            </div>

            <div className="float-right" style={{ marginLeft: "1%" ,  marginRight: "25px"}}>
              <img width="50" src={exonlogo} alt="LOGO" />
            </div>
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
