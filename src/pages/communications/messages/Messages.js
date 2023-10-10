import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Button from '@mui/material/Button';

import {
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Card,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SearchIcon from "@mui/icons-material/Search";
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItemButton from '@mui/material/ListItemButton';

function Messages() {
  const initialMessages = {
    User1: [
      {
        sender: "User1",
        text: "Hello!",
      },
      {
        sender: "You",
        text: "Hi, how are you?",
      },
      {
        sender: "User1",
        text: "I am good, thanks!",
      },
    ],
    User2: [
      {
        sender: "User2",
        text: "Hey there!",
      },
      {
        sender: "You",
        text: "Hello!",
      },
    ],
    User3: [
      {
        sender: "User3",
        text: "Hi!",
      },
    ],
  };

  const [selectedUser, setSelectedUser] = useState("User1");
  const [messages, setMessages] = useState(initialMessages[selectedUser]);
  const [messageText, setMessageText] = useState("");
  const [userFilter, setUserFilter] = useState("");

  const handleMessageSend = () => {
    if (messageText.trim() === "") return;

    const newMessage = {
      text: messageText,
      sender: "You",
    };

    setMessages([...messages, newMessage]);
    setMessageText("");
  };

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setMessages(initialMessages[user]);
  };

  const filteredUsers = Object.keys(initialMessages).filter((user) =>
    user.toLowerCase().includes(userFilter.toLowerCase())
  );

  return (
    
      <div className="container">
        <div className="row">

        {/* <div className="col-md-2"> */}
             <Typography variant="h4" gutterBottom>
             Messages
            </Typography>
        {/* </div> */}

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
                control={<Checkbox />}
                label={<span className="fs-7">No top answer</span>}
              />
            </FormGroup>
          </div>
          <div className="col-3">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label={<span className="fs-6">No answers</span>}
              />
            </FormGroup>
          </div>
          <div className="col-3">
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label={<span className="fs-8">No instructor answer</span>}
              />
              <Button className="my-2" variant="contained">Compose</Button>
            </FormGroup>
          </div>
          <div className="col-3 mb-4">
            <select className="form-select fs-6 mt-3">
              <option value="newestToOldest">Newest to Oldest</option>
              <option value="oldestToNewest">Oldest to Newest</option>
              <option value="priceLowToHigh">Price: Low to High</option>
              <option value="priceHighToLow">Price: High to Low</option>
              <option value="ratingHighToLow">Rating: High to Low</option>
            </select>
          </div>
        </div>
        

        <Card className="p-3">
          <Container fluid>
            <Row className="vh-100">

              <Col sm={5} md={5} lg={4} className="bg-light border-right">

                 <Typography className="p-3" variant="h5" gutterBottom>
                 Chat Users
               </Typography>

                {/* <h3 className="p-3">Chat Users</h3> */}
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Chat Users"
                    aria-label="Search Chat Users"
                    onChange={(e) => setUserFilter(e.target.value)}
                    value={userFilter}
                  />
                  <Button variant="contained"><SearchIcon /></Button>
                </div>

                <List sx={{ width: '100%'}}>
                {filteredUsers.map((user) => (
                  <>
                      <ListItem onClick={() => handleUserClick(user)} key={user} alignItems="flex-start">
                        <ListItemButton selected={selectedUser === user ? true : false}>
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                          primary={user}
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                Ali Connors
                              </Typography>
                              {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                          }
                        />
                        </ListItemButton>
                      </ListItem>
                    <Divider variant="inset" component="li" /> 
                    </>
                ))}



              
                    </List>

                {/*  List Group Now */}
                {/* <ul className="list-group">
                  {filteredUsers.map((user) => (
                    <li
                      key={user}
                      className={`list-group-item ${
                        selectedUser === user ? "active" : ""
                      }`}
                      onClick={() => handleUserClick(user)}
                    >
                      {user}
                    </li>
                  ))}
                </ul> */}

              </Col>

              <Col sm={7} md={7} lg={8}>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                <Typography variant="h5" gutterBottom>
                Chat with <b>{selectedUser}</b>
               </Typography>

                </div>
                <Paper
                  elevation={3}
                  className="p-3"
                  style={{ minHeight: "70vh", overflowY: "auto" }}
                >
                  <List>
                    {messages.map((message, index) => (
                      <ListItem
                        key={index}
                        alignItems={
                          message.sender === "You" ? "flex-end" : "flex-start"
                        }
                      >
                        <ListItemAvatar>
                          <Avatar
                            alt={message.sender}
                            src="/static/images/avatar/1.jpg"
                          />
                        </ListItemAvatar>
                        <ListItemText
                          primary={message.sender}
                          secondary={message.text}
                          primaryTypographyProps={{
                            sx: {
                              fontWeight: "bold",
                              color:
                                message.sender === "You"
                                  ? "primary.main"
                                  : "secondary.main",
                            },
                          }}
                          secondaryTypographyProps={{
                            sx: {
                              fontWeight: "normal",
                              backgroundColor:
                                message.sender === "You"
                                  ? "primary.light"
                                  : "secondary.light",
                              borderRadius: "10px",
                              padding: "10px",
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
                <InputGroup className="p-3">
                  <FormControl
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") handleMessageSend();
                    }}
                  />
                    <Button variant="contained" onClick={handleMessageSend}>
                    <SendIcon />
                  </Button>
                </InputGroup>
              </Col>

            </Row>
          </Container>
        </Card>
      </div>

  );
}

export default Messages;
