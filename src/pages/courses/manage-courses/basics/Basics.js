import React from "react";
import "./basics.css";
import { Space } from "antd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { Layout, Menu, Col, Row, Button, Select, Image, Upload } from "antd";
import { Input } from "antd";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import ButtonMaterial from '@mui/material/Button';

const { TextArea } = Input;
const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;

const headerStyle = {
  color: "#fff",
  height: 64,
  paddingInline: 50,
  lineHeight: "64px",
  backgroundColor: "#000",
};

const Basics = () => {
  const onChangeResOne = (e) => {
    document.getElementById("res-1").innerText = 60 - e.target.value.length;
    // console.log('click ', e);
  };

  const onChangeResTwo = (e) => {
    document.getElementById("res-2").innerText = 120 - e.target.value.length;
  };

  const options = [];
  for (let i = 10; i < 36; i++) {
    options.push({
      value: i.toString(36) + i,
      label: i.toString(36) + i,
    });
  }

  const handleClick = (e) => {
    console.log("click ", e);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  return (
    <div className="col-md-8">
      <Card className="py-2 my-2 p-4">

      <div className='d-flex justify-content-between'>
        <Typography className="p-3" variant="h4">
          Course Landing Page
        </Typography>

        <ButtonMaterial variant="contained"><AddIcon /> SAVE</ButtonMaterial>
        </div>

        <hr />

        <p>
          Your course landing page is crucial to your success on Udemy. If it’s
          done right, it can also help you gain visibility in search engines
          like Google. As you complete this section, think about creating a
          compelling Course Landing Page that demonstrates why someone would
          want to enroll in your course. Learn more about creating your course
          landing page and course title standards.
        </p>

        <div className="basics-container">
          <div className="my-3">
            <h6>Course title</h6>
            <div class="input-group mb-3">
              <input
                maxLength={60}
                onChange={onChangeResOne}
                type="text"
                class="form-control"
                placeholder="Course title"
              />
              <span class="input-group-text" id="res-1">
                60
              </span>
            </div>
          </div>

          <div className="my-3">
            <h6>Course subtitle</h6>
            <div class="input-group mb-3">
              <input
                maxLength={60}
                onChange={onChangeResTwo}
                type="text"
                class="form-control"
                placeholder="Insert your course subtitle"
              />
              <span class="input-group-text" id="res-2">
                120
              </span>
            </div>
          </div>

          <div className="my-3">
            <h6>Course description</h6>
            <textarea class="form-control" rows="3"></textarea>
          </div>

          <div className="row my-3">
            <h6>Basic Info</h6>

            <div className="col-md-3">
              <Select
                size="large"
                style={{ width: "100%" }}
                defaultValue="English (UK)"
                onChange={handleChange}
                options={[
                  {
                    value: "South Africa",
                    label: "Afrikaans",
                  },
                  {
                    value: "Haiti",
                    label: "Ayisyen",
                  },
                  {
                    value: "Bolivia",
                    label: "Aymar aru",
                  },
                  {
                    value: "Azerbaijan",
                    label: "Azərbaycan dili",
                  },
                  {
                    value: "Indonesia",
                    label: "Bahasa Indonesia",
                  },
                  {
                    value: "Bangladesh",
                    label: "Bangla",
                  },
                  {
                    value: "Bosnia and Herzegovina",
                    label: "Bosanski",
                  },
                  {
                    value: "Bulgaria",
                    label: "Български",
                  },
                  {
                    value: "Catalonia",
                    label: "Català",
                  },
                  {
                    value: "Cherokee",
                    label: "Cherokee",
                  },
                  {
                    value: "Croatia",
                    label: "Hrvatski",
                  },
                  {
                    value: "Czech Republic",
                    label: "Čeština",
                  },
                  {
                    value: "Denmark",
                    label: "Dansk",
                  },
                  {
                    value: "Netherlands",
                    label: "Nederlands",
                  },
                  {
                    value: "Belgium",
                    label: "Nederlands (België)",
                  },
                  {
                    value: "India",
                    label: "English (India)",
                  },
                  {
                    value: "United Kingdom",
                    label: "English (UK)",
                  },
                  {
                    value: "United States",
                    label: "English (US)",
                  },
                  {
                    value: "Estonia",
                    label: "Eesti",
                  },
                  {
                    value: "Faroe Islands",
                    label: "Føroyskt",
                  },
                  {
                    value: "Philippines",
                    label: "Filipino",
                  },
                  {
                    value: "Finland",
                    label: "Suomi",
                  },
                  {
                    value: "Canada",
                    label: "Français (Canada)",
                  },
                  {
                    value: "France",
                    label: "Français (France)",
                  },
                  {
                    value: "Netherlands",
                    label: "Frysk",
                  },
                  {
                    value: "Galicia",
                    label: "Galego",
                  },
                  {
                    value: "Ireland",
                    label: "Gaeilge",
                  },
                  {
                    value: "Scotland",
                    label: "Gaellge",
                  },
                  {
                    value: "Hungary",
                    label: "Magyar",
                  },
                  {
                    value: "Iceland",
                    label: "Íslenska",
                  },
                  {
                    value: "Indonesia",
                    label: "Bahasa Indonesia",
                  },
                  {
                    value: "Italy",
                    label: "Italiano",
                  },
                  {
                    value: "Japan",
                    label: "日本語",
                  },
                  {
                    value: "Basa Jawa",
                    label: "Basa Jawa",
                  },
                  {
                    value: "India",
                    label: "Kannada",
                  },
                  {
                    value: "Kazakhstan",
                    label: "Казакша",
                  },
                  {
                    value: "Cambodia",
                    label: "Khmer",
                  },
                  {
                    value: "South Korea",
                    label: "한국어",
                  },
                  {
                    value: "Kurdistan",
                    label: "Kurdi",
                  },
                  {
                    value: "Latvia",
                    label: "Latviešu",
                  },
                  {
                    value: "Luxembourg",
                    label: "Lëtzebuergesch",
                  },
                  {
                    value: "Lithuania",
                    label: "Lietuvių",
                  },
                  {
                    value: "Italy",
                    label: "Italiano",
                  },
                  {
                    value: "Japan",
                    label: "日本語",
                  },
                  {
                    value: "Kazakhstan",
                    label: "Казакша",
                  },
                  {
                    value: "Cambodia",
                    label: "Khmer",
                  },
                  {
                    value: "South Korea",
                    label: "한국어",
                  },
                  {
                    value: "Kurdistan",
                    label: "Kurdi",
                  },
                  {
                    value: "Latvia",
                    label: "Latviešu",
                  },
                ]}
              />
            </div>

            <div className="col-md-3">
              <Select
                size="large"
                style={{ width: "100%" }}
                defaultValue="--Select Level--"
                onChange={handleChange}
                options={[
                  {
                    value: "beginner-level",
                    label: "Beginner Level",
                  },
                  {
                    value: "intermediate-level",
                    label: "Intermediate Level",
                  },
                  {
                    value: "expert-level",
                    label: "Expert Level",
                  },
                  {
                    value: "all-level",
                    label: "All Level",
                  },
                ]}
              />
            </div>

            <div className="col-md-3">
              <Select
                size="large"
                style={{ width: "100%" }}
                defaultValue="Development"
                placeholder="Select Course Category"
                allowClear
                onChange={handleChange}
                options={[
                  {
                    value: "development",
                    label: "Development",
                  },
                  {
                    value: "bisiness",
                    label: "Business",
                  },
                  {
                    value: "finance",
                    label: "Finance & Accounting",
                  },
                  {
                    value: "it",
                    label: "IT & Software",
                  },
                  {
                    value: "officep",
                    label: "Office Productivity",
                  },
                  {
                    value: "design",
                    label: "Design",
                  },
                  {
                    value: "marketing",
                    label: "Marketing",
                  },
                  {
                    value: "lifestyle",
                    label: "Lifestyle",
                  },
                  {
                    value: "photography",
                    label: "Photography & Video",
                  },
                  {
                    value: "health",
                    label: "Health & Fitness",
                  },
                  {
                    value: "music",
                    label: "Music",
                  },
                  {
                    value: "teaching",
                    label: "Teaching & Academics",
                  },
                ]}
              />
            </div>

            <div className="col-md-3">
              <Select
                size="large"
                style={{ width: "100%" }}
                defaultValue="--Select Subcategory--"
                placeholder="Select Sub Course Category"
                allowClear
                onChange={handleChange}
                options={[
                  {
                    value: "development",
                    label: "Development",
                  },
                  {
                    value: "bisiness",
                    label: "Business",
                  },
                  {
                    value: "finance",
                    label: "Finance & Accounting",
                  },
                  {
                    value: "it",
                    label: "IT & Software",
                  },
                  {
                    value: "officep",
                    label: "Office Productivity",
                  },
                  {
                    value: "design",
                    label: "Design",
                  },
                  {
                    value: "marketing",
                    label: "Marketing",
                  },
                  {
                    value: "lifestyle",
                    label: "Lifestyle",
                  },
                  {
                    value: "photography",
                    label: "Photography & Video",
                  },
                  {
                    value: "health",
                    label: "Health & Fitness",
                  },
                  {
                    value: "music",
                    label: "Music",
                  },
                  {
                    value: "teaching",
                    label: "Teaching & Academics",
                  },
                ]}
              />
            </div>

            <div className="col-md-12 my-3">
              <h6>What is primarily taught in your course?</h6>
              <Select
                mode="multiple"
                size="large"
                placeholder="Please select"
                defaultValue={["Business Fundermental", "Photograph"]}
                onChange={handleChange}
                style={{
                  width: "100%",
                }}
                options={options}
              />
            </div>
          </div>

          <div className="row my-3">
            <div className="col-md-4">
              <h6>
                <b>Course image</b>
              </h6>
              <Image
                width={200}
                height={200}
                src="error"
                fallback="data:image/png;base64,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"
              />
            </div>

            <div className="col-md-8 d-flex align-items-center">
              <div>
                <p>
                  Upload your course image here. It must meet our course image
                  quality standards to be accepted. Important guidelines:
                  750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the
                  image.
                </p>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  maxCount={1}
                >
                  <Button icon={<AddIcon />}>Upload (Max: 1)</Button>
                </Upload>
              </div>
            </div>
          </div>

          <div className="row my-3">
            <div className="col-md-4">
              <h6>
                <b>Promotional video</b>
              </h6>
              <Image
                width={200}
                height={200}
                src="error"
                fallback="data:image/png;base64,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"
              />
            </div>

            <div className="col-md-8 d-flex align-items-center">
              <div>
                <p>
                  Upload your course image here. It must meet our course image
                  quality standards to be accepted. Important guidelines:
                  750x422 pixels; .jpg, .jpeg,. gif, or .png. no text on the
                  image.
                </p>
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture"
                  maxCount={1}
                >
                  <Button icon={<AddIcon />}>Upload (Max: 1)</Button>
                </Upload>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Basics;
