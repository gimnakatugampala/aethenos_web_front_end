import React from 'react';
import { Typography, Button, Paper, Container, Box, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';

function App() {
  return (
    <Container maxWidth="md">
      <Box my={4}>
        <Paper elevation={3} sx={{ padding: 3, borderRadius: 2 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Settings
          </Typography>
          <Typography variant="h6" color="error" align="center" gutterBottom>
            DISAPPROVED
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            This content has been disapproved.
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<DeleteIcon />}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                startIcon={<PublishIcon />}
              >
                Unpublish
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
