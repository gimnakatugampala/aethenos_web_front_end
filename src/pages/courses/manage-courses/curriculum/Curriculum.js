import React from 'react'
import { Input } from "antd";
import Card from "@mui/material/Card";
import Button from '@mui/material/Button';
import { CardContent } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';

import Typography from "@mui/material/Typography";
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import './Curriculum.css'


const Curriculum = () => {
  return (
    <div className="col-md-8">
    <Card className="py-2 my-2 p-4">
      <Typography className="p-3" variant="h4">
        Curriculum
      </Typography>
      <hr />


      <div className='card p-2'>
      <CardContent>
        <div className='d-flex justify-content-start section-container'>
        <Typography  variant="subtitle1">
        <b> Section 1:</b> <FileCopyIcon sx={{ fontSize: 15 }} /> Introduction
        </Typography>

        <div className='section-actions'>
            <EditIcon fontSize="small" className='mx-1' />
            <DeleteIcon fontSize="small" className='mx-1' />
        </div>
        </div>

        <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accordion 1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>Accordion 2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
    


    
     
      </CardContent>
   
    </div>

    <div className='m-2'>
        <Button variant="contained"><AddIcon /> Section</Button>
    </div>


      </Card>
      </div>
  )
}

export default Curriculum