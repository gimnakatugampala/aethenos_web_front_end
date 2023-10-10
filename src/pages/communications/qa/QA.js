import React from "react";
import ScrollBarPage from "./ScrollBarPage";
import "./QA.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Questions from "./Questions";
import Button from '@mui/material/Button';
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


const QA = () => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2">
             <Typography variant="h4" gutterBottom>
             Q&A
            </Typography>
        </div>

        <div className="col-md-2">

        <FormControl fullWidth>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>All Courses</option>
          <option value={20}>Learn Photshop</option>
          <option value={30}>Software Evelopment</option>
        </NativeSelect>
      </FormControl>

        </div>

      </div>
      <div className="container">
        <div className="row">
          <div className="col-3">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Unread"
              />
            </FormGroup>
          </div>
          <div className="col-3">
            <FormGroup>
              <FormControlLabel
                Notopanswer
                control={<Checkbox />}
                label={<span className="fs-7">No top answer</span>}
              />
            </FormGroup>
          </div>
          <div className="col-3">
            <FormGroup>
              <FormControlLabel
                noAnswer
                control={<Checkbox />}
                label={<span className="fs-6">No answers</span>}
              />
            </FormGroup>
          </div>
          <div className="col-3">
            <FormGroup>
              <FormControlLabel
                noIinstructorAnswer
                control={<Checkbox />}
                label={<span className="fs-8">No instructor answer</span>}
              />
            </FormGroup>
          </div>
          <div className="col-3 my-4">
          <FormControl fullWidth>
        <NativeSelect
          defaultValue={10}
          inputProps={{
            name: 'age',
            id: 'uncontrolled-native',
          }}
        >
          <option value={10}>Newest to Oldest</option>
          <option value={20}>Oldest to Newest</option>
          <option value={30}>Price: Low to High</option>
          <option value={40}>Price: High to Low</option>
          <option value={50}>Rating: High to Low</option>
        </NativeSelect>
      </FormControl>

          </div>
        </div>
      </div>

      <Card>
        <div className="row">
          <div className="col-md-4">
            <Questions />
          </div>
          <div className="col-md-8">
            <ScrollBarPage />
            <InputGroup className="mb-3">
              <Form.Control
                placeholder="Post a public answer"
                aria-label="Post a public answer"
                aria-describedby="basic-addon2"
              />
              <div className="col-2">
                <Button
                  variant="contained"
                  className="w-90"
                >
                  Publish
                </Button>
              </div>
            </InputGroup>
          </div>
        </div>
      </Card>
    </div>
  );
};
export default QA;
