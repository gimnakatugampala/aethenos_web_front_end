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
import Table from 'react-bootstrap/Table';
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
import { GetPromotions , AddPromotions, GetCouponsAPI, StatusChangeAPI, GetAvailableCouponsCount } from '../../../../api';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { ActivatePromotions , DeactivatedPromotions , UpdatePromotions , GetPromotionsTypes } from '../../../../api';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'
import Snackbar from '@mui/material/Snackbar';
import { GetReferralLink } from '../../../../api';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import InfoToast from '../../../../commonFunctions/Toasts/InfoToast';




const Promotion = ({code}) => {

  const [referalCode, setreferalCode] = useState(``)
  const [all_coupons, setall_coupons] = useState(null)

  const [couponsCount, setcouponsCount] = useState(0)


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
    navigator.clipboard.writeText(referalCode)
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    GetReferralLink(code,setreferalCode)
    GetCouponsAPI(code,setall_coupons)

    GetAvailableCouponsCount(code,setcouponsCount)

  }, [code])


  const handleCouponStatus = (e,couponCode) => {


    if(e.target.checked){
      StatusChangeAPI(code,couponCode)
    }else{
      StatusChangeAPI(code,couponCode)


    }
  }
  

 const copyLinkToClipboard = (couponCode) =>{
  console.log(couponCode)
    navigator.clipboard.writeText(`https://aethenos.com/course-details/${code}?couponCode=${couponCode}`)

    InfoToast("Link Copied")


 }

 const [currentCoupon, setCurrentCoupon] = useState(null);
const [isModalOpen, setModalOpen] = useState(false);

const openModal = (coupon) => {
  setCurrentCoupon(coupon);
  setModalOpen(true);
};

const closeModal = () => {
  setModalOpen(false);
  setCurrentCoupon(null);
};




  return ( 
    <div className='col-md-10 px-4 mb-4 course-landing-page-responsive'>
    <Card className="py-2 my-2"> 

    <div className='d-flex justify-content-between'>
        <Typography className='p-3' variant='h4'>
          Promotions
       </Typography>

    </div>
       <hr />
       <h5><b>Referral link</b></h5>
      <div className='card p-3'>
        {/* <h5 className='m-0 p-0'><b>Referral link</b></h5> */}
        <p>We will credit You with sales made using this link</p>

        <InputGroup className="mb-3">
        <Form.Control
          style={{fontSize:'13px'}}
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
            {/* <h6><b>{monthName} Coupons</b></h6> */}

            <div className='d-flex justify-content-between align-items-center my-3'>
                <h6>You can create {3 - couponsCount} more {3 - couponsCount == 1 ? 'coupon' : 'coupons'} this month <b>({monthName})</b></h6>

                <Button onClick={() => {
                  window.location.href = `/courses/manage/${code}/#add-coupon`
                  window.location.reload()
                }} variant="contained">Create new Coupons</Button>
                
            </div>

            <Table className='my-2' striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Discount type</th>
                  <th>Global Discounted Price (USD)</th>
                  <th>Created date</th>
                  <th>Start date</th>
                  <th>Expiry date</th>
                  <th>Redemptions</th>
                  <th>Status</th>
                  <th>Link</th>
                  <th>View</th>
                </tr>
              </thead>
              <tbody>
                {all_coupons != null ? all_coupons.map((coupon,key) => (
                <tr key={key}>
                  <td>{coupon.couponCode}</td>
                  <td>{coupon.couponType.id == 1 ? "Free" : 'Discount'}</td>
                  <td>{Number.parseFloat(coupon.globalDiscountPrice).toFixed(2)}</td>
                  <td>{coupon.createdDate == "" ? "N/A" : moment(coupon.createdDate).format('DD/MM/YYYY')}</td>
                  <td>{moment(coupon.startDate).format('DD/MM/YYYY')}</td>
                  <td>{moment(coupon.endDate).format('DD/MM/YYYY')}</td>
                  <td>{coupon.redemptions}</td>
                  <td><FormControlLabel control={coupon.isActive == 1 ? <Switch onChange={(e) => handleCouponStatus(e,coupon.couponCode)} defaultChecked /> : <Switch onChange={(e) => handleCouponStatus(e,coupon.couponCode)} />} label={coupon.isActive == 1 ? "Active" : "Inactive"} /></td>
                  <td><Button onClick={() => copyLinkToClipboard(coupon.couponCode)} variant="outlined"><i className="fas fa-clipboard"></i></Button></td>
                  <td> 
                    {coupon.couponType.id != 1 && (
                  <Button variant="contained" onClick={() => openModal(coupon)}>
                  <i className="fa-solid fa-eye"></i>
                  </Button>
                    )}
                  </td>
                </tr>
                )).reverse() : "No Coupons Available"}
        
              </tbody>
            </Table>
    

          </div>


   

    </div>


    </Card>

    {/* Modal to view coupon details */}
    {currentCoupon && (
  <Dialog open={isModalOpen} onClose={closeModal} fullWidth maxWidth="sm">
    <DialogTitle>Coupon Details</DialogTitle>
    <DialogContent>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th colSpan={5}>Global Pricing</th>
          </tr>
          <tr>
            <th>List Price</th>
            <th>Discount Amount</th>
            <th>Discount %</th>
            <th>Discount Price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{Number.parseFloat(currentCoupon.globalListPrice).toFixed(2)}</td>
            <td>{Number.parseFloat(currentCoupon.globalDiscount).toFixed(2)}</td>
            <td>{Number.parseFloat(currentCoupon.globalDiscountPercentage).toFixed(2)}</td>
            <td>{Number.parseFloat(currentCoupon.globalDiscountPrice).toFixed(2)}</td>
          </tr>
        </tbody>
      </Table>

      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Country</th>
            <th>List Price</th>
            <th>Discount Amount</th>
            <th>Discount %</th>
            <th>Discount Price</th>
          </tr>
        </thead>
        <tbody>
          {currentCoupon.couponPrices.map((price, index) => (
            <tr key={index}>
              <td>{price.country}</td>
              <td>{Number.parseFloat(price.listPrice).toFixed(2)}</td>
              <td>{Number.parseFloat(price.discountAmount).toFixed(2)}</td>
              <td>{Number.parseFloat(price.discount).toFixed(2)}</td>
              <td>{Number.parseFloat(price.discountPrice).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </DialogContent>
    <DialogActions>
      <Button onClick={closeModal} color="primary">
        Close
      </Button>
    </DialogActions>
  </Dialog>
)}




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