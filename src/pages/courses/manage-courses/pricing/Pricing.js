import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import { Select, Radio } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import { css } from "../../manage-courses/pricing/Pricing.css";
import { GetDiscountTypes , SavePriceDefault , GetPriceDefault , GetCoursePricingType } from "../../../../api";

import getSymbolFromCurrency from 'currency-symbol-map'
import ErrorAlert from "../../../../commonFunctions/Alerts/ErrorAlert";

const countries = [
  { country: "America", currency: "USD" },
  { country: "Australia", currency: "AUD" },
  { country: "Brazil", currency: "BRL" },
  { country: "Canada", currency: "CAD" },
  { country: "Chile", currency: "CLP" },
  { country: "Colombia", currency: "COP" },
  { country: "Egypt", currency: "EGP" },
  { country: "Great Britain", currency: "GBP" },
  { country: "India", currency: "INR" },
  { country: "Indonesia", currency: "IDR" },
  { country: "Israel", currency: "ILS" },
  { country: "Japan", currency: "JPY" },
  { country: "Malaysia", currency: "MYR" },
  { country: "Mexico", currency: "MXN" },
  { country: "Nigeria", currency: "NGN" },
  { country: "Norway", currency: "NOK" },
  { country: "Peru", currency: "PEN" },
  { country: "Philippines", currency: "PHP" },
  { country: "Poland", currency: "PLN" },
  { country: "Romania", currency: "RON" },
  { country: "Russia", currency: "RUB" },
  { country: "Singapore", currency: "SGD" },
  { country: "South Africa", currency: "ZAR" },
  { country: "South Korea", currency: "KRW" },
  { country: "Taiwan", currency: "TWD" },
  { country: "Thailand", currency: "THB" },
  { country: "Turkey", currency: "TRY" },
  { country: "Vietnam", currency: "VND" },
  { country: "European Union", currency: "EUR" }
];

