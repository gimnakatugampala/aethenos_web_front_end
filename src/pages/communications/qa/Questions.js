import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Fab from "@mui/material/Fab";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from '@mui/material/Button';
import { Badge } from "@mui/material";

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function Questions({ setanswerContent, questions, setquestionItemContent, setquestionItemCode }) {
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [filteredMessages, setFilteredMessages] = React.useState(questions);

  // Function to filter messages based on the search keyword
  const filterMessages = () => {
    const filtered = questions.filter(
      (message) =>
        message.userName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        message.question.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredMessages(filtered);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  // Call filterMessages whenever searchKeyword or questions change
  React.useEffect(() => {
    filterMessages();
  }, [searchKeyword, questions]);

  // ------------------- Select Question Item  ----------------
  const handleSelectQuestionItem = (questionCode, question, answer) => {
    console.log(questionCode);
    console.log(question);

    setquestionItemCode(questionCode);
    setquestionItemContent(question);
    setanswerContent(answer);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <div className="p-3">
        <InputGroup className="mb-3">
          <Form.Control
            value={searchKeyword}
            onChange={handleSearchChange}
            placeholder="Search by Keyword"
            aria-label="Search by Keyword"
            aria-describedby="basic-addon2"
          />
          <Button variant="contained">
            <i className="fas fa-search"></i>
          </Button>
        </InputGroup>
      </div>
      <Paper square sx={{ height: "505px", overflow: "auto", pb: "50px" }}>
        <List sx={{ mb: 2 }}>
          {filteredMessages.map(({ questionCode, userName, question, isRead, answer }) => (
            <React.Fragment key={questionCode}>
              <ListItem onClick={() => handleSelectQuestionItem(questionCode, question, answer)} button>
                <ListItemAvatar>
                  <Avatar alt={userName} src={"/static/images/avatar/1.jpg"} />
                </ListItemAvatar>
                <ListItemText primary={userName} secondary={question} />
                {isRead === "0" && <Badge invisible={false} variant="dot" color="primary"></Badge>}
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}
