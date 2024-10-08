import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import Button from '@mui/material/Button';
import Form from 'react-bootstrap/Form';
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
import { MessageBox } from 'react-chat-elements';

import 'react-chat-elements/dist/main.css';
import './Messages.css';
import { AddSendMessage, GetAllChatRoomMessages, GetAllChatRooms, GetAllInstructorsofThePurchaseMsg } from "../../../api";
import ErrorAlert from "../../../commonFunctions/Alerts/ErrorAlert";

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

  const [selectedUser, setSelectedUser] = useState("");
  const [showAddMessage, setshowAddMessage] = useState(true);
  const [messages, setMessages] = useState(initialMessages[selectedUser]);
  const [messageText, setMessageText] = useState("");
  const [userFilter, setUserFilter] = useState("");

  const [instructors, setinstructors] = useState([]);
  const [selectedInstructor, setselectedInstructor] = useState("");
  const [selectedCourse, setselectedCourse] = useState("");
  const [messageTextAdd, setmessageTextAdd] = useState("");

  const [roomMessages, setroomMessages] = useState([]);

  const [selectedChatCode, setselectedChatCode] = useState("");
  const [chatRooms, setchatRooms] = useState([]);

  const [selectedStudentCode, setselectedStudentCode] = useState("");

  const [loadingMessages, setLoadingMessages] = useState(false);

  const handleUserClick = (user) => {
    setSelectedUser(user.student);
    setselectedCourse(user.courseCode);
    setselectedChatCode(user.chatRoomCode);
    setselectedInstructor(user.student);
    setselectedStudentCode(user.studentUserCode);

    // Clear current messages and set loading state
    setroomMessages([]);
    setLoadingMessages(true);

    GetAllChatRoomMessages(user.chatRoomCode, (messages) => {
      setroomMessages(messages);
      setLoadingMessages(false); // Stop loading when messages are loaded
    });
  };

  // Poll for new messages every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (selectedChatCode) {
        GetAllChatRoomMessages(selectedChatCode, setroomMessages);
      }
    }, 3000); // Adjust the polling interval as needed

    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [selectedChatCode]);

  useEffect(() => {
    GetAllInstructorsofThePurchaseMsg(setinstructors);
    GetAllChatRooms(setchatRooms);
  }, []);

  // Compose Message
  const handleComposeMessage = (e) => {
    e.preventDefault();
    if (selectedInstructor === "") {
      ErrorAlert("Empty Field", "Please Select Instructor");
      return;
    }

    if (messageTextAdd === "") {
      ErrorAlert("Empty Field", "Please Enter Message");
      return;
    }

    AddSendMessage(selectedInstructor, messageTextAdd, selectedCourse, selectedChatCode, setmessageTextAdd, GetAllChatRooms, setchatRooms);
  };

  // Send Message
  const handleSelectedMessageSend = (e) => {
    e.preventDefault();

    if (selectedStudentCode === "") {
      ErrorAlert("Empty Field", "Please Select Student");
      return;
    }

    if (messageTextAdd === "") {
      ErrorAlert("Empty Field", "Please Enter Message");
      return;
    }

    AddSendMessage(selectedStudentCode, messageTextAdd, selectedCourse, selectedChatCode, setmessageTextAdd, GetAllChatRooms, setchatRooms);
  };

  return (
    <div className="all-courses-container mb-4">
      <div className="row mx-2" style={{ justifyContent: "space-between" }}>
        <Typography className="mb-4 " variant="h4" gutterBottom>
          Messages
        </Typography>
      </div>

      <Card className="border-rad-20 mb-4">
        <div className="outer-shadow-box m-3">
          <Row className="vh-130">
            <Col sm={5} md={5} lg={4} className="bg-light border-right">
              <Typography className="p-3 d-flex justify-content-between" variant="h5" gutterBottom>
                Chat Users
              </Typography>

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

              <List sx={{ width: '100%' }}>
                {chatRooms.length > 0 ? chatRooms.map((user, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      onClick={() => {
                        setshowAddMessage(false);
                        handleUserClick(user);
                      }}
                      alignItems="flex-start"
                    >
                      <ListItemButton selected={selectedUser === user.student && selectedChatCode === user.chatRoomCode}>
                        <ListItemAvatar>
                          <Avatar alt={user.student} src="/static/images/avatar/1.jpg" />
                        </ListItemAvatar>
                        <ListItemText
                          secondary={
                            <React.Fragment>
                              <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                <b>{user.student}</b> <span className="mx-1"> ({user.courseTitle}) </span>
                              </Typography>
                              {user.lastMessage.length > 15 ? (
                                <span>{user.lastMessage.substring(0, 15)}...</span>
                              ) : (
                                user.lastMessage
                              )}
                            </React.Fragment>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                  </React.Fragment>
                )) :
                  <div className="d-flex justify-content-center align-items-center text-center">
                    <h5 className="d-flex justify-content-center align-items-center text-center">No Chats Found</h5>
                  </div>}
              </List>
            </Col>

            <Col sm={7} md={7} lg={8}>
              {selectedUser !== "" ? (
                <>
                  <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                    <Typography variant="h5" className="p-3" gutterBottom>
                      Chat with <b>{selectedUser}</b>
                    </Typography>
                  </div>

                  <Paper elevation={3} className="p-3" style={{ height: "50vh", overflowY: "scroll", background: '#D5D8DC' }}>
                    {loadingMessages ? (
                      <div className="d-flex justify-content-center align-items-center">
                        <span>Loading...</span>
                      </div>
                    ) : (
                      <List>
                        {roomMessages.map((message, index) => (
                          <MessageBox
                            key={index}
                            styles={{ width: 300, color: '#000', fontWeight: 'bold', background: message.from === selectedUser ? '#fff' : '#e01D20' }}
                            onReplyMessageClick={() => console.log('reply clicked!')}
                            position={message.from === selectedUser ? 'left' : 'right'}
                            type={'text'}
                            text={message.message}
                          />
                        ))}
                      </List>
                    )}
                  </Paper>

                  <form onSubmit={handleSelectedMessageSend} className="input-group p-2">
                    <textarea value={messageTextAdd} onChange={(e) => setmessageTextAdd(e.target.value)} placeholder="Type a Message" className="form-control" aria-label="With textarea"></textarea>
                    <Button type="submit" variant="contained"><SendIcon /></Button>
                  </form>
                </>
              ) :
                (
                  <Paper elevation={3} className="p-3 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh", overflowY: "auto", background: '#D5D8DC' }}>
                    <div className="text-center">
                      <i className="fas fa-search fa-2x p-3"></i>
                      <h3 className="m-0">Chat with students</h3>
                    </div>
                  </Paper>
                )}
            </Col>
          </Row>
        </div>
      </Card>
    </div>
  );
}

export default Messages;
