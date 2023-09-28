import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ModeCommentTwoToneIcon from '@mui/icons-material/ModeCommentTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReviewCommentBox from './ReviewCommentBox';

const GridContainer = styled('div')({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)', // Three columns in each row
  gridGap: '16px', // Adjust as needed
  maxWidth: '900px', // Adjust the total width as needed
  margin: '0 auto', // Center the grid
});

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
  onClick: () => void; // Add an onClick prop
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(Array(6).fill(false)); // Initialize an array of expanded states

  const handleExpandClick = (index) => {
    // Update the expanded state for the clicked card
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <GridContainer>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} sx={{ maxWidth: 300 }}> {/* Adjust the card width */}
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                D
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title="Doro Onome Churchill"
            subheader="nomzykush@gmail.com"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Front-end developer and Technical writer with keen attention to detail and a passion for delivering content as interactive as it is educational.
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <ExpandMore
              expand={expanded[index]} // Use the expanded state for the current card
              onClick={() => handleExpandClick(index)} // Pass the index to the click handler
              aria-expanded={expanded[index]}
              aria-label="show more"
            >
              <ModeCommentTwoToneIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
            <CardContent>
              <ReviewCommentBox />
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </GridContainer>
  );
}
