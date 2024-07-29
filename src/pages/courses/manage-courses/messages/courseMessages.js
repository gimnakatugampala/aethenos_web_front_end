import React, { useEffect, useState } from "react";
import { Space } from "antd";
import Typography from "@mui/material/Typography";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SettingsIcon from "@mui/icons-material/Settings";
import "./courseMessages.css";
import { Layout, Menu, Col, Row, Button, Card, Select } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { Input } from "antd";
import RichTextEditor from "../../../../components/RichTextEditor";
import AddIcon from "@mui/icons-material/Add";
import ButtonMaterial from '@mui/material/Button';
import JoditEditor from "jodit-react";
import ErrorAlert from "../../../../commonFunctions/Alerts/ErrorAlert";
import { AddCourseMessages , GetCourseMessages } from "../../../../api";
import ButtonSpinner from "../../../../commonFunctions/loaders/Spinner/ButtonSpinner";


const { TextArea } = Input;
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
// const { Text, Link , Title } = Typography;

const headerStyle = {
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#000",
};

const CourseMessages = ({code}) => {

  const [val, setval] = useState("");

  const [welcomemsg, setwelcomemsg] = useState("")
  const [congratsmsg, setcongratsmsg] = useState("")
  const [loading_btn, setloading_btn] = useState(false)

  const handleClick = () =>{

    if(congratsmsg == "<p><br></p>"){
      ErrorAlert("Empty Field","Please Enter a Congratulations Message")
      return
    }else if(welcomemsg == "<p><br></p>"){
      ErrorAlert("Empty Field","Please Enter a Welcome Message")
      return
    }

    AddCourseMessages(code,congratsmsg,welcomemsg,setloading_btn)

  }

  useEffect(() => {
    GetCourseMessages(code,setcongratsmsg,setwelcomemsg)
  }, [])
  
  
  return (
    <div className="col-md-10 px-4 mb-4">
      <Card className="py-2 my-2">

      <div className='d-flex justify-content-between'>
        <Typography className="p-3" variant="h4">
          Course Messages
        </Typography>
        {loading_btn ? <ButtonMaterial  variant="contained"> <ButtonSpinner /> </ButtonMaterial> : <ButtonMaterial onClick={handleClick} variant="contained"><AddIcon /> SAVE</ButtonMaterial>}
        
        </div>
        <hr />

        <div className="pricing-container">
          <div className="pricing-header">
            <p>
              Write messages to your students (optional) that will be sent
              automatically when they join or complete your course to encourage
              students to engage with course content. If you do not wish to send
              a welcome or congratulations message, leave the text box blank.
            </p>
          </div>


          <br />
          <br />

          <Space direction="vertical" size="middle" style={{width: "100%"}}>
            <Typography variant="h6">Welcome Message</Typography>
            <JoditEditor value={welcomemsg} onChange={(value) => setwelcomemsg(value)} />
            <br />
            <Typography variant="h6">Congratulations Message</Typography>
            <JoditEditor value={congratsmsg} onChange={(value) => setcongratsmsg(value)} />
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default CourseMessages;
