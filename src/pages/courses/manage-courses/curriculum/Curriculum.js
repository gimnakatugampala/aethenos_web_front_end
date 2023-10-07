import React, { useState } from "react";
import { Input } from "antd";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { CardContent } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { CardActionArea } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import ArticleIcon from "@mui/icons-material/Article";
import "./Curriculum.css";

const Curriculum = () => {
  const [showContentAdd, setshowContentAdd] = useState(false);
  const [curriculumvisiblity, setcurriculumvisiblity] = useState("");

  const handleContentshow = () => setshowContentAdd(!showContentAdd);

  return (
    <div className="col-md-8 curriculum-container">
      <Card className="py-2 my-2 p-4">
        <Typography className="p-3" variant="h4">
          Curriculum
        </Typography>
        <hr />

        {/* Section 1 */}

        <div className="card p-2">
          <CardContent>
            <div className="d-flex justify-content-start section-container">
              <Typography variant="subtitle1">
                <b> Section 1:</b> <FileCopyIcon sx={{ fontSize: 15 }} />{" "}
                Introduction
              </Typography>

              <div className="section-actions">
                <EditIcon fontSize="small" className="mx-1" />
                <DeleteIcon fontSize="small" className="mx-1" />
              </div>
            </div>

            {/* Curriculum List */}
            <div className="my-2">
              <Accordion className="my-3">
                <AccordionSummary
                  className="accordian-header d-flex justify-content-between align-items-center"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>
                    <CheckCircleIcon fontSize="small" /> Lecture 1:{" "}
                    <FileCopyIcon sx={{ fontSize: 15 }} /> Introduction
                  </Typography>

                  <div className="accordian-actions">
                    <EditIcon fontSize="small" />
                    <DeleteIcon fontSize="small" />
                  </div>

                  {showContentAdd ? (
                    <Button
                      onClick={handleContentshow}
                      className="mx-2"
                      size="small"
                      variant="contained"
                    >
                      <CloseIcon /> Cancel
                    </Button>
                  ) : (
                    <Button
                      onClick={handleContentshow}
                      className="mx-2"
                      size="small"
                      variant="outlined"
                    >
                      <AddIcon /> Content
                    </Button>
                  )}
                </AccordionSummary>

                <AccordionDetails>
                  {/* Landing Content */}
                  {curriculumvisiblity == "video" ? (
                    <div>
                      <Button
                        onClick={() => setcurriculumvisiblity("")}
                        variant="outlined"
                      >
                        <CloseIcon /> Cancel
                      </Button>
                    </div>
                  ) : curriculumvisiblity == "slide" ? (
                    <div>
                      <Button
                        onClick={() => setcurriculumvisiblity("")}
                        variant="outlined"
                      >
                        <CloseIcon /> Cancel
                      </Button>
                    </div>
                  ) : curriculumvisiblity == "article" ? (
                    <div>
                      <Button
                        onClick={() => setcurriculumvisiblity("")}
                        variant="outlined"
                      >
                        <CloseIcon /> Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center">
                      <div className="mx-2">
                        <Card sx={{ width: 120 }} elevation={3}>
                          <CardActionArea
                            onClick={() => setcurriculumvisiblity("video")}
                            className="d-flex justify-content-center align-items-center text-center"
                          >
                            <CardContent>
                              <PlayCircleIcon fontSize="large" />

                              <p className="my-2">Video</p>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </div>

                      <div className="mx-2">
                        <Card sx={{ width: 120 }} elevation={3}>
                          <CardActionArea
                            onClick={() => setcurriculumvisiblity("slide")}
                            className="d-flex justify-content-center align-items-center text-center"
                          >
                            <CardContent>
                              <SlideshowIcon fontSize="large" />

                              <p className="my-2">Slide Mashup</p>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </div>

                      <div className="mx-2">
                        <Card sx={{ width: 120 }} elevation={3}>
                          <CardActionArea
                            onClick={() => setcurriculumvisiblity("article")}
                            className="d-flex justify-content-center align-items-center text-center"
                          >
                            <CardContent>
                              <ArticleIcon fontSize="large" />

                              <p className="my-2">Articles</p>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                      </div>
                    </div>
                  )}
                </AccordionDetails>
              </Accordion>

              <Accordion className="my-3">
                <AccordionSummary
                  className="accordian-header d-flex justify-content-between align-items-center"
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel2a-content"
                  id="panel2a-header"
                >
                  <Typography>
                    <CheckCircleIcon fontSize="small" /> Lecture 2:{" "}
                    <FileCopyIcon sx={{ fontSize: 15 }} /> Deep Learning
                  </Typography>

                  <div className="accordian-actions">
                    <EditIcon fontSize="small" />
                    <DeleteIcon fontSize="small" />
                  </div>

                  {showContentAdd ? (
                    <Button className="mx-2" size="small" variant="contained">
                      <CloseIcon /> Cancel
                    </Button>
                  ) : (
                    <Button className="mx-2" size="small" variant="outlined">
                      <AddIcon /> Content
                    </Button>
                  )}
                </AccordionSummary>

                <AccordionDetails>
                  <Typography>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Suspendisse malesuada lacus ex, sit amet blandit leo
                    lobortis eget.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>

            <div className="m-2">
              <Button variant="contained">
                <AddIcon /> Curriculum Item
              </Button>
            </div>
          </CardContent>
        </div>

        <div className="m-2">
          <Button variant="contained">
            <AddIcon /> Section
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Curriculum;
