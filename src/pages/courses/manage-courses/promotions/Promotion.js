import React, { useState } from 'react';
import { Radio, Space, Tabs } from 'antd';

import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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


const Promotion = () => {

    
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [open, setOpen] = React.useState(false);
   
  
    const handleClickOpen = (scrollType) => () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    // const descriptionElementRef = React.useRef(null);
    // React.useEffect(() => {
    //   if (open) {
    //     const { current: descriptionElement } = descriptionElementRef;
    //     if (descriptionElement !== null) {
    //       descriptionElement.focus();
    //     }
    //   }
    // }, [open]);


    const addCoupons = (e) =>{
        console.log("123")
    }

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };
  
    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2"> 
        <Typography className='p-3' variant='h4'>
          Promotions
       </Typography>
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
                <input type="text" class="form-control" placeholder="Coupon Code" />
                </div>
              </div>

              <div className='col-md-12'>
              <div class="mb-3">
                <label class="form-label">Coupon Description</label>
                <textarea class="form-control" rows="3"></textarea>
                </div>
              </div>

              <div className='col-md-6'>
                <div class="mb-3">
                    <label class="form-label">Discount Type</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">Percentage Discount</option>
                        <option value="2">Fixed Cart Discount</option>
                    </select>
                </div>
              </div>

              <div className='col-md-6'>
                <div class="mb-3">
                    <label class="form-label">Coupon Amount</label>
                    <input type="text" class="form-control" placeholder="Coupon Amount" />
                </div>
              </div>

              <div className='col-md-6'>
                <div class="mb-3">
                    <label class="form-label">Coupon Expiry Date</label>
                    <input type="date" class="form-control" placeholder="Coupon Expiry Date" />
                </div>
              </div>


            </div>

            <Button variant="contained">SAVE</Button>

        </DialogContent>
      </Dialog>
    
    
    </div>
  )
}

export default Promotion