import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

const SectionCard = () => {
  const [showCard, setShowCard] = useState(false);
  const [title, setTitle] = useState('');
  const [learningObjective, setLearningObjective] = useState('');

  const handleAddSection = () => {
    // Handle the Add Section button click
  };

  const handleAddCurriculumItem = () => {
    // Handle the +Curriculum Item button click
  };

  return (
    <Card className={`my-3 ${showCard ? 'expanded' : ''}`}>
      <Card.Body>
        <Button
          variant="primary"
          onClick={() => setShowCard(!showCard)}
        >
          {showCard ? '-Section' : '+Section'}
        </Button>
        {showCard && (
          <div>
            <Form.Group controlId="title">
              <Form.Control
                type="text"
                placeholder="Add Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="learningObjective">
              <Form.Control
                type="text"
                placeholder="Enter Learning Objective"
                value={learningObjective}
                onChange={(e) => setLearningObjective(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="secondary"
              className="mr-2"
              onClick={() => setShowCard(false)}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              onClick={handleAddSection}
            >
              Add Section
            </Button>
          </div>
        )}
        {title && (
          <div>
            <p>{title}</p>
            <Button
              variant="primary"
              onClick={handleAddCurriculumItem}
            >
              +Curriculum Item
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default SectionCard;
