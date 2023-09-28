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
  onClick: () => void; // Add an onClick prop
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  return <IconButton {...props} />;
})();

export default function RecipeReviewCard() {
  const [commentBoxes, setCommentBoxes] = React.useState(Array(6).fill(false));

  const toggleCommentBox = (index) => {
    const newCommentBoxes = [...commentBoxes];
    newCommentBoxes[index] = !newCommentBoxes[index];
    setCommentBoxes(newCommentBoxes);
  };

  return (
    <GridContainer>
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} sx={{ maxWidth: 300 }}>
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
              onClick={() => toggleCommentBox(index)}
              aria-label="show more"
            >
              <ModeCommentTwoToneIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={commentBoxes[index]} timeout="auto" unmountOnExit>
            <CardContent sx={{ maxHeight: '200px', overflowY: 'auto' }}>
              {/* Increase maxHeight and add overflowY */}
              <ReviewCommentBox />
            </CardContent>
          </Collapse>
        </Card>
      ))}
    </GridContainer>
  );
}
