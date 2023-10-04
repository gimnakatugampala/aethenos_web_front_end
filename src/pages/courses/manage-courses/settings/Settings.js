import React from 'react'
import './Settings.css'
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { Card  } from 'antd';
const Settings = () => {
  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2"> 
        <Typography className='p-3' variant='h4'>
          Seetings
       </Typography>
       <hr />
       </Card>
       </div>
  )
}

export default Settings