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
import { GetDiscountTypes } from "../../../../api";

import getSymbolFromCurrency from 'currency-symbol-map'

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

const Pricing = () => {

  const [dis_types, setdis_types] = useState([])

  const [DGlobalPricing, setDGlobalPricing] = useState("")
  const [DDisType, setDDisType] = useState("")
  const [DDisPercent, setDDisPercent] = useState("")
  const [DDisAmt, setDDisAmt] = useState("")
  const [DGlobalNetPrice, setDGlobalNetPrice] = useState("")
  

  useEffect(() => {

    GetDiscountTypes(setdis_types)
 
  }, [])


  const handleSaveDefaultPricing = () =>{
    console.log(DGlobalPricing)
    console.log(DDisType)
    console.log(DDisPercent)
    console.log(DDisAmt)
    console.log(DGlobalNetPrice)
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

  return (
    <div className="col-md-8">
      <Card className="py-2 my-2">
      <div className='d-flex justify-content-between p-4'>
        <Typography className="p-3" variant="h4">
          Pricing
        </Typography>

        <Button variant="contained"><AddIcon /> SAVE</Button>

        </div>

        <hr />

        <div className="pricing-container">
          <div className="price-range-container p-3">
            <p>Please note that UK and EU sales are liable for VAT and you should take that in to consideration when pricing. Our List 
Prices include VAT. 
For example if a UK List Price is £12 then Net amount is £10 and VAT is £2 (£10 x 20%)</p>

            <div className="row">
              <div className="price-range col-md-2">
                <Form.Label className="pricing-label"><b>Global List Price (USD)</b></Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                    <Form.Control
                    onChange={(e) => setDGlobalPricing(e.target.value)}
                      placeholder="USD"
                      aria-label="USD"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <Form.Label style={{fontSize:'13px',whiteSpace:'nowrap'}}><i>Price range: $20 – $250</i></Form.Label>
              </div>

              <div className="col-md-3">
              <Form.Label className="pricing-label"><b>Discount Type</b></Form.Label>
              <select onChange={(e) => setDDisType(e.target.value)} class="form-select" aria-label="Default select example">
                <option value="0" selected>Open this select menu</option>
                {dis_types.map((type,index) => (
                  <option key={index} value={type.id}>{type.name}</option>
                ))}
              </select>
              </div>

              <div className="col-md-2">
              <Form.Label className="pricing-label"><b>Discount %</b></Form.Label>
              <Form.Control onChange={(e) => setDDisPercent(e.target.value)} type="text" />
              </div>

              <div className="col-md-2">
              <Form.Label className="pricing-label"><b>Discount Amt (USD)</b></Form.Label>
              <Form.Control onChange={(e) => setDDisAmt(e.target.value)} type="text" />
              </div>

              <div className="col-md-2">
              <Form.Label className="pricing-label"><b>Global Net Price (USD)</b></Form.Label>
              <Form.Control onChange={(e) => setDGlobalNetPrice(e.target.value)} type="text" />
              <Form.Label style={{fontSize:'13px',whiteSpace:'nowrap'}}><i>Minimum : $10</i></Form.Label>

              </div>

              <div className='col-md-1 d-flex align-items-center mb-3'>
                <Button onClick={handleSaveDefaultPricing} className='mx-1' variant="contained">Submit</Button>
                </div>

              

                {/* <div className="col-md-6">
              <Form.Label>Price Range : $100-$200</Form.Label>
              </div> */}

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
                    <Form.Control type="text" />
                  </td>
                  <td>
                    <Select
                      value={selectedDiscountTypes[index]}
                      style={{ width: "100%" }}
                      onChange={(value) =>
                        handleDiscountTypeChange(value, index)
                      }
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                      {/* <Select.Option value="Percentage">
                        By Percentage
                      </Select.Option>
                      <Select.Option value="Fixed Discount">
                        By Value
                      </Select.Option> */}
                    </Select>
                  </td>
                  <td>
                    <Form.Control type="text" />
                  </td>
                  <td>
                    <Form.Control type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                 <Form.Control type="text" />
                 <tr className="">
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>
                
                
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Pricing;
