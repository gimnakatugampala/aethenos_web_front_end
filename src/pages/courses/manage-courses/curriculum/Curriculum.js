import React, { useState } from 'react';
import { Container, Button, TextField, Box, TextareaAutosize, Divider } from '@mui/material';

const App = () => {
  const [sectionTitle, setSectionTitle] = useState('');
  const [learningObjectives, setLearningObjectives] = useState('');

  const [lectureTitle, setLectureTitle] = useState('');
  const [quizTitle, setQuizTitle] = useState('');
  const [quizContent, setQuizContent] = useState('');
  const [exerciseTitle, setExerciseTitle] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');

  const handleAddSection = () => {
    // Logic to handle adding section
  };

  const handleAddLecture = () => {
    // Logic to handle adding lecture
  };

  const handleAddQuiz = () => {
    // Logic to handle adding quiz
  };

  const handleAddExercise = () => {
    // Logic to handle adding coding exercise
  };

  const handleAddAssignment = () => {
    // Logic to handle adding assignment
  };

  return (
    <Container maxWidth="md" mt={5}>
      <Box mb={4}>
        <Button variant="contained" color="primary">+Section</Button>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Enter title"
            value={sectionTitle}
            onChange={(e) => setSectionTitle(e.target.value)}
          />
          <TextField
            fullWidth
            variant="outlined"
            label="Enter learning objectives"
            value={learningObjectives}
            onChange={(e) => setLearningObjectives(e.target.value)}
            mt={2}
          />
          <Button variant="outlined" color="secondary" mt={2}>Cancel</Button>
          <Button variant="contained" color="success" mt={2} onClick={handleAddSection}>
            Add Section
          </Button>
        </div>
      </Box>

      <div>
        <Button variant="contained" color="primary">Curriculum item</Button>
      </div>

      <div>
        <Button variant="contained" color="info" style={{ marginTop: '10px' }}>Lecture</Button>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Lecture Title"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
          />
          <div>
            <Button variant="contained" color="success" onClick={handleAddLecture}>
              Add Lecture
            </Button>
            <Button variant="outlined" color="secondary" mt={2}>Cancel</Button>
            <br /> {/* Line break */}
            <Button variant="contained" color="primary" mt={2}>
              Content
            </Button>
          </div>
        </div>
        <Divider />
      </div>

      <div>
        <Button variant="contained" color="info" style={{ marginTop: '10px' }}>Quiz</Button>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Quiz Title"
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
          />
          <TextareaAutosize
            placeholder="Quiz Content"
            value={quizContent}
            onChange={(e) => setQuizContent(e.target.value)}
            mt={2}
            rowsMin={3}
            fullWidth
          />
          <div>
            <Button variant="contained" color="success" onClick={handleAddQuiz}>
              Add Quiz
            </Button>
            <Button variant="outlined" color="secondary" mt={2}>Cancel</Button>
            <br /> {/* Line break */}
            <Button variant="contained" color="primary" mt={2}>
              Content
            </Button>
          </div>
        </div>
        <Divider />
      </div>

      <div>
        <Button variant="contained" color="info" style={{ marginTop: '10px' }}>Coding Exercises</Button>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Exercises Title"
            value={exerciseTitle}
            onChange={(e) => setExerciseTitle(e.target.value)}
          />
          <div>
            <Button variant="contained" color="success" onClick={handleAddExercise}>
              Add Exercise
            </Button>
            <Button variant="outlined" color="secondary" mt={2}>Cancel</Button>
            <br /> {/* Line break */}
            <Button variant="contained" color="primary" mt={2}>
              Content
            </Button>
          </div>
        </div>
        <Divider />
      </div>

      <div>
        <Button variant="contained" color="info" style={{ marginTop: '10px' }}>Assignment</Button>
        <div>
          <TextField
            fullWidth
            variant="outlined"
            label="Assignment Title"
            value={assignmentTitle}
            onChange={(e) => setAssignmentTitle(e.target.value)}
          />
          <div>
            <Button variant="contained" color="success" onClick={handleAddAssignment}>
              Add Assignment
            </Button>
            <Button variant="outlined" color="secondary" mt={2}>Cancel</Button>
            <br /> {/* Line break */}
            <Button variant="contained" color="primary" mt={2}>
              Content
            </Button>
          </div>
        </div>
        <Divider />
      </div>
    </Container>
  );
};

export default App;
