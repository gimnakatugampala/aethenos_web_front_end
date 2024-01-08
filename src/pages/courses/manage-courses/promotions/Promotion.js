import React, { useEffect, useState } from 'react';
import { Radio, Space, Tabs , Select } from 'antd';

import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from "@mui/icons-material/Add";
import { Card  } from 'antd';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import moment from 'moment';
import ButtonBootstrap from 'react-bootstrap/Button';
import { GetPromotions , AddPromotions } from '../../../../api';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { ActivatePromotions , DeactivatedPromotions , UpdatePromotions , GetPromotionsTypes } from '../../../../api';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Snackbar from '@mui/material/Snackbar';



const Promotion = ({code}) => {

  const [referalCode, setreferalCode] = useState(`https://www.aethenos.com/course/draft/${code}/?referralCode=3727A03E63454FD43574`)
  var currentDate = new Date();
  var monthName = currentDate.toLocaleString('default', { month: 'long' });
  
  const [state, setState] = React.useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState) => () => {
    setState({ ...newState, open: true });
    // navigator.clipboard.writeText(this.state.textToCopy)
    navigator.clipboard.writeText(referalCode)
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

 


  return ( 
    <div className='col-md-8'>
    <Card className="py-2 my-2"> 

    <div className='d-flex justify-content-between'>
        <Typography className='p-3' variant='h4'>
          Promotions
       </Typography>

    </div>
       <hr />

      <div className='card p-3'>
        <h5 className='m-0 p-0'><b>Referral link</b></h5>
        <p>We will credit You with sales made using this link</p>

        <InputGroup className="mb-3">
        <Form.Control
          style={{fontSize:'12px'}}
          value={referalCode}
          placeholder="Referral Code"
          aria-label="Referral Code"
          aria-describedby="basic-addon2"
        />
          <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'right' })} variant="contained">
              Copy
          </Button>
      </InputGroup>
      </div>

    <div className='my-5'>
        <h5><b>Coupons</b></h5>
          <div className='card p-3'>
            <h6><b>{monthName} Coupons</b></h6>

            <div className='d-flex justify-content-between align-items-center'>
                <p>You can create 2 more coupons this month</p>

                <Button onClick={() => console.log("12")} variant="contained">Create new Coupons</Button>
            </div>
          </div>
    </div>


    </Card>

    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      message="Link Copied"
      key={vertical + horizontal}
      />


    </div>
      )
}

export default Promotion