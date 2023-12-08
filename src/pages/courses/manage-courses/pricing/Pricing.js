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
import { GetDiscountTypes , SavePriceDefault , GetPriceDefault , GetCoursePricingType , GetCountriesListPricing} from "../../../../api";

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

  const [countriesData, setcountriesData] = useState([])

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


    // Get the Countries List WITH THE PRICES
    GetCountriesListPricing(code,setcountriesData)
 
  }, [])


  // Select Free Or Paid Course
  const [paidType, setpaidType] = useState(1)
  const onChangePaidType = (e) => {
    console.log('radio checked', e.target.value);
    setpaidType(e.target.value);
  };

  //  ---------------------

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

  //  ---------------------
  


  const initialDiscountTypes = new Array(countries.length).fill("No Discount");
  const [selectedDiscountTypes, setSelectedDiscountTypes] =
    useState(initialDiscountTypes);



  const handleRadioChange = (value) => {
    const updatedDiscountTypes = new Array(countries.length).fill(value);
    setSelectedDiscountTypes(updatedDiscountTypes);
  };


  // LIST COUNTRIES FUNCTIONS
  // LIST PRICE
  const [inputValuesListPrice, setinputValuesListPrice] = useState([])
  const [selectDiscountTypeList, setselectDiscountTypeList] = useState([])

  // USA
  const [USAListPrice, setUSAListPrice] = useState("")
  const [USADisType, setUSADisType] = useState("")
  const [USADisPercent, setUSADisPercent] = useState("")
  const [USADisAmt, setUSADisAmt] = useState("")
  const [USANetPrice, setUSANetPrice] = useState("")

  // ---------------------
  // Discount Type USA
  const handleDefaultDiscountTypeUSA = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setUSANetPrice(USAListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(USADisPercent)
      console.log(USAListPrice)

      setUSANetPrice(parseFloat(USAListPrice) - parseFloat(USAListPrice) * parseFloat(USADisPercent == "" ? 0 : USADisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setUSANetPrice(parseFloat(USAListPrice) - parseFloat(USADisAmt == "" ? 0 : USADisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setUSANetPrice(USAListPrice)

    }

    setUSADisType(value)
  }

  // Enter Global Price USA
  const handleChangeGlobalPriceUSA = (e) => {

    console.log(e.target.value)

    if(USADisType == '1'){
      console.log(e.target.value)
      setUSANetPrice(e.target.value)
    }else if(USADisType == '2'){
      setUSANetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(USADisPercent)/100).toFixed(2))
    }else if(USADisType == '3'){
      setUSANetPrice((parseFloat(e.target.value) - parseFloat(USADisAmt)).toFixed(2))
    }else{
      setUSANetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setUSAListPrice(e.target.value)

  }

    // Discount Amount USA
    const handleDefaultDiscountAmtUSA = (e) =>{
      setUSADisAmt(e.target.value)
      setUSANetPrice((parseFloat(USAListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount USA
    const handleDefaultPercentageDiscountUSA = (e) =>{
  
      setUSADisPercent(e.target.value)
  
      setUSANetPrice((parseFloat(USAListPrice) - parseFloat(USAListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }
  


  // ---------------------
  
  const [AusListPrice, setAusListPrice] = useState("")
  const [AusDisType, setAusDisType] = useState("")
  const [AusDisPercent, setAusDisPercent] = useState("")
  const [AusDisAmt, setAusDisAmt] = useState("")
  const [AusNetPrice, setAusNetPrice] = useState("")

    // ---------------------
  // Discount Type Aus
  const handleDefaultDiscountTypeAus = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setAusNetPrice(AusListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(AusDisPercent)
      console.log(AusListPrice)

      setAusNetPrice(parseFloat(AusListPrice) - parseFloat(AusListPrice) * parseFloat(AusDisPercent == "" ? 0 : AusDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setAusNetPrice(parseFloat(AusListPrice) - parseFloat(AusDisAmt == "" ? 0 : AusDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setAusNetPrice(AusListPrice)

    }

    setAusDisType(value)
  }

  // Enter Global Price Aus
  const handleChangeGlobalPriceAus = (e) => {

    console.log(e.target.value)

    if(AusDisType == '1'){
      console.log(e.target.value)
      setAusNetPrice(e.target.value)
    }else if(AusDisType == '2'){
      setAusNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(AusDisPercent)/100).toFixed(2))
    }else if(AusDisType == '3'){
      setAusNetPrice((parseFloat(e.target.value) - parseFloat(AusDisAmt)).toFixed(2))
    }else{
      setAusNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setAusListPrice(e.target.value)

  }

    // Discount Amount Aus
    const handleDefaultDiscountAmtAus = (e) =>{
      setAusDisAmt(e.target.value)
      setAusNetPrice((parseFloat(AusListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount Aus
    const handleDefaultPercentageDiscountAus = (e) =>{
  
      setAusDisPercent(e.target.value)
  
      setAusNetPrice((parseFloat(AusListPrice) - parseFloat(AusListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }
  


  // ---------------------


  const [BrazilListPrice, setBrazilListPrice] = useState("")
  const [BrazilDisType, setBrazilDisType] = useState("")
  const [BrazilDisPercent, setBrazilDisPercent] = useState("")
  const [BrazilDisAmt, setBrazilDisAmt] = useState("")
  const [BrazilNetPrice, setBrazilNetPrice] = useState("")

      // ---------------------
  // Discount Type Brazil
  const handleDefaultDiscountTypeBrazil = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setBrazilNetPrice(BrazilListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(BrazilDisPercent)
      console.log(BrazilListPrice)

      setBrazilNetPrice(parseFloat(BrazilListPrice) - parseFloat(BrazilListPrice) * parseFloat(BrazilDisPercent == "" ? 0 : BrazilDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setBrazilNetPrice(parseFloat(BrazilListPrice) - parseFloat(BrazilDisAmt == "" ? 0 : BrazilDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setBrazilNetPrice(BrazilListPrice)

    }

    setBrazilDisType(value)
  }

  // Enter Global Price Aus
  const handleChangeGlobalPriceBrazil = (e) => {

    console.log(e.target.value)

    if(BrazilDisType == '1'){
      console.log(e.target.value)
      setBrazilNetPrice(e.target.value)
    }else if(BrazilDisType == '2'){
      setBrazilNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(BrazilDisPercent)/100).toFixed(2))
    }else if(BrazilDisType == '3'){
      setBrazilNetPrice((parseFloat(e.target.value) - parseFloat(BrazilDisAmt)).toFixed(2))
    }else{
      setBrazilNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setBrazilListPrice(e.target.value)

  }

    // Discount Amount Aus
    const handleDefaultDiscountAmtBrazil = (e) =>{
      setBrazilDisAmt(e.target.value)
      setBrazilNetPrice((parseFloat(BrazilListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount Aus
    const handleDefaultPercentageDiscountBrazil = (e) =>{
  
      setBrazilDisPercent(e.target.value)
  
      setBrazilNetPrice((parseFloat(BrazilListPrice) - parseFloat(BrazilListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }
  


  // ---------------------

  const [CanadaListPrice, setCanadaListPrice] = useState("")
  const [CanadaDisType, setCanadaDisType] = useState("")
  const [CanadaDisPercent, setCanadaDisPercent] = useState("")
  const [CanadaDisAmt, setCanadaDisAmt] = useState("")
  const [CanadaNetPrice, setCanadaNetPrice] = useState("")

      // ---------------------
  // Discount Type Canada
  const handleDefaultDiscountTypeCanada = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setCanadaNetPrice(CanadaListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(CanadaDisPercent)
      console.log(CanadaListPrice)

      setCanadaNetPrice(parseFloat(CanadaListPrice) - parseFloat(CanadaListPrice) * parseFloat(CanadaDisPercent == "" ? 0 : CanadaDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setCanadaNetPrice(parseFloat(CanadaListPrice) - parseFloat(CanadaDisAmt == "" ? 0 : CanadaDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setCanadaNetPrice(CanadaListPrice)

    }

    setCanadaDisType(value)
  }

  // Enter Global Price Canada
  const handleChangeGlobalPriceCanada = (e) => {

    console.log(e.target.value)

    if(CanadaDisType == '1'){
      console.log(e.target.value)
      setCanadaNetPrice(e.target.value)
    }else if(CanadaDisType == '2'){
      setCanadaNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(CanadaDisPercent)/100).toFixed(2))
    }else if(CanadaDisType == '3'){
      setCanadaNetPrice((parseFloat(e.target.value) - parseFloat(CanadaDisAmt)).toFixed(2))
    }else{
      setCanadaNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setCanadaListPrice(e.target.value)

  }

    // Discount Amount Canada
    const handleDefaultDiscountAmtCanada = (e) =>{
      setCanadaDisAmt(e.target.value)
      setCanadaNetPrice((parseFloat(CanadaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount Canada
    const handleDefaultPercentageDiscountCanada = (e) =>{
  
      setCanadaDisPercent(e.target.value)
  
      setCanadaNetPrice((parseFloat(CanadaListPrice) - parseFloat(CanadaListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }
  


  // ---------------------

  const [ChileListPrice, setChileListPrice] = useState("")
  const [ChileDisType, setChileDisType] = useState("")
  const [ChileDisPercent, setChileDisPercent] = useState("")
  const [ChileDisAmt, setChileDisAmt] = useState("")
  const [ChileNetPrice, setChileNetPrice] = useState("")

   // ---------------------
  // Discount Type Chile
  const handleDefaultDiscountTypeChile = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setChileNetPrice(ChileListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(ChileDisPercent)
      console.log(ChileListPrice)

      setChileNetPrice(parseFloat(ChileListPrice) - parseFloat(ChileListPrice) * parseFloat(ChileDisPercent == "" ? 0 : ChileDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setChileNetPrice(parseFloat(ChileListPrice) - parseFloat(ChileDisAmt == "" ? 0 : ChileDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setChileNetPrice(ChileListPrice)

    }

    setChileDisType(value)
  }

  // Enter Global Price Chile
  const handleChangeGlobalPriceChile = (e) => {

    console.log(e.target.value)

    if(ChileDisType == '1'){
      console.log(e.target.value)
      setChileNetPrice(e.target.value)
    }else if(ChileDisType == '2'){
      setChileNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(ChileDisPercent)/100).toFixed(2))
    }else if(ChileDisType == '3'){
      setChileNetPrice((parseFloat(e.target.value) - parseFloat(ChileDisAmt)).toFixed(2))
    }else{
      setChileNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setChileListPrice(e.target.value)

  }

    // Discount Amount Chile
    const handleDefaultDiscountAmtChile = (e) =>{
      setChileDisAmt(e.target.value)
      setChileNetPrice((parseFloat(ChileListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount Chile
    const handleDefaultPercentageDiscountChile = (e) =>{
  
      setChileDisPercent(e.target.value)
  
      setChileNetPrice((parseFloat(ChileListPrice) - parseFloat(ChileListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }
  

  // ---------------------

  const [ColumbiaListPrice, setColumbiaListPrice] = useState("")
  const [ColumbiaDisType, setColumbiaDisType] = useState("")
  const [ColumbiaDisPercent, setColumbiaDisPercent] = useState("")
  const [ColumbiaDisAmt, setColumbiaDisAmt] = useState("")
  const [ColumbiaNetPrice, setColumbiaNetPrice] = useState("")


  // ---------------------
  // Discount Type Columbia
  const handleDefaultDiscountTypeColumbia = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setColumbiaNetPrice(ColumbiaListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(ColumbiaDisPercent)
      console.log(ColumbiaListPrice)

      setColumbiaNetPrice(parseFloat(ColumbiaListPrice) - parseFloat(ColumbiaListPrice) * parseFloat(ColumbiaDisPercent == "" ? 0 : ColumbiaDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setColumbiaNetPrice(parseFloat(ColumbiaListPrice) - parseFloat(ColumbiaDisAmt == "" ? 0 : ColumbiaDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setColumbiaNetPrice(ColumbiaListPrice)

    }

    setColumbiaDisType(value)
  }

  // Enter Global Price Columbia
  const handleChangeGlobalPriceColumbia = (e) => {

    console.log(e.target.value)

    if(ColumbiaDisType == '1'){
      console.log(e.target.value)
      setColumbiaNetPrice(e.target.value)
    }else if(ColumbiaDisType == '2'){
      setColumbiaNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(ColumbiaDisPercent)/100).toFixed(2))
    }else if(ColumbiaDisType == '3'){
      setColumbiaNetPrice((parseFloat(e.target.value) - parseFloat(ColumbiaDisAmt)).toFixed(2))
    }else{
      setColumbiaNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setColumbiaListPrice(e.target.value)

  }

    // Discount Amount Columbia
    const handleDefaultDiscountAmtColumbia = (e) =>{
      setColumbiaDisAmt(e.target.value)
      setColumbiaNetPrice((parseFloat(ColumbiaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount Columbia
    const handleDefaultPercentageDiscountColumbia = (e) =>{
  
      setColumbiaDisPercent(e.target.value)
  
      setColumbiaNetPrice((parseFloat(ColumbiaListPrice) - parseFloat(ColumbiaListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }
  

  // ---------------------

  const [EgyptListPrice, setEgyptListPrice] = useState("")
  const [EgyptDisType, setEgyptDisType] = useState("")
  const [EgyptDisPercent, setEgyptDisPercent] = useState("")
  const [EgyptDisAmt, setEgyptDisAmt] = useState("")
  const [EgyptNetPrice, setEgyptNetPrice] = useState("")


    // ---------------------
  // Discount Type Egypt
  const handleDefaultDiscountTypeEgypt = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setEgyptNetPrice(EgyptListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(EgyptDisPercent)
      console.log(EgyptListPrice)

      setEgyptNetPrice(parseFloat(EgyptListPrice) - parseFloat(EgyptListPrice) * parseFloat(EgyptDisPercent == "" ? 0 : EgyptDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setEgyptNetPrice(parseFloat(EgyptListPrice) - parseFloat(EgyptDisAmt == "" ? 0 : EgyptDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setEgyptNetPrice(EgyptListPrice)

    }

    setEgyptDisType(value)
  }

  // Enter Global Price Egypt
  const handleChangeGlobalPriceEgypt = (e) => {

    console.log(e.target.value)

    if(EgyptDisType == '1'){
      console.log(e.target.value)
      setEgyptNetPrice(e.target.value)
    }else if(EgyptDisType == '2'){
      setEgyptNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(EgyptDisPercent)/100).toFixed(2))
    }else if(EgyptDisType == '3'){
      setEgyptNetPrice((parseFloat(e.target.value) - parseFloat(EgyptDisAmt)).toFixed(2))
    }else{
      setEgyptNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setEgyptListPrice(e.target.value)

  }

    // Discount Amount Egypt
    const handleDefaultDiscountAmtEgypt = (e) =>{
      setEgyptDisAmt(e.target.value)
      setEgyptNetPrice((parseFloat(EgyptListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount Egypt
    const handleDefaultPercentageDiscountEgypt = (e) =>{
  
      setEgyptDisPercent(e.target.value)
  
      setEgyptNetPrice((parseFloat(EgyptListPrice) - parseFloat(EgyptListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }
  

  // ---------------------

  const [EUListPrice, setEUListPrice] = useState("")
  const [EUDisType, setEUDisType] = useState("")
  const [EUDisPercent, setEUDisPercent] = useState("")
  const [EUDisAmt, setEUDisAmt] = useState("")
  const [EUNetPrice, setEUNetPrice] = useState("")

      // ---------------------
  // Discount Type EU
  const handleDefaultDiscountTypeEU = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setEUNetPrice(EUListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(EUDisPercent)
      console.log(EUListPrice)

      setEUNetPrice(parseFloat(EUListPrice) - parseFloat(EUListPrice) * parseFloat(EUDisPercent == "" ? 0 : EUDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setEUNetPrice(parseFloat(EUListPrice) - parseFloat(EUDisAmt == "" ? 0 : EUDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setEUNetPrice(EUListPrice)

    }

    setEUDisType(value)
  }

  // Enter Global Price EU
  const handleChangeGlobalPriceEU = (e) => {

    console.log(e.target.value)

    if(EUDisType == '1'){
      console.log(e.target.value)
      setEUNetPrice(e.target.value)
    }else if(EUDisType == '2'){
      setEUNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(EUDisPercent)/100).toFixed(2))
    }else if(EUDisType == '3'){
      setEUNetPrice((parseFloat(e.target.value) - parseFloat(EUDisAmt)).toFixed(2))
    }else{
      setEUNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setEUListPrice(e.target.value)

  }

    // Discount Amount EU
    const handleDefaultDiscountAmtEU = (e) =>{
      setEUDisAmt(e.target.value)
      setEUNetPrice((parseFloat(EUListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount EU
    const handleDefaultPercentageDiscountEU = (e) =>{
  
      setEUDisPercent(e.target.value)
  
      setEUNetPrice((parseFloat(EUListPrice) - parseFloat(EUListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }
  

  // ---------------------

  const [GBPListPrice, setGBPListPrice] = useState("")
  const [GBPDisType, setGBPDisType] = useState("")
  const [GBPDisPercent, setGBPDisPercent] = useState("")
  const [GBPDisAmt, setGBPDisAmt] = useState("")
  const [GBPNetPrice, setGBPNetPrice] = useState("")

  // ---------------------
  // Discount Type GBP
  const handleDefaultDiscountTypeGBP = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setGBPNetPrice(GBPListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(GBPDisPercent)
      console.log(GBPListPrice)

      setGBPNetPrice(parseFloat(GBPListPrice) - parseFloat(GBPListPrice) * parseFloat(GBPDisPercent == "" ? 0 : GBPDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setGBPNetPrice(parseFloat(GBPListPrice) - parseFloat(GBPDisAmt == "" ? 0 : GBPDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setGBPNetPrice(GBPListPrice)

    }

    setGBPDisType(value)
  }

  // Enter Global Price GBP
  const handleChangeGlobalPriceGBP = (e) => {

    console.log(e.target.value)

    if(GBPDisType == '1'){
      console.log(e.target.value)
      setGBPNetPrice(e.target.value)
    }else if(GBPDisType == '2'){
      setGBPNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(GBPDisPercent)/100).toFixed(2))
    }else if(GBPDisType == '3'){
      setGBPNetPrice((parseFloat(e.target.value) - parseFloat(GBPDisAmt)).toFixed(2))
    }else{
      setGBPNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setGBPListPrice(e.target.value)

  }

    // Discount Amount GBP
    const handleDefaultDiscountAmtGBP = (e) =>{
      setGBPDisAmt(e.target.value)
      setGBPNetPrice((parseFloat(GBPListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount GBP
    const handleDefaultPercentageDiscountGBP = (e) =>{
  
      setGBPDisPercent(e.target.value)
  
      setGBPNetPrice((parseFloat(GBPListPrice) - parseFloat(GBPListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }
  

  // ---------------------

  const [IndonesiaListPrice, setIndonesiaListPrice] = useState("")
  const [IndonesiaDisType, setIndonesiaDisType] = useState("")
  const [IndonesiaDisPercent, setIndonesiaDisPercent] = useState("")
  const [IndonesiaDisAmt, setIndonesiaDisAmt] = useState("")
  const [IndonesiaNetPrice, setIndonesiaNetPrice] = useState("")

    // ---------------------
  // Discount Type Indo
  const handleDefaultDiscountTypeIndo = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setIndonesiaNetPrice(IndonesiaListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(IndonesiaDisPercent)
      console.log(IndonesiaListPrice)

      setIndonesiaNetPrice(parseFloat(IndonesiaListPrice) - parseFloat(IndonesiaListPrice) * parseFloat(IndonesiaDisPercent == "" ? 0 : IndonesiaDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setIndonesiaNetPrice(parseFloat(IndonesiaListPrice) - parseFloat(IndonesiaDisAmt == "" ? 0 : IndonesiaDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setIndonesiaNetPrice(IndonesiaListPrice)

    }

    setIndonesiaDisType(value)
  }

  // Enter Global Price Indo
  const handleChangeGlobalPriceIndo = (e) => {

    console.log(e.target.value)

    if(IndonesiaDisType == '1'){
      console.log(e.target.value)
      setIndonesiaNetPrice(e.target.value)
    }else if(IndonesiaDisType == '2'){
      setIndonesiaNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(IndonesiaDisPercent)/100).toFixed(2))
    }else if(IndonesiaDisType == '3'){
      setIndonesiaNetPrice((parseFloat(e.target.value) - parseFloat(IndonesiaDisAmt)).toFixed(2))
    }else{
      setIndonesiaNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setIndonesiaListPrice(e.target.value)

  }

    // Discount Amount Indo
    const handleDefaultDiscountAmtIndo = (e) =>{
      setIndonesiaDisAmt(e.target.value)
      setIndonesiaNetPrice((parseFloat(IndonesiaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount GBP
    const handleDefaultPercentageDiscountIndo = (e) =>{
  
      setIndonesiaDisPercent(e.target.value)
  
      setIndonesiaNetPrice((parseFloat(IndonesiaListPrice) - parseFloat(IndonesiaListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }
  

  // ---------------------

  const [IsrealListPrice, setIsrealListPrice] = useState("")
  const [IsrealDisType, setIsrealDisType] = useState("")
  const [IsrealDisPercent, setIsrealDisPercent] = useState("")
  const [IsrealDisAmt, setIsrealDisAmt] = useState("")
  const [IsrealNetPrice, setIsrealNetPrice] = useState("")

      // ---------------------
  // Discount Type Isreal
  const handleDefaultDiscountTypeIsreal = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setIsrealNetPrice(IsrealListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(IsrealDisPercent)
      console.log(IsrealListPrice)

      setIsrealNetPrice(parseFloat(IsrealListPrice) - parseFloat(IsrealListPrice) * parseFloat(IsrealDisPercent == "" ? 0 : IsrealDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setIsrealNetPrice(parseFloat(IsrealListPrice) - parseFloat(IsrealDisAmt == "" ? 0 : IsrealDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setIsrealNetPrice(IsrealListPrice)

    }

    setIsrealDisType(value)
  }

  // Enter Global Price Isreal
  const handleChangeGlobalPriceIsreal = (e) => {

    console.log(e.target.value)

    if(IsrealDisType == '1'){
      console.log(e.target.value)
      setIsrealNetPrice(e.target.value)
    }else if(IsrealDisType == '2'){
      setIsrealNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(IsrealDisPercent)/100).toFixed(2))
    }else if(IsrealDisType == '3'){
      setIsrealNetPrice((parseFloat(e.target.value) - parseFloat(IsrealDisAmt)).toFixed(2))
    }else{
      setIsrealNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setIsrealListPrice(e.target.value)

  }

    // Discount Amount Isreal
    const handleDefaultDiscountAmtIsreal = (e) =>{
      setIsrealDisAmt(e.target.value)
      setIsrealNetPrice((parseFloat(IsrealListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount Isreal
    const handleDefaultPercentageDiscountIsreal = (e) =>{
  
      setIsrealDisPercent(e.target.value)
  
      setIsrealNetPrice((parseFloat(IsrealListPrice) - parseFloat(IsrealListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }
  

  // ---------------------

  const [IndiaListPrice, setIndiaListPrice] = useState("")
  const [IndiaDisType, setIndiaDisType] = useState("")
  const [IndiaDisPercent, setIndiaDisPercent] = useState("")
  const [IndiaDisAmt, setIndiaDisAmt] = useState("")
  const [IndiaNetPrice, setIndiaNetPrice] = useState("")

        // ---------------------
  // Discount Type India
  const handleDefaultDiscountTypeIndia = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setIndiaNetPrice(IndiaListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(IndiaDisPercent)
      console.log(IndiaListPrice)

      setIndiaNetPrice(parseFloat(IndiaListPrice) - parseFloat(IndiaListPrice) * parseFloat(IndiaDisPercent == "" ? 0 : IndiaDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setIndiaNetPrice(parseFloat(IndiaListPrice) - parseFloat(IndiaDisAmt == "" ? 0 : IndiaDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setIndiaNetPrice(IndiaListPrice)

    }

    setIndiaDisType(value)
  }

  // Enter Global Price India
  const handleChangeGlobalPriceIndia = (e) => {

    console.log(e.target.value)

    if(IndiaDisType == '1'){
      console.log(e.target.value)
      setIndiaNetPrice(e.target.value)
    }else if(IndiaDisType == '2'){
      setIndiaNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(IndiaDisPercent)/100).toFixed(2))
    }else if(IndiaDisType == '3'){
      setIndiaNetPrice((parseFloat(e.target.value) - parseFloat(IndiaDisAmt)).toFixed(2))
    }else{
      setIndiaNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setIndiaListPrice(e.target.value)

  }

    // Discount Amount India
    const handleDefaultDiscountAmtIndia = (e) =>{
      setIndiaDisAmt(e.target.value)
      setIndiaNetPrice((parseFloat(IndiaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount India
    const handleDefaultPercentageDiscountIndia = (e) =>{
  
      setIndiaDisPercent(e.target.value)
  
      setIndiaNetPrice((parseFloat(IndiaListPrice) - parseFloat(IndiaListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }

    // -------------------

  const [JapanListPrice, setJapanListPrice] = useState("")
  const [JapanDisType, setJapanDisType] = useState("")
  const [JapanDisPercent, setJapanDisPercent] = useState("")
  const [JapanDisAmt, setJapanDisAmt] = useState("")
  const [JapanNetPrice, setJapanNetPrice] = useState("")

          // ---------------------
  // Discount Type Japan
  const handleDefaultDiscountTypeJapan = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setJapanNetPrice(JapanListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(JapanDisPercent)
      console.log(JapanListPrice)

      setJapanNetPrice(parseFloat(JapanListPrice) - parseFloat(JapanListPrice) * parseFloat(JapanDisPercent == "" ? 0 : JapanDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setJapanNetPrice(parseFloat(JapanListPrice) - parseFloat(JapanDisAmt == "" ? 0 : JapanDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setJapanNetPrice(JapanListPrice)

    }

    setJapanDisType(value)
  }

  // Enter Global Price Japan
  const handleChangeGlobalPriceJapan = (e) => {

    console.log(e.target.value)

    if(JapanDisType == '1'){
      console.log(e.target.value)
      setJapanNetPrice(e.target.value)
    }else if(JapanDisType == '2'){
      setJapanNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(JapanDisPercent)/100).toFixed(2))
    }else if(JapanDisType == '3'){
      setJapanNetPrice((parseFloat(e.target.value) - parseFloat(JapanDisAmt)).toFixed(2))
    }else{
      setJapanNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setJapanListPrice(e.target.value)

  }

    // Discount Amount Japan
    const handleDefaultDiscountAmtJapan = (e) =>{
      setJapanDisAmt(e.target.value)
      setJapanNetPrice((parseFloat(JapanListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount Japan
    const handleDefaultPercentageDiscountJapan = (e) =>{
  
      setJapanDisPercent(e.target.value)
  
      setJapanNetPrice((parseFloat(JapanListPrice) - parseFloat(JapanListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }

    // -------------------

  const [SKListPrice, setSKListPrice] = useState("")
  const [SKDisType, setSKDisType] = useState("")
  const [SKDisPercent, setSKDisPercent] = useState("")
  const [SKDisAmt, setSKDisAmt] = useState("")
  const [SKNetPrice, setSKNetPrice] = useState("")

           // ---------------------
  // Discount Type SK
  const handleDefaultDiscountTypeSK = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setSKNetPrice(SKListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(SKDisPercent)
      console.log(SKListPrice)

      setSKNetPrice(parseFloat(SKListPrice) - parseFloat(SKListPrice) * parseFloat(SKDisPercent == "" ? 0 : SKDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setSKNetPrice(parseFloat(SKListPrice) - parseFloat(SKDisAmt == "" ? 0 : SKDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setSKNetPrice(SKListPrice)

    }

    setSKDisType(value)
  }

  // Enter Global Price SK
  const handleChangeGlobalPriceSK = (e) => {

    console.log(e.target.value)

    if(SKDisType == '1'){
      console.log(e.target.value)
      setSKNetPrice(e.target.value)
    }else if(SKDisType == '2'){
      setSKNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(SKDisPercent)/100).toFixed(2))
    }else if(SKDisType == '3'){
      setSKNetPrice((parseFloat(e.target.value) - parseFloat(SKDisAmt)).toFixed(2))
    }else{
      setSKNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setSKListPrice(e.target.value)

  }

    // Discount Amount SK
    const handleDefaultDiscountAmtSK = (e) =>{
      setSKDisAmt(e.target.value)
      setSKNetPrice((parseFloat(SKListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount SK
    const handleDefaultPercentageDiscountSK = (e) =>{
  
      setSKDisPercent(e.target.value)
  
      setSKNetPrice((parseFloat(SKListPrice) - parseFloat(SKListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }

    // -------------------

  const [MexicoListPrice, setMexicoListPrice] = useState("")
  const [MexicoDisType, setMexicoDisType] = useState("")
  const [MexicoDisPercent, setMexicoDisPercent] = useState("")
  const [MexicoDisAmt, setMexicoDisAmt] = useState("")
  const [MexicoNetPrice, setMexicoNetPrice] = useState("")


             // ---------------------
  // Discount Type Mexico
  const handleDefaultDiscountTypeMexico = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setMexicoNetPrice(MexicoListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(MexicoDisPercent)
      console.log(MexicoListPrice)

      setMexicoNetPrice(parseFloat(MexicoListPrice) - parseFloat(MexicoListPrice) * parseFloat(MexicoDisPercent == "" ? 0 : MexicoDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setMexicoNetPrice(parseFloat(MexicoListPrice) - parseFloat(MexicoDisAmt == "" ? 0 : MexicoDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setMexicoNetPrice(MexicoListPrice)

    }

    setMexicoDisType(value)
  }

  // Enter Global Price Mexico
  const handleChangeGlobalPriceMexico = (e) => {

    console.log(e.target.value)

    if(MexicoDisType == '1'){
      console.log(e.target.value)
      setMexicoNetPrice(e.target.value)
    }else if(MexicoDisType == '2'){
      setMexicoNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(MexicoDisPercent)/100).toFixed(2))
    }else if(MexicoDisType == '3'){
      setMexicoNetPrice((parseFloat(e.target.value) - parseFloat(MexicoDisAmt)).toFixed(2))
    }else{
      setMexicoNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setMexicoListPrice(e.target.value)

  }

    // Discount Amount Mexico
    const handleDefaultDiscountAmtMexico = (e) =>{
      setMexicoDisAmt(e.target.value)
      setMexicoNetPrice((parseFloat(MexicoListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount Mexico
    const handleDefaultPercentageDiscountMexico = (e) =>{
  
      setMexicoDisPercent(e.target.value)
  
      setMexicoNetPrice((parseFloat(MexicoListPrice) - parseFloat(MexicoListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }

    // -------------------

  const [MalaysiaListPrice, setMalaysiaListPrice] = useState("")
  const [MalaysiaDisType, setMalaysiaDisType] = useState("")
  const [MalaysiaDisPercent, setMalaysiaDisPercent] = useState("")
  const [MalaysiaDisAmt, setMalaysiaDisAmt] = useState("")
  const [MalaysiaNetPrice, setMalaysiaNetPrice] = useState("")

               // ---------------------
  // Discount Type Malaysia
  const handleDefaultDiscountTypeMalaysia = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setMalaysiaNetPrice(MalaysiaListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(MalaysiaDisPercent)
      console.log(MalaysiaListPrice)

      setMalaysiaNetPrice(parseFloat(MalaysiaListPrice) - parseFloat(MalaysiaListPrice) * parseFloat(MalaysiaDisPercent == "" ? 0 : MalaysiaDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setMalaysiaNetPrice(parseFloat(MalaysiaListPrice) - parseFloat(MalaysiaDisAmt == "" ? 0 : MalaysiaDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setMalaysiaNetPrice(MalaysiaListPrice)

    }

    setMalaysiaDisType(value)
  }

  // Enter Global Price Malaysia
  const handleChangeGlobalPriceMalaysia = (e) => {

    console.log(e.target.value)

    if(MalaysiaDisType == '1'){
      console.log(e.target.value)
      setMalaysiaNetPrice(e.target.value)
    }else if(MalaysiaDisType == '2'){
      setMalaysiaNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(MalaysiaDisPercent)/100).toFixed(2))
    }else if(MalaysiaDisType == '3'){
      setMalaysiaNetPrice((parseFloat(e.target.value) - parseFloat(MalaysiaDisAmt)).toFixed(2))
    }else{
      setMalaysiaNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setMalaysiaListPrice(e.target.value)

  }

    // Discount Amount Malaysia
    const handleDefaultDiscountAmtMalaysia = (e) =>{
      setMalaysiaDisAmt(e.target.value)
      setMalaysiaNetPrice((parseFloat(MalaysiaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount Malaysia
    const handleDefaultPercentageDiscountMalaysia = (e) =>{
  
      setMalaysiaDisPercent(e.target.value)
  
      setMalaysiaNetPrice((parseFloat(MalaysiaListPrice) - parseFloat(MalaysiaListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }

    // -------------------

  const [NigeriaListPrice, setNigeriaListPrice] = useState("")
  const [NigeriaDisType, setNigeriaDisType] = useState("")
  const [NigeriaDisPercent, setNigeriaDisPercent] = useState("")
  const [NigeriaDisAmt, setNigeriaDisAmt] = useState("")
  const [NIgeriaNetPrice, setNIgeriaNetPrice] = useState("")

        // ---------------------
  // Discount Type Nigeria
  const handleDefaultDiscountTypeNigeria = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setNIgeriaNetPrice(NigeriaListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(NigeriaDisPercent)
      console.log(NigeriaListPrice)

      setNIgeriaNetPrice(parseFloat(NigeriaListPrice) - parseFloat(NigeriaListPrice) * parseFloat(NigeriaDisPercent == "" ? 0 : MalaysiaDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setNIgeriaNetPrice(parseFloat(NigeriaListPrice) - parseFloat(NigeriaDisAmt == "" ? 0 : NigeriaDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setNIgeriaNetPrice(NigeriaListPrice)

    }

    setNigeriaDisType(value)
  }

  // Enter Global Price Nigeria
  const handleChangeGlobalPriceNigeria = (e) => {

    console.log(e.target.value)

    if(NigeriaDisType == '1'){
      console.log(e.target.value)
      setNIgeriaNetPrice(e.target.value)
    }else if(NigeriaDisType == '2'){
      setNIgeriaNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(NigeriaDisPercent)/100).toFixed(2))
    }else if(NigeriaDisType == '3'){
      setNIgeriaNetPrice((parseFloat(e.target.value) - parseFloat(NigeriaDisAmt)).toFixed(2))
    }else{
      setNIgeriaNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setNigeriaListPrice(e.target.value)

  }

    // Discount Amount Nigeria
    const handleDefaultDiscountAmtNigeria = (e) =>{
      setNigeriaDisAmt(e.target.value)
      setNIgeriaNetPrice((parseFloat(NigeriaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount Nigeria
    const handleDefaultPercentageDiscountNigeria = (e) =>{
  
      setNigeriaDisPercent(e.target.value)
  
      setNIgeriaNetPrice((parseFloat(NigeriaListPrice) - parseFloat(NigeriaListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }

    // -------------------

  const [NorwayListPrice, setNorwayListPrice] = useState("")
  const [NorwayDisType, setNorwayDisType] = useState("")
  const [NorwayDisPercent, setNorwayDisPercent] = useState("")
  const [NorwayDisAmt, setNorwayDisAmt] = useState("")
  const [NorwayNetPrice, setNorwayNetPrice] = useState("")


          // ---------------------
  // Discount Type Norway
  const handleDefaultDiscountTypeNorway = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setNorwayNetPrice(NorwayListPrice)

    }else if(value == '2'){

      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(true)
      // setshowDefaultValueDiscountInput(false)
      console.log(NorwayDisPercent)
      console.log(NorwayListPrice)

      setNorwayNetPrice(parseFloat(NorwayListPrice) - parseFloat(NorwayListPrice) * parseFloat(NorwayDisPercent == "" ? 0 : NorwayDisPercent)/100)


    }else if(value == '3'){
      // setshowDefaultDiscountInput(true)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(true)

      setNorwayNetPrice(parseFloat(NorwayListPrice) - parseFloat(NorwayDisAmt == "" ? 0 : NorwayDisAmt))

    }else{
      // setshowDefaultDiscountInput(false)
      // setshowDefaultPercentDiscountInput(false)
      // setshowDefaultValueDiscountInput(false)
      setNorwayNetPrice(NorwayListPrice)

    }

    setNorwayDisType(value)
  }

  // Enter Global Price Norway
  const handleChangeGlobalPriceNorway = (e) => {

    console.log(e.target.value)

    if(NorwayDisType == '1'){
      console.log(e.target.value)
      setNorwayNetPrice(e.target.value)
    }else if(NorwayDisType == '2'){
      setNorwayNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(NorwayDisPercent)/100).toFixed(2))
    }else if(NorwayDisType == '3'){
      setNorwayNetPrice((parseFloat(e.target.value) - parseFloat(NorwayDisAmt)).toFixed(2))
    }else{
      setNorwayNetPrice(e.target.value == "" ? 0 : e.target.value)
    }

    setNorwayListPrice(e.target.value)

  }

    // Discount Amount Norway
    const handleDefaultDiscountAmtNorway = (e) =>{
      setNorwayDisAmt(e.target.value)
      setNorwayNetPrice((parseFloat(NorwayListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)
    }
    
  // Percentage Discount Norway
    const handleDefaultPercentageDiscountNorway = (e) =>{
  
      setNorwayDisPercent(e.target.value)
  
      setNorwayNetPrice((parseFloat(NorwayListPrice) - parseFloat(NorwayListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

      console.log(e.target.value)
  
    }

    // -------------------

  const [PeruListPrice, setPeruListPrice] = useState("")
  const [PeruDisType, setPeruDisType] = useState("")
  const [PeruDisPercent, setPeruDisPercent] = useState("")
  const [PeruDisAmt, setPeruDisAmt] = useState("")
  const [PeruNetPrice, setPeruNetPrice] = useState("")
  
         // ---------------------
    // Discount Type Peru
    const handleDefaultDiscountTypePeru = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setPeruNetPrice(PeruListPrice)

      }else if(value == '2'){

        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(true)
        // setshowDefaultValueDiscountInput(false)
        console.log(PeruDisPercent)
        console.log(PeruListPrice)

        setPeruNetPrice(parseFloat(PeruListPrice) - parseFloat(PeruListPrice) * parseFloat(PeruDisPercent == "" ? 0 : PeruDisPercent)/100)


      }else if(value == '3'){
        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(true)

        setPeruNetPrice(parseFloat(PeruListPrice) - parseFloat(PeruDisAmt == "" ? 0 : PeruDisAmt))

      }else{
        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setPeruNetPrice(PeruListPrice)

      }

      setPeruDisType(value)
    }

    // Enter Global Price Peru
    const handleChangeGlobalPricePeru = (e) => {

      console.log(e.target.value)

      if(PeruDisType == '1'){
        console.log(e.target.value)
        setPeruNetPrice(e.target.value)
      }else if(PeruDisType == '2'){
        setPeruNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(PeruDisPercent)/100).toFixed(2))
      }else if(PeruDisType == '3'){
        setPeruNetPrice((parseFloat(e.target.value) - parseFloat(PeruDisAmt)).toFixed(2))
      }else{
        setPeruNetPrice(e.target.value == "" ? 0 : e.target.value)
      }

      setPeruListPrice(e.target.value)

    }

      // Discount Amount Peru
      const handleDefaultDiscountAmtPeru = (e) =>{
        setPeruDisAmt(e.target.value)
        setPeruNetPrice((parseFloat(PeruListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)
      }
      
    // Percentage Discount Peru
      const handleDefaultPercentageDiscountPeru = (e) =>{
    
        setPeruDisPercent(e.target.value)
    
        setPeruNetPrice((parseFloat(PeruListPrice) - parseFloat(PeruListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

        console.log(e.target.value)
    
      }

    // -------------------

  const [PhilipinesListPrice, setPhilipinesListPrice] = useState("")
  const [PhilipinesDisType, setPhilipinesDisType] = useState("")
  const [PhilipinesDisPercent, setPhilipinesDisPercent] = useState("")
  const [PhiliphinesDisAmt, setPhiliphinesDisAmt] = useState("")
  const [PhilipinesNetPrice, setPhilipinesNetPrice] = useState("")


          // ---------------------
    // Discount Type Philipines
    const handleDefaultDiscountTypePhilipines = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setPhilipinesNetPrice(PhilipinesListPrice)

      }else if(value == '2'){

        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(true)
        // setshowDefaultValueDiscountInput(false)
        console.log(PhilipinesDisPercent)
        console.log(PhilipinesListPrice)

        setPhilipinesNetPrice(parseFloat(PhilipinesListPrice) - parseFloat(PhilipinesListPrice) * parseFloat(PhilipinesDisPercent == "" ? 0 : PhilipinesDisPercent)/100)


      }else if(value == '3'){
        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(true)

        setPhilipinesNetPrice(parseFloat(PhilipinesListPrice) - parseFloat(PhiliphinesDisAmt == "" ? 0 : PhiliphinesDisAmt))

      }else{
        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setPhilipinesNetPrice(PhilipinesListPrice)

      }

      setPhilipinesDisType(value)
    }

    // Enter Global Price Philipines
    const handleChangeGlobalPricePhilipines = (e) => {

      console.log(e.target.value)

      if(PhilipinesDisType == '1'){
        console.log(e.target.value)
        setPhilipinesNetPrice(e.target.value)
      }else if(PhilipinesDisType == '2'){
        setPhilipinesNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(PhilipinesDisPercent)/100).toFixed(2))
      }else if(PhilipinesDisType == '3'){
        setPhilipinesNetPrice((parseFloat(e.target.value) - parseFloat(PhiliphinesDisAmt)).toFixed(2))
      }else{
        setPhilipinesNetPrice(e.target.value == "" ? 0 : e.target.value)
      }

      setPhilipinesListPrice(e.target.value)

    }

      // Discount Amount Philipines
      const handleDefaultDiscountAmtPhilipines = (e) =>{
        setPhiliphinesDisAmt(e.target.value)
        setPhilipinesNetPrice((parseFloat(PhilipinesListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)
      }
      
    // Percentage Discount Philipines
      const handleDefaultPercentageDiscountPhilipines = (e) =>{
    
        setPhilipinesDisPercent(e.target.value)
    
        setPhilipinesNetPrice((parseFloat(PhilipinesListPrice) - parseFloat(PhilipinesListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

        console.log(e.target.value)
    
      }

    // -------------------

  const [PolandListPrice, setPolandListPrice] = useState("")
  const [PolandDisType, setPolandDisType] = useState("")
  const [PolandDisPercent, setPolandDisPercent] = useState("")
  const [PolandDisAmt, setPolandDisAmt] = useState("")
  const [PolandNetPrice, setPolandNetPrice] = useState("")


          // ---------------------
    // Discount Type Poland
    const handleDefaultDiscountTypePoland = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setPolandNetPrice(PolandListPrice)

      }else if(value == '2'){

        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(true)
        // setshowDefaultValueDiscountInput(false)
        console.log(PolandDisPercent)
        console.log(PolandListPrice)

        setPolandNetPrice(parseFloat(PolandListPrice) - parseFloat(PolandListPrice) * parseFloat(PolandDisPercent == "" ? 0 : PolandDisPercent)/100)


      }else if(value == '3'){
        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(true)

        setPolandNetPrice(parseFloat(PolandListPrice) - parseFloat(PolandDisAmt == "" ? 0 : PolandDisAmt))

      }else{
        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setPolandNetPrice(PolandListPrice)

      }

      setPolandDisType(value)
    }

    // Enter Global Price Poland
    const handleChangeGlobalPricePoland = (e) => {

      console.log(e.target.value)

      if(PolandDisType == '1'){
        console.log(e.target.value)
        setPolandNetPrice(e.target.value)
      }else if(PolandDisType == '2'){
        setPolandNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(PolandDisPercent)/100).toFixed(2))
      }else if(PolandDisType == '3'){
        setPolandNetPrice((parseFloat(e.target.value) - parseFloat(PolandDisAmt)).toFixed(2))
      }else{
        setPolandNetPrice(e.target.value == "" ? 0 : e.target.value)
      }

      setPolandListPrice(e.target.value)

    }

      // Discount Amount Poland
      const handleDefaultDiscountAmtPoland = (e) =>{
        setPolandDisAmt(e.target.value)
        setPolandNetPrice((parseFloat(PolandListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)
      }
      
    // Percentage Discount Poland
      const handleDefaultPercentageDiscountPoland = (e) =>{
    
        setPolandDisPercent(e.target.value)
    
        setPolandNetPrice((parseFloat(PolandListPrice) - parseFloat(PolandListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

        console.log(e.target.value)
    
      }

    // -------------------


  const [RomaniaListPrice, setRomaniaListPrice] = useState("")
  const [RomaniaDisType, setRomaniaDisType] = useState("")
  const [RomaniaDisPercent, setRomaniaDisPercent] = useState("")
  const [RomaniaDisAmt, setRomaniaDisAmt] = useState("")
  const [RomaniaNetPrice, setRomaniaNetPrice] = useState("")

            // ---------------------
    // Discount Type Romania
    const handleDefaultDiscountTypeRomania = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setRomaniaNetPrice(RomaniaListPrice)

      }else if(value == '2'){

        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(true)
        // setshowDefaultValueDiscountInput(false)
        console.log(RomaniaDisPercent)
        console.log(RomaniaListPrice)

        setRomaniaNetPrice(parseFloat(RomaniaListPrice) - parseFloat(RomaniaListPrice) * parseFloat(RomaniaDisPercent == "" ? 0 : RomaniaDisPercent)/100)


      }else if(value == '3'){
        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(true)

        setRomaniaNetPrice(parseFloat(RomaniaListPrice) - parseFloat(RomaniaDisAmt == "" ? 0 : RomaniaDisAmt))

      }else{
        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setRomaniaNetPrice(RomaniaListPrice)

      }

      setRomaniaDisType(value)
    }

    // Enter Global Price Romania
    const handleChangeGlobalPriceRomania = (e) => {

      console.log(e.target.value)

      if(RomaniaDisType == '1'){
        console.log(e.target.value)
        setRomaniaNetPrice(e.target.value)
      }else if(RomaniaDisType == '2'){
        setRomaniaNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(RomaniaDisPercent)/100).toFixed(2))
      }else if(RomaniaDisType == '3'){
        setRomaniaNetPrice((parseFloat(e.target.value) - parseFloat(RomaniaDisAmt)).toFixed(2))
      }else{
        setRomaniaNetPrice(e.target.value == "" ? 0 : e.target.value)
      }

      setRomaniaListPrice(e.target.value)

    }

      // Discount Amount Romania
      const handleDefaultDiscountAmtRomania = (e) =>{
        setRomaniaDisAmt(e.target.value)
        setRomaniaNetPrice((parseFloat(RomaniaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)
      }
      
    // Percentage Discount Romania
      const handleDefaultPercentageDiscountRomania = (e) =>{
    
        setRomaniaDisPercent(e.target.value)
    
        setRomaniaNetPrice((parseFloat(RomaniaListPrice) - parseFloat(RomaniaListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

        console.log(e.target.value)
    
      }

    // -------------------

  const [RussiaListPrice, setRussiaListPrice] = useState("")
  const [RussiaDisType, setRussiaDisType] = useState("")
  const [RussiaDisDisPercent, setRussiaDisDisPercent] = useState("")
  const [RussiaDisAmt, setRussiaDisAmt] = useState("")
  const [RussiaNetPrice, setRussiaNetPrice] = useState("")

          // ---------------------
    // Discount Type Russia
    const handleDefaultDiscountTypeRussia = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setRussiaNetPrice(RussiaListPrice)

      }else if(value == '2'){

        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(true)
        // setshowDefaultValueDiscountInput(false)
        console.log(RussiaDisDisPercent)
        console.log(RussiaListPrice)

        setRussiaNetPrice(parseFloat(RussiaListPrice) - parseFloat(RussiaListPrice) * parseFloat(RussiaDisDisPercent == "" ? 0 : RussiaDisDisPercent)/100)


      }else if(value == '3'){
        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(true)

        setRussiaNetPrice(parseFloat(RussiaListPrice) - parseFloat(RussiaDisAmt == "" ? 0 : RussiaDisAmt))

      }else{
        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setRussiaNetPrice(RussiaListPrice)

      }

      setRussiaDisType(value)
    }

    // Enter Global Price Russia
    const handleChangeGlobalPriceRussia = (e) => {

      console.log(e.target.value)

      if(RussiaDisType == '1'){
        console.log(e.target.value)
        setRussiaNetPrice(e.target.value)
      }else if(RussiaDisType == '2'){
        setRussiaNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(RussiaDisDisPercent)/100).toFixed(2))
      }else if(RussiaDisType == '3'){
        setRussiaNetPrice((parseFloat(e.target.value) - parseFloat(RussiaDisAmt)).toFixed(2))
      }else{
        setRussiaNetPrice(e.target.value == "" ? 0 : e.target.value)
      }

      setRussiaListPrice(e.target.value)

    }

      // Discount Amount Russia
      const handleDefaultDiscountAmtRussia = (e) =>{
        setRussiaDisAmt(e.target.value)
        setRussiaNetPrice((parseFloat(RussiaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)
      }
      
    // Percentage Discount Russia
      const handleDefaultPercentageDiscountRussia = (e) =>{
    
        setRussiaDisDisPercent(e.target.value)
    
        setRussiaNetPrice((parseFloat(RussiaListPrice) - parseFloat(RussiaListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

        console.log(e.target.value)
    
      }

    // -------------------

  const [SingaporeListPrice, setSingaporeListPrice] = useState("")
  const [SingaporeDisType, setSingaporeDisType] = useState("")
  const [SingaporeDisPercent, setSingaporeDisPercent] = useState("")
  const [SingaporeDisAmt, setSingaporeDisAmt] = useState("")
  const [SingaporeNetPrice, setSingaporeNetPrice] = useState("")

          // ---------------------
    // Discount Type Singapore
    const handleDefaultDiscountTypeSingapore = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setSingaporeNetPrice(SingaporeListPrice)

      }else if(value == '2'){

        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(true)
        // setshowDefaultValueDiscountInput(false)
        console.log(SingaporeDisPercent)
        console.log(SingaporeListPrice)

        setSingaporeNetPrice(parseFloat(SingaporeListPrice) - parseFloat(SingaporeListPrice) * parseFloat(SingaporeDisPercent == "" ? 0 : SingaporeDisPercent)/100)


      }else if(value == '3'){
        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(true)

        setSingaporeNetPrice(parseFloat(SingaporeListPrice) - parseFloat(SingaporeDisAmt == "" ? 0 : SingaporeDisAmt))

      }else{
        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setSingaporeNetPrice(SingaporeListPrice)

      }

      setSingaporeDisType(value)
    }

    // Enter Global Price Singapore
    const handleChangeGlobalPriceSingapore = (e) => {

      console.log(e.target.value)

      if(SingaporeDisType == '1'){
        console.log(e.target.value)
        setSingaporeNetPrice(e.target.value)
      }else if(SingaporeDisType == '2'){
        setSingaporeNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(SingaporeDisPercent)/100).toFixed(2))
      }else if(SingaporeDisType == '3'){
        setSingaporeNetPrice((parseFloat(e.target.value) - parseFloat(SingaporeDisAmt)).toFixed(2))
      }else{
        setSingaporeNetPrice(e.target.value == "" ? 0 : e.target.value)
      }

      setSingaporeListPrice(e.target.value)

    }

      // Discount Amount Singapore
      const handleDefaultDiscountAmtSingapore = (e) =>{
        setSingaporeDisAmt(e.target.value)
        setSingaporeNetPrice((parseFloat(SingaporeListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)
      }
      
    // Percentage Discount Singapore
      const handleDefaultPercentageDiscountSingapore = (e) =>{
    
        setSingaporeDisPercent(e.target.value)
    
        setSingaporeNetPrice((parseFloat(SingaporeListPrice) - parseFloat(SingaporeListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

        console.log(e.target.value)
    
      }

    // -------------------

  const [ThailandListPrice, setThailandListPrice] = useState("")
  const [ThailandDisType, setThailandDisType] = useState("")
  const [ThailandDisPercent, setThailandDisPercent] = useState("")
  const [ThailandDisAmt, setThailandDisAmt] = useState("")
  const [ThailandNetPrice, setThailandNetPrice] = useState("")

        // ---------------------
    // Discount Type Thailand
    const handleDefaultDiscountTypeThailand = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setThailandNetPrice(ThailandListPrice)

      }else if(value == '2'){

        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(true)
        // setshowDefaultValueDiscountInput(false)
        console.log(ThailandDisPercent)
        console.log(ThailandListPrice)

        setThailandNetPrice(parseFloat(ThailandListPrice) - parseFloat(ThailandListPrice) * parseFloat(ThailandDisPercent == "" ? 0 : ThailandDisPercent)/100)


      }else if(value == '3'){
        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(true)

        setThailandNetPrice(parseFloat(ThailandListPrice) - parseFloat(ThailandDisAmt == "" ? 0 : ThailandDisAmt))

      }else{
        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setThailandNetPrice(ThailandListPrice)

      }

      setThailandDisType(value)
    }

    // Enter Global Price Thailand
    const handleChangeGlobalPriceThailand = (e) => {

      console.log(e.target.value)

      if(ThailandDisType == '1'){
        console.log(e.target.value)
        setThailandNetPrice(e.target.value)
      }else if(ThailandDisType == '2'){
        setThailandNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(ThailandDisPercent)/100).toFixed(2))
      }else if(ThailandDisType == '3'){
        setThailandNetPrice((parseFloat(e.target.value) - parseFloat(ThailandDisAmt)).toFixed(2))
      }else{
        setThailandNetPrice(e.target.value == "" ? 0 : e.target.value)
      }

      setThailandListPrice(e.target.value)

    }

      // Discount Amount Thailand
      const handleDefaultDiscountAmtThailand = (e) =>{
        setThailandDisAmt(e.target.value)
        setThailandNetPrice((parseFloat(ThailandListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)
      }
      
    // Percentage Discount Thailand
      const handleDefaultPercentageDiscountThailand = (e) =>{
    
        setThailandDisPercent(e.target.value)
    
        setThailandNetPrice((parseFloat(ThailandListPrice) - parseFloat(ThailandListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

        console.log(e.target.value)
    
      }

    // -------------------

  const [TurkeyListPrice, setTurkeyListPrice] = useState("")
  const [TurkeyDisType, setTurkeyDisType] = useState("")
  const [TurkeyDisPercent, setTurkeyDisPercent] = useState("")
  const [TurkeyDisAmt, setTurkeyDisAmt] = useState("")
  const [TurkeyNetPrice, setTurkeyNetPrice] = useState("")

          // ---------------------
    // Discount Type Turkey
    const handleDefaultDiscountTypeTurkey = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setTurkeyNetPrice(TurkeyListPrice)

      }else if(value == '2'){

        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(true)
        // setshowDefaultValueDiscountInput(false)
        console.log(TurkeyDisPercent)
        console.log(TurkeyListPrice)

        setTurkeyNetPrice(parseFloat(TurkeyListPrice) - parseFloat(TurkeyListPrice) * parseFloat(TurkeyDisPercent == "" ? 0 : TurkeyDisPercent)/100)


      }else if(value == '3'){
        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(true)

        setTurkeyNetPrice(parseFloat(TurkeyListPrice) - parseFloat(TurkeyDisAmt == "" ? 0 : TurkeyDisAmt))

      }else{
        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setTurkeyNetPrice(TurkeyListPrice)

      }

      setTurkeyDisType(value)
    }

    // Enter Global Price Turkey
    const handleChangeGlobalPriceTurkey = (e) => {

      console.log(e.target.value)

      if(TurkeyDisType == '1'){
        console.log(e.target.value)
        setTurkeyNetPrice(e.target.value)
      }else if(TurkeyDisType == '2'){
        setTurkeyNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(TurkeyDisPercent)/100).toFixed(2))
      }else if(TurkeyDisType == '3'){
        setTurkeyNetPrice((parseFloat(e.target.value) - parseFloat(TurkeyDisAmt)).toFixed(2))
      }else{
        setTurkeyNetPrice(e.target.value == "" ? 0 : e.target.value)
      }

      setTurkeyListPrice(e.target.value)

    }

      // Discount Amount Turkey
      const handleDefaultDiscountAmtTurkey = (e) =>{
        setTurkeyDisAmt(e.target.value)
        setTurkeyNetPrice((parseFloat(TurkeyListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)
      }
      
    // Percentage Discount Turkey
      const handleDefaultPercentageDiscountTurkey = (e) =>{
    
        setTurkeyDisPercent(e.target.value)
    
        setTurkeyNetPrice((parseFloat(TurkeyListPrice) - parseFloat(TurkeyListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

        console.log(e.target.value)
    
      }

    // -------------------

  const [TaiwanListPrice, setTaiwanListPrice] = useState("")
  const [TaiwanDisType, setTaiwanDisType] = useState("")
  const [TaiwanDisPercent, setTaiwanDisPercent] = useState("")
  const [TaiwanDisAmt, setTaiwanDisAmt] = useState("")
  const [TaiwanNetPrice, setTaiwanNetPrice] = useState("")

           // ---------------------
    // Discount Type Taiwan
    const handleDefaultDiscountTypeTaiwan = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setTaiwanNetPrice(TaiwanListPrice)

      }else if(value == '2'){

        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(true)
        // setshowDefaultValueDiscountInput(false)
        console.log(TaiwanDisType)
        console.log(TaiwanListPrice)

        setTaiwanNetPrice(parseFloat(TaiwanListPrice) - parseFloat(TaiwanListPrice) * parseFloat(TaiwanDisType == "" ? 0 : TaiwanDisType)/100)


      }else if(value == '3'){
        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(true)

        setTaiwanNetPrice(parseFloat(TaiwanListPrice) - parseFloat(TaiwanDisAmt == "" ? 0 : TaiwanDisAmt))

      }else{
        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setTaiwanNetPrice(TaiwanListPrice)

      }

      setTaiwanDisType(value)
    }

    // Enter Global Price Taiwan
    const handleChangeGlobalPriceTaiwan = (e) => {

      console.log(e.target.value)

      if(TaiwanDisType == '1'){
        console.log(e.target.value)
        setTaiwanNetPrice(e.target.value)
      }else if(TaiwanDisType == '2'){
        setTaiwanNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(TaiwanDisPercent)/100).toFixed(2))
      }else if(TaiwanDisType == '3'){
        setTaiwanNetPrice((parseFloat(e.target.value) - parseFloat(TaiwanDisAmt)).toFixed(2))
      }else{
        setTaiwanNetPrice(e.target.value == "" ? 0 : e.target.value)
      }

      setTaiwanListPrice(e.target.value)

    }

      // Discount Amount Taiwan
      const handleDefaultDiscountAmtTaiwan = (e) =>{
        setTaiwanDisAmt(e.target.value)
        setTaiwanNetPrice((parseFloat(TaiwanListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)
      }
      
    // Percentage Discount Taiwan
      const handleDefaultPercentageDiscountTaiwan = (e) =>{
    
        setTaiwanDisPercent(e.target.value)
    
        setTaiwanNetPrice((parseFloat(TaiwanListPrice) - parseFloat(TaiwanListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

        console.log(e.target.value)
    
      }

    // -------------------

  const [VietnamListPrice, setVietnamListPrice] = useState("")
  const [VietmanDisType, setVietmanDisType] = useState("")
  const [VietnamDisPercent, setVietnamDisPercent] = useState("")
  const [VietnamDisAmt, setVietnamDisAmt] = useState("")
  const [VietnamNetPrice, setVietnamNetPrice] = useState("")

        // ---------------------
    // Discount Type Vietnam
    const handleDefaultDiscountTypeVietnam = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setVietnamNetPrice(VietnamListPrice)

      }else if(value == '2'){

        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(true)
        // setshowDefaultValueDiscountInput(false)
        console.log(VietmanDisType)
        console.log(VietnamListPrice)

        setVietnamNetPrice(parseFloat(VietnamListPrice) - parseFloat(VietnamListPrice) * parseFloat(VietmanDisType == "" ? 0 : VietmanDisType)/100)


      }else if(value == '3'){
        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(true)

        setVietnamNetPrice(parseFloat(VietnamListPrice) - parseFloat(VietnamDisAmt == "" ? 0 : VietnamDisAmt))

      }else{
        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setVietnamNetPrice(VietnamListPrice)

      }

      setVietmanDisType(value)
    }

    // Enter Global Price Vietnam
    const handleChangeGlobalPriceVietnam = (e) => {

      console.log(e.target.value)

      if(VietmanDisType == '1'){
        console.log(e.target.value)
        setVietnamNetPrice(e.target.value)
      }else if(VietmanDisType == '2'){
        setVietnamNetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(VietnamDisPercent)/100).toFixed(2))
      }else if(VietmanDisType == '3'){
        setVietnamNetPrice((parseFloat(e.target.value) - parseFloat(VietnamDisAmt)).toFixed(2))
      }else{
        setVietnamNetPrice(e.target.value == "" ? 0 : e.target.value)
      }

      setVietnamListPrice(e.target.value)

    }

      // Discount Amount Vietnam
      const handleDefaultDiscountAmtVietnam = (e) =>{
        setVietnamDisAmt(e.target.value)
        setVietnamNetPrice((parseFloat(VietnamListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)
      }
      
    // Percentage Discount Vietnam
      const handleDefaultPercentageDiscountVietnam = (e) =>{
    
        setVietnamDisPercent(e.target.value)
    
        setVietnamNetPrice((parseFloat(VietnamListPrice) - parseFloat(VietnamListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

        console.log(e.target.value)
    
      }

    // -------------------

  const [SAListPrice, setSAListPrice] = useState("")
  const [SADisType, setSADisType] = useState("")
  const [SADisPercent, setSADisPercent] = useState("")
  const [SADisAmt, setSADisAmt] = useState("")
  const [SANetPrice, setSANetPrice] = useState("")

      // ---------------------
    // Discount Type SA
    const handleDefaultDiscountTypeSA = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setSANetPrice(SAListPrice)

      }else if(value == '2'){

        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(true)
        // setshowDefaultValueDiscountInput(false)
        console.log(SADisType)
        console.log(SAListPrice)

        setSANetPrice(parseFloat(SAListPrice) - parseFloat(SAListPrice) * parseFloat(SADisType == "" ? 0 : SADisType)/100)


      }else if(value == '3'){
        // setshowDefaultDiscountInput(true)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(true)

        setSANetPrice(parseFloat(SAListPrice) - parseFloat(SADisAmt == "" ? 0 : SADisAmt))

      }else{
        // setshowDefaultDiscountInput(false)
        // setshowDefaultPercentDiscountInput(false)
        // setshowDefaultValueDiscountInput(false)
        setSANetPrice(SAListPrice)

      }

      setSADisType(value)
    }

    // Enter Global Price SA
    const handleChangeGlobalPriceSA = (e) => {

      console.log(e.target.value)

      if(SADisType == '1'){
        console.log(e.target.value)
        setSANetPrice(e.target.value)
      }else if(SADisType == '2'){
        setSANetPrice((parseFloat(e.target.value) - parseFloat(e.target.value) * parseFloat(SADisPercent)/100).toFixed(2))
      }else if(SADisType == '3'){
        setSANetPrice((parseFloat(e.target.value) - parseFloat(SADisAmt)).toFixed(2))
      }else{
        setSANetPrice(e.target.value == "" ? 0 : e.target.value)
      }

      setSAListPrice(e.target.value)

    }

      // Discount Amount SA
      const handleDefaultDiscountAmtSA = (e) =>{
        setSADisAmt(e.target.value)
        setSANetPrice((parseFloat(SAListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)
      }
      
    // Percentage Discount SA
      const handleDefaultPercentageDiscountSA = (e) =>{
    
        setSADisPercent(e.target.value)
    
        setSANetPrice((parseFloat(SAListPrice) - parseFloat(SAListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

        console.log(e.target.value)
    
      }

    // -------------------




  
  // SUBMIT PRICES
  const handleSubmitAllPrices = () =>{
    
    console.log(inputValuesListPrice)
    console.log(selectDiscountTypeList)
    console.log(countriesData)
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
            
                <tr>
                  <td >America
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>USD</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("USD"))} 100 - ${getSymbolFromCurrency(("USD"))} 200`}</td>
                  <td>
                    <Form.Control  onChange={handleChangeGlobalPriceUSA} type="text" />
                  </td>
                  <td>
                    <Select
                    // 
                      value={USADisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeUSA}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountUSA}  type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtUSA} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{USANetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>Australia
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>AUD</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("AUD"))} 100 - ${getSymbolFromCurrency(("AUD"))} 200`}</td>
                  <td>
                    <Form.Control value={AusListPrice} onChange={handleChangeGlobalPriceAus} type="text" />
                  </td>
                  <td>
                    <Select
                      value={AusDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeAus}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtAus} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountAus} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{AusNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                
                <tr>
                  <td>Brazil
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>BRL</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("BRL"))} 100 - ${getSymbolFromCurrency(("BRL"))} 200`}</td>
                  <td>
                    <Form.Control value={BrazilListPrice} onChange={handleChangeGlobalPriceBrazil} type="text" />
                  </td>
                  <td>
                    <Select
                      value={BrazilDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeBrazil}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountBrazil} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtBrazil} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{BrazilNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>Canada
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>CAD</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("CAD"))} 100 - ${getSymbolFromCurrency(("CAD"))} 200`}</td>
                  <td>
                    <Form.Control value={CanadaListPrice} onChange={handleChangeGlobalPriceCanada} type="text" />
                  </td>
                  <td>
                    <Select
                      value={CanadaDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeCanada}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountCanada} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtCanada} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{CanadaNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>


                <tr>
                  <td>Chile
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>CLP</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("CLP"))} 100 - ${getSymbolFromCurrency(("CLP"))} 200`}</td>
                  <td>
                    <Form.Control value={ChileListPrice} onChange={handleChangeGlobalPriceChile} type="text" />
                  </td>
                  <td>
                    <Select
                      value={ChileDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeChile}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountChile} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtChile} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{ChileNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>Columbia
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>COP</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("COP"))} 100 - ${getSymbolFromCurrency(("COP"))} 200`}</td>
                  <td>
                    <Form.Control value={ColumbiaListPrice} onChange={handleChangeGlobalPriceColumbia} type="text" />
                  </td>
                  <td>
                    <Select
                      value={ColumbiaDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeColumbia}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountColumbia} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtColumbia} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{ColumbiaNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>Egypt
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>EGP</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("EGP"))} 100 - ${getSymbolFromCurrency(("EGP"))} 200`}</td>
                  <td>
                    <Form.Control value={EgyptListPrice} onChange={handleChangeGlobalPriceEgypt} type="text" />
                  </td>
                  <td>
                    <Select
                      value={EgyptDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeEgypt}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountEgypt} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtEgypt} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{EgyptNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>European Union
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>EUR</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("EUR"))} 100 - ${getSymbolFromCurrency(("EUR"))} 200`}</td>
                  <td>
                    <Form.Control value={EUListPrice} onChange={handleChangeGlobalPriceEU} type="text" />
                  </td>
                  <td>
                    <Select
                      value={EUDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeEU}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountEU} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtEU} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{EUNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>
                
                <tr>
                  <td>Great Britain
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>GBP</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("GBP"))} 100 - ${getSymbolFromCurrency(("GBP"))} 200`}</td>
                  <td>
                    <Form.Control value={GBPListPrice} onChange={handleChangeGlobalPriceGBP} type="text" />
                  </td>
                  <td>
                    <Select
                      value={GBPDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeGBP}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountGBP} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtGBP} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{GBPNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>Indonesia
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>IDR</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("IDR"))} 100 - ${getSymbolFromCurrency(("IDR"))} 200`}</td>
                  <td>
                    <Form.Control value={IndonesiaListPrice} onChange={handleChangeGlobalPriceIndo} type="text" />
                  </td>
                  <td>
                    <Select
                      value={IndonesiaDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeIndo}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountIndo} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtIndo} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{IndonesiaNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>Israel
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>ILS</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("ILS"))} 100 - ${getSymbolFromCurrency(("ILS"))} 200`}</td>
                  <td>
                    <Form.Control value={IsrealListPrice} onChange={handleChangeGlobalPriceIsreal} type="text" />
                  </td>
                  <td>
                    <Select
                      value={IsrealDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeIsreal}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountIsreal} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtIsreal} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{IsrealNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>India
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>INR</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("INR"))} 100 - ${getSymbolFromCurrency(("INR"))} 200`}</td>
                  <td>
                    <Form.Control value={IndiaListPrice} onChange={handleChangeGlobalPriceIndia} type="text" />
                  </td>
                  <td>
                    <Select
                      value={IndiaDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeIndia}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountIndia} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtIndia} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{IndiaNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>Japan
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>JPY</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("JPY"))} 100 - ${getSymbolFromCurrency(("JPY"))} 200`}</td>
                  <td>
                    <Form.Control value={JapanListPrice} onChange={handleChangeGlobalPriceJapan} type="text" />
                  </td>
                  <td>
                    <Select
                      value={JapanDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeJapan}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountJapan} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtJapan} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{JapanNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>South Korea
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>KRW</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("KRW"))} 100 - ${getSymbolFromCurrency(("KRW"))} 200`}</td>
                  <td>
                    <Form.Control value={SKListPrice} onChange={handleChangeGlobalPriceSK} type="text" />
                  </td>
                  <td>
                    <Select
                      value={SKDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeSK}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountSK} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtSK} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{SKNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>Mexico
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>MXN</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("MXN"))} 100 - ${getSymbolFromCurrency(("MXN"))} 200`}</td>
                  <td>
                    <Form.Control value={MexicoListPrice} onChange={handleChangeGlobalPriceMexico} type="text" />
                  </td>
                  <td>
                    <Select
                      value={MexicoDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeMexico}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountMexico} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtMexico} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{MexicoNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>Malaysia
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>MYR</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("MYR"))} 100 - ${getSymbolFromCurrency(("MYR"))} 200`}</td>
                  <td>
                    <Form.Control value={MalaysiaListPrice} onChange={handleChangeGlobalPriceMalaysia} type="text" />
                  </td>
                  <td>
                    <Select
                      value={MalaysiaDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeMalaysia}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountMalaysia} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtMalaysia} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{MalaysiaNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr> 
                
                <tr>
                  <td>Nigeria
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>NGN</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("NGN"))} 100 - ${getSymbolFromCurrency(("NGN"))} 200`}</td>
                  <td>
                    <Form.Control value={NigeriaListPrice} onChange={handleChangeGlobalPriceNigeria} type="text" />
                  </td>
                  <td>
                    <Select
                      value={NigeriaDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeNigeria}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountNigeria} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtNigeria} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{NIgeriaNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr> 

                <tr>
                  <td>Norway
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>NOK</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("NOK"))} 100 - ${getSymbolFromCurrency(("NOK"))} 200`}</td>
                  <td>
                    <Form.Control value={NorwayListPrice} onChange={handleChangeGlobalPriceNorway} type="text" />
                  </td>
                  <td>
                    <Select
                      value={NorwayDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeNorway}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountNorway} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtNorway} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{NorwayNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                 <tr>
                  <td>Peru
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>PEN</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("PEN"))} 100 - ${getSymbolFromCurrency(("PEN"))} 200`}</td>
                  <td>
                    <Form.Control value={PeruListPrice} onChange={handleChangeGlobalPricePeru} type="text" />
                  </td>
                  <td>
                    <Select
                      value={PeruDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypePeru}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountPeru} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtPeru} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{PeruNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr> 
                  

                  <tr>
                  <td>Philippines
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>PHP</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("PHP"))} 100 - ${getSymbolFromCurrency(("PHP"))} 200`}</td>
                  <td>
                    <Form.Control value={PhilipinesListPrice} onChange={handleChangeGlobalPricePhilipines} type="text" />
                  </td>
                  <td>
                    <Select
                      value={PhilipinesDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypePhilipines}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountPhilipines} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtPhilipines} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{PhilipinesNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr> 

                <tr>
                  <td>Poland
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>PLN</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("PLN"))} 100 - ${getSymbolFromCurrency(("PLN"))} 200`}</td>
                  <td>
                    <Form.Control value={PolandListPrice} onChange={handleChangeGlobalPricePoland} type="text" />
                  </td>
                  <td>
                    <Select
                      value={PolandDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypePoland}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountPoland} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtPoland} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{PolandNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr> 

                <tr>
                  <td>Romania
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>RON</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("RON"))} 100 - ${getSymbolFromCurrency(("RON"))} 200`}</td>
                  <td>
                    <Form.Control value={RomaniaListPrice} onChange={handleChangeGlobalPriceRomania} type="text" />
                  </td>
                  <td>
                    <Select
                      value={RomaniaDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeRomania}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountRomania} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtRomania} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{RomaniaNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr> 

                <tr>
                  <td>Russia
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>RUB</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("RUB"))} 100 - ${getSymbolFromCurrency(("RUB"))} 200`}</td>
                  <td>
                    <Form.Control value={RussiaListPrice} onChange={handleChangeGlobalPriceRussia} type="text" />
                  </td>
                  <td>
                    <Select
                      value={RussiaDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeRussia}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountRussia} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtRussia}  type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{RussiaNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                <tr>
                  <td>Singapore
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>SGD</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("SGD"))} 100 - ${getSymbolFromCurrency(("SGD"))} 200`}</td>
                  <td>
                    <Form.Control value={SingaporeListPrice} onChange={handleChangeGlobalPriceSingapore} type="text" />
                  </td>
                  <td>
                    <Select
                      value={SingaporeDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeSingapore}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountSingapore} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtSingapore} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{SingaporeNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr> 

                <tr>
                  <td>Thailand
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>THB</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("THB"))} 100 - ${getSymbolFromCurrency(("THB"))} 200`}</td>
                  <td>
                    <Form.Control value={ThailandListPrice} onChange={handleChangeGlobalPriceThailand} type="text" />
                  </td>
                  <td>
                    <Select
                      value={ThailandDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeThailand}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountThailand} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtThailand} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{ThailandNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr> 

                <tr>
                  <td>Turkey
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>TRY</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("TRY"))} 100 - ${getSymbolFromCurrency(("TRY"))} 200`}</td>
                  <td>
                    <Form.Control value={TurkeyListPrice} onChange={handleChangeGlobalPriceTurkey} type="text" />
                  </td>
                  <td>
                    <Select
                      value={TurkeyDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeTurkey}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountTurkey} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtTurkey} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{TurkeyNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                   <tr>
                  <td>Taiwan
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>TWD</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("TWD"))} 100 - ${getSymbolFromCurrency(("TWD"))} 200`}</td>
                  <td>
                    <Form.Control value={TaiwanListPrice} onChange={handleChangeGlobalPriceTaiwan} type="text" />
                  </td>
                  <td>
                    <Select
                      value={TaiwanDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeTaiwan}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountTaiwan} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtTaiwan} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{TaiwanNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr>

                  <tr>
                  <td>Vietnam
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>VND</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("VND"))} 100 - ${getSymbolFromCurrency(("VND"))} 200`}</td>
                  <td>
                    <Form.Control value={VietnamListPrice} onChange={handleChangeGlobalPriceVietnam} type="text" />
                  </td>
                  <td>
                    <Select
                      value={VietmanDisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeVietnam}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountVietnam} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtVietnam} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{VietnamNetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr> 


                <tr>
                  <td>South Africa
                 <td className="col-12 font-italic mt-5">  
                  <Form.Label  className="mt-3 tit fst-italic"> Tip: Pricing around $10 may optimize sales.</Form.Label></td>
                 </td>

                  <td>KRW</td>
                  <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("KRW"))} 100 - ${getSymbolFromCurrency(("KRW"))} 200`}</td>
                  <td>
                    <Form.Control value={SAListPrice} onChange={handleChangeGlobalPriceSA} type="text" />
                  </td>
                  <td>
                    <Select
                      value={SADisType}
                      style={{ width: "100%" }}
                      onChange={handleDefaultDiscountTypeSA}
                    >
                      {dis_types.map((type)=>(
                      <Select.Option key={type.id} value={type.id}>
                        {type.name}
                      </Select.Option>
                      ))}
                    </Select>
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultPercentageDiscountSA} type="text" />
                  </td>
                  <td>
                  <Form.Control onChange={handleDefaultDiscountAmtSA} type="text" />
                  </td>
                  <td style={{whiteSpace:'nowrap'}}>
                      <h6>{SANetPrice}</h6>
                 <tr>
                 <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:$10</Form.Label>

                 </tr>
                  </td>
                
                </tr> 
                  
            </tbody>
          </table>
        </div>
        )}

      </Card>
    </div>
  );
};

export default Pricing;
