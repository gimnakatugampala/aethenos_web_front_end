import React, { useState } from "react";
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

const CourseMessages = () => {
  const [val, setval] = useState("");

  const handleClick = (e) => {
    console.log("click ", e);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="col-md-8">
      <Card className="py-2 my-2">

      <div className='d-flex justify-content-between'>
        <Typography className="p-3" variant="h4">
          Course Messages
        </Typography>

        <ButtonMaterial variant="contained"><AddIcon /> SAVE</ButtonMaterial>
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

          <Space direction="vertical" size="middle">
            <Typography variant="h6">Welcome Message</Typography>
            <RichTextEditor />
            <br />
            <Typography variant="h6">Congratulations Message</Typography>
            <RichTextEditor />
          </Space>
        </div>
      </Card>
    </div>
  );
};

export default CourseMessages;
