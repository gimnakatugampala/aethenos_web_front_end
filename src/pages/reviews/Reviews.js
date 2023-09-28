import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ModeCommentTwoToneIcon from '@mui/icons-material/ModeCommentTwoTone';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ReviewCommentBox from './ReviewCommentBox';
import Rating from '@mui/material/Rating';

const CardContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: '16px',
  width: '100%', // Cards take the full width of the parent container
  maxWidth: '100%',
});

const cardData = [
  {
    name: 'John Doe',
    email: 'johndoe@gmail.com',
    rating: 5,
    description: 'Web developer with a passion for clean code.',
  },
  {
    name: 'Alice Smith',
    email: 'alicesmith@gmail.com',
    rating: 4,
    description: 'Front-end developer and UI/UX enthusiast.',
  },
  {
    name: 'Bob Johnson',
    email: 'bobjohnson@gmail.com',
    rating: 3,
    description: 'Full-stack developer with experience in Node.js.',
  },
  {
    name: 'Emma Wilson',
    email: 'emmawilson@gmail.com',
    rating: 5,
    description: 'Tech blogger and JavaScript enthusiast.',
  },
];

export default function RecipeReviewCard() {
  const [expanded, setExpanded] = React.useState(Array(4).fill(false));

  const handleExpandClick = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  return (
    <CardContainer>
      {cardData.map((card, index) => (
        <Card key={index}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                {card.name.charAt(0)}
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={card.name}
            subheader={
              <>
                {card.email}
                <br />
                <Rating
                  name={`rating-${index}`}
                  value={card.rating}
                  readOnly
                />
              </>
            }
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {card.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton
              onClick={() => handleExpandClick(index)}
              aria-label="show more"
            >
              <ModeCommentTwoToneIcon />
            </IconButton>
          </CardActions>
          <Collapse in={expanded[index]} timeout="auto" unmountOnExit>
            <CardContent sx={{ maxHeight: '200px', overflowY: 'auto' }}>
              <ReviewCommentBox />
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </CardContainer>
  );
}
