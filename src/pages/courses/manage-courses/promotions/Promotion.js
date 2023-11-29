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
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'


const columns = [
  { id: 'code', label: <b>Code</b>, minWidth: 130 },
  { id: 'couptype', label: <b>Coupon Type</b>, minWidth: 100 },
  {
    id: 'coupamount',
    label: <b>Coupon Amount</b>,
    minWidth: 170,
  },
  {
    id: 'description',
    label: <b>Description</b>,
    minWidth: 200,
  },
  {
    id: 'ex_date',
    label: <b>Expiration Date</b>,
    minWidth: 200,
  },
  {
    id:"actions",
    label: <b>Actions</b>,
    minWidth: 200,
  }
];

function createData(code, couptype, coupamount, description,ex_date,actions) {
  return { code, couptype, coupamount, description,ex_date,actions };
}

// const rows = []

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}



const Promotion = ({code}) => {

    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);

    const [rows, setrows] = useState([])

    const [openEdit, setopenEdit] = useState(false)

    const [promotions, setpromotions] = useState([])

    const [promo_types, setpromo_types] = useState([])


    const [promo_code, setpromo_code] = useState("")
    const [promo_desc, setpromo_desc] = useState("")
    const [promo_type, setpromo_type] = useState("")
    const [promo_amount, setpromo_amount] = useState("")
    const [promo_date, setpromo_date] = useState("")

    const [edit_promo_code, setedit_promo_code] = useState("")
    const [edit_promo_desc, setedit_promo_desc] = useState("")
    const [edit_promo_type, setedit_promo_type] = useState("")
    const [edit_promo_type_id, setedit_promo_type_id] = useState("")
    const [edit_promo_amount, setedit_promo_amount] = useState("")
    const [edit_promo_date, setedit_promo_date] = useState("")


    const handleClick = () => {
      console.log(promo_code);
      console.log(promo_desc);
      console.log(promo_type);
      console.log(promo_amount);
      console.log(promo_date);

      AddPromotions(
        code,
        promo_code,
        promo_desc,
        promo_type,
        promo_amount,
        promo_date,
        setOpen)
    };

    const handleClickUpdate = () =>{
      console.log(code)
      console.log(edit_promo_code)
      console.log(edit_promo_desc)
      console.log(edit_promo_type)
      console.log(edit_promo_amount)
      console.log(edit_promo_date)
      console.log(edit_promo_type_id)

      UpdatePromotions(code,
        edit_promo_code,
        edit_promo_desc,
        edit_promo_type_id,
        edit_promo_amount,
        edit_promo_date,
        setopenEdit)
    }
   
  
    const handleClickOpen = (scrollType) => () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleCloseEdit = () => {
      setopenEdit(!openEdit);
    };
  

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    useEffect(() => {
      GetPromotions(code,setpromotions)
      GetPromotionsTypes(setpromo_types)

      console.log(promotions)
    }, [])

    useEffect(() => {

      setrows(promotions.map(p =>(createData(p.coupon_code, p.promotion_type, p.amount,p.coupon_description , moment(p.ex_date).format('l'), 
        <>
        <ButtonBootstrap onClick={() => handleApprove(p.coupon_code)} variant="success"><CheckIcon /></ButtonBootstrap>
        <ButtonBootstrap className='mx-1' onClick={() => {
          setedit_promo_code(p.coupon_code)
          setedit_promo_desc(p.coupon_description)
          setedit_promo_type(p.promotion_type)
          setedit_promo_amount(p.amount)
          setedit_promo_date(moment(p.ex_date).format("YYYY-MM-DD"))
          // console.log(moment(p.ex_date).format("DD-MM-YYYY"))
          setedit_promo_type_id(p.promotion_type_id)


          handleCloseEdit()
          }} variant="primary"><EditIcon /></ButtonBootstrap>

        <ButtonBootstrap onClick={() => handleDisaprove(p.coupon_code)} variant="danger"><CloseIcon /></ButtonBootstrap>
        </> ))
    ))


    },[promotions])
    

    const handleApprove = (ID) =>{

      Swal.fire({
        title: "Are you sure?",
        text: "This Promotion will be Activated!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, activate it!"
      }).then((result) => {
        if (result.isConfirmed) {

          ActivatePromotions(ID)
        }
      });

    }

    const handleDisaprove = (ID) =>{
      Swal.fire({
        title: "Are you sure?",
        text: "This Promotion will be Deactivated!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, deactivate it!"
      }).then((result) => {
        if (result.isConfirmed) {
          
          DeactivatedPromotions(ID)

        }
      });

    }
    

  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2"> 

    <div className='d-flex justify-content-between'>
        <Typography className='p-3' variant='h4'>
          Promotions
       </Typography>

    </div>
       <hr />

    <div className='d-flex justify-content-end'>
        <Button onClick={handleClickOpen('paper')} variant="contained"><i class="fa-regular fa-square-plus mx-2"></i>  Add Coupons</Button>
    </div>

    <Paper className='my-4'>
      <TableContainer>
        <Table aria-label="sticky table">
          <TableHead>

            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>

    </Card>