const Pricing = ({code}) => {

  const [dis_types, setdis_types] = useState([])

  const [DGlobalPricing, setDGlobalPricing] = useState("")
  const [DDisType, setDDisType] = useState("")
  const [DDisPercent, setDDisPercent] = useState("")
  const [DDisAmt, setDDisAmt] = useState("")
  const [DGlobalNetPrice, setDGlobalNetPrice] = useState("")

  const [PriceRangeMinDefault, setPriceRangeMinDefault] = useState("")
  const [PriceRangeMaxDefault, setPriceRangeMaxDefault] = useState("")

  const [showDefaultDiscountInput, setshowDefaultDiscountInput] = useState(true)
  const [showDefaultPercentDiscountInput, setshowDefaultPercentDiscountInput] = useState(false)
  const [showDefaultValueDiscountInput, setshowDefaultValueDiscountInput] = useState(false)
  

  useEffect(() => {

    // Get Paid Type
    // GetCoursePricingType(code)

    // Get the Discount Types for the Cmb Items
    GetDiscountTypes(setdis_types)

    // Get The Default Pricing
    GetPriceDefault(code,setDGlobalPricing,setDDisType,setDDisPercent,setDDisAmt,setPriceRangeMinDefault,setPriceRangeMaxDefault,setshowDefaultValueDiscountInput,setshowDefaultPercentDiscountInput,setDGlobalNetPrice)
 
  }, [])


  // Select Free Or Paid Course
  const [paidType, setpaidType] = useState(1)
  const onChangePaidType = (e) => {
    console.log('radio checked', e.target.value);
    setpaidType(e.target.value);
  };

// Submit Default Prices
  const handleSaveDefaultPricing = () =>{

    // Validate
    if(DDisType == 0){
      ErrorAlert("Empty Fields","Please Select Discount Type")
      return
    }else if(DGlobalPricing == 0 || DGlobalNetPrice == 0){
      ErrorAlert("Empty Fields","Global Price or Global Net Price Zero")
      return
    }else if(DDisType == 2 && DDisPercent == 0){
      ErrorAlert("Empty Fields","Please Enter Discount Percentage")
      return
    }else if(DDisType == 3 && DDisAmt == 0){
      ErrorAlert("Empty Fields","Please Enter Discount Amount")
      return
    }


    SavePriceDefault(code,DGlobalPricing,DDisType,DDisPercent,DDisAmt,DGlobalNetPrice)
    console.log(code)
    console.log(DGlobalPricing)
    console.log(DDisType)
    console.log(DDisPercent)
    console.log(DDisAmt)
    console.log(DGlobalNetPrice)
  }

  // Select Discount Type
  const handleDefaultDiscountType = (e) =>{
    console.log(e.target.value)
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(e.target.value == '1'){

      setshowDefaultDiscountInput(false)
      setshowDefaultPercentDiscountInput(false)
      setshowDefaultValueDiscountInput(false)
      setDGlobalNetPrice(DGlobalPricing)

    }else if(e.target.value == '2'){

      setshowDefaultDiscountInput(true)
      setshowDefaultPercentDiscountInput(true)
      setshowDefaultValueDiscountInput(false)
      console.log(DDisPercent)
      console.log(DGlobalPricing)

      setDGlobalNetPrice(parseFloat(DGlobalPricing) - parseFloat(DGlobalPricing) * parseFloat(DDisPercent == "" ? 0 : DDisPercent)/100)


    }else if(e.target.value == '3'){
      setshowDefaultDiscountInput(true)
      setshowDefaultPercentDiscountInput(false)
      setshowDefaultValueDiscountInput(true)

      setDGlobalNetPrice(parseFloat(DGlobalPricing) - parseFloat(DDisAmt == "" ? 0 : DDisAmt))

    }else{
      setshowDefaultDiscountInput(false)
      setshowDefaultPercentDiscountInput(false)
      setshowDefaultValueDiscountInput(false)
      setDGlobalNetPrice(DGlobalPricing)

    }

    setDDisType(e.target.value == "" ? 0 :  e.target.value )
  }

// Enter Global Price
  const handleChangeGlobalPrice = (e) => {

    if(DDisType == '1'){
      console.log(e.target.value)
      setDGlobalNetPrice(e.target.value)
    }else if(DDisType == '2'){
      setDGlobalNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(DDisPercent)/100).toFixed(2))
    }else if(DDisType == '3'){
      setDGlobalNetPrice((parseFloat(e.target.value) - parseFloat(DDisAmt)).toFixed(2))
    }else{
      setDGlobalNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setDGlobalPricing(e.target.value)

  }

  // Discount Amount
  const handleDefaultDiscountAmt = (e) =>{
    setDDisAmt(e.target.value)
    setDGlobalNetPrice((parseFloat(DGlobalPricing) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
  }
  
// Percentage Discount
  const handleDefaultPercentageDiscount = (e) =>{

    setDDisPercent(e.target.value)

    setDGlobalNetPrice((parseFloat(DGlobalPricing) - parseFloat(DGlobalPricing) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

  }
  


  const initialDiscountTypes = new Array(countries.length).fill("No Discount");
  const [selectedDiscountTypes, setSelectedDiscountTypes] =
    useState(initialDiscountTypes);

  const handleDiscountTypeChange = (value, index) => {
    const updatedDiscountTypes = [...selectedDiscountTypes];
    updatedDiscountTypes[index] = value;
    setSelectedDiscountTypes(updatedDiscountTypes);
  };

  const handleRadioChange = (value) => {
    const updatedDiscountTypes = new Array(countries.length).fill(value);
    setSelectedDiscountTypes(updatedDiscountTypes);
  };


  // LIST COUNTRIES FUNCTIONS
  // LIST PRICE
  const [inputValuesListPrice, setinputValuesListPrice] = useState([])
  const [selectDiscountTypeList, setselectDiscountTypeList] = useState([])

  const handleInputChangeListPrice = (value, index) => {
    const newInputValues = [...inputValuesListPrice];
    if (!newInputValues[index]) {
      newInputValues[index] = {};
    }
    newInputValues[index] = value;
    setinputValuesListPrice(newInputValues);
  };

  // DISCOUNT TYPE
  const handleInputDiscountListPrice = (value, index) => {
    const newInputValues = [...selectDiscountTypeList];
    if (!newInputValues[index]) {
      newInputValues[index] = {};
    }
    newInputValues[index] = value;
    setselectDiscountTypeList(newInputValues);
  };
  
  // SUBMIT PRICES
  const handleSubmitAllPrices = () =>{
    
    console.log(inputValuesListPrice)
    console.log(selectDiscountTypeList)
  }

  return (
    <div className="col-md-8">
      <Card className="py-2 my-2">
      <div className='d-flex justify-content-between p-4'>
        <Typography className="p-3" variant="h4">
          Pricing
        </Typography>

        <Button onClick={handleSubmitAllPrices} variant="contained"><AddIcon /> SAVE</Button>

        </div>

        <hr />

        {/* Paid Type */}
        <div className="container m-2">
        <h6>What is the Paid Type of this Course ?</h6>
          <Radio.Group onChange={onChangePaidType} value={paidType}>
          <Radio value={1}>Free Course</Radio>
          <Radio value={2}>Paid Course</Radio>
        </Radio.Group>
        </div>

        {paidType == 2 && (
        <div className="pricing-container">
          <div className="price-range-container p-3">
            <p>The Global List Price will be used for all countries unless individual country prices are specified below.</p>

            <p>You have 2 options for Pricing:</p>
            <ol>
              <li>Provide a <b>Global List Price</b> only.</li>
              <p className="my-2">OR</p>
              <li>Provide a <b>Global List Price </b>and individual country prices for select countries below.</li>
            </ol>
            <p>Please note that UK and EU sales are liable for VAT and you should take that in to consideration when pricing. Our List 
Prices include VAT. 
For example if a UK List Price is £12 then Net amount is £10 and VAT is £2 (£10 x 20%)</p>

            <div className="row">
              <div className="price-range col-md-3">
                <Form.Label className="pricing-label"><b>Global List Price (USD)</b></Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                    <Form.Control
                    value={DGlobalPricing}
                      onChange={handleChangeGlobalPrice}
                      placeholder="USD"
                      aria-label="USD"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <Form.Label style={{fontSize:'13px',whiteSpace:'nowrap'}}><i>Price range: ${PriceRangeMinDefault} – ${PriceRangeMaxDefault}</i></Form.Label>
              </div>

              <div className="col-md-3">
              <Form.Label className="pricing-label"><b>Discount Type</b></Form.Label>
              <select value={DDisType}  onChange={handleDefaultDiscountType} class="form-select" aria-label="Default select example">
                <option value="0" selected>Open this select menu</option>
                {dis_types.map((type,index) => (
                  <option key={index} value={type.id}>{type.name}</option>
                ))}
              </select>
              </div>

              {showDefaultDiscountInput && (
                <>
                {showDefaultPercentDiscountInput && (
                <div className="col-md-2">
                <Form.Label className="pricing-label"><b>Discount %</b></Form.Label>
                <Form.Control value={DDisPercent} onChange={handleDefaultPercentageDiscount} type="text" />
                </div>
                )}

                {showDefaultValueDiscountInput && (

              <div className="col-md-2">
              <Form.Label className="pricing-label"><b>Discount Amt (USD)</b></Form.Label>
              <Form.Control value={DDisAmt} onChange={handleDefaultDiscountAmt} type="text" />
              </div>
                )}

                </>
              )}


              <div className="col-md-3">
              <Form.Label className="pricing-label"><b>Global Net Price (USD)</b></Form.Label>
              <h5 className="p-1">{DGlobalNetPrice == "" ? 0 : DGlobalNetPrice}</h5>
              <Form.Label style={{fontSize:'13px',whiteSpace:'nowrap'}}><i>Minimum : $10</i></Form.Label>

              </div>

              <div className='col-md-1 d-flex align-items-center mb-3'>
                <Button onClick={handleSaveDefaultPricing} className='mx-1' variant="contained">Submit</Button>
                </div>


              <div className="col-6"></div>

              <div className="radio-group col-6 d-flex align-items-center mt-4">
                <Radio.Group
                  onChange={(e) => handleRadioChange(e.target.value)}
                >
                  <Radio value="No Discount">No Discount</Radio>
                  <Radio value="Percentage">Percentage</Radio>
                  <Radio value="Fixed Discount">Fixed Discount</Radio>
                </Radio.Group>
              </div>
            </div>
          </div>

      

          <table className="table table-striped text-center">
            <thead>
              <tr>
                <th className="col-2" scope="col">Country</th>
                <th scope="col">Currency</th>
                <th scope="col">Price Range</th>
                <th scope="col">List Price</th>

                <th scope="col">Discount Type</th>
                <th scope="col">Discount %</th>
                <th scope="col">Discount Amount</th>
                <th scope="col">Net Price</th>
               


              </tr>
            </thead>
            <tbody>
              {countries.map((countryData, index) => (
                <tr  key={index}>
                  <td >{countryData.country}
            
             
                 <td className="col-12 font-italic mt-5">  
                <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
               
                 
                 </td>
                 
                  <td>{countryData.currency}</td>
                  
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(countryData.currency)} 100 - ${getSymbolFromCurrency(countryData.currency)} 200`}</td>
                  <td>
                    <Form.Control onChange={(e) => handleInputChangeListPrice(e.target.value, index)} type="text" />
                  </td>
                  <td>
                    <Select
                      value={selectDiscountTypeList[index] == "" ? "1" : selectDiscountTypeList[index]}
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        handleInputDiscountListPrice(value, index)
                      }
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                    <Form.Control type="text" />
                  </td>
                  <td>
                    <Form.Control type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>45</h6>
                 <tr >
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>
                
                
              ))}
            </tbody>
          </table>
        </div>
        )}

      </Card>
    </div>
  );
};

export default Pricing;
