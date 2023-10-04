import React from 'react';
import { Typography, Paper, Container, Box, Button, Grid } from '@mui/material';

function App() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper elevation={0} sx={{ padding: 3, borderRadius: 2, backgroundColor: '#f0f0f0', borderColor: 'red' }}>
          <Typography variant="h6" color="error" gutterBottom>
            DISAPPROVED
          </Typography>
          <Typography variant="body1" gutterBottom>
            This content has been disapproved.
          </Typography>
        </Paper>
      </Box>
      <Box my={4}>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Do you want to publish this Course?
          </Typography>
          <Typography variant="body1">
            By unpublishing, your students won't be able to buy your course.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end">
                <Button variant="contained" color="secondary">
                  Unpublish
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box my={4}>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Do you want to Delete this Course?
          </Typography>
          <Typography variant="body1">
            By deleting, your course will be invisible to everyone, even you.
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Grid container justifyContent="flex-end">
                <Button variant="contained" color="primary">
                  Delete
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