{/* Add Modal */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-describedby="scroll-dialog-description"
      >
        <div className='d-flex justify-content-between align-items-center'>
            <DialogTitle>Add Coupons</DialogTitle>
           <span onClick={handleClose} className='px-3'><i class="fa-solid fa-circle-xmark fa-2x"></i></span>
        </div>

        <DialogContent>
            <div className='row'>

              <div className='col-md-12'>
              <div class="mb-3">
                <label class="form-label">Coupon Code</label>
                <input onChange={(e) => setpromo_code(e.target.value)} type="text" class="form-control" placeholder="Coupon Code" />
                </div>
              </div>

        

              <div className='col-md-12'>
              <div class="mb-3">
                <label class="form-label">Coupon Description</label>
                <textarea onChange={(e) => setpromo_desc(e.target.value)} class="form-control" rows="3"></textarea>
                </div>
              </div>

              <div className='col-md-6'>
                <div class="mb-3">
                    <label class="form-label">Promotion Type</label>
                    <select onChange={(e) => setpromo_type(e.target.value)} class="form-select" aria-label="Default select example">
                        <option value="0" selected>Open this select menu</option>
                        {promo_types.map((type) => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                    </select>
                </div>
              </div>

              <div className='col-md-6'>
                <div class="mb-3">
                    <label class="form-label">Coupon Amount</label>
                    <input onChange={(e) => setpromo_amount(e.target.value)} type="text" class="form-control" placeholder="Coupon Amount" />
                </div>
              </div>

              <div className='col-md-6'>
                <div class="mb-3">
                    <label class="form-label">Coupon Expiry Date</label>
                    <input onChange={(e) => setpromo_date(e.target.value)} type="date" class="form-control" placeholder="Coupon Expiry Date" />
                </div>
              </div>


            </div>

            <Button onClick={handleClick} variant="contained">SAVE</Button>

        </DialogContent>
      </Dialog>


      {/* Edit Modal */}
      <Dialog
        open={openEdit}
        onClose={handleCloseEdit}
        aria-describedby="scroll-dialog-description"
      >
        <div className='d-flex justify-content-between align-items-center'>
            <DialogTitle>Edit Coupons - {edit_promo_code}</DialogTitle>
           <span onClick={handleCloseEdit} className='px-3'><i class="fa-solid fa-circle-xmark fa-2x"></i></span>
        </div>

        <DialogContent>
            <div className='row'>

              <div className='col-md-12'>
              <div class="mb-3">
                <label class="form-label">Coupon Description</label>
                <textarea value={edit_promo_desc} onChange={(e) => setedit_promo_desc(e.target.value)} class="form-control" rows="3"></textarea>
                </div>
              </div>

              <div className='col-md-6'>
                <div class="mb-3">
                    <label class="form-label">Promotion Type</label>
                    <select value={edit_promo_type_id} onChange={(e) => setedit_promo_type_id(e.target.value)} class="form-select" aria-label="Default select example">
                        {/* <option value={edit_promo_type}>{promo_types.map((t) => t.id ==  edit_promo_type && t.name)}</option> */}
                        {promo_types.map((type) => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        )) }
                    </select>
                </div>
              </div>

              <div className='col-md-6'>
                <div class="mb-3">
                    <label class="form-label">Coupon Amount</label>
                    <input value={edit_promo_amount} onChange={(e) => setedit_promo_amount(e.target.value)} type="text" class="form-control" placeholder="Coupon Amount" />
                </div>
              </div>

              <div className='col-md-6'>
                <div class="mb-3">
                    <label class="form-label">Coupon Expiry Date</label>
                    <input value={edit_promo_date} onChange={(e) => setedit_promo_date(e.target.value)} type="date" class="form-control" placeholder="Coupon Expiry Date" />
                </div>
              </div>


            </div>

            <Button onClick={handleClickUpdate} variant="contained">UPDATE</Button>

        </DialogContent>
      </Dialog>
    
    
    </div>
  )
}

export default Promotion