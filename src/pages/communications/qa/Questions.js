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

const messages = [
  {
    id: 1,
    primary: "Brunch this week?",
    secondary:
      "I'll be in the neighbourhood this week. Let's grab a bite to eat",
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 2,
    primary: "Birthday Gift",
    secondary: `Do you have a suggestion for a good present for John on his work
      anniversary. I am really confused & would love your thoughts on it.`,
    person: "/static/images/avatar/1.jpg",
  },
  {
    id: 3,
    primary: "Recipe to try",
    secondary:
      "I am try out this new BBQ recipe, I think this might be amazing",
    person: "/static/images/avatar/2.jpg",
  },
  {
    id: 4,
    primary: "Yes!",
    secondary: "I have the tickets to the ReactConf for this year.",
    person: "/static/images/avatar/3.jpg",
  },
  {
    id: 5,
    primary: "Doctor's Appointment",
    secondary:
      "My appointment for the doctor was rescheduled for next Saturday.",
    person: "/static/images/avatar/4.jpg",
  },
  {
    id: 6,
    primary: "Discussion",
    secondary: `Menus that are generated by the bottom app bar (such as a bottom
      navigation drawer or overflow menu) open as bottom sheets at a higher elevation
      than the bar.`,
    person: "/static/images/avatar/5.jpg",
  },
  {
    id: 7,
    primary: "Summer BBQ",
    secondary: `Who wants to have a cookout this weekend? I just got some furniture
      for my backyard and would love to fire up the grill.`,
    person: "/static/images/avatar/1.jpg",
  },
];

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

export default function Questions() {
  const [searchKeyword, setSearchKeyword] = React.useState("");
  const [filteredMessages, setFilteredMessages] = React.useState(messages);

  // Function to filter messages based on the search keyword
  const filterMessages = () => {
    const filtered = messages.filter(
      (message) =>
        message.primary.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        message.secondary.toLowerCase().includes(searchKeyword.toLowerCase())
    );
    setFilteredMessages(filtered);
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  // Call filterMessages whenever searchKeyword changes
  React.useEffect(() => {
    filterMessages();
  }, [searchKeyword]);

  return (
    <React.Fragment>
      <CssBaseline />
      <div class="input-group" style={{ padding: "8px" }}>
        <input
          type="text"
          class="form-control form-control-sm"
          placeholder="Search by Keyword"
          value={searchKeyword}
          onChange={handleSearchChange}
        />
        <div class="input-group-append">
          <button class="btn btn-primary" type="button">
            <i class="fas fa-search"></i>
          </button>
        </div>
      </div>
      <Paper square sx={{ height: "500px", overflow: "auto", pb: "50px" }}>
        <List sx={{ mb: 2 }}>
          {filteredMessages.map(({ id, primary, secondary, person }) => (
            <React.Fragment key={id}>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar alt="Profile Picture" src={person} />
                </ListItemAvatar>
                <ListItemText primary={primary} secondary={secondary} />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}
