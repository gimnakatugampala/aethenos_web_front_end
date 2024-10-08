import { Layout, Row, Col } from "antd";
import logo from "../../assets/images/utils/aethenos_logo.png";
import exonlogo from "../../assets/images/utils/exon_icon1.jpg";

function Footer() {
  const { Footer: AntFooter } = Layout; 

  return (
    <AntFooter className="footer-ant mt-3" style={{ backgroundColor: "white" }}>
      <Row justify="space-between" align="middle">
        <Col xs={14} md={2} lg={12} className="footer-left-logo">
          <div  style={{zIndex: "999", position: "fixed", marginLeft: "25px", float: "left" }}>
            <img style={{marginTop: "10px", marginBottom: "10px"}} width="150" src={logo} alt="LOGO" />
          </div>
        </Col>
        <Col xs={24} md={2} lg={7} className="footer-right-logo">
          <div className="float-right " style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", }}> 

            {/* <div className="float-right">
              <span>
                Copyrights © 2024. <br></br>
                Exon Software Solutions
              </span>
            </div> */}

            {/* <div className="float-right" style={{ marginLeft: "10px" ,  marginRight: "3%"}}>
              <img width="40" src={exonlogo} alt="LOGO" />
            </div> */}
          </div>
        </Col>
      </Row>
    </AntFooter>
  );
}

export default Footer;
