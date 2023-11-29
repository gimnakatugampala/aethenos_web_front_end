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
import { GetPromotions , AddPromotions } from '../../../../api';



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
  }
];

function createData(code, couptype, coupamount, description) {
  return { code, couptype, coupamount, description };
}

const rows = [
  createData('123', 'Product Discount', 2444, "Descriptio"),
];

const options = [];
for (let i = 10; i < 36; i++) {
  options.push({
    value: i.toString(36) + i,
    label: i.toString(36) + i,
  });
}

let promotionsData = []

const Promotion = ({code}) => {

    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);

    const [promotions, setpromotions] = useState([])


    const [promo_code, setpromo_code] = useState("")
    const [promo_desc, setpromo_desc] = useState("")
    const [promo_type, setpromo_type] = useState("")
    const [promo_amount, setpromo_amount] = useState("")
    const [promo_date, setpromo_date] = useState("")


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
        promo_date)
    };
   
  
    const handleClickOpen = (scrollType) => () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
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
    }, [])

    useEffect(() => {
      
    }, [])
    
    

  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2"> 

    <div className='d-flex justify-content-between'>
        <Typography className='p-3' variant='h4'>
          Promotions
       </Typography>
       <Button variant="contained"><AddIcon /> SAVE</Button>

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

{/* Modal */}
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
                        <option selected>Open this select menu</option>
                        <option value="1">Percentage Promotion</option>
                        <option value="2">Fixed Cart Promotion</option>
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
    
    
    </div>
  )
}

export default Promotion