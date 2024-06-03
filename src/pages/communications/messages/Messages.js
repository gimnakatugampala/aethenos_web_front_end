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
import { MessageBox } from 'react-chat-elements'

import 'react-chat-elements/dist/main.css'
import './Messages.css'
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
  const [showAddMessage, setshowAddMessage] = useState(true)
  const [messages, setMessages] = useState(initialMessages[selectedUser]);
  const [messageText, setMessageText] = useState("");
  const [userFilter, setUserFilter] = useState("");

  const [instructors, setinstructors] = useState([])
  const [selectedInstructor, setselectedInstructor] = useState("")
  const [selectedCourse, setselectedCourse] = useState("")
  const [messageTextAdd, setmessageTextAdd] = useState("")

  const [roomMessages, setroomMessages] = useState([])

  const [selectedChatCode, setselectedChatCode] = useState("")
  const [chatRooms, setchatRooms] = useState([])

  const [selectedStudentCode, setselectedStudentCode] = useState("")


  const handleUserClick = (user) => {
    setSelectedUser(user.student);
    // setMessages(initialMessages[user]);
    console.log(user)
    setselectedCourse(user.courseCode)
    setselectedChatCode(user.chatRoomCode)
    setselectedInstructor(user.student)
    setselectedStudentCode(user.studentUserCode)
    GetAllChatRoomMessages(user.chatRoomCode,setroomMessages)
  };


useEffect(() => {
 
  GetAllChatRoomMessages(selectedChatCode,setroomMessages)
},[])



useEffect(() => {
    GetAllInstructorsofThePurchaseMsg(setinstructors)
    GetAllChatRooms(setchatRooms)
    console.log(chatRooms)
  }, [selectedChatCode])

  useEffect(() => {

    setTimeout(() => {
      GetAllChatRoomMessages(selectedChatCode,setroomMessages)
    }, 1500);

  }, [selectedChatCode,messageTextAdd])

  


  // Compose Message
  const handleComposeMessage = (e) =>{
    e.preventDefault();
    console.log(selectedInstructor)
    console.log(messageTextAdd)

    if(selectedInstructor == ""){
      ErrorAlert("Empty Field","Please Select Instructor")
      return
    }

    if(messageTextAdd == ""){
      ErrorAlert("Empty Field","Please Enter Message")
      return
    }

    AddSendMessage(selectedInstructor,messageTextAdd,selectedCourse,selectedChatCode,setmessageTextAdd,GetAllChatRooms,setchatRooms)
    
  }


  // Send Message
  const handleSelectedMessageSend = (e) =>{
    e.preventDefault();

    if(selectedStudentCode == ""){
      ErrorAlert("Empty Field","Please Select Student")
      return
    }

    if(messageTextAdd == ""){
      ErrorAlert("Empty Field","Please Enter Message")
      return
    }


    AddSendMessage(selectedStudentCode,messageTextAdd,selectedCourse,selectedChatCode,setmessageTextAdd,GetAllChatRooms,setchatRooms)

   
  }
  
  

  return (
    
      <div className="container">
        <div  className="row">

        
             <Typography className="mb-4" variant="h4" gutterBottom>
               Messages
            </Typography>
 

          {/* <div className="col-3">
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
              <Button onClick={() => setshowAddMessage(true)}  className="my-2" variant="contained">Compose</Button>
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
          </div> */}
        </div>
        

        <Card className="p-3">
          <Container fluid>
            <Row  className="vh-130">

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
                        console.log(user);
                        handleUserClick(user)
                      }}
                      alignItems="flex-start"
                    >
                      <ListItemButton selected={selectedUser == user.student && selectedChatCode ==  user.chatRoomCode  ? true : false}>
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
                                <b>{user.student}</b> ({user.courseTitle})
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
                {selectedUser != "" ? (
                  <>
                  <div className="d-flex justify-content-between align-items-center p-3 bg-light border-bottom">
                  <Typography variant="h5" className="p-3" gutterBottom>
                  Chat with <b>{selectedUser}</b>
                  </Typography>

                  </div>

                  <Paper elevation={3} className="p-3" style={{ height: "50vh", overflowY: "scroll", background: '#D5D8DC' }}>
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
                    </Paper>



                  <form onSubmit={handleSelectedMessageSend} className="input-group p-2">
                    <textarea value={messageTextAdd} onChange={(e) => setmessageTextAdd(e.target.value)} placeholder="Type a Message" className="form-control" aria-label="With textarea"></textarea>
                      <Button type="submit" variant="contained"><SendIcon /></Button>
                  </form>

                  </>
                ) : 
                (
                  <Paper elevation={3} className="p-3 d-flex justify-content-center align-items-center" style={{ minHeight: "70vh", overflowY: "auto", background:'#D5D8DC' }}>
                  
                    <div className="text-center">
                      <i className="fas fa-search fa-2x p-3"></i>
                      <h3 className="m-0">Chat With Students</h3>
                    </div>
                  
                </Paper>
                )}

                </Col>
             

            </Row>
           

          </Container>
        </Card>
      </div>

  );
}

export default Messages;
