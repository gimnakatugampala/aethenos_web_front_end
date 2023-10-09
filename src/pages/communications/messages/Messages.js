import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
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
    <Card>
      <div className="container">
        <div className="row">
          <p className="fs-5 font-bold text-black">Messages</p>
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
              <Button className="btn btn-outline-primary btn-light float-end mt-2 mb-0">
                Compose
              </Button>
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
        <Card>
          <Container fluid>
            <Row className="vh-100">
              <Col sm={4} md={4} lg={3} className="bg-light border-right">
                <h3 className="p-3">Chat Users</h3>
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search Chat Users"
                    aria-label="Search Chat Users"
                    onChange={(e) => setUserFilter(e.target.value)}
                    value={userFilter}
                  />
                  <span className="input-group-text">
                    <SearchIcon />
                  </span>
                </div>
                <ul className="list-group">
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
                </ul>
              </Col>
              <Col sm={8} md={8} lg={9}>
                <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                  <h4>Chat with {selectedUser}</h4>
                  <button className="btn btn-danger">Logout</button>
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
                  <Button variant="primary" onClick={handleMessageSend}>
                    <SendIcon />
                  </Button>
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </Card>
      </div>
    </Card>
  );
}

export default Messages;
