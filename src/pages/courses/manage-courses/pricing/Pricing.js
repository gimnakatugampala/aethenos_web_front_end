import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Alert from '@mui/material/Alert';
import { Select, Radio } from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import { css } from "../../manage-courses/pricing/Pricing.css";
import { GetDiscountTypes , SavePriceDefault , GetPriceDefault , GetCoursePricingType , GetCountriesListPricing, SavePriceCountries , PricingConvertToFree, GetCheckPricingAllStatus, checkPaidCourseOfSyllabus} from "../../../../api";

import getSymbolFromCurrency from 'currency-symbol-map'
import ErrorAlert from "../../../../commonFunctions/Alerts/ErrorAlert";
import formatNumber from "../../../../commonFunctions/NumberFormat";
import LoadingSpinner from "../../../../commonFunctions/loaders/Spinner/LoadingSpinner";
import ButtonSpinner from "../../../../commonFunctions/loaders/Spinner/ButtonSpinner";
import formatNumInt from "../../../../commonFunctions/formatNumInt";


 
const Pricing = ({code}) => {

  const numberOnlyRegex = /^[0-9]+$/;

    // Select Free Or Paid Course
    const [Paid_Type, setPaid_Type] = useState("")

    const [VideoLength, setVideoLength] = useState(0)
    const [NoOfLessons, setNoOfLessons] = useState(0)

    const onChangePaidType = (e) => {
      setPaid_Type(e.target.value);
    };
  


  const [dis_types, setdis_types] = useState([])

  const [loading_btn, setloading_btn] = useState(true)
  const [loading_button, setloading_button] = useState()

  const [countriesData, setcountriesData] = useState(null)

  const [DGlobalPricing, setDGlobalPricing] = useState("")
  const [DDisType, setDDisType] = useState("")
  const [DDisPercent, setDDisPercent] = useState(0)
  const [DDisAmt, setDDisAmt] = useState(0)
  const [DGlobalNetPrice, setDGlobalNetPrice] = useState("")

  const [MinDefaultValue, setMinDefaultValue] = useState("")

  const [PriceRangeMinDefault, setPriceRangeMinDefault] = useState("")
  const [PriceRangeMaxDefault, setPriceRangeMaxDefault] = useState("")

  const [GlobalTip, setGlobalTip] = useState("")

  // const [checkPricingStatus, setcheckPricingStatus] = useState(false)

 
  

  useEffect(() => {

      // Check Syllabus Pricing
      checkPaidCourseOfSyllabus(code,setVideoLength,setNoOfLessons)


    // Get Paid Type
    GetCoursePricingType(code,setPaid_Type,setloading_btn)

    // Get the Discount Types for the Cmb Items
    GetDiscountTypes(setdis_types)

    // Get The Default Pricing
    // GetPriceDefault(code,setDGlobalPricing,setDDisType,setDDisPercent,setDDisAmt,setPriceRangeMinDefault,setPriceRangeMaxDefault,setshowDefaultValueDiscountInput,setshowDefaultPercentDiscountInput,setDGlobalNetPrice,setMinDefaultValue)


    // Get the Countries List WITH THE PRICES
    GetCountriesListPricing(code,setcountriesData,
      setloading_btn,
      setGlobalTip,
      setPriceRangeMaxDefault,
      setPriceRangeMinDefault,
      setMinDefaultValue,
      // ------
      setDGlobalPricing,
      setDDisType,
      setDDisPercent,
      setDDisAmt,
      setDGlobalNetPrice,
      // -----------
      setUSADisPercent,
      setUSADisAmt,
      setUSADisType,
      setUSAListPrice,
      setUSANetPrice,
      // -----
      setAusDisPercent,
      setAusDisAmt,
      setAusDisType,
      setAusListPrice,
      setAusNetPrice,
      // -----
      setBrazilDisPercent,
      setBrazilDisAmt,
      setBrazilDisType,
      setBrazilListPrice,
      setBrazilNetPrice,
      // ---------
      setCanadaDisPercent,
      setCanadaDisAmt,
      setCanadaDisType,
      setCanadaListPrice,
      setCanadaNetPrice,
      //  -------------
      setChileDisPercent,
      setChileDisAmt,
      setChileDisType,
      setChileListPrice,
      setChileNetPrice,
      // -----------
      setColumbiaDisPercent,
      setColumbiaDisAmt,
      setColumbiaDisType,
      setColumbiaListPrice,
      setColumbiaNetPrice,
      // --------------
      setEgyptDisPercent,
      setEgyptDisAmt,
      setEgyptDisType,
      setEgyptListPrice,
      setEgyptNetPrice,
      // ---------
      setEUDisPercent,
      setEUDisAmt,
      setEUDisType,
      setEUListPrice,
      setEUNetPrice,
      // ----
      setGBPDisPercent,
      setGBPDisAmt,
      setGBPDisType,
      setGBPListPrice,
      setGBPNetPrice,
      // ------------
      setIndonesiaDisPercent,
      setIndonesiaDisAmt,
      setIndonesiaDisType,
      setIndonesiaListPrice,
      setIndonesiaNetPrice,
      // ---------------
      setIsrealDisPercent,
      setIsrealDisAmt,
      setIsrealDisType,
      setIsrealListPrice,
      setIsrealNetPrice,
      // -------
      setIndiaDisPercent,
      setIndiaDisAmt,
      setIndiaDisType,
      setIndiaListPrice,
      setIndiaNetPrice,
      // -------------
      setJapanDisPercent,
      setJapanDisAmt,
      setJapanDisType,
      setJapanListPrice,
      setJapanNetPrice,
      // ---------------
      setSKDisPercent,
      setSKDisAmt,
      setSKDisType,
      setSKListPrice,
      setSKNetPrice,
      // -------------
      setMexicoDisPercent,
      setMexicoDisAmt,
      setMexicoDisType,
      setMexicoListPrice,
      setMexicoNetPrice,
      // --------------
      setMalaysiaDisPercent,
      setMalaysiaDisAmt,
      setMalaysiaDisType,
      setMalaysiaListPrice,
      setMalaysiaNetPrice,
      // -------------
      setNigeriaDisPercent,
      setNigeriaDisAmt,
      setNigeriaDisType,
      setNigeriaListPrice,
      setNIgeriaNetPrice,
      // -----------
      setNorwayDisPercent,
      setNorwayDisAmt,
      setNorwayDisType,
      setNorwayListPrice,
      setNorwayNetPrice,
      // ----------
      setPeruDisPercent,
      setPeruDisAmt,
      setPeruDisType,
      setPeruListPrice,
      setPeruNetPrice,
      // -----------
      setPhilipinesDisPercent,
      setPhiliphinesDisAmt,
      setPhilipinesDisType,
      setPhilipinesListPrice,
      setPhilipinesNetPrice,
      // ----------
      setPolandDisPercent,
      setPolandDisAmt,
      setPolandDisType,
      setPolandListPrice,
      setPolandNetPrice,
      // --------------
      setRomaniaDisPercent,
      setRomaniaDisAmt,
      setRomaniaDisType,
      setRomaniaListPrice,
      setRomaniaNetPrice,
      // --------------
      setRussiaDisDisPercent,
      setRussiaDisAmt,
      setRussiaDisType,
      setRussiaListPrice,
      setRussiaNetPrice,
      // ------------------
      setSingaporeDisPercent,
      setSingaporeDisAmt,
      setSingaporeDisType,
      setSingaporeListPrice,
      setSingaporeNetPrice,
      // -------------
      setThailandDisPercent,
      setThailandDisAmt,
      setThailandDisType,
      setThailandListPrice,
      setThailandNetPrice,
      // ---------------
      setTurkeyDisPercent,
      setTurkeyDisAmt,
      setTurkeyDisType,
      setTurkeyListPrice,
      setTurkeyNetPrice,
      // -------------
      setTaiwanDisPercent,
      setTaiwanDisAmt,
      setTaiwanDisType,
      setTaiwanListPrice,
      setTaiwanNetPrice,
      // ----------
      setVietnamDisPercent,
      setVietnamDisAmt,
      setVietmanDisType,
      setVietnamListPrice,
      setVietnamNetPrice,
      // ------------
      setSADisPercent,
      setSADisAmt,
      setSADisType,
      setSAListPrice,
      setSANetPrice,
      // ------
      //  ---------
      setUSATip,
      setUSAMinValue,
      setAusTip,
      setAusminValue,
      setBrazilTip,
      setBrazilminValue,
      setCanadaTip,
      setCanadaminValue,
      setChileTip,
      setChileminValue,
      setColumbiaTip,
      setColumbiaminValue,
      setEgyptTip,
      setEgyptminValue,
      setEUTip,
      setEUminValue,
      setGBPTip,
      setGBPminValue,
      setIndonesiaTip,
      setIndonesiaminValue,
      setIsrealTip,
      setIsrealminValue,
      setIndiaTip,
      setIndiaminValue,
      setJapanTip,
      setJapanminValue,
      setSKTip,
      setSKminValue,
      setMexicoTip,
      setMexicominValue,
      setMalaysiaTip,
      setMalaysiaminValue,
      setNigeriaTip,
      setNigeriaminValue,
      setNorwayTip,
      setNorwayminValue,
      setPeruTip,
      setPeruminvalue,
      setPhilipinesTip,
      setPhilipinesminValue,
      setPolandTip,
      setPolandminValue,
      setRomaniaTip,
      setRomaniaminvalue,
      setRussiaTip,
      setRussiaminValue,
      setSingaporeTip,
      setSingaporeminValue,
      setThailandTip,
      setThailandminValue,
      setTurkeyTip,
      setTurkeyminValue,
      setTaiwanTip,
      setTaiwanminValue,
      setVietnamTip,
      setVietnamminValue,
      setSATip,
      setSAminValue
      )

      // GetCheckPricingAllStatus(setcheckPricingStatus)
 
  }, [code])



  //  ---------------------



  // Select Discount Type
  const handleDefaultDiscountType = (value) =>{
    console.log(value)
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


      setDGlobalNetPrice(DGlobalPricing)

      setDDisPercent(0)
      setDDisAmt(0)

    }else if(value == '2'){

      console.log(DDisPercent)
      console.log(DGlobalPricing)

      setDGlobalNetPrice(parseFloat(DGlobalPricing) - parseFloat(DGlobalPricing) * parseFloat(DDisPercent == "" ? 0 : DDisPercent)/100)


    }else if(value == '3'){
  

      setDGlobalNetPrice(parseFloat(DGlobalPricing) - parseFloat(DDisAmt == "" ? 0 : DDisAmt))

    }else{
    
      setDGlobalNetPrice(DGlobalPricing)

    }

    setDDisType(value == "" ? 0 :  value)
  }

// Enter Global Price
  const handleChangeGlobalPrice = (e) => {



    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setDGlobalPricing(0)
      }
  
    }
    setDGlobalPricing(e.target.value)


  



  }

  // Discount Amount
  const handleDefaultDiscountAmt = (e) =>{

    if(e.target.value == ""){
      setDDisAmt(0)
    }
    
    setDDisAmt(e.target.value)
    setDGlobalNetPrice((parseFloat(DGlobalPricing) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))

    // Calculate Discount %
    setDDisPercent(((parseFloat(DGlobalPricing) - parseFloat(e.target.value))/parseFloat(DGlobalPricing) * 100).toFixed(2))
    
  }
  
// Percentage Discount
const handleDefaultPercentageDiscount = (e) => {
  let discountValue = parseFloat(e.target.value);

  if (isNaN(discountValue) || discountValue < 0) {
    discountValue = 0; // Ensure the discount is not negative or invalid
  }

  if (discountValue > 100) {
    discountValue = 100; // Limit the discount to a maximum of 100%
  }

  setDDisPercent(discountValue);

  const globalNetPrice = (parseFloat(DGlobalPricing) - parseFloat(DGlobalPricing) * discountValue / 100).toFixed(2);
  setDGlobalNetPrice(globalNetPrice);

  // Calculate Discount Amount
  const discountAmount = (parseFloat(DGlobalPricing) - parseFloat(globalNetPrice)).toFixed(2);
  setDDisAmt(discountAmount);
}


  //  ---------------------
  




  // LIST COUNTRIES FUNCTIONS
  // LIST PRICE

  // USA
  const [USAListPrice, setUSAListPrice] = useState("")
  const [USADisType, setUSADisType] = useState("")
  const [USADisPercent, setUSADisPercent] = useState(0)
  const [USADisAmt, setUSADisAmt] = useState(0)
  const [USANetPrice, setUSANetPrice] = useState("")

  const [USATip, setUSATip] = useState("")
  const [USAMinValue, setUSAMinValue] = useState("")



  // ---------------------
  // Discount Type USA
  const handleDefaultDiscountTypeUSA = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


      setUSANetPrice(USAListPrice)

    }else if(value == '2'){

      console.log(USADisPercent)
      console.log(USAListPrice)

      setUSANetPrice(parseFloat(USAListPrice) - parseFloat(USAListPrice) * parseFloat(USADisPercent == "" ? 0 : USADisPercent)/100)


    }else if(value == '3'){


      setUSANetPrice(parseFloat(USAListPrice) - parseFloat(USADisAmt == "" ? 0 : USADisAmt))

    }else{

      setUSANetPrice(USAListPrice)

    }

    setUSADisType(value)
  }

  // Enter Global Price USA
  const handleChangeGlobalPriceUSA = (e) => {

    console.log(e.target.value)

    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setUSAListPrice(0)
      }
  
    }
    setUSAListPrice(e.target.value)
    

  }

    // Discount Amount USA
    const handleDefaultDiscountAmtUSA = (e) =>{

      if(e.target.value == ""){
        setUSADisAmt(0)
      }

      setUSADisAmt(e.target.value)
      setUSANetPrice((parseFloat(USAListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

        // Calculate Discount %
        setUSADisPercent(((parseFloat(USAListPrice) - parseFloat(e.target.value))/parseFloat(USAListPrice) * 100).toFixed(2))

    }
    
  // Percentage Discount USA
  const handleDefaultPercentageDiscountUSA = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setUSADisPercent(discountValue);
  
    const netPrice = (parseFloat(USAListPrice) - parseFloat(USAListPrice) * discountValue / 100).toFixed(2);
    setUSANetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(USAListPrice) - parseFloat(netPrice)).toFixed(2);
    setUSADisAmt(discountAmount);
  
    console.log(discountValue);
  }
  
  


  // ---------------------
  
  const [AusListPrice, setAusListPrice] = useState("")
  const [AusDisType, setAusDisType] = useState("")
  const [AusDisPercent, setAusDisPercent] = useState(0)
  const [AusDisAmt, setAusDisAmt] = useState(0)
  const [AusNetPrice, setAusNetPrice] = useState("")
  const [AusTip, setAusTip] = useState("")
  const [AusminValue, setAusminValue] = useState("")


    // ---------------------
  // Discount Type Aus
  const handleDefaultDiscountTypeAus = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


      setAusNetPrice(AusListPrice)

    }else if(value == '2'){

      console.log(AusDisPercent)
      console.log(AusListPrice)

      setAusNetPrice(parseFloat(AusListPrice) - parseFloat(AusListPrice) * parseFloat(AusDisPercent == "" ? 0 : AusDisPercent)/100)


    }else if(value == '3'){




      setAusNetPrice(parseFloat(AusListPrice) - parseFloat(AusDisAmt == "" ? 0 : AusDisAmt))

    }else{
      

      setAusNetPrice(AusListPrice)

    }

    setAusDisType(value)
  }

  // Enter Global Price Aus
  const handleChangeGlobalPriceAus = (e) => {

    console.log(e.target.value)

    if(numberOnlyRegex.test(e.target.value)){

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
  
      if(e.target.value == ""){
        setAusListPrice(0)
      }
    }



    setAusListPrice(e.target.value)

  }

    // Discount Amount Aus
    const handleDefaultDiscountAmtAus = (e) =>{

      if(e.target.value == ""){
        setAusDisAmt(0)
      }

      setAusDisAmt(e.target.value)
      setAusNetPrice((parseFloat(AusListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

      // Calculate Discount %
      setAusDisPercent(((parseFloat(AusListPrice) - parseFloat(e.target.value))/parseFloat(AusListPrice) * 100).toFixed(2))
    }
    
  // Percentage Discount Aus
  const handleDefaultPercentageDiscountAus = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setAusDisPercent(discountValue);
  
    const netPrice = (parseFloat(AusListPrice) - parseFloat(AusListPrice) * discountValue / 100).toFixed(2);
    setAusNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(AusListPrice) - parseFloat(netPrice)).toFixed(2);
    setAusDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  
  


  // ---------------------


  const [BrazilListPrice, setBrazilListPrice] = useState("")
  const [BrazilDisType, setBrazilDisType] = useState("")
  const [BrazilDisPercent, setBrazilDisPercent] = useState(0)
  const [BrazilDisAmt, setBrazilDisAmt] = useState(0)
  const [BrazilNetPrice, setBrazilNetPrice] = useState("")

  const [BrazilTip, setBrazilTip] = useState("")
  const [BrazilminValue, setBrazilminValue] = useState("")



      // ---------------------
  // Discount Type Brazil
  const handleDefaultDiscountTypeBrazil = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


      setBrazilNetPrice(BrazilListPrice)

    }else if(value == '2'){




      console.log(BrazilDisPercent)
      console.log(BrazilListPrice)

      setBrazilNetPrice(parseFloat(BrazilListPrice) - parseFloat(BrazilListPrice) * parseFloat(BrazilDisPercent == "" ? 0 : BrazilDisPercent)/100)


    }else if(value == '3'){

  


      setBrazilNetPrice(parseFloat(BrazilListPrice) - parseFloat(BrazilDisAmt == "" ? 0 : BrazilDisAmt))

    }else{

      setBrazilNetPrice(BrazilListPrice)

    }

    setBrazilDisType(value)
  }

  // Enter Global Price Aus
  const handleChangeGlobalPriceBrazil = (e) => {

    console.log(e.target.value)

    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setBrazilListPrice(0)
      }
    }


    setBrazilListPrice(e.target.value)

  }

    // Discount Amount Aus
    const handleDefaultDiscountAmtBrazil = (e) =>{

      if(e.target.value == ""){
        setBrazilDisAmt(0)
      }

      setBrazilDisAmt(e.target.value)
      setBrazilNetPrice((parseFloat(BrazilListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)


      // Calculate Discount %
      setBrazilDisPercent(((parseFloat(BrazilListPrice) - parseFloat(e.target.value))/parseFloat(BrazilListPrice) * 100).toFixed(2))

    }
    
  // Percentage Discount Aus
  const handleDefaultPercentageDiscountBrazil = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setBrazilDisPercent(discountValue);
  
    const netPrice = (parseFloat(BrazilListPrice) - parseFloat(BrazilListPrice) * discountValue / 100).toFixed(2);
    setBrazilNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(BrazilListPrice) - parseFloat(netPrice)).toFixed(2);
    setBrazilDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  
  


  // ---------------------

  const [CanadaListPrice, setCanadaListPrice] = useState("")
  const [CanadaDisType, setCanadaDisType] = useState("")
  const [CanadaDisPercent, setCanadaDisPercent] = useState(0)
  const [CanadaDisAmt, setCanadaDisAmt] = useState(0)
  const [CanadaNetPrice, setCanadaNetPrice] = useState("")

  const [CanadaTip, setCanadaTip] = useState("")
  const [CanadaminValue, setCanadaminValue] = useState("")


      // ---------------------
  // Discount Type Canada
  const handleDefaultDiscountTypeCanada = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

   

      setCanadaNetPrice(CanadaListPrice)

    }else if(value == '2'){



      console.log(CanadaDisPercent)
      console.log(CanadaListPrice)

      setCanadaNetPrice(parseFloat(CanadaListPrice) - parseFloat(CanadaListPrice) * parseFloat(CanadaDisPercent == "" ? 0 : CanadaDisPercent)/100)


    }else if(value == '3'){

    


      setCanadaNetPrice(parseFloat(CanadaListPrice) - parseFloat(CanadaDisAmt == "" ? 0 : CanadaDisAmt))

    }else{
   
      setCanadaNetPrice(CanadaListPrice)

    }

    setCanadaDisType(value)
  }

  // Enter Global Price Canada
  const handleChangeGlobalPriceCanada = (e) => {

    console.log(e.target.value)

    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setCanadaListPrice(0)
      }
    }


    setCanadaListPrice(e.target.value)

  }

    // Discount Amount Canada
    const handleDefaultDiscountAmtCanada = (e) =>{

      if(e.target.value == ""){
        setCanadaDisAmt(0)
      }


      setCanadaDisAmt(e.target.value)
      setCanadaNetPrice((parseFloat(CanadaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

    // Calculate Discount %
    setCanadaDisPercent(((parseFloat(CanadaListPrice) - parseFloat(e.target.value))/parseFloat(CanadaListPrice) * 100).toFixed(2))
    }
    
  // Percentage Discount Canada
  const handleDefaultPercentageDiscountCanada = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setCanadaDisPercent(discountValue);
  
    const netPrice = (parseFloat(CanadaListPrice) - parseFloat(CanadaListPrice) * discountValue / 100).toFixed(2);
    setCanadaNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(CanadaListPrice) - parseFloat(netPrice)).toFixed(2);
    setCanadaDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  
  


  // ---------------------

  const [ChileListPrice, setChileListPrice] = useState("")
  const [ChileDisType, setChileDisType] = useState("")
  const [ChileDisPercent, setChileDisPercent] = useState(0)
  const [ChileDisAmt, setChileDisAmt] = useState(0)
  const [ChileNetPrice, setChileNetPrice] = useState("")

  const [ChileTip, setChileTip] = useState("")
  const [ChileminValue, setChileminValue] = useState("")


   // ---------------------
  // Discount Type Chile
  const handleDefaultDiscountTypeChile = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


      setChileNetPrice(ChileListPrice)

    }else if(value == '2'){




      console.log(ChileDisPercent)
      console.log(ChileListPrice)

      setChileNetPrice(parseFloat(ChileListPrice) - parseFloat(ChileListPrice) * parseFloat(ChileDisPercent == "" ? 0 : ChileDisPercent)/100)


    }else if(value == '3'){
    



      setChileNetPrice(parseFloat(ChileListPrice) - parseFloat(ChileDisAmt == "" ? 0 : ChileDisAmt))

    }else{
 
      setChileNetPrice(ChileListPrice)

    }

    setChileDisType(value)
  }

  // Enter Global Price Chile
  const handleChangeGlobalPriceChile = (e) => {

    console.log(e.target.value)

    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setChileListPrice(0)
      }
    }

    setChileListPrice(e.target.value)

  }

    // Discount Amount Chile
    const handleDefaultDiscountAmtChile = (e) =>{

      if(e.target.value == ""){
        setChileDisAmt(0)
      }

      setChileDisAmt(e.target.value)
      setChileNetPrice((parseFloat(ChileListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

      // Calculate Discount %
      setChileDisPercent(((parseFloat(ChileListPrice) - parseFloat(e.target.value))/parseFloat(ChileListPrice) * 100).toFixed(2))
    }
    
  // Percentage Discount Chile
  const handleDefaultPercentageDiscountChile = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setChileDisPercent(discountValue);
  
    const netPrice = (parseFloat(ChileListPrice) - parseFloat(ChileListPrice) * discountValue / 100).toFixed(2);
    setChileNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(ChileListPrice) - parseFloat(netPrice)).toFixed(2);
    setChileDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  
  

  // ---------------------

  const [ColumbiaListPrice, setColumbiaListPrice] = useState("")
  const [ColumbiaDisType, setColumbiaDisType] = useState("")
  const [ColumbiaDisPercent, setColumbiaDisPercent] = useState(0)
  const [ColumbiaDisAmt, setColumbiaDisAmt] = useState(0)
  const [ColumbiaNetPrice, setColumbiaNetPrice] = useState("")

  const [ColumbiaTip, setColumbiaTip] = useState("")
  const [ColumbiaminValue, setColumbiaminValue] = useState("")



  // ---------------------
  // Discount Type Columbia
  const handleDefaultDiscountTypeColumbia = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

   
      setColumbiaNetPrice(ColumbiaListPrice)

    }else if(value == '2'){

     

      console.log(ColumbiaDisPercent)
      console.log(ColumbiaListPrice)

      setColumbiaNetPrice(parseFloat(ColumbiaListPrice) - parseFloat(ColumbiaListPrice) * parseFloat(ColumbiaDisPercent == "" ? 0 : ColumbiaDisPercent)/100)


    }else if(value == '3'){
   
    

      setColumbiaNetPrice(parseFloat(ColumbiaListPrice) - parseFloat(ColumbiaDisAmt == "" ? 0 : ColumbiaDisAmt))

    }else{
    
      setColumbiaNetPrice(ColumbiaListPrice)

    }

    setColumbiaDisType(value)
  }

  // Enter Global Price Columbia
  const handleChangeGlobalPriceColumbia = (e) => {

    console.log(e.target.value)

    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setColumbiaListPrice(0)
      }
    }


    setColumbiaListPrice(e.target.value)

  }

    // Discount Amount Columbia
    const handleDefaultDiscountAmtColumbia = (e) =>{

      if(e.target.value == ""){
        setColumbiaDisAmt(0)
      }

      setColumbiaDisAmt(e.target.value)
      setColumbiaNetPrice((parseFloat(ColumbiaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

      // Calculate Discount %
      setColumbiaDisPercent(((parseFloat(ColumbiaListPrice) - parseFloat(e.target.value))/parseFloat(ColumbiaListPrice) * 100).toFixed(2))

    }
    
  // Percentage Discount Columbia
  const handleDefaultPercentageDiscountColumbia = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setColumbiaDisPercent(discountValue);
  
    const netPrice = (parseFloat(ColumbiaListPrice) - parseFloat(ColumbiaListPrice) * discountValue / 100).toFixed(2);
    setColumbiaNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(ColumbiaListPrice) - parseFloat(netPrice)).toFixed(2);
    setColumbiaDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  
  

  // ---------------------

  const [EgyptListPrice, setEgyptListPrice] = useState("")
  const [EgyptDisType, setEgyptDisType] = useState("")
  const [EgyptDisPercent, setEgyptDisPercent] = useState(0)
  const [EgyptDisAmt, setEgyptDisAmt] = useState(0)
  const [EgyptNetPrice, setEgyptNetPrice] = useState("")

  const [EgyptTip, setEgyptTip] = useState("")
  const [EgyptminValue, setEgyptminValue] = useState("")



    // ---------------------
  // Discount Type Egypt
  const handleDefaultDiscountTypeEgypt = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

  
      setEgyptNetPrice(EgyptListPrice)

    }else if(value == '2'){


      console.log(EgyptDisPercent)
      console.log(EgyptListPrice)

      setEgyptNetPrice(parseFloat(EgyptListPrice) - parseFloat(EgyptListPrice) * parseFloat(EgyptDisPercent == "" ? 0 : EgyptDisPercent)/100)


    }else if(value == '3'){
 

    

      setEgyptNetPrice(parseFloat(EgyptListPrice) - parseFloat(EgyptDisAmt == "" ? 0 : EgyptDisAmt))

    }else{
     
      setEgyptNetPrice(EgyptListPrice)

    }

    setEgyptDisType(value)
  }

  // Enter Global Price Egypt
  const handleChangeGlobalPriceEgypt = (e) => {

    console.log(e.target.value)

    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setEgyptListPrice(0)
      }
    }


    setEgyptListPrice(e.target.value)

  }

    // Discount Amount Egypt
    const handleDefaultDiscountAmtEgypt = (e) =>{

      if(e.target.value == ""){
        setEgyptDisAmt(0)
      }

      setEgyptDisAmt(e.target.value)
      setEgyptNetPrice((parseFloat(EgyptListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

      // Calculate Discount %
      setEgyptDisPercent(((parseFloat(EgyptListPrice) - parseFloat(e.target.value))/parseFloat(EgyptListPrice) * 100).toFixed(2))
    }
    
  // Percentage Discount Egypt
  const handleDefaultPercentageDiscountEgypt = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setEgyptDisPercent(discountValue);
  
    const netPrice = (parseFloat(EgyptListPrice) - parseFloat(EgyptListPrice) * discountValue / 100).toFixed(2);
    setEgyptNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(EgyptListPrice) - parseFloat(netPrice)).toFixed(2);
    setEgyptDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  
  

  // ---------------------

  const [EUListPrice, setEUListPrice] = useState("")
  const [EUDisType, setEUDisType] = useState("")
  const [EUDisPercent, setEUDisPercent] = useState(0)
  const [EUDisAmt, setEUDisAmt] = useState(0)
  const [EUNetPrice, setEUNetPrice] = useState("")

  const [EUTip, setEUTip] = useState("")
  const [EUminValue, setEUminValue] = useState("")


      // ---------------------
  // Discount Type EU
  const handleDefaultDiscountTypeEU = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


     
      setEUNetPrice(EUListPrice)

    }else if(value == '2'){


 
      console.log(EUDisPercent)
      console.log(EUListPrice)

      setEUNetPrice(parseFloat(EUListPrice) - parseFloat(EUListPrice) * parseFloat(EUDisPercent == "" ? 0 : EUDisPercent)/100)


    }else if(value == '3'){
  

      


      setEUNetPrice(parseFloat(EUListPrice) - parseFloat(EUDisAmt == "" ? 0 : EUDisAmt))

    }else{
    

      setEUNetPrice(EUListPrice)

    }

    setEUDisType(value)
  }

  // Enter Global Price EU
  const handleChangeGlobalPriceEU = (e) => {

    console.log(e.target.value)

    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setEUListPrice(0)
      }
    }


    setEUListPrice(e.target.value)

  }

    // Discount Amount EU
    const handleDefaultDiscountAmtEU = (e) =>{

      if(e.target.value == ""){
        setEUDisAmt(0)
      }

      setEUDisAmt(e.target.value)
      setEUNetPrice((parseFloat(EUListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

       // Calculate Discount %
       setEUDisPercent(((parseFloat(EUListPrice) - parseFloat(e.target.value))/parseFloat(EUListPrice) * 100).toFixed(2))
    }
    
  // Percentage Discount EU
  const handleDefaultPercentageDiscountEU = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setEUDisPercent(discountValue);
  
    const netPrice = (parseFloat(EUListPrice) - parseFloat(EUListPrice) * discountValue / 100).toFixed(2);
    setEUNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(EUListPrice) - parseFloat(netPrice)).toFixed(2);
    setEUDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  
  

  // ---------------------

  const [GBPListPrice, setGBPListPrice] = useState("")
  const [GBPDisType, setGBPDisType] = useState("")
  const [GBPDisPercent, setGBPDisPercent] = useState(0)
  const [GBPDisAmt, setGBPDisAmt] = useState(0)
  const [GBPNetPrice, setGBPNetPrice] = useState("")

  const [GBPTip, setGBPTip] = useState("")
  const [GBPminValue, setGBPminValue] = useState("")


  // ---------------------
  // Discount Type GBP
  const handleDefaultDiscountTypeGBP = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

 
      setGBPNetPrice(GBPListPrice)

    }else if(value == '2'){



      console.log(GBPDisPercent)
      console.log(GBPListPrice)

      setGBPNetPrice(parseFloat(GBPListPrice) - parseFloat(GBPListPrice) * parseFloat(GBPDisPercent == "" ? 0 : GBPDisPercent)/100)


    }else if(value == '3'){

       
   

      setGBPNetPrice(parseFloat(GBPListPrice) - parseFloat(GBPDisAmt == "" ? 0 : GBPDisAmt))

    }else{
 
      setGBPNetPrice(GBPListPrice)

    }

    setGBPDisType(value)
  }

  // Enter Global Price GBP
  const handleChangeGlobalPriceGBP = (e) => {

    console.log(e.target.value)

    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setGBPListPrice(0)
      }
    }


    setGBPListPrice(e.target.value)

  }

    // Discount Amount GBP
    const handleDefaultDiscountAmtGBP = (e) =>{

      if(e.target.value == ""){
        setGBPDisAmt(0)
      }

      setGBPDisAmt(e.target.value)
      setGBPNetPrice((parseFloat(GBPListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

    // Calculate Discount %
    setGBPDisPercent(((parseFloat(GBPListPrice) - parseFloat(e.target.value))/parseFloat(GBPListPrice) * 100).toFixed(2))
    }
    
  // Percentage Discount GBP
  const handleDefaultPercentageDiscountGBP = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setGBPDisPercent(discountValue);
  
    const netPrice = (parseFloat(GBPListPrice) - parseFloat(GBPListPrice) * discountValue / 100).toFixed(2);
    setGBPNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(GBPListPrice) - parseFloat(netPrice)).toFixed(2);
    setGBPDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  
  

  // ---------------------

  const [IndonesiaListPrice, setIndonesiaListPrice] = useState("")
  const [IndonesiaDisType, setIndonesiaDisType] = useState("")
  const [IndonesiaDisPercent, setIndonesiaDisPercent] = useState(0)
  const [IndonesiaDisAmt, setIndonesiaDisAmt] = useState(0)
  const [IndonesiaNetPrice, setIndonesiaNetPrice] = useState("")

  const [IndonesiaTip, setIndonesiaTip] = useState("")
  const [IndonesiaminValue, setIndonesiaminValue] = useState("")


    // ---------------------
  // Discount Type Indo
  const handleDefaultDiscountTypeIndo = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


      setIndonesiaNetPrice(IndonesiaListPrice)

    }else if(value == '2'){

    

  
      console.log(IndonesiaDisPercent)
      console.log(IndonesiaListPrice)

      setIndonesiaNetPrice(parseFloat(IndonesiaListPrice) - parseFloat(IndonesiaListPrice) * parseFloat(IndonesiaDisPercent == "" ? 0 : IndonesiaDisPercent)/100)


    }else if(value == '3'){
 


      setIndonesiaNetPrice(parseFloat(IndonesiaListPrice) - parseFloat(IndonesiaDisAmt == "" ? 0 : IndonesiaDisAmt))

    }else{
     
      setIndonesiaNetPrice(IndonesiaListPrice)

    }

    setIndonesiaDisType(value)
  }

  // Enter Global Price Indo
  const handleChangeGlobalPriceIndo = (e) => {

    console.log(e.target.value)

    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setIndonesiaListPrice(0)
      }
    }

    setIndonesiaListPrice(e.target.value)

  }

    // Discount Amount Indo
    const handleDefaultDiscountAmtIndo = (e) =>{

      if(e.target.value == ""){
        setIndonesiaDisAmt(0)
      }

      setIndonesiaDisAmt(e.target.value)
      setIndonesiaNetPrice((parseFloat(IndonesiaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

      // Calculate Discount %
      setIndonesiaDisPercent(((parseFloat(IndonesiaListPrice) - parseFloat(e.target.value))/parseFloat(IndonesiaListPrice) * 100).toFixed(2))
    }
    
  // Percentage Discount GBP
  const handleDefaultPercentageDiscountIndo = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setIndonesiaDisPercent(discountValue);
  
    const netPrice = (parseFloat(IndonesiaListPrice) - parseFloat(IndonesiaListPrice) * discountValue / 100).toFixed(2);
    setIndonesiaNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(IndonesiaListPrice) - parseFloat(netPrice)).toFixed(2);
    setIndonesiaDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  
  

  // ---------------------

  const [IsrealListPrice, setIsrealListPrice] = useState("")
  const [IsrealDisType, setIsrealDisType] = useState("")
  const [IsrealDisPercent, setIsrealDisPercent] = useState(0)
  const [IsrealDisAmt, setIsrealDisAmt] = useState(0)
  const [IsrealNetPrice, setIsrealNetPrice] = useState("")

  const [IsrealTip, setIsrealTip] = useState("")
  const [IsrealminValue, setIsrealminValue] = useState("")


      // ---------------------
  // Discount Type Isreal
  const handleDefaultDiscountTypeIsreal = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


 
      setIsrealNetPrice(IsrealListPrice)

    }else if(value == '2'){

  

      console.log(IsrealDisPercent)
      console.log(IsrealListPrice)

      setIsrealNetPrice(parseFloat(IsrealListPrice) - parseFloat(IsrealListPrice) * parseFloat(IsrealDisPercent == "" ? 0 : IsrealDisPercent)/100)


    }else if(value == '3'){

  

      setIsrealNetPrice(parseFloat(IsrealListPrice) - parseFloat(IsrealDisAmt == "" ? 0 : IsrealDisAmt))

    }else{
    


      setIsrealNetPrice(IsrealListPrice)

    }

    setIsrealDisType(value)
  }

  // Enter Global Price Isreal
  const handleChangeGlobalPriceIsreal = (e) => {

    console.log(e.target.value)

    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setIsrealListPrice(0)
      }
    }

    setIsrealListPrice(e.target.value)

  }

    // Discount Amount Isreal
    const handleDefaultDiscountAmtIsreal = (e) =>{

      if(e.target.value == ""){
        setIsrealDisAmt(0)
      }

      setIsrealDisAmt(e.target.value)
      setIsrealNetPrice((parseFloat(IsrealListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

       // Calculate Discount %
       setIsrealDisPercent(((parseFloat(IsrealListPrice) - parseFloat(e.target.value))/parseFloat(IsrealListPrice) * 100).toFixed(2))
    }
    
  // Percentage Discount Isreal
  const handleDefaultPercentageDiscountIsreal = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setIsrealDisPercent(discountValue);
  
    const netPrice = (parseFloat(IsrealListPrice) - parseFloat(IsrealListPrice) * discountValue / 100).toFixed(2);
    setIsrealNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(IsrealListPrice) - parseFloat(netPrice)).toFixed(2);
    setIsrealDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  
  

  // ---------------------

  const [IndiaListPrice, setIndiaListPrice] = useState("")
  const [IndiaDisType, setIndiaDisType] = useState("")
  const [IndiaDisPercent, setIndiaDisPercent] = useState(0)
  const [IndiaDisAmt, setIndiaDisAmt] = useState(0)
  const [IndiaNetPrice, setIndiaNetPrice] = useState("")

  const [IndiaTip, setIndiaTip] = useState("")
  const [IndiaminValue, setIndiaminValue] = useState("")


        // ---------------------
  // Discount Type India
  const handleDefaultDiscountTypeIndia = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){
 
      setIndiaNetPrice(IndiaListPrice)

    }else if(value == '2'){

  

   
      console.log(IndiaDisPercent)
      console.log(IndiaListPrice)

      setIndiaNetPrice(parseFloat(IndiaListPrice) - parseFloat(IndiaListPrice) * parseFloat(IndiaDisPercent == "" ? 0 : IndiaDisPercent)/100)


    }else if(value == '3'){


  

      setIndiaNetPrice(parseFloat(IndiaListPrice) - parseFloat(IndiaDisAmt == "" ? 0 : IndiaDisAmt))

    }else{


      setIndiaNetPrice(IndiaListPrice)

    }

    setIndiaDisType(value)
  }

  // Enter Global Price India
  const handleChangeGlobalPriceIndia = (e) => {

    console.log(e.target.value)
    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setIndiaListPrice(0)
      }
    }

    setIndiaListPrice(e.target.value)

  }

    // Discount Amount India
    const handleDefaultDiscountAmtIndia = (e) =>{

      if(e.target.value == ""){
        setIndiaDisAmt(0)
      }

      setIndiaDisAmt(e.target.value)
      setIndiaNetPrice((parseFloat(IndiaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

      // Calculate Discount %
      setIndiaDisPercent(((parseFloat(IndiaListPrice) - parseFloat(e.target.value))/parseFloat(IndiaListPrice) * 100).toFixed(2))
    }
    
  // Percentage Discount India
  const handleDefaultPercentageDiscountIndia = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setIndiaDisPercent(discountValue);
  
    const netPrice = (parseFloat(IndiaListPrice) - parseFloat(IndiaListPrice) * discountValue / 100).toFixed(2);
    setIndiaNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(IndiaListPrice) - parseFloat(netPrice)).toFixed(2);
    setIndiaDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  

    // -------------------

  const [JapanListPrice, setJapanListPrice] = useState("")
  const [JapanDisType, setJapanDisType] = useState("")
  const [JapanDisPercent, setJapanDisPercent] = useState(0)
  const [JapanDisAmt, setJapanDisAmt] = useState(0)
  const [JapanNetPrice, setJapanNetPrice] = useState("")

  const [JapanTip, setJapanTip] = useState("")
  const [JapanminValue, setJapanminValue] = useState("")



          // ---------------------
  // Discount Type Japan
  const handleDefaultDiscountTypeJapan = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


      setJapanNetPrice(JapanListPrice)

    }else if(value == '2'){

    
      
      console.log(JapanDisPercent)
      console.log(JapanListPrice)

      setJapanNetPrice(parseInt(JapanListPrice) - parseInt(JapanListPrice) * parseInt(JapanDisPercent == "" ? 0 : JapanDisPercent)/100)


    }else if(value == '3'){


     
      setJapanNetPrice(parseInt(JapanListPrice) - parseInt(JapanDisAmt == "" ? 0 : JapanDisAmt))

    }else{

      
      setJapanNetPrice(JapanListPrice)

    }

    

    setJapanDisType(value)
  }

  // Enter Global Price Japan
  const handleChangeGlobalPriceJapan = (e) => {

    console.log(e.target.value)
    if(numberOnlyRegex.test(e.target.value)){
      if(JapanDisType == '1'){
        console.log(e.target.value)
        setJapanNetPrice(e.target.value)
      }else if(JapanDisType == '2'){
        setJapanNetPrice((parseInt(e.target.value) - parseInt(e.target.value) * parseInt(JapanDisPercent)/100))
      }else if(JapanDisType == '3'){
        setJapanNetPrice((parseInt(e.target.value) - parseInt(JapanDisAmt)))
      }else{
        setJapanNetPrice(e.target.value == "" ? 0 : e.target.value)
      }
  
      if(e.target.value == ""){
        setJapanListPrice(0)
      }
    }

    setJapanListPrice(e.target.value)

  }

    // Discount Amount Japan
    const handleDefaultDiscountAmtJapan = (e) =>{

      if(e.target.value == ""){
        setJapanDisAmt(0)
      }

      setJapanDisAmt(e.target.value)
      setJapanNetPrice((parseInt(JapanListPrice) - parseInt(e.target.value == "" ? 0 : e.target.value)))
      console.log(e.target.value)

       // Calculate Discount %
       setJapanDisPercent(((parseInt(JapanListPrice) - parseInt(e.target.value))/parseInt(JapanListPrice) * 100))
    }
    
  // Percentage Discount Japan
  const handleDefaultPercentageDiscountJapan = (e) => {
    // Parse the discount value from the input as an integer
    let discountValue = parseInt(e.target.value, 10);
  
    // Ensure the discount value is valid and within range
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Default to 0 if invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Cap the discount at 100%
    }
  
    // Update the discount percentage state
    setJapanDisPercent(discountValue);
  
    // Parse the list price and ensure it's a valid integer
    const listPrice = parseInt(JapanListPrice, 10) || 0;
  
    // Calculate the net price after applying the discount
    const netPrice = listPrice - (listPrice * discountValue / 100);
    setJapanNetPrice(netPrice.toFixed(2)); // Round to 2 decimal places
  
    // Calculate the discount amount as an integer
    const discountAmount = Math.round(listPrice - netPrice);
    setJapanDisAmt(discountAmount);
  
    // Log the discount value for debugging
    console.log(discountValue);
  }
  

    // -------------------

  const [SKListPrice, setSKListPrice] = useState("")
  const [SKDisType, setSKDisType] = useState("")
  const [SKDisPercent, setSKDisPercent] = useState(0)
  const [SKDisAmt, setSKDisAmt] = useState(0)
  const [SKNetPrice, setSKNetPrice] = useState("")

  const [SKTip, setSKTip] = useState("")
  const [SKminValue, setSKminValue] = useState("")


           // ---------------------
  // Discount Type SK
  const handleDefaultDiscountTypeSK = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

    

      setSKNetPrice(SKListPrice)

    }else if(value == '2'){


      
      console.log(SKDisPercent)
      console.log(SKListPrice)

      setSKNetPrice(parseFloat(SKListPrice) - parseFloat(SKListPrice) * parseFloat(SKDisPercent == "" ? 0 : SKDisPercent)/100)


    }else if(value == '3'){
  

     

      setSKNetPrice(parseFloat(SKListPrice) - parseFloat(SKDisAmt == "" ? 0 : SKDisAmt))

    }else{

   
      setSKNetPrice(SKListPrice)

    }

    setSKDisType(value)
  }

  // Enter Global Price SK
  const handleChangeGlobalPriceSK = (e) => {

    console.log(e.target.value)
    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setSKNetPrice(0)
      }
    }

    setSKListPrice(e.target.value)

  }

    // Discount Amount SK
    const handleDefaultDiscountAmtSK = (e) =>{

      if(e.target.value == ""){
        setSKDisAmt(0)
      }

      setSKDisAmt(e.target.value)
      setSKNetPrice((parseFloat(SKListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

      // Calculate Discount %
      setSKDisPercent(((parseFloat(SKListPrice) - parseFloat(e.target.value))/parseFloat(SKListPrice) * 100).toFixed(2))
    }
    
  // Percentage Discount SK
  const handleDefaultPercentageDiscountSK = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setSKDisPercent(discountValue);
  
    const netPrice = (parseFloat(SKListPrice) - parseFloat(SKListPrice) * discountValue / 100).toFixed(2);
    setSKNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(SKListPrice) - parseFloat(netPrice)).toFixed(2);
    setSKDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  

    // -------------------

  const [MexicoListPrice, setMexicoListPrice] = useState("")
  const [MexicoDisType, setMexicoDisType] = useState("")
  const [MexicoDisPercent, setMexicoDisPercent] = useState(0)
  const [MexicoDisAmt, setMexicoDisAmt] = useState(0)
  const [MexicoNetPrice, setMexicoNetPrice] = useState("")

  const [MexicoTip, setMexicoTip] = useState("")
  const [MexicominValue, setMexicominValue] = useState("")



             // ---------------------
  // Discount Type Mexico
  const handleDefaultDiscountTypeMexico = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){



      setMexicoNetPrice(MexicoListPrice)

    }else if(value == '2'){


      console.log(MexicoDisPercent)
      console.log(MexicoListPrice)

      setMexicoNetPrice(parseFloat(MexicoListPrice) - parseFloat(MexicoListPrice) * parseFloat(MexicoDisPercent == "" ? 0 : MexicoDisPercent)/100)


    }else if(value == '3'){
   

   

      setMexicoNetPrice(parseFloat(MexicoListPrice) - parseFloat(MexicoDisAmt == "" ? 0 : MexicoDisAmt))

    }else{




      setMexicoNetPrice(MexicoListPrice)

    }

    

    setMexicoDisType(value)
  }

  // Enter Global Price Mexico
  const handleChangeGlobalPriceMexico = (e) => {

    console.log(e.target.value)
    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setMexicoListPrice(0)
      }
    }

    setMexicoListPrice(e.target.value)

  }

    // Discount Amount Mexico
    const handleDefaultDiscountAmtMexico = (e) =>{

      if(e.target.value == ""){
        setMexicoDisAmt(0)
      }


      setMexicoDisAmt(e.target.value)
      setMexicoNetPrice((parseFloat(MexicoListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

      // Calculate Discount %
      setMexicoDisPercent(((parseFloat(MexicoListPrice) - parseFloat(e.target.value))/parseFloat(MexicoListPrice) * 100).toFixed(2))

    }
    
  // Percentage Discount Mexico
  const handleDefaultPercentageDiscountMexico = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setMexicoDisPercent(discountValue);
  
    const netPrice = (parseFloat(MexicoListPrice) - parseFloat(MexicoListPrice) * discountValue / 100).toFixed(2);
    setMexicoNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(MexicoListPrice) - parseFloat(netPrice)).toFixed(2);
    setMexicoDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  

    // -------------------

  const [MalaysiaListPrice, setMalaysiaListPrice] = useState("")
  const [MalaysiaDisType, setMalaysiaDisType] = useState("")
  const [MalaysiaDisPercent, setMalaysiaDisPercent] = useState(0)
  const [MalaysiaDisAmt, setMalaysiaDisAmt] = useState(0)
  const [MalaysiaNetPrice, setMalaysiaNetPrice] = useState("")

  const [MalaysiaTip, setMalaysiaTip] = useState("")
  const [MalaysiaminValue, setMalaysiaminValue] = useState("")



               // ---------------------
  // Discount Type Malaysia
  const handleDefaultDiscountTypeMalaysia = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


  
      setMalaysiaNetPrice(MalaysiaListPrice)

    }else if(value == '2'){




      console.log(MalaysiaDisPercent)
      console.log(MalaysiaListPrice)

      setMalaysiaNetPrice(parseFloat(MalaysiaListPrice) - parseFloat(MalaysiaListPrice) * parseFloat(MalaysiaDisPercent == "" ? 0 : MalaysiaDisPercent)/100)


    }else if(value == '3'){


  

      setMalaysiaNetPrice(parseFloat(MalaysiaListPrice) - parseFloat(MalaysiaDisAmt == "" ? 0 : MalaysiaDisAmt))

    }else{
    
      setMalaysiaNetPrice(MalaysiaListPrice)

    }

    setMalaysiaDisType(value)
  }

  // Enter Global Price Malaysia
  const handleChangeGlobalPriceMalaysia = (e) => {

    console.log(e.target.value)
    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setMalaysiaListPrice(0)
      }
    }

    setMalaysiaListPrice(e.target.value)

  }

    // Discount Amount Malaysia
    const handleDefaultDiscountAmtMalaysia = (e) =>{

      if(e.target.value == ""){
        setMalaysiaDisAmt(0)
      }


      setMalaysiaDisAmt(e.target.value)
      setMalaysiaNetPrice((parseFloat(MalaysiaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

       // Calculate Discount %
       setMalaysiaDisPercent(((parseFloat(MalaysiaListPrice) - parseFloat(e.target.value))/parseFloat(MalaysiaListPrice) * 100).toFixed(2))

    }
    
  // Percentage Discount Malaysia
  const handleDefaultPercentageDiscountMalaysia = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setMalaysiaDisPercent(discountValue);
  
    const netPrice = (parseFloat(MalaysiaListPrice) - parseFloat(MalaysiaListPrice) * discountValue / 100).toFixed(2);
    setMalaysiaNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(MalaysiaListPrice) - parseFloat(netPrice)).toFixed(2);
    setMalaysiaDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  

    // -------------------

  const [NigeriaListPrice, setNigeriaListPrice] = useState("")
  const [NigeriaDisType, setNigeriaDisType] = useState("")
  const [NigeriaDisPercent, setNigeriaDisPercent] = useState(0)
  const [NigeriaDisAmt, setNigeriaDisAmt] = useState(0)
  const [NIgeriaNetPrice, setNIgeriaNetPrice] = useState("")

  const [NigeriaTip, setNigeriaTip] = useState("")
  const [NigeriaminValue, setNigeriaminValue] = useState("")
  

        // ---------------------
  // Discount Type Nigeria
  const handleDefaultDiscountTypeNigeria = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      
      setNIgeriaNetPrice(NigeriaListPrice)

    }else if(value == '2'){

      
    

      console.log(NigeriaDisPercent)
      console.log(NigeriaListPrice)

      setNIgeriaNetPrice(parseFloat(NigeriaListPrice) - parseFloat(NigeriaListPrice) * parseFloat(NigeriaDisPercent == "" ? 0 : MalaysiaDisPercent)/100)


    }else if(value == '3'){

   

      setNIgeriaNetPrice(parseFloat(NigeriaListPrice) - parseFloat(NigeriaDisAmt == "" ? 0 : NigeriaDisAmt))

    }else{
     
  
      setNIgeriaNetPrice(NigeriaListPrice)

    }

    setNigeriaDisType(value)
  }

  // Enter Global Price Nigeria
  const handleChangeGlobalPriceNigeria = (e) => {

    console.log(e.target.value)
    if(numberOnlyRegex.test(e.target.value)){

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
  
      if(e.target.value == ""){
        setNigeriaListPrice(0)
      }
    }

    setNigeriaListPrice(e.target.value)

  }

    // Discount Amount Nigeria
    const handleDefaultDiscountAmtNigeria = (e) =>{

      if(e.target.value == ""){
        setNigeriaDisAmt(0)
      }

      setNigeriaDisAmt(e.target.value)
      setNIgeriaNetPrice((parseFloat(NigeriaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

      // Calculate Discount %
      setNigeriaDisPercent(((parseFloat(NigeriaListPrice) - parseFloat(e.target.value))/parseFloat(NigeriaListPrice) * 100).toFixed(2))

    }
    
  // Percentage Discount Nigeria
  const handleDefaultPercentageDiscountNigeria = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setNigeriaDisPercent(discountValue);
  
    const netPrice = (parseFloat(NigeriaListPrice) - parseFloat(NigeriaListPrice) * discountValue / 100).toFixed(2);
    setNIgeriaNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(NigeriaListPrice) - parseFloat(netPrice)).toFixed(2);
    setNigeriaDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  

    // -------------------

  const [NorwayListPrice, setNorwayListPrice] = useState("")
  const [NorwayDisType, setNorwayDisType] = useState("")
  const [NorwayDisPercent, setNorwayDisPercent] = useState(0)
  const [NorwayDisAmt, setNorwayDisAmt] = useState(0)
  const [NorwayNetPrice, setNorwayNetPrice] = useState("")

  const [NorwayTip, setNorwayTip] = useState("")
  const [NorwayminValue, setNorwayminValue] = useState("")



          // ---------------------
  // Discount Type Norway
  const handleDefaultDiscountTypeNorway = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


     
      setNorwayNetPrice(NorwayListPrice)

    }else if(value == '2'){


      console.log(NorwayDisPercent)
      console.log(NorwayListPrice)

      setNorwayNetPrice(parseFloat(NorwayListPrice) - parseFloat(NorwayListPrice) * parseFloat(NorwayDisPercent == "" ? 0 : NorwayDisPercent)/100)


    }else if(value == '3'){
  

      
     

      setNorwayNetPrice(parseFloat(NorwayListPrice) - parseFloat(NorwayDisAmt == "" ? 0 : NorwayDisAmt))

    }else{

      
      setNorwayNetPrice(NorwayListPrice)

    }

    setNorwayDisType(value)
  }

  // Enter Global Price Norway
  const handleChangeGlobalPriceNorway = (e) => {

    console.log(e.target.value)
    if(numberOnlyRegex.test(e.target.value)){
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
  
      if(e.target.value == ""){
        setNorwayListPrice(0)
      }
    }

    setNorwayListPrice(e.target.value)

  }

    // Discount Amount Norway
    const handleDefaultDiscountAmtNorway = (e) =>{

      if(e.target.value == ""){
        setNorwayDisAmt(0)
      }

      setNorwayDisAmt(e.target.value)
      setNorwayNetPrice((parseFloat(NorwayListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
      console.log(e.target.value)

       // Calculate Discount %
       setNorwayDisPercent(((parseFloat(NorwayListPrice) - parseFloat(e.target.value))/parseFloat(NorwayListPrice) * 100).toFixed(2))
    }
    
  // Percentage Discount Norway
  const handleDefaultPercentageDiscountNorway = (e) => {
    let discountValue = parseFloat(e.target.value);
  
    if (isNaN(discountValue) || discountValue < 0) {
      discountValue = 0; // Ensure the discount is not negative or invalid
    }
  
    if (discountValue > 100) {
      discountValue = 100; // Limit the discount to a maximum of 100%
    }
  
    setNorwayDisPercent(discountValue);
  
    const netPrice = (parseFloat(NorwayListPrice) - parseFloat(NorwayListPrice) * discountValue / 100).toFixed(2);
    setNorwayNetPrice(netPrice);
  
    // Calculate Discount Amount
    const discountAmount = (parseFloat(NorwayListPrice) - parseFloat(netPrice)).toFixed(2);
    setNorwayDisAmt(discountAmount);
  
    console.log(discountValue);
  }
  

    // -------------------

  const [PeruListPrice, setPeruListPrice] = useState("")
  const [PeruDisType, setPeruDisType] = useState("")
  const [PeruDisPercent, setPeruDisPercent] = useState(0)
  const [PeruDisAmt, setPeruDisAmt] = useState(0)
  const [PeruNetPrice, setPeruNetPrice] = useState("")

  const [PeruTip, setPeruTip] = useState("")
  const [Peruminvalue, setPeruminvalue] = useState("")

  
         // ---------------------
    // Discount Type Peru
    const handleDefaultDiscountTypePeru = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){


  
        setPeruNetPrice(PeruListPrice)

      }else if(value == '2'){

       
       
        console.log(PeruDisPercent)
        console.log(PeruListPrice)

        setPeruNetPrice(parseFloat(PeruListPrice) - parseFloat(PeruListPrice) * parseFloat(PeruDisPercent == "" ? 0 : PeruDisPercent)/100)


      }else if(value == '3'){


   

        setPeruNetPrice(parseFloat(PeruListPrice) - parseFloat(PeruDisAmt == "" ? 0 : PeruDisAmt))

      }else{


        
        setPeruNetPrice(PeruListPrice)

      }

      setPeruDisType(value)
    }

    // Enter Global Price Peru
    const handleChangeGlobalPricePeru = (e) => {

      console.log(e.target.value)
      if(numberOnlyRegex.test(e.target.value)){
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
  
        if(e.target.value == ""){
          setPeruListPrice(0)
        }
      }

      setPeruListPrice(e.target.value)

    }

      // Discount Amount Peru
      const handleDefaultDiscountAmtPeru = (e) =>{
        if(e.target.value == ""){
          setPeruDisAmt(0)
        }

        setPeruDisAmt(e.target.value)
        setPeruNetPrice((parseFloat(PeruListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)

        // Calculate Discount %
        setPeruDisPercent(((parseFloat(PeruListPrice) - parseFloat(e.target.value))/parseFloat(PeruListPrice) * 100).toFixed(2))
      }
      
    // Percentage Discount Peru
     const handleDefaultPercentageDiscountPeru = (e) => {
  let discountValue = parseFloat(e.target.value);

  if (isNaN(discountValue) || discountValue < 0) {
    discountValue = 0; // Ensure the discount is not negative or invalid
  }

  if (discountValue > 100) {
    discountValue = 100; // Limit the discount to a maximum of 100%
  }

  setPeruDisPercent(discountValue);

  const netPrice = (parseFloat(PeruListPrice) - parseFloat(PeruListPrice) * discountValue / 100).toFixed(2);
  setPeruNetPrice(netPrice);

  // Calculate Discount Amount
  const discountAmount = (parseFloat(PeruListPrice) - parseFloat(netPrice)).toFixed(2);
  setPeruDisAmt(discountAmount);

  console.log(discountValue);
}


    // -------------------

  const [PhilipinesListPrice, setPhilipinesListPrice] = useState("")
  const [PhilipinesDisType, setPhilipinesDisType] = useState("")
  const [PhilipinesDisPercent, setPhilipinesDisPercent] = useState(0)
  const [PhiliphinesDisAmt, setPhiliphinesDisAmt] = useState(0)
  const [PhilipinesNetPrice, setPhilipinesNetPrice] = useState()

  const [PhilipinesTip, setPhilipinesTip] = useState("")
  const [PhilipinesminValue, setPhilipinesminValue] = useState("")




          // ---------------------
    // Discount Type Philipines
    const handleDefaultDiscountTypePhilipines = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

       

        setPhilipinesNetPrice(PhilipinesListPrice)

      }else if(value == '2'){

 
       
        console.log(PhilipinesDisPercent)
        console.log(PhilipinesListPrice)

        setPhilipinesNetPrice(parseFloat(PhilipinesListPrice) - parseFloat(PhilipinesListPrice) * parseFloat(PhilipinesDisPercent == "" ? 0 : PhilipinesDisPercent)/100)


      }else if(value == '3'){


      
        setPhilipinesNetPrice(parseFloat(PhilipinesListPrice) - parseFloat(PhiliphinesDisAmt == "" ? 0 : PhiliphinesDisAmt))

      }else{
   
  
        setPhilipinesNetPrice(PhilipinesListPrice)

      }

      setPhilipinesDisType(value)
    }

    // Enter Global Price Philipines
    const handleChangeGlobalPricePhilipines = (e) => {

      console.log(e.target.value)
      if(numberOnlyRegex.test(e.target.value)){
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
  
        if(e.target.value == ""){
          setPhilipinesListPrice(0)
        }
      }

      setPhilipinesListPrice(e.target.value)

    }

      // Discount Amount Philipines
      const handleDefaultDiscountAmtPhilipines = (e) =>{

        if(e.target.value == ""){
          setPhiliphinesDisAmt(0)
        }

        setPhiliphinesDisAmt(e.target.value)
        setPhilipinesNetPrice((parseFloat(PhilipinesListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)

         // Calculate Discount %
         setPhilipinesDisPercent(((parseFloat(PhilipinesListPrice) - parseFloat(e.target.value))/parseFloat(PhilipinesListPrice) * 100).toFixed(2))
      }
      
    // Percentage Discount Philipines
    const handleDefaultPercentageDiscountPhilipines = (e) => {
      let discountValue = parseFloat(e.target.value);
    
      if (isNaN(discountValue) || discountValue < 0) {
        discountValue = 0; // Ensure the discount is not negative or invalid
      }
    
      if (discountValue > 100) {
        discountValue = 100; // Limit the discount to a maximum of 100%
      }
    
      setPhilipinesDisPercent(discountValue);
    
      setPhilipinesNetPrice((parseFloat(PhilipinesListPrice) - parseFloat(PhilipinesListPrice) * discountValue / 100).toFixed(2));
    
      console.log(e.target.value);
    
      // Calculate Discount Amount
      setPhiliphinesDisAmt((Number.parseFloat(PhilipinesListPrice) - ((parseFloat(PhilipinesListPrice) - parseFloat(PhilipinesListPrice) * discountValue / 100).toFixed(2))).toFixed(2));
    }
    

    // -------------------

  const [PolandListPrice, setPolandListPrice] = useState("")
  const [PolandDisType, setPolandDisType] = useState("")
  const [PolandDisPercent, setPolandDisPercent] = useState(0)
  const [PolandDisAmt, setPolandDisAmt] = useState(0)
  const [PolandNetPrice, setPolandNetPrice] = useState("")

  const [PolandTip, setPolandTip] = useState("")
  const [PolandminValue, setPolandminValue] = useState("")




          // ---------------------
    // Discount Type Poland
    const handleDefaultDiscountTypePoland = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

    
    
        setPolandNetPrice(PolandListPrice)

      }else if(value == '2'){


       

        console.log(PolandDisPercent)
        console.log(PolandListPrice)

        setPolandNetPrice(parseFloat(PolandListPrice) - parseFloat(PolandListPrice) * parseFloat(PolandDisPercent == "" ? 0 : PolandDisPercent)/100)


      }else if(value == '3'){


       

        setPolandNetPrice(parseFloat(PolandListPrice) - parseFloat(PolandDisAmt == "" ? 0 : PolandDisAmt))

      }else{
     
      
        setPolandNetPrice(PolandListPrice)

      }

      setPolandDisType(value)
    }

    // Enter Global Price Poland
    const handleChangeGlobalPricePoland = (e) => {

      console.log(e.target.value)
      if(numberOnlyRegex.test(e.target.value)){
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
  
        if(e.target.value == ""){
          setPolandListPrice(0)
        }
      }

      setPolandListPrice(e.target.value)

    }

      // Discount Amount Poland
      const handleDefaultDiscountAmtPoland = (e) =>{

        if(e.target.value == ""){
          setPolandDisAmt(0)
        }

        setPolandDisAmt(e.target.value)
        setPolandNetPrice((parseFloat(PolandListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)

        // Calculate Discount %
        setPolandDisPercent(((parseFloat(PolandListPrice) - parseFloat(e.target.value))/parseFloat(PolandListPrice) * 100).toFixed(2))
      }
      
    // Percentage Discount Poland
    const handleDefaultPercentageDiscountPoland = (e) => {
      let discountValue = parseFloat(e.target.value);
    
      if (isNaN(discountValue) || discountValue < 0) {
        discountValue = 0; // Ensure the discount is not negative or invalid
      }
    
      if (discountValue > 100) {
        discountValue = 100; // Limit the discount to a maximum of 100%
      }
    
      setPolandDisPercent(discountValue);
    
      setPolandNetPrice((parseFloat(PolandListPrice) - parseFloat(PolandListPrice) * discountValue / 100).toFixed(2));
    
      console.log(e.target.value);
    
      // Calculate Discount Amount
      setPolandDisAmt((Number.parseFloat(PolandListPrice) - ((parseFloat(PolandListPrice) - parseFloat(PolandListPrice) * discountValue / 100).toFixed(2))).toFixed(2));
    }
    

    // -------------------


  const [RomaniaListPrice, setRomaniaListPrice] = useState("")
  const [RomaniaDisType, setRomaniaDisType] = useState("")
  const [RomaniaDisPercent, setRomaniaDisPercent] = useState(0)
  const [RomaniaDisAmt, setRomaniaDisAmt] = useState(0)
  const [RomaniaNetPrice, setRomaniaNetPrice] = useState("")

  const [RomaniaTip, setRomaniaTip] = useState("")
  const [Romaniaminvalue, setRomaniaminvalue] = useState("")



            // ---------------------
    // Discount Type Romania
    const handleDefaultDiscountTypeRomania = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){


      
        setRomaniaNetPrice(RomaniaListPrice)

      }else if(value == '2'){

 
       
        console.log(RomaniaDisPercent)
        console.log(RomaniaListPrice)

        setRomaniaNetPrice(parseFloat(RomaniaListPrice) - parseFloat(RomaniaListPrice) * parseFloat(RomaniaDisPercent == "" ? 0 : RomaniaDisPercent)/100)


      }else if(value == '3'){


       

        setRomaniaNetPrice(parseFloat(RomaniaListPrice) - parseFloat(RomaniaDisAmt == "" ? 0 : RomaniaDisAmt))

      }else{


        setRomaniaNetPrice(RomaniaListPrice)

      }

      setRomaniaDisType(value)
    }

    // Enter Global Price Romania
    const handleChangeGlobalPriceRomania = (e) => {

      console.log(e.target.value)
      if(numberOnlyRegex.test(e.target.value)){
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
  
        if(e.target.value == ""){
          setRomaniaListPrice(0)
        }
      }

      setRomaniaListPrice(e.target.value)

    }

      // Discount Amount Romania
      const handleDefaultDiscountAmtRomania = (e) =>{

        if(e.target.value == ""){
          setRomaniaDisAmt(0)
        }

        setRomaniaDisAmt(e.target.value)
        setRomaniaNetPrice((parseFloat(RomaniaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)

         // Calculate Discount %
         setRomaniaDisPercent(((parseFloat(RomaniaListPrice) - parseFloat(e.target.value))/parseFloat(RomaniaListPrice) * 100).toFixed(2))

      }
      
    // Percentage Discount Romania
    const handleDefaultPercentageDiscountRomania = (e) => {
      let discountValue = parseFloat(e.target.value);
    
      if (isNaN(discountValue) || discountValue < 0) {
        discountValue = 0; // Ensure the discount is not negative or invalid
      }
    
      if (discountValue > 100) {
        discountValue = 100; // Limit the discount to a maximum of 100%
      }
    
      setRomaniaDisPercent(discountValue);
    
      setRomaniaNetPrice((parseFloat(RomaniaListPrice) - parseFloat(RomaniaListPrice) * discountValue / 100).toFixed(2));
    
      console.log(e.target.value);
    
      // Calculate Discount Amount
      setRomaniaDisAmt((Number.parseFloat(RomaniaListPrice) - ((parseFloat(RomaniaListPrice) - parseFloat(RomaniaListPrice) * discountValue / 100).toFixed(2))).toFixed(2));
    }
    

    // -------------------

  const [RussiaListPrice, setRussiaListPrice] = useState("")
  const [RussiaDisType, setRussiaDisType] = useState("")
  const [RussiaDisDisPercent, setRussiaDisDisPercent] = useState(0)
  const [RussiaDisAmt, setRussiaDisAmt] = useState(0)
  const [RussiaNetPrice, setRussiaNetPrice] = useState("")

  const [RussiaTip, setRussiaTip] = useState("")
  const [RussiaminValue, setRussiaminValue] = useState("")



          // ---------------------
    // Discount Type Russia
    const handleDefaultDiscountTypeRussia = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

    
        setRussiaNetPrice(RussiaListPrice)

      }else if(value == '2'){



        console.log(RussiaDisDisPercent)
        console.log(RussiaListPrice)

        setRussiaNetPrice(parseFloat(RussiaListPrice) - parseFloat(RussiaListPrice) * parseFloat(RussiaDisDisPercent == "" ? 0 : RussiaDisDisPercent)/100)


      }else if(value == '3'){
     

        

        setRussiaNetPrice(parseFloat(RussiaListPrice) - parseFloat(RussiaDisAmt == "" ? 0 : RussiaDisAmt))

      }else{
       
      
        setRussiaNetPrice(RussiaListPrice)

      }

      setRussiaDisType(value)
    }

    // Enter Global Price Russia
    const handleChangeGlobalPriceRussia = (e) => {

      console.log(e.target.value)
      if(numberOnlyRegex.test(e.target.value)){
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
  
        if(e.target.value == ""){
          setRussiaListPrice(0)
        }
      }


      setRussiaListPrice(e.target.value)

    }

      // Discount Amount Russia
      const handleDefaultDiscountAmtRussia = (e) =>{

        if(e.target.value == ""){
          setRussiaDisAmt(0)
        }

        setRussiaDisAmt(e.target.value)
        setRussiaNetPrice((parseFloat(RussiaListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)


         // Calculate Discount %
         setRussiaDisDisPercent(((parseFloat(RussiaListPrice) - parseFloat(e.target.value))/parseFloat(RussiaListPrice) * 100).toFixed(2))

      }
      
    // Percentage Discount Russia
    const handleDefaultPercentageDiscountRussia = (e) => {
      let discountValue = parseFloat(e.target.value);
    
      if (isNaN(discountValue) || discountValue < 0) {
        discountValue = 0; // Ensure the discount is not negative or invalid
      }
    
      if (discountValue > 100) {
        discountValue = 100; // Limit the discount to a maximum of 100%
      }
    
      setRussiaDisDisPercent(discountValue);
    
      setRussiaNetPrice((parseFloat(RussiaListPrice) - parseFloat(RussiaListPrice) * discountValue / 100).toFixed(2));
    
      console.log(e.target.value);
    
      // Calculate Discount Amount
      setRussiaDisAmt((Number.parseFloat(RussiaListPrice) - ((parseFloat(RussiaListPrice) - parseFloat(RussiaListPrice) * discountValue / 100).toFixed(2))).toFixed(2));
    }
    

    // -------------------

  const [SingaporeListPrice, setSingaporeListPrice] = useState("")
  const [SingaporeDisType, setSingaporeDisType] = useState("")
  const [SingaporeDisPercent, setSingaporeDisPercent] = useState(0)
  const [SingaporeDisAmt, setSingaporeDisAmt] = useState(0)
  const [SingaporeNetPrice, setSingaporeNetPrice] = useState("")

  const [SingaporeTip, setSingaporeTip] = useState("")
  const [SingaporeminValue, setSingaporeminValue] = useState("")


          // ---------------------
    // Discount Type Singapore
    const handleDefaultDiscountTypeSingapore = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

 

        setSingaporeNetPrice(SingaporeListPrice)

      }else if(value == '2'){

         
        
        console.log(SingaporeDisPercent)
        console.log(SingaporeListPrice)

        setSingaporeNetPrice(parseFloat(SingaporeListPrice) - parseFloat(SingaporeListPrice) * parseFloat(SingaporeDisPercent == "" ? 0 : SingaporeDisPercent)/100)


      }else if(value == '3'){
  

    

        setSingaporeNetPrice(parseFloat(SingaporeListPrice) - parseFloat(SingaporeDisAmt == "" ? 0 : SingaporeDisAmt))

      }else{
      
        setSingaporeNetPrice(SingaporeListPrice)

      }

      setSingaporeDisType(value)
    }

    // Enter Global Price Singapore
    const handleChangeGlobalPriceSingapore = (e) => {

      console.log(e.target.value)
      if(numberOnlyRegex.test(e.target.value)){

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
  
        if(e.target.value == ""){
          setSingaporeListPrice(0)
        }
      }

      setSingaporeListPrice(e.target.value)

    }

      // Discount Amount Singapore
      const handleDefaultDiscountAmtSingapore = (e) =>{

        if(e.target.value == ""){
          setSingaporeDisAmt(0)
        }

        setSingaporeDisAmt(e.target.value)
        setSingaporeNetPrice((parseFloat(SingaporeListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)

          // Calculate Discount %
          setSingaporeDisPercent(((parseFloat(SingaporeListPrice) - parseFloat(e.target.value))/parseFloat(SingaporeListPrice) * 100).toFixed(2))

      }
      
    // Percentage Discount Singapore
    const handleDefaultPercentageDiscountSingapore = (e) => {
      let discountValue = parseFloat(e.target.value);
    
      if (isNaN(discountValue) || discountValue < 0) {
        discountValue = 0; // Ensure the discount is not negative or invalid
      }
    
      if (discountValue > 100) {
        discountValue = 100; // Limit the discount to a maximum of 100%
      }
    
      setSingaporeDisPercent(discountValue);
    
      setSingaporeNetPrice((parseFloat(SingaporeListPrice) - parseFloat(SingaporeListPrice) * discountValue / 100).toFixed(2));
    
      console.log(e.target.value);
    
      // Calculate Discount Amount
      setSingaporeDisAmt((Number.parseFloat(SingaporeListPrice) - ((parseFloat(SingaporeListPrice) - parseFloat(SingaporeListPrice) * discountValue / 100).toFixed(2))).toFixed(2));
    }
    

    // -------------------

  const [ThailandListPrice, setThailandListPrice] = useState("")
  const [ThailandDisType, setThailandDisType] = useState("")
  const [ThailandDisPercent, setThailandDisPercent] = useState(0)
  const [ThailandDisAmt, setThailandDisAmt] = useState(0)
  const [ThailandNetPrice, setThailandNetPrice] = useState("")

  const [ThailandTip, setThailandTip] = useState("")
  const [ThailandminValue, setThailandminValue] = useState("")



        // ---------------------
    // Discount Type Thailand
    const handleDefaultDiscountTypeThailand = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        
        setThailandNetPrice(ThailandListPrice)

      }else if(value == '2'){

     


        console.log(ThailandDisPercent)
        console.log(ThailandListPrice)

        setThailandNetPrice(parseFloat(ThailandListPrice) - parseFloat(ThailandListPrice) * parseFloat(ThailandDisPercent == "" ? 0 : ThailandDisPercent)/100)


      }else if(value == '3'){
   

        

        setThailandNetPrice(parseFloat(ThailandListPrice) - parseFloat(ThailandDisAmt == "" ? 0 : ThailandDisAmt))

      }else{
        
        setThailandNetPrice(ThailandListPrice)

      }

      setThailandDisType(value)
    }

    // Enter Global Price Thailand
    const handleChangeGlobalPriceThailand = (e) => {

      console.log(e.target.value)
      if(numberOnlyRegex.test(e.target.value)){
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
  
        if(e.target.value == ""){
          setThailandListPrice(0)
        }
      }

      setThailandListPrice(e.target.value)

    }

      // Discount Amount Thailand
      const handleDefaultDiscountAmtThailand = (e) =>{

        if(e.target.value == ""){
          setThailandDisAmt(0)
        }

        setThailandDisAmt(e.target.value)
        setThailandNetPrice((parseFloat(ThailandListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)

         // Calculate Discount %
         setThailandDisPercent(((parseFloat(ThailandListPrice) - parseFloat(e.target.value))/parseFloat(ThailandListPrice) * 100).toFixed(2))

      }
      
    // Percentage Discount Thailand
    const handleDefaultPercentageDiscountThailand = (e) => {
      let discountValue = parseFloat(e.target.value);
    
      if (isNaN(discountValue) || discountValue < 0) {
        discountValue = 0; // Ensure the discount is not negative or invalid
      }
    
      if (discountValue > 100) {
        discountValue = 100; // Limit the discount to a maximum of 100%
      }
    
      setThailandDisPercent(discountValue);
    
      setThailandNetPrice((parseFloat(ThailandListPrice) - parseFloat(ThailandListPrice) * discountValue / 100).toFixed(2));
    
      console.log(e.target.value);
    
      // Calculate Discount Amount
      setThailandDisAmt((Number.parseFloat(ThailandListPrice) - ((parseFloat(ThailandListPrice) - parseFloat(ThailandListPrice) * discountValue / 100).toFixed(2))).toFixed(2));
    }
    

    // -------------------

  const [TurkeyListPrice, setTurkeyListPrice] = useState("")
  const [TurkeyDisType, setTurkeyDisType] = useState("")
  const [TurkeyDisPercent, setTurkeyDisPercent] = useState(0)
  const [TurkeyDisAmt, setTurkeyDisAmt] = useState(0)
  const [TurkeyNetPrice, setTurkeyNetPrice] = useState("")

  const [TurkeyTip, setTurkeyTip] = useState("")
  const [TurkeyminValue, setTurkeyminValue] = useState("")

 

          // ---------------------
    // Discount Type Turkey
    const handleDefaultDiscountTypeTurkey = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

     
   
        setTurkeyNetPrice(TurkeyListPrice)

      }else if(value == '2'){


      
        console.log(TurkeyDisPercent)
        console.log(TurkeyListPrice)

        setTurkeyNetPrice(parseFloat(TurkeyListPrice) - parseFloat(TurkeyListPrice) * parseFloat(TurkeyDisPercent == "" ? 0 : TurkeyDisPercent)/100)


      }else if(value == '3'){


        

        setTurkeyNetPrice(parseFloat(TurkeyListPrice) - parseFloat(TurkeyDisAmt == "" ? 0 : TurkeyDisAmt))

      }else{
    

        
      
        setTurkeyNetPrice(TurkeyListPrice)

      }

      setTurkeyDisType(value)
    }

    // Enter Global Price Turkey
    const handleChangeGlobalPriceTurkey = (e) => {

      console.log(e.target.value)
      if(numberOnlyRegex.test(e.target.value)){
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
  
        if(e.target.value == ""){
          setTurkeyListPrice(0)
        }
      }

      setTurkeyListPrice(e.target.value)

    }

      // Discount Amount Turkey
      const handleDefaultDiscountAmtTurkey = (e) =>{

        if(e.target.value == ""){
          setTurkeyDisAmt(0)
        }

        setTurkeyDisAmt(e.target.value)
        setTurkeyNetPrice((parseFloat(TurkeyListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)

         // Calculate Discount %
         setTurkeyDisPercent(((parseFloat(TurkeyListPrice) - parseFloat(e.target.value))/parseFloat(TurkeyListPrice) * 100).toFixed(2))
      }
      
    // Percentage Discount Turkey
      const handleDefaultPercentageDiscountTurkey = (e) =>{

        if(e.target.value == ""){
          setTurkeyDisPercent(0)
        }
    
    
        setTurkeyDisPercent(e.target.value)
    
        setTurkeyNetPrice((parseFloat(TurkeyListPrice) - parseFloat(TurkeyListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))

        console.log(e.target.value)

        // Calculate Discount Amount
        setTurkeyDisAmt((Number.parseFloat(TurkeyListPrice) - ((parseFloat(TurkeyListPrice) - parseFloat(TurkeyListPrice) * parseFloat(e.target.value == "" ? 0 : e.target.value)/100).toFixed(2))).toFixed(2))
    
      }

    // -------------------

  const [TaiwanListPrice, setTaiwanListPrice] = useState("")
  const [TaiwanDisType, setTaiwanDisType] = useState("")
  const [TaiwanDisPercent, setTaiwanDisPercent] = useState(0)
  const [TaiwanDisAmt, setTaiwanDisAmt] = useState(0)
  const [TaiwanNetPrice, setTaiwanNetPrice] = useState("")

  const [TaiwanTip, setTaiwanTip] = useState("")
  const [TaiwanminValue, setTaiwanminValue] = useState("")



           // ---------------------
    // Discount Type Taiwan
    const handleDefaultDiscountTypeTaiwan = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        setTaiwanNetPrice(TaiwanListPrice)

      }else if(value == '2'){

    
        
        console.log(TaiwanDisType)
        console.log(TaiwanListPrice)

        setTaiwanNetPrice(parseFloat(TaiwanListPrice) - parseFloat(TaiwanListPrice) * parseFloat(TaiwanDisType == "" ? 0 : TaiwanDisType)/100)


      }else if(value == '3'){



        setTaiwanNetPrice(parseFloat(TaiwanListPrice) - parseFloat(TaiwanDisAmt == "" ? 0 : TaiwanDisAmt))

      }else{
    
        setTaiwanNetPrice(TaiwanListPrice)

      }

      setTaiwanDisType(value)
    }

    // Enter Global Price Taiwan
    const handleChangeGlobalPriceTaiwan = (e) => {

      console.log(e.target.value)
      if(numberOnlyRegex.test(e.target.value)){

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
  
        if(e.target.value == ""){
          setTaiwanListPrice(0)
        }

      }
    

      setTaiwanListPrice(e.target.value)

    }

      // Discount Amount Taiwan
      const handleDefaultDiscountAmtTaiwan = (e) =>{

        if(e.target.value == ""){
          setTaiwanDisAmt(0)
        }

        setTaiwanDisAmt(e.target.value)
        setTaiwanNetPrice((parseFloat(TaiwanListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)

         // Calculate Discount %
         setTaiwanDisPercent(((parseFloat(TaiwanListPrice) - parseFloat(e.target.value))/parseFloat(TaiwanListPrice) * 100).toFixed(2))

      }
      
    // Percentage Discount Taiwan
    const handleDefaultPercentageDiscountTaiwan = (e) => {
      let discountValue = parseFloat(e.target.value);
    
      if (isNaN(discountValue) || discountValue < 0) {
        discountValue = 0; // Ensure the discount is not negative or invalid
      }
    
      if (discountValue > 100) {
        discountValue = 100; // Limit the discount to a maximum of 100%
      }
    
      setTaiwanDisPercent(discountValue);
    
      setTaiwanNetPrice((parseFloat(TaiwanListPrice) - parseFloat(TaiwanListPrice) * discountValue / 100).toFixed(2));
    
      console.log(e.target.value);
    
      // Calculate Discount Amount
      setTaiwanDisAmt((Number.parseFloat(TaiwanListPrice) - ((parseFloat(TaiwanListPrice) - parseFloat(TaiwanListPrice) * discountValue / 100).toFixed(2))).toFixed(2));
    }
    

    // -------------------

  const [VietnamListPrice, setVietnamListPrice] = useState("")
  const [VietmanDisType, setVietmanDisType] = useState("")
  const [VietnamDisPercent, setVietnamDisPercent] = useState(0)
  const [VietnamDisAmt, setVietnamDisAmt] = useState(0)
  const [VietnamNetPrice, setVietnamNetPrice] = useState("")

  const [VietnamTip, setVietnamTip] = useState("")
  const [VietnamminValue, setVietnamminValue] = useState("")



        // ---------------------
    // Discount Type Vietnam
    const handleDefaultDiscountTypeVietnam = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

      
        
        setVietnamNetPrice(VietnamListPrice)

      }else if(value == '2'){

  
       
        console.log(VietmanDisType)
        console.log(VietnamListPrice)

        setVietnamNetPrice(parseFloat(VietnamListPrice) - parseFloat(VietnamListPrice) * parseFloat(VietmanDisType == "" ? 0 : VietmanDisType)/100)


      }else if(value == '3'){
   


        setVietnamNetPrice(parseFloat(VietnamListPrice) - parseFloat(VietnamDisAmt == "" ? 0 : VietnamDisAmt))

      }else{
      
        
        setVietnamNetPrice(VietnamListPrice)

      }

      setVietmanDisType(value)
    }

    // Enter Global Price Vietnam
    const handleChangeGlobalPriceVietnam = (e) => {

      console.log(e.target.value)
      if(numberOnlyRegex.test(e.target.value)){
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
  
        if(e.target.value == ""){
          setVietnamListPrice(0)
        }
      }

      setVietnamListPrice(e.target.value)

    }

      // Discount Amount Vietnam
      const handleDefaultDiscountAmtVietnam = (e) =>{

        if(e.target.value == ""){
          setVietnamDisAmt(0)
        }

        setVietnamDisAmt(e.target.value)
        setVietnamNetPrice((parseFloat(VietnamListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)

         // Calculate Discount %
         setVietnamDisPercent(((parseFloat(VietnamListPrice) - parseFloat(e.target.value))/parseFloat(VietnamListPrice) * 100).toFixed(2))
      }
      
    // Percentage Discount Vietnam
    const handleDefaultPercentageDiscountVietnam = (e) => {
      let discountValue = parseFloat(e.target.value);
    
      if (isNaN(discountValue) || discountValue < 0) {
        discountValue = 0; // Ensure the discount is not negative or invalid
      }
    
      if (discountValue > 100) {
        discountValue = 100; // Limit the discount to a maximum of 100%
      }
    
      setVietnamDisPercent(discountValue);
    
      setVietnamNetPrice((parseFloat(VietnamListPrice) - parseFloat(VietnamListPrice) * discountValue / 100).toFixed(2));
    
      console.log(e.target.value);
    
      // Calculate Discount Amount
      setVietnamDisAmt((Number.parseFloat(VietnamListPrice) - ((parseFloat(VietnamListPrice) - parseFloat(VietnamListPrice) * discountValue / 100).toFixed(2))).toFixed(2));
    }
    
    // -------------------

  const [SAListPrice, setSAListPrice] = useState("")
  const [SADisType, setSADisType] = useState("")
  const [SADisPercent, setSADisPercent] = useState(0)
  const [SADisAmt, setSADisAmt] = useState(0)
  const [SANetPrice, setSANetPrice] = useState("")

  const [SATip, setSATip] = useState("")
  const [SAminValue, setSAminValue] = useState("")



      // ---------------------
    // Discount Type SA
    const handleDefaultDiscountTypeSA = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){


  
        setSANetPrice(SAListPrice)

      }else if(value == '2'){


        console.log(SADisType)
        console.log(SAListPrice)

        setSANetPrice(parseFloat(SAListPrice) - parseFloat(SAListPrice) * parseFloat(SADisType == "" ? 0 : SADisType)/100)


      }else if(value == '3'){
    



        setSANetPrice(parseFloat(SAListPrice) - parseFloat(SADisAmt == "" ? 0 : SADisAmt))

      }else{
   
        setSANetPrice(SAListPrice)

      }

      setSADisType(value)
    }

    // Enter Global Price SA
    const handleChangeGlobalPriceSA = (e) => {

      console.log(e.target.value)

      if(numberOnlyRegex.test(e.target.value)){
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
  
        if(e.target.value == ""){
          setSAListPrice(0)
        }
      }


      setSAListPrice(e.target.value)

    }

      // Discount Amount SA
      const handleDefaultDiscountAmtSA = (e) =>{

        if(e.target.value == ""){
          setSADisAmt(0)
        }

        setSADisAmt(e.target.value)
        setSANetPrice((parseFloat(SAListPrice) - parseFloat(e.target.value == "" ? 0 : e.target.value)).toFixed(2))
        console.log(e.target.value)

         // Calculate Discount %
         setSADisPercent(((parseFloat(SAListPrice) - parseFloat(e.target.value))/parseFloat(SAListPrice) * 100).toFixed(2))

      }
      
    // Percentage Discount SA
    const handleDefaultPercentageDiscountSA = (e) => {
      let discountValue = parseFloat(e.target.value);
    
      if (isNaN(discountValue) || discountValue < 0) {
        discountValue = 0; // Ensure the discount is not negative or invalid
      }
    
      if (discountValue > 100) {
        discountValue = 100; // Limit the discount to a maximum of 100%
      }
    
      setSADisPercent(discountValue);
    
      setSANetPrice((parseFloat(SAListPrice) - parseFloat(SAListPrice) * discountValue / 100).toFixed(2));
    
      console.log(e.target.value);
    
      // Calculate Discount Amount
      setSADisAmt((Number.parseFloat(SAListPrice) - ((parseFloat(SAListPrice) - parseFloat(SAListPrice) * discountValue / 100).toFixed(2))).toFixed(2));
    }
    

    // -------------------




  
  // SUBMIT PRICES
  const handleSubmitAllPrices = () =>{
    
    // console.log(inputValuesListPrice)
    // console.log(selectDiscountTypeList)
    console.log(Paid_Type)
    console.log(VideoLength)
    console.log(NoOfLessons)
    setloading_button(true)

    if(Paid_Type == 1){
      
      if(VideoLength > 9000){
        ErrorAlert("Error","The maximum video content length on a free course is 2.5 hours. Please reduce your total video length to comply.")
        setloading_button(false)
        return
      }

      
    }else if(Paid_Type == 2){

      if(VideoLength < 2700){
        ErrorAlert("Error","The minimum video content length on a paid course is 45 minutes. Please reduce your total video length to comply.")
        setloading_button(false)
        return

      }else if(NoOfLessons < 5){
        ErrorAlert("Error","The minimum number of lectures on a paid course should be 5 Please increase your number of lectures to comply.")
        setloading_button(false)
        return
      }else if(VideoLength < 2700 && NoOfLessons < 5){
        ErrorAlert("Error","For a paid course the minimum video content length should be 45 minutes and minimum number of lectures should be 5.")
        setloading_button(false)
        return
      }

    }


  

   
    if(Paid_Type == 1){

      PricingConvertToFree(code,setloading_button)

    }else if(Paid_Type == 2){

      if(DGlobalPricing == 0){
        ErrorAlert("Error","Please Enter a Global List Price")
        setloading_button(false)
        return
      }

      console.log(DGlobalPricing)
      console.log(PriceRangeMinDefault)
      console.log(DGlobalPricing)
      console.log(PriceRangeMaxDefault)

      console.log(MinDefaultValue)

      // ============== Check the Net price within range ==============
      if (formatNumber(DGlobalNetPrice) != "0.00" && (formatNumber(DGlobalNetPrice) < MinDefaultValue)) {
        ErrorAlert("Error","Global net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(USANetPrice) != "0.00" && (formatNumber(USANetPrice) < USAMinValue)) {
        ErrorAlert("Error","United States net price should be greater than minimum price");
        setloading_button(false)
        return
      }


      if (formatNumber(AusNetPrice) != "0.00" && (formatNumber(AusNetPrice) < AusminValue)) {
        ErrorAlert("Error","Australia net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(BrazilNetPrice) != "0.00" && (formatNumber(BrazilNetPrice) < BrazilminValue)) {
        ErrorAlert("Error","Brazil net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(CanadaNetPrice) != "0.00" && (formatNumber(CanadaNetPrice) < CanadaminValue)) {
        ErrorAlert("Error","Canada net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(ChileNetPrice) != "0.00" && (formatNumber(ChileNetPrice) < ChileminValue)) {
        ErrorAlert("Error","Chile net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(ColumbiaNetPrice) != "0.00" && (formatNumber(ColumbiaNetPrice) < ColumbiaminValue)) {
        ErrorAlert("Error","Columbia net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(EgyptNetPrice) != "0.00" && (formatNumber(EgyptNetPrice) < EgyptminValue)) {
        ErrorAlert("Error","Egypt net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(EUNetPrice) != "0.00" && (formatNumber(EUNetPrice) < EUminValue)) {
        ErrorAlert("Error","European Union net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(GBPNetPrice) != "0.00" && (formatNumber(GBPNetPrice) < GBPminValue)) {
        ErrorAlert("Error","Great Britain net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(IndonesiaNetPrice) != "0.00" && (formatNumber(IndonesiaNetPrice) < IndonesiaminValue)) {
        ErrorAlert("Error","Indonesia net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(IsrealNetPrice) != "0.00" && (formatNumber(IsrealNetPrice) < IsrealminValue)) {
        ErrorAlert("Error","Israel net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(IndiaNetPrice) != "0.00" &&  (formatNumber(IndiaNetPrice) < IndiaminValue)) {
        ErrorAlert("Error","India net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumInt(JapanNetPrice) != "0" && (formatNumInt(JapanNetPrice) < JapanminValue)) {
        ErrorAlert("Error","Japan net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(SKNetPrice) != "0.00" && (formatNumber(SKNetPrice) < SKminValue)) {
        ErrorAlert("Error","South Korea net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(MexicoNetPrice) != "0.00" && (formatNumber(MexicoNetPrice) < MexicominValue)) {
        ErrorAlert("Error","Mexico net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(MalaysiaNetPrice) != "0.00" && (formatNumber(MalaysiaNetPrice) < MalaysiaminValue)) {
        ErrorAlert("Error","Malaysia net price should be greater than minimum price");
        setloading_button(false)
        return
      }


      if (formatNumber(NIgeriaNetPrice) != "0.00" && (formatNumber(NIgeriaNetPrice) < NigeriaminValue)) {
        ErrorAlert("Error","Nigeria net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(NorwayNetPrice) != "0.00" && (formatNumber(NorwayNetPrice) < NorwayminValue)) {
        ErrorAlert("Error","Norway net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(PeruNetPrice) != "0.00" && (formatNumber(PeruNetPrice) < Peruminvalue)) {
        ErrorAlert("Error","Peru net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(PhilipinesNetPrice) != "0.00" && (formatNumber(PhilipinesNetPrice) < PhilipinesminValue)) {
        ErrorAlert("Error","Philippines net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(PolandNetPrice) != "0.00" && (formatNumber(PolandNetPrice) < PolandminValue)) {
        ErrorAlert("Error","Poland net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(RomaniaNetPrice) != "0.00" && (formatNumber(RomaniaNetPrice) < Romaniaminvalue)) {
        ErrorAlert("Error","Romania net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(RussiaNetPrice) != "0.00" && (formatNumber(RussiaNetPrice) < RussiaminValue)) {
        ErrorAlert("Error","Russia net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(SingaporeNetPrice) != "0.00" && (formatNumber(SingaporeNetPrice) < SingaporeminValue)) {
        ErrorAlert("Error","Singapore net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(ThailandNetPrice) != "0.00" && (formatNumber(ThailandNetPrice) < ThailandminValue)) {
        ErrorAlert("Error","Thailand net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(TaiwanNetPrice) != "0.00" && (formatNumber(TaiwanNetPrice) < TaiwanminValue)) {
        ErrorAlert("Error","Taiwan net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(VietnamNetPrice) != "0.00" && (formatNumber(VietnamNetPrice) < VietnamminValue)) {
        ErrorAlert("Error","Vietnam net price should be greater than minimum price");
        setloading_button(false)
        return
      }

      if (formatNumber(SANetPrice) != "0.00" && (formatNumber(SANetPrice) < SAminValue)) {
        ErrorAlert("Error","South Africa net price should be greater than minimum price");
        setloading_button(false)
        return
      }


    
      

      var raw = {
        "courseCode":`${code}`,
        "globalListPrice":`${Number.parseFloat(DGlobalPricing).toFixed(2)}`,
        "discountType":`${DDisType}`,
        "discountAmount":`${Number.parseFloat(DDisAmt).toFixed(2)}`,
        "discount":`${Number.parseFloat(DDisPercent).toFixed(2)}`,
        "globalNetPrice":`${Number.parseFloat(DGlobalNetPrice).toFixed(2)}`,
        "prices":[
          {
            
            "netPrice": `${Number.parseFloat(USANetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(USAListPrice).toFixed(2)}`,
            "discountType": `${USADisType}`,
            "country": "America",
            "discount": `${Number.parseFloat(USADisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(USADisAmt).toFixed(2)}`
        },
        {
            
            "netPrice": `${Number.parseFloat(AusNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(AusListPrice).toFixed(2)}`,
            "discountType":`${AusDisType}`,
            "country": "Australia",
            "discount": `${Number.parseFloat(AusDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(AusDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(BrazilNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(BrazilListPrice).toFixed(2)}`,
            "discountType": `${BrazilDisType}`,
            "country": "Brazil",
            "discount": `${Number.parseFloat(BrazilDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(BrazilDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(CanadaNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(CanadaListPrice).toFixed(2)}`,
            "discountType": `${CanadaDisType}`,
            "country": "Canada",
            "discount": `${Number.parseFloat(CanadaDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(CanadaDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(ChileNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(ChileListPrice).toFixed(2)}`,
            "discountType": `${ChileDisType}`,
            "country": "Chile",
            "discount": `${Number.parseFloat(ChileDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(ChileDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(ColumbiaNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(ColumbiaListPrice).toFixed(2)}`,
            "discountType": `${ColumbiaDisType}`,
            "country": "Columbia",
            "discount": `${Number.parseFloat(ColumbiaDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(ColumbiaDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(EgyptNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(EgyptListPrice).toFixed(2)}`,
            "discountType": `${EgyptDisType}`,
            "country": "Egypt",
            "discount": `${Number.parseFloat(EgyptDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(EgyptDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(EUNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(EUListPrice).toFixed(2)}`,
            "discountType": `${EUDisType}`,
            "country": "European Union",
            "discount": `${Number.parseFloat(EUDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(EUDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(GBPNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(GBPListPrice).toFixed(2)}`,
            "discountType":`${GBPDisType}`,
            "country": "Great Britain",
            "discount": `${Number.parseFloat(GBPDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(GBPDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(IndonesiaNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(IndonesiaListPrice).toFixed(2)}`,
            "discountType": `${IndonesiaDisType}`,
            "country": "Indonesia",
            "discount": `${Number.parseFloat(IndonesiaDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(IndonesiaDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(IsrealNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(IsrealListPrice).toFixed(2)}`,
            "discountType": `${IsrealDisType}`,
            "country": "Israel",
            "discount": `${Number.parseFloat(IsrealDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(IsrealDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(IndiaNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(IndiaListPrice).toFixed(2)}`,
            "discountType": `${IndiaDisType}`,
            "country": "India",
            "discount": `${Number.parseFloat(IndiaDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(IndiaDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(JapanNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(JapanListPrice).toFixed(2)}`,
            "discountType": `${JapanDisType}`,
            "country": "Japan",
            "discount": `${Number.parseFloat(JapanDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(JapanDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(SKNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(SKListPrice).toFixed(2)}`,
            "discountType": `${SKDisType}`,
            "country": "South Korea",
            "discount": `${Number.parseFloat(SKDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(SKDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(MexicoNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(MexicoListPrice).toFixed(2)}`,
            "discountType": `${MexicoDisType}`,
            "country": "Mexico",
            "discount": `${Number.parseFloat(MexicoDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(MexicoDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(MalaysiaNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(MalaysiaListPrice).toFixed(2)}`,
            "discountType": `${MalaysiaDisType}`,
            "country": "Malaysia",
            "discount": `${Number.parseFloat(MalaysiaDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(MalaysiaDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(NIgeriaNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(NigeriaListPrice).toFixed(2)}`,
            "discountType": `${NigeriaDisType}`,
            "country": "Nigeria",
            "discount": `${Number.parseFloat(NigeriaDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(NigeriaDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(NorwayNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(NorwayListPrice).toFixed(2)}`,
            "discountType": `${NorwayDisType}`,
            "country": "Norway",
            "discount": `${Number.parseFloat(NorwayDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(NorwayDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(PeruNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(PeruListPrice).toFixed(2)}`,
            "discountType": `${PeruDisType}`,
            "country": "Peru",
            "discount": `${Number.parseFloat(PeruDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(PeruDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(PhilipinesNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(PhilipinesListPrice).toFixed(2)}`,
            "discountType": `${PhilipinesDisType}`,
            "country": "Philippines",
            "discount": `${Number.parseFloat(PhilipinesDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(PhiliphinesDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(PolandNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(PolandListPrice).toFixed(2)}`,
            "discountType": `${PolandDisType}`,
            "country": "Poland",
            "discount": `${Number.parseFloat(PolandDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(PolandDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(RomaniaNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(RomaniaListPrice).toFixed(2)}`,
            "discountType": `${RomaniaDisType}`,
            "country": "Romania",
            "discount": `${Number.parseFloat(RomaniaDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(RomaniaDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(RussiaNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(RussiaListPrice).toFixed(2)}`,
            "discountType":`${RussiaDisType}`,
            "country": "Russia",
            "discount": `${Number.parseFloat(RussiaDisDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(RussiaDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(SingaporeNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(SingaporeListPrice).toFixed(2)}`,
            "discountType": `${SingaporeDisType}`,
            "country": "Singapore",
            "discount": `${Number.parseFloat(SingaporeDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(SingaporeDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(ThailandNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(ThailandListPrice).toFixed(2)}`,
            "discountType": `${ThailandDisType}`,
            "country": "Thailand",
            "discount": `${Number.parseFloat(ThailandDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(ThailandDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(TurkeyNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(TurkeyListPrice).toFixed(2)}`,
            "discountType": `${TurkeyDisType}`,
            "country": "Turkey",
            "discount": `${Number.parseFloat(TurkeyDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(TurkeyDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(TaiwanNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(TaiwanListPrice).toFixed(2)}`,
            "discountType": `${TaiwanDisType}`,
            "country": "Taiwan",
            "discount": `${Number.parseFloat(TaiwanDisPercent).toFixed(2)}`,
            "discountAmount":  `${Number.parseFloat(TaiwanDisAmt).toFixed(2)}`,
        },
        {
            
            "netPrice":`${Number.parseFloat(VietnamNetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(VietnamListPrice).toFixed(2)}`,
            "discountType": `${VietmanDisType}`,
            "country": "Vietnam",
            "discount": `${Number.parseFloat(VietnamDisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(VietnamDisAmt).toFixed(2)}`,
        },
           {
            
            "netPrice":`${Number.parseFloat(SANetPrice).toFixed(2)}`,
            "listPrice": `${Number.parseFloat(SAListPrice).toFixed(2)}`,
            "discountType": `${SADisType}`,
            "country": "South Africa",
            "discount": `${Number.parseFloat(SADisPercent).toFixed(2)}`,
            "discountAmount": `${Number.parseFloat(SADisAmt).toFixed(2)}`,
        }
        ]
        }

      // ----------------------

       console.log(raw)
    
    
    SavePriceCountries(code,raw,setloading_button)

    }


  
  }

  return (
    <div className="col-md-10 px-4 mb-4 course-landing-page-responsive">
      <Card className="py-2 my-2">
      <div className='d-flex justify-content-between p-4'>
        <Typography className="p-3" variant="h4">
          Pricing
        </Typography>

      {loading_button ?  <Button variant="contained"><ButtonSpinner /></Button> : <Button onClick={handleSubmitAllPrices} variant="contained">SAVE</Button>}
        
       

        </div>

        <hr />

      
        {/* Paid Type */}
        {loading_btn ?  <LoadingSpinner w={"40%"} h={"100%"} wpclass={"m-4"} /> :      
        <>
        <div className="container m-2">
        <h6>Please select the type of your course:</h6>
          <Radio.Group onChange={onChangePaidType} value={Paid_Type}>
          <Radio value={1} >Free course</Radio>
          <Radio value={2}>Paid course</Radio>
        </Radio.Group>
        </div>

    

        {VideoLength > 9000 && Paid_Type == 1 && (
        <div className="container m-2">
        <Alert variant="outlined" severity="warning">
               The maximum video content length on a free course is 2.5 hours. Please reduce your total video length to comply.
        </Alert>
        </div>
        )}

        {VideoLength < 45 && Paid_Type == 2 && (
        <div className="container m-2">
        <Alert variant="outlined" severity="warning">
            The minimum video content length on a paid course is 45 minutes. Please increase your total video length to comply.
        </Alert>
        </div>
        )}

        {NoOfLessons < 5 && Paid_Type == 2 && (
        <div className="container m-2">
        <Alert variant="outlined" severity="warning">
          The minimum number of lessons on a paid course is 5. Please increase your total number of lessons to comply.
        </Alert>
        </div>
        )}

        {NoOfLessons < 5 || VideoLength < 45 && Paid_Type == 2 &&  (
        <div className="container m-2">
        <Alert variant="outlined" severity="warning">
        The minimum video content length on a paid course is 45 minutes and the minimum number of lessons on a paid course is 5. Please increase your total video length and total number of lessons to comply.
        </Alert>
        </div>
        )}

       
       

        {countriesData != null && (
              Paid_Type == 2 && (
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

              <br />
              <br />

                    <div className="row border border-secondary p-3">


                    <table className="table table-striped text-center">
                    <thead>
                      <tr>
                        <th className="col-2" scope="col">Country</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Price Range</th>
                        <th  scope="col">List Price</th>

                        <th scope="col">Discount Type</th>
                        <th scope="col">Discount %</th>
                        <th scope="col">Discount Amount</th>
                        <th scope="col">Net Price</th>
                      


                      </tr>
                    </thead>
                    <tbody>

                    <tr>
                        <td>Worldwide
                        <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("USD")}{parseFloat(GlobalTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>USD</td>
                          <td style={{whiteSpace:'nowrap'}}>${PriceRangeMinDefault} – ${PriceRangeMaxDefault}</td>
                          <td>
                          <Form.Control  
                            style={{width:100}}
                            isInvalid={DGlobalPricing != 0 && (DGlobalPricing < PriceRangeMinDefault || DGlobalPricing > PriceRangeMaxDefault ?  true : false)}
                            value={DGlobalPricing}
                            onChange={handleChangeGlobalPrice}
                            type="text" />
                              <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
                          </td>
                          <td>
                          <Select style={{width:130}} value={DDisType}  onChange={handleDefaultDiscountType}  aria-label="Default select example">
                            <option value="0" disabled selected>Select an Option</option>
                            {dis_types.map((type,index) => (
                              <option key={index + Math.random()} value={type.id}>{type.name}</option>
                            ))}
                          </Select>
                          </td>
                          <td>
                        
                          <Form.Control disabled={DDisType == 3 || DDisType == 1} value={DDisPercent} onChange={handleDefaultPercentageDiscount}  type="text" />
                  
                          </td>
                          <td>
                       
                          <Form.Control  disabled={DDisType == 2 || DDisType == 1} value={DDisAmt} onChange={handleDefaultDiscountAmt} type="text" />
                    
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                          <Form.Control 
                            isInvalid={formatNumber(DGlobalNetPrice) != "0.00" && (formatNumber(DGlobalNetPrice) < MinDefaultValue) ? true : false} 
                            readOnly disabled 
                            value={DGlobalNetPrice == "" ? "0.00" : formatNumber(DGlobalNetPrice)}  />
                                <Form.Control.Feedback type="invalid">
                                Not within range
                                </Form.Control.Feedback>

                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("USD"))}{MinDefaultValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                      </tbody>
                    </table>

                    </div>
                  </div>



                  <table className="table table-striped text-center">
                    <thead>
                      <tr>
                        <th className="col-2" scope="col">Country</th>
                        <th scope="col">Currency</th>
                        <th scope="col">Price Range</th>
                        <th  scope="col">List Price</th>

                        <th scope="col">Discount Type</th>
                        <th scope="col">Discount %</th>
                        <th scope="col">Discount Amount</th>
                        <th scope="col">Net Price</th>
                      


                      </tr>
                    </thead>
                    <tbody>
                    
                        <tr>
                          <td >United States + other USD countries*
                          <td className="col-12 font-italic mt-5">
                            <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("USD")}{parseFloat(USATip).toFixed(2)} may optimize sales.
                            </Form.Label>
                          </td>

                        </td>

                          <td>USD</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("USD"))} ${countriesData != null && countriesData.priceRange[0].minPrice} - ${getSymbolFromCurrency(("USD"))} ${countriesData != null && countriesData.priceRange[0].maxPrice}`}</td>
                          <td>
                            <Form.Control  
                            style={{width:100}}
                           isInvalid={USAListPrice != 0 && (USAListPrice < countriesData.priceRange[0].minPrice || USAListPrice > countriesData.priceRange[0].maxPrice)}
                            value={USAListPrice}  onChange={handleChangeGlobalPriceUSA} type="text" />
                              <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentUSA && ( */}
                          <Form.Control disabled={USADisType == 3 || USADisType == 1}  value={USADisPercent} onChange={handleDefaultPercentageDiscountUSA}  type="text" />
                            {/* )} */}
                          </td>
                          <td>
                          {/* {showInputDisAmtUSA && ( */}
                          <Form.Control disabled={USADisType == 2 || USADisType == 1} value={USADisAmt}  onChange={handleDefaultDiscountAmtUSA} type="text" />
                          {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                            isInvalid={formatNumber(USANetPrice) != "0.00" && (formatNumber(USANetPrice) < USAMinValue) ? true : false} 
                            readOnly disabled 
                            value={USANetPrice == "" ? "0.00" : formatNumber(USANetPrice)}  />
                                <Form.Control.Feedback type="invalid">
                                Not within range
                                </Form.Control.Feedback>

                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("USD"))}{USAMinValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Australia
                          <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("AUD")}{parseFloat(AusTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>AUD</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("AUD"))} ${countriesData.priceRange[1].minPrice} - ${getSymbolFromCurrency(("AUD"))} ${countriesData.priceRange[1].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                             isInvalid={AusListPrice != 0 && (AusListPrice < countriesData.priceRange[1].minPrice || AusListPrice > countriesData.priceRange[1].maxPrice) ?  true : false} 
                            value={AusListPrice} onChange={handleChangeGlobalPriceAus} type="text" />
                             <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                          {/* {showInputPercentAus && ( */}
                          <Form.Control disabled={AusDisType == 3 || AusDisType == 1} value={AusDisPercent} onChange={handleDefaultPercentageDiscountAus} type="text" />
                            {/* )} */}
                          
                          </td>
                          <td>
                          {/* {showInputDisAmtAus && ( */}
                          <Form.Control disabled={AusDisType == 2 || AusDisType == 1} value={AusDisAmt} onChange={handleDefaultDiscountAmtAus} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                          <Form.Control 
                          isInvalid={formatNumber(AusNetPrice) != "0.00" && (formatNumber(AusNetPrice) < AusminValue)? true : false} 
                          readOnly disabled 
                          value={AusNetPrice == "" ? "0.00" : formatNumber(AusNetPrice)}  />
                             <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("AUD"))} {AusminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        
                        <tr>
                          <td>Brazil
                          <td className="col-12 font-italic mt-5">
                              <Form.Label className="mt-3 tit fst-italic">
                                Tip: Pricing around {getSymbolFromCurrency("BRL")}{parseFloat(BrazilTip).toFixed(2)} may optimize sales.
                              </Form.Label>
                            </td>

                        </td>

                          <td>BRL</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("BRL"))} ${countriesData.priceRange[2].minPrice} - ${getSymbolFromCurrency(("BRL"))} ${countriesData.priceRange[2].maxPrice}`}</td>
                          <td>
                            <Form.Control
                              isInvalid={BrazilListPrice != 0 && (BrazilListPrice < countriesData.priceRange[2].minPrice || BrazilListPrice > countriesData.priceRange[2].maxPrice) ?  true : false} 
                            value={BrazilListPrice} onChange={handleChangeGlobalPriceBrazil} type="text" />
                             <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentBrzail && ( */}
                                <Form.Control disabled={BrazilDisType == 3 || BrazilDisType == 1} value={BrazilDisPercent} onChange={handleDefaultPercentageDiscountBrazil} type="text" />
                              {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtBrzail && ( */}

                          <Form.Control disabled={BrazilDisType == 2 || BrazilDisType == 1} value={BrazilDisAmt} onChange={handleDefaultDiscountAmtBrazil} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                          <Form.Control 
                          isInvalid={formatNumber(BrazilNetPrice) != "0.00" && (formatNumber(BrazilNetPrice) < BrazilminValue)? true : false} 
                          readOnly disabled 
                          value={BrazilNetPrice == "" ? "0.00" : formatNumber(BrazilNetPrice)}  />
                             <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>

                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("BRL"))} {BrazilminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Canada
                          <td className="col-12 font-italic mt-5">
                              <Form.Label className="mt-3 tit fst-italic">
                                Tip: Pricing around {getSymbolFromCurrency("CAD")}{parseFloat(CanadaTip).toFixed(2)} may optimize sales.
                              </Form.Label>
                            </td>

                        </td>

                          <td>CAD</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("CAD"))} ${countriesData.priceRange[3].minPrice} - ${getSymbolFromCurrency(("CAD"))} ${countriesData.priceRange[3].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                             isInvalid={CanadaListPrice != 0 &&  (CanadaListPrice < countriesData.priceRange[3].minPrice || CanadaListPrice > countriesData.priceRange[3].maxPrice) ?  true : false} 
                            value={CanadaListPrice} onChange={handleChangeGlobalPriceCanada} type="text" />
                             <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentCanada && ( */}
                          <Form.Control  disabled={CanadaDisType == 3 || CanadaDisType == 1}  value={CanadaDisPercent} onChange={handleDefaultPercentageDiscountCanada} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            
                            {/* {showInputDisAmtCanada && ( */}
                          <Form.Control disabled={CanadaDisType == 2 || CanadaDisType == 1} value={CanadaDisAmt} onChange={handleDefaultDiscountAmtCanada} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                          <Form.Control 
                        isInvalid={formatNumber(CanadaNetPrice) != "0.00" && (formatNumber(CanadaNetPrice) < CanadaminValue) ? true : false} 
                        readOnly disabled 
                        value={CanadaNetPrice == "" ? "0.00" : formatNumber(CanadaNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("CAD"))} {CanadaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>


                        <tr>
                          <td>Chile
                          <td className="col-12 font-italic mt-5">
                        <Form.Label className="mt-3 tit fst-italic">
                          Tip: Pricing around {getSymbolFromCurrency("CLP")}{parseFloat(ChileTip).toFixed(2)} may optimize sales.
                        </Form.Label>
                      </td>

                        </td>

                          <td>CLP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("CLP"))} ${countriesData.priceRange[4].minPrice} - ${getSymbolFromCurrency(("CLP"))} ${countriesData.priceRange[4].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                            isInvalid={ChileListPrice != 0 &&  (ChileListPrice < countriesData.priceRange[4].minPrice || ChileListPrice > countriesData.priceRange[4].maxPrice) ?  true : false} 
                            value={ChileListPrice} onChange={handleChangeGlobalPriceChile} type="text" />
                             <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentChile && ( */}
                              <Form.Control disabled={ChileDisType == 3 || ChileDisType == 1} value={ChileDisPercent} onChange={handleDefaultPercentageDiscountChile} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtChile && ( */}
                            <Form.Control disabled={ChileDisType == 2 || ChileDisType == 1} value={ChileDisAmt}  onChange={handleDefaultDiscountAmtChile} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(ChileNetPrice) != "0.00" && (formatNumber(ChileNetPrice) < ChileminValue) ? true : false} 
                          readOnly disabled 
                          value={ChileNetPrice == "" ? "0.00" : formatNumber(ChileNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>
                  
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("CLP"))} {ChileminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Columbia
                          <td className="col-12 font-italic mt-5">
                            <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("COP")}{parseFloat(ColumbiaTip).toFixed(2)} may optimize sales.
                            </Form.Label>
                          </td>

                        </td>

                          <td>COP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("COP"))} ${countriesData.priceRange[5].minPrice} - ${getSymbolFromCurrency(("COP"))} ${countriesData.priceRange[5].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                             isInvalid={ColumbiaListPrice != 0 && (ColumbiaListPrice < countriesData.priceRange[5].minPrice || ColumbiaListPrice > countriesData.priceRange[5].maxPrice )?  true : false}
                            value={ColumbiaListPrice} onChange={handleChangeGlobalPriceColumbia} type="text" />
                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentColumbia && ( */}
                                <Form.Control 
                                disabled={ColumbiaDisType == 3 || ColumbiaDisType == 1} value={ColumbiaDisPercent} onChange={handleDefaultPercentageDiscountColumbia} type="text" />
                              {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtColumbia && ( */}
                          <Form.Control disabled={ColumbiaDisType == 2 || ColumbiaDisType == 1} value={ColumbiaDisAmt} onChange={handleDefaultDiscountAmtColumbia} type="text" />
                            {/* // )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(ColumbiaNetPrice) != "0.00" && (formatNumber(ColumbiaNetPrice) < ColumbiaminValue) ? true : false} 
                          readOnly disabled 
                          value={ColumbiaNetPrice == "" ? "0.00" : formatNumber(ColumbiaNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>

                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("COP"))} {ColumbiaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Egypt
                          <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("EGP")}{parseFloat(EgyptTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>EGP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("EGP"))} ${countriesData.priceRange[6].minPrice} - ${getSymbolFromCurrency(("EGP"))} ${countriesData.priceRange[6].maxPrice}`}</td>
                          <td>
                            <Form.Control
                            isInvalid={EgyptListPrice != 0 &&  (EgyptListPrice < countriesData.priceRange[6].minPrice || EgyptListPrice > countriesData.priceRange[6].maxPrice) ?  true : false}
                            value={EgyptListPrice} onChange={handleChangeGlobalPriceEgypt} type="text" />
                                <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentEgypt && ( */}
                          <Form.Control disabled={EgyptDisType == 3 || EgyptDisType == 1} value={EgyptDisPercent} onChange={handleDefaultPercentageDiscountEgypt} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtEgypt && ( */}
                          <Form.Control disabled={EgyptDisType == 2 || EgyptDisType == 1} value={EgyptDisAmt} onChange={handleDefaultDiscountAmtEgypt} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(EgyptNetPrice) != "0.00" && (formatNumber(EgyptNetPrice) < EgyptminValue)? true : false} 
                          readOnly disabled 
                          value={EgyptNetPrice == "" ? "0.00" : formatNumber(EgyptNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>

                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("EGP"))}{EgyptminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>European Union (EU) + other EUR conuntries*
                          <td className="col-12 font-italic mt-5">
                            <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("EUR")}{parseFloat(EUTip).toFixed(2)} may optimize sales.
                            </Form.Label>
                          </td>

                        </td>

                          <td>EUR</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("EUR"))} ${countriesData.priceRange[7].minPrice}  - ${getSymbolFromCurrency(("EUR"))} ${countriesData.priceRange[7].maxPrice}`}</td>
                          <td>
                            <Form.Control
                              isInvalid={EUListPrice != 0 && (EUListPrice < countriesData.priceRange[7].minPrice || EUListPrice > countriesData.priceRange[7].maxPrice) ?  true : false}
                            value={EUListPrice} onChange={handleChangeGlobalPriceEU} type="text" />
                             <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentEU && ( */}
                          <Form.Control  disabled={EUDisType == 3 || EUDisType == 1}  value={EUDisPercent} onChange={handleDefaultPercentageDiscountEU} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtEU && ( */}
                            <Form.Control disabled={EUDisType == 2 || EUDisType == 1} value={EUDisAmt} onChange={handleDefaultDiscountAmtEU} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(EUNetPrice) != "0.00" && (formatNumber(EUNetPrice) < EUminValue)? true : false} 
                          readOnly disabled 
                          value={EUNetPrice == "" ? "0.00" : formatNumber(EUNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>


                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("EUR"))} {EUminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>
                        
                        <tr>
                          <td>United Kingdom
                          <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("GBP")}{parseFloat(GBPTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>GBP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("GBP"))} ${countriesData.priceRange[8].minPrice} - ${getSymbolFromCurrency(("GBP"))} ${countriesData.priceRange[8].maxPrice}`}</td>
                          <td>
                            <Form.Control
                            isInvalid={GBPListPrice != 0 &&  (GBPListPrice < countriesData.priceRange[8].minPrice || GBPListPrice > countriesData.priceRange[8].maxPrice) ?  true : false}
                            value={GBPListPrice} onChange={handleChangeGlobalPriceGBP} type="text" />
                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>

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
                            {/* {showInputPercentGBP && ( */}
                          <Form.Control disabled={GBPDisType == 3 || GBPDisType == 1} value={GBPDisPercent} onChange={handleDefaultPercentageDiscountGBP} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtGBP && ( */}
                              <Form.Control disabled={GBPDisType == 2 || GBPDisType == 1}  value={GBPDisAmt} onChange={handleDefaultDiscountAmtGBP} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(GBPNetPrice) != "0.00" && (formatNumber(GBPNetPrice) < GBPminValue) ? true : false} 
                          readOnly disabled 
                          value={GBPNetPrice == "" ? "0.00" : formatNumber(GBPNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>


                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("GBP"))} {GBPminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Indonesia
                          <td className="col-12 font-italic mt-5">
                            <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("IDR")}{parseFloat(IndonesiaTip).toFixed(2)} may optimize sales.
                            </Form.Label>
                          </td>

                        </td>

                          <td>IDR</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("IDR"))} ${countriesData.priceRange[9].minPrice} - ${getSymbolFromCurrency(("IDR"))} ${countriesData.priceRange[9].maxPrice}`}</td>
                          <td>
                            <Form.Control
                               isInvalid={IndonesiaListPrice != 0 && (IndonesiaListPrice < countriesData.priceRange[9].minPrice || IndonesiaListPrice > countriesData.priceRange[9].maxPrice) ?  true : false}
                            value={IndonesiaListPrice} onChange={handleChangeGlobalPriceIndo} type="text" />
                              <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentIndonesia && ( */}
                          <Form.Control disabled={IndonesiaDisType == 3 || IndonesiaDisType == 1} value={IndonesiaDisPercent} onChange={handleDefaultPercentageDiscountIndo} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtIndonesia && ( */}
                          <Form.Control disabled={IndonesiaDisType == 2 || IndonesiaDisType == 1} value={IndonesiaDisAmt} onChange={handleDefaultDiscountAmtIndo} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(IndonesiaNetPrice) != "0.00" && (formatNumber(IndonesiaNetPrice) < IndonesiaminValue) ? true : false} 
                          readOnly disabled 
                          value={IndonesiaNetPrice == "" ? "0.00" : formatNumber(IndonesiaNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>

  
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("IDR"))} {IndonesiaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Israel
                          <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("ILS")}{parseFloat(IsrealTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>ILS</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("ILS"))} ${countriesData.priceRange[10].minPrice} - ${getSymbolFromCurrency(("ILS"))} ${countriesData.priceRange[10].maxPrice}`}</td>
                          <td>
                            <Form.Control
                               isInvalid={IsrealListPrice != 0 && (IsrealListPrice < countriesData.priceRange[10].minPrice || IsrealListPrice > countriesData.priceRange[10].maxPrice) ?  true : false}
                            value={IsrealListPrice} onChange={handleChangeGlobalPriceIsreal} type="text" />
                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentIsreal && ( */}

                            <Form.Control disabled={IsrealDisType == 3 || IsrealDisType == 1} value={IsrealDisPercent} onChange={handleDefaultPercentageDiscountIsreal} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtIsreal && ( */}

                          <Form.Control disabled={IsrealDisType == 2 || IsrealDisType == 1} value={IsrealDisAmt} onChange={handleDefaultDiscountAmtIsreal} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(IsrealNetPrice) != "0.00" && (formatNumber(IsrealNetPrice) < IsrealminValue)? true : false} 
                          readOnly disabled 
                          value={IsrealNetPrice == "" ? "0.00" : formatNumber(IsrealNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("ILS"))} {IsrealminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>India
                          <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("INR")}{parseFloat(IndiaTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>INR</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("INR"))} ${countriesData.priceRange[11].minPrice} - ${getSymbolFromCurrency(("INR"))} ${countriesData.priceRange[11].maxPrice}`}</td>
                          <td>
                            <Form.Control
                             isInvalid={IndiaListPrice != 0 && (IndiaListPrice < countriesData.priceRange[11].minPrice || IndiaListPrice > countriesData.priceRange[11].maxPrice) ?  true : false}
                            value={IndiaListPrice} onChange={handleChangeGlobalPriceIndia} type="text" />
                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentIndia && ( */}
                          <Form.Control disabled={IndiaDisType == 3 || IndiaDisType == 1} value={IndiaDisPercent} onChange={handleDefaultPercentageDiscountIndia} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtIndia && ( */}

                          <Form.Control disabled={IndiaDisType == 2 || IndiaDisType == 1} value={IndiaDisAmt} onChange={handleDefaultDiscountAmtIndia} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(IndiaNetPrice) != "0.00" &&  (formatNumber(IndiaNetPrice) < IndiaminValue)? true : false} 
                          readOnly disabled 
                          value={IndiaNetPrice == "" ? "0.00" : formatNumber(IndiaNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>

                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("INR"))} {IndiaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Japan
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic">Tip: Pricing around {getSymbolFromCurrency(("JPY"))}{JapanTip} may optimize sales.</Form.Label></td>
                        </td>

                          <td>JPY</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("JPY"))} ${countriesData.priceRange[12].minPrice} - ${getSymbolFromCurrency(("JPY"))} ${countriesData.priceRange[12].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                             isInvalid={JapanListPrice != 0 && (JapanListPrice < countriesData.priceRange[12].minPrice || JapanListPrice > countriesData.priceRange[12].maxPrice) ?  true : false}
                            value={JapanListPrice} onChange={handleChangeGlobalPriceJapan} type="text" />
                             <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentJapan && ( */}

                          <Form.Control disabled={JapanDisType == 3 || JapanDisType == 1} value={JapanDisPercent} onChange={handleDefaultPercentageDiscountJapan} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtJapan && ( */}

                        <Form.Control disabled={JapanDisType == 2 || JapanDisType == 1} value={JapanDisAmt} onChange={handleDefaultDiscountAmtJapan} type="text" />
                              {/* // )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumInt(JapanNetPrice) != "0" && (formatNumInt(JapanNetPrice) < JapanminValue) ? true : false} 
                          readOnly disabled 
                          value={JapanNetPrice == "" ? "0.00" : formatNumInt(JapanNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>

                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("JPY"))} {JapanminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>South Korea
                          <td className="col-12 font-italic mt-5">
                            <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("KRW")}{parseFloat(SKTip).toFixed(2)} may optimize sales.
                            </Form.Label>
                          </td>

                        </td>

                          <td>KRW</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("KRW"))} ${countriesData.priceRange[13].minPrice} - ${getSymbolFromCurrency(("KRW"))} ${countriesData.priceRange[13].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                             isInvalid={SKListPrice != 0 && (SKListPrice < countriesData.priceRange[13].minPrice || SKListPrice > countriesData.priceRange[13].maxPrice) ?  true : false}
                            value={SKListPrice} onChange={handleChangeGlobalPriceSK} type="text" />
                             <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                              {/* {showInputPercentSK && ( */}

                          <Form.Control disabled={SKDisType == 3 || SKDisType == 1} value={SKDisPercent} onChange={handleDefaultPercentageDiscountSK} type="text" />
                              {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtSK && ( */}
                              <Form.Control disabled={SKDisType == 2 || SKDisType == 1} value={SKDisAmt} onChange={handleDefaultDiscountAmtSK} type="text" />

                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(SKNetPrice) != "0.00" && (formatNumber(SKNetPrice) < SKminValue) ? true : false} 
                          readOnly disabled 
                          value={SKNetPrice == "" ? "0.00" : formatNumber(SKNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>

                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("KRW"))} {SKminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Mexico
                          <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("MXN")}{parseFloat(MexicoTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>MXN</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("MXN"))} ${countriesData.priceRange[14].minPrice} - ${getSymbolFromCurrency(("MXN"))} ${countriesData.priceRange[14].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                             isInvalid={MexicoListPrice != 0 && (MexicoListPrice < countriesData.priceRange[14].minPrice || MexicoListPrice > countriesData.priceRange[14].maxPrice) ?  true : false}
                            value={MexicoListPrice} onChange={handleChangeGlobalPriceMexico} type="text" />
                             <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentMexico && ( */}
                          <Form.Control disabled={MexicoDisType == 3 || MexicoDisType == 1} value={MexicoDisPercent} onChange={handleDefaultPercentageDiscountMexico} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtMexico && ( */}

                            <Form.Control  disabled={MexicoDisType == 2 || MexicoDisType == 1} value={MexicoDisAmt} onChange={handleDefaultDiscountAmtMexico} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(MexicoNetPrice) != "0.00" && (formatNumber(MexicoNetPrice) < MexicominValue)? true : false} 
                          readOnly disabled 
                          value={MexicoNetPrice == "" ? "0.00" : formatNumber(MexicoNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("MXN"))} {MexicominValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Malaysia
                          <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("MYR")}{parseFloat(MalaysiaTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>MYR</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("MYR"))} ${countriesData.priceRange[15].minPrice} - ${getSymbolFromCurrency(("MYR"))} ${countriesData.priceRange[15].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                            isInvalid={MalaysiaListPrice != 0 && (MalaysiaListPrice < countriesData.priceRange[15].minPrice || MalaysiaListPrice > countriesData.priceRange[15].maxPrice) ?  true : false}
                            value={MalaysiaListPrice} onChange={handleChangeGlobalPriceMalaysia} type="text" />
                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentMalaysia && ( */}
                          <Form.Control 
                          disabled={MalaysiaDisType == 3 || MalaysiaDisType == 1} value={MalaysiaDisPercent} onChange={handleDefaultPercentageDiscountMalaysia} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtMalaysia && ( */}
                              <Form.Control 
                              disabled={MalaysiaDisType == 2 || MalaysiaDisType == 1}
                              value={MalaysiaDisAmt} onChange={handleDefaultDiscountAmtMalaysia} type="text" />

                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(MalaysiaNetPrice) != "0.00" && (formatNumber(MalaysiaNetPrice) < MalaysiaminValue) ? true : false} 
                          readOnly disabled 
                          value={MalaysiaNetPrice == "" ? "0.00" : formatNumber(MalaysiaNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>

  
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("MYR"))}{MalaysiaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 
                        
                        <tr>
                          <td>Nigeria
                          <td className="col-12 font-italic mt-5">
                        <Form.Label className="mt-3 tit fst-italic">
                          Tip: Pricing around {getSymbolFromCurrency("NGN")}{parseFloat(NigeriaTip).toFixed(2)} may optimize sales.
                        </Form.Label>
                      </td>

                        </td>

                          <td>NGN</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("NGN"))} ${countriesData.priceRange[16].minPrice} - ${getSymbolFromCurrency(("NGN"))} ${countriesData.priceRange[16].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                             isInvalid={NigeriaListPrice != 0 && (NigeriaListPrice < countriesData.priceRange[16].minPrice || NigeriaListPrice > countriesData.priceRange[16].maxPrice) ?  true : false}
                            value={NigeriaListPrice} onChange={handleChangeGlobalPriceNigeria} type="text" />
                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentNigeria && ( */}
                          <Form.Control 
                          disabled={NigeriaDisType == 3 || NigeriaDisType == 1} value={NigeriaDisPercent} onChange={handleDefaultPercentageDiscountNigeria} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtNigeria && ( */}
                              <Form.Control disabled={NigeriaDisType == 2 || NigeriaDisType == 1} value={NigeriaDisAmt} onChange={handleDefaultDiscountAmtNigeria} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(NIgeriaNetPrice) != "0.00" && (formatNumber(NIgeriaNetPrice) < NigeriaminValue) ? true : false} 
                          readOnly disabled 
                          value={NIgeriaNetPrice == "" ? "0.00" : formatNumber(NIgeriaNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>

                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("NGN"))}{NigeriaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 

                        <tr>
                          <td>Norway
                          <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("NOK")}{parseFloat(NorwayTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>NOK</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("NOK"))} ${countriesData.priceRange[17].minPrice} - ${getSymbolFromCurrency(("NOK"))} ${countriesData.priceRange[17].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                            isInvalid={NorwayListPrice != 0 &&  (NorwayListPrice < countriesData.priceRange[17].minPrice || NorwayListPrice > countriesData.priceRange[17].maxPrice) ?  true : false}
                            value={NorwayListPrice} onChange={handleChangeGlobalPriceNorway} type="text" />
                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentNorway && ( */}
                          <Form.Control disabled={NorwayDisType == 3 || NorwayDisType == 1} value={NorwayDisPercent} onChange={handleDefaultPercentageDiscountNorway} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtNorway && ( */}
                          <Form.Control disabled={NorwayDisType == 2 || NorwayDisType == 1} value={NorwayDisAmt} onChange={handleDefaultDiscountAmtNorway} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(NorwayNetPrice) != "0.00" && (formatNumber(NorwayNetPrice) < NorwayminValue) ? true : false} 
                          readOnly disabled 
                          value={NorwayNetPrice == "" ? "0.00" : formatNumber(NorwayNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("NOK"))}{NorwayminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Peru
                          <td className="col-12 font-italic mt-5">
                            <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("PEN")}{parseFloat(PeruTip).toFixed(2)} may optimize sales.
                            </Form.Label>
                          </td>

                        </td>

                          <td>PEN</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("PEN"))} ${countriesData.priceRange[18].minPrice} - ${getSymbolFromCurrency(("PEN"))} ${countriesData.priceRange[18].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                             isInvalid={PeruListPrice != 0 &&  (PeruListPrice < countriesData.priceRange[18].minPrice || PeruListPrice > countriesData.priceRange[18].maxPrice) ?  true : false}
                            value={PeruListPrice} onChange={handleChangeGlobalPricePeru} type="text" />
                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentPeru && ( */}

                          <Form.Control disabled={PeruDisType == 3 || PeruDisType == 1} value={PeruDisPercent} onChange={handleDefaultPercentageDiscountPeru} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                          
                            {/* {showInputDisAmtPeru && ( */}
                        <Form.Control disabled={PeruDisType == 2 || PeruDisType == 1} value={PeruDisAmt} onChange={handleDefaultDiscountAmtPeru} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                          <Form.Control 
                          isInvalid={formatNumber(PeruNetPrice) != "0.00" && (formatNumber(PeruNetPrice) < Peruminvalue) ? true : false} 
                          readOnly disabled 
                          value={PeruNetPrice == "" ? "0.00" : formatNumber(PeruNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>
     
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("PEN"))} {Peruminvalue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 
                          

                          <tr>
                          <td>Philippines
                          <td className="col-12 font-italic mt-5">
                            <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("PHP")}{parseFloat(PhilipinesTip).toFixed(2)} may optimize sales.
                            </Form.Label>
                          </td>

                        </td>

                          <td>PHP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("PHP"))} ${countriesData.priceRange[19].minPrice} - ${getSymbolFromCurrency(("PHP"))} ${countriesData.priceRange[19].maxPrice}`}</td>
                          <td>
                            <Form.Control
                              isInvalid={PhilipinesListPrice != 0 && (PhilipinesListPrice < countriesData.priceRange[19].minPrice || PhilipinesListPrice > countriesData.priceRange[19].maxPrice) ?  true : false}
                            value={PhilipinesListPrice} onChange={handleChangeGlobalPricePhilipines} type="text" />
                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentPhilipines && ( */}
                              <Form.Control disabled={PhilipinesDisType == 3 || PhilipinesDisType == 1} value={PhilipinesDisPercent} onChange={handleDefaultPercentageDiscountPhilipines} type="text" />

                            {/* )} */}
                          </td>
                          <td>
                          {/* {showInputDisAmtPhilipines && ( */}
                          <Form.Control disabled={PhilipinesDisType == 2 || PhilipinesDisType == 1} value={PhiliphinesDisAmt} onChange={handleDefaultDiscountAmtPhilipines} type="text" />
                          {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(PhilipinesNetPrice) != "0.00" && (formatNumber(PhilipinesNetPrice) < PhilipinesminValue)? true : false} 
                          readOnly disabled 
                          value={PhilipinesNetPrice == "" ? "0.00" : formatNumber(PhilipinesNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("PHP"))} {PhilipinesminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 

                        <tr>
                          <td>Poland
                          <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("PLN")}{parseFloat(PolandTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>PLN</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("PLN"))} ${countriesData.priceRange[20].minPrice} - ${getSymbolFromCurrency(("PLN"))} ${countriesData.priceRange[20].maxPrice}`}</td>
                          <td>
                            <Form.Control
                             isInvalid={PolandListPrice != 0 && (PolandListPrice < countriesData.priceRange[20].minPrice || PolandListPrice > countriesData.priceRange[20].maxPrice) ?  true : false}
                            value={PolandListPrice} onChange={handleChangeGlobalPricePoland} type="text" />
                             <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentPoland && ( */}

                          <Form.Control disabled={PolandDisType == 3 || PolandDisType == 1} value={PolandDisPercent} onChange={handleDefaultPercentageDiscountPoland} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtPoland && ( */}

                        <Form.Control disabled={PolandDisType == 2 || PolandDisType == 1} value={PolandDisAmt} onChange={handleDefaultDiscountAmtPoland} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(PolandNetPrice) != "0.00" && (formatNumber(PolandNetPrice) < PolandminValue) ? true : false} 
                          readOnly disabled 
                          value={PolandNetPrice == "" ? "0.00" : formatNumber(PolandNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>

    
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("PLN"))} {PolandminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 

                        <tr>
                          <td>Romania
                          <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("RON")}{parseFloat(RomaniaTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>RON</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("RON"))} ${countriesData.priceRange[21].minPrice} - ${getSymbolFromCurrency(("RON"))} ${countriesData.priceRange[21].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                            isInvalid={RomaniaListPrice != 0 && (RomaniaListPrice < countriesData.priceRange[21].minPrice || RomaniaListPrice > countriesData.priceRange[21].maxPrice) ?  true : false}
                            value={RomaniaListPrice} onChange={handleChangeGlobalPriceRomania} type="text" />
                             <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentRomania && ( */}
                          <Form.Control disabled={RomaniaDisType == 3 || RomaniaDisType == 1} value={RomaniaDisPercent} onChange={handleDefaultPercentageDiscountRomania} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtRomania && ( */}
                          <Form.Control disabled={RomaniaDisType == 2 || RomaniaDisType == 1} value={RomaniaDisAmt} onChange={handleDefaultDiscountAmtRomania} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(RomaniaNetPrice) != "0.00" && (formatNumber(RomaniaNetPrice) < Romaniaminvalue) ? true : false} 
                          readOnly disabled 
                          value={RomaniaNetPrice == "" ? "0.00" : formatNumber(RomaniaNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>

                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("RON"))} {Romaniaminvalue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 

                        <tr>
                          <td>Russia
                          <td className="col-12 font-italic mt-5">
                            <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("RUB")}{parseFloat(RussiaTip).toFixed(2)} may optimize sales.
                            </Form.Label>
                          </td>

                        </td>

                          <td>RUB</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("RUB"))} ${countriesData.priceRange[22].minPrice} - ${getSymbolFromCurrency(("RUB"))} ${countriesData.priceRange[22].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                             isInvalid={RussiaListPrice != 0 &&  (RussiaListPrice < countriesData.priceRange[22].minPrice || RussiaListPrice > countriesData.priceRange[22].maxPrice) ?  true : false}
                            value={RussiaListPrice} onChange={handleChangeGlobalPriceRussia} type="text" />
                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentRussia && ( */}
                              
                          <Form.Control disabled={RussiaDisType == 3 || RussiaDisType == 1} value={RussiaDisDisPercent} onChange={handleDefaultPercentageDiscountRussia} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtRussia && ( */}
                          <Form.Control disabled={RussiaDisType == 2 || RussiaDisType == 1} value={RussiaDisAmt} onChange={handleDefaultDiscountAmtRussia}  type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                          <Form.Control 
                          isInvalid={formatNumber(RussiaNetPrice) != "0.00" && (formatNumber(RussiaNetPrice) < RussiaminValue) ? true : false} 
                          readOnly disabled 
                          value={RussiaNetPrice == "" ? "0.00" : formatNumber(RussiaNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>
                            
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("RUB"))} {RussiaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Singapore
                          <td className="col-12 font-italic mt-5">
                            <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("SGD")}{parseFloat(SingaporeTip).toFixed(2)} may optimize sales.
                            </Form.Label>
                          </td>

                        </td>

                          <td>SGD</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("SGD"))} ${countriesData.priceRange[23].minPrice} - ${getSymbolFromCurrency(("SGD"))} ${countriesData.priceRange[23].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                             isInvalid={SingaporeListPrice != 0 &&  (SingaporeListPrice < countriesData.priceRange[23].minPrice || SingaporeListPrice > countriesData.priceRange[23].maxPrice) ?  true : false}
                            value={SingaporeListPrice} onChange={handleChangeGlobalPriceSingapore} type="text" />
                               <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentSingapore && ( */}
                          <Form.Control disabled={SingaporeDisType == 3 || SingaporeDisType == 1} value={SingaporeDisPercent} onChange={handleDefaultPercentageDiscountSingapore} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtSingapore && ( */}

                          <Form.Control disabled={SingaporeDisType == 2 || SingaporeDisType == 1} value={SingaporeDisAmt} onChange={handleDefaultDiscountAmtSingapore} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(SingaporeNetPrice) != "0.00" && (formatNumber(SingaporeNetPrice) < SingaporeminValue) ? true : false} 
                          readOnly disabled 
                          value={SingaporeNetPrice == "" ? "0.00" : formatNumber(SingaporeNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>

                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("SGD"))} {SingaporeminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 

                        <tr>
                          <td>Thailand
                          <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("THB")}{parseFloat(ThailandTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>THB</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("THB"))} ${countriesData.priceRange[24].minPrice} - ${getSymbolFromCurrency(("THB"))} ${countriesData.priceRange[24].maxPrice}`}</td>
                          <td>
                            <Form.Control
                            isInvalid={ThailandListPrice != 0 && (ThailandListPrice < countriesData.priceRange[24].minPrice || ThailandListPrice > countriesData.priceRange[24].maxPrice) ?  true : false}
                             value={ThailandListPrice} onChange={handleChangeGlobalPriceThailand} type="text" />
                              <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentThailand && ( */}
                          <Form.Control disabled={ThailandDisType == 3 || ThailandDisType == 1} value={ThailandDisPercent} onChange={handleDefaultPercentageDiscountThailand} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtThailand && ( */}
                          <Form.Control disabled={ThailandDisType == 2 || ThailandDisType == 1} value={ThailandDisAmt} onChange={handleDefaultDiscountAmtThailand} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                          <Form.Control 
                          isInvalid={formatNumber(ThailandNetPrice) != "0.00" && (formatNumber(ThailandNetPrice) < ThailandminValue)? true : false} 
                          readOnly disabled 
                          value={ThailandNetPrice == "" ? "0.00" : formatNumber(ThailandNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("THB"))} {ThailandminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 
{/* 
                        <tr>
                          <td>Turkey
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic">Tip: Pricing around {getSymbolFromCurrency(("TRY"))}{TurkeyTip} may optimize sales.</Form.Label></td>
                        </td>

                          <td>TRY</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("TRY"))} ${countriesData.priceRange[25].minPrice} - ${getSymbolFromCurrency(("TRY"))} ${countriesData.priceRange[25].maxPrice}`}</td>
                          <td>
                            <Form.Control
                            isInvalid={TurkeyListPrice != 0 && (TurkeyListPrice < countriesData.priceRange[25].minPrice || TurkeyListPrice > countriesData.priceRange[25].maxPrice )?  true : false}
                            value={TurkeyListPrice} onChange={handleChangeGlobalPriceTurkey} type="text" />
                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                          
                          <Form.Control disabled={TurkeyDisType == 3 || TurkeyDisType == 1} value={TurkeyDisPercent} onChange={handleDefaultPercentageDiscountTurkey} type="text" />
                          
                          </td>
                          <td>
                            
                          <Form.Control disabled={TurkeyDisType == 2 || TurkeyDisType == 1} value={TurkeyDisAmt} onChange={handleDefaultDiscountAmtTurkey} type="text" />
                            
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(TurkeyNetPrice) != "0.00" && (formatNumber(TurkeyNetPrice) < TurkeyminValue) ? true : false} 
                          readOnly disabled 
                          value={TurkeyNetPrice == "" ? "0.00" : formatNumber(TurkeyNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("TRY"))} {TurkeyminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> */}

                          <tr>
                          <td>Taiwan
                          <td className="col-12 font-italic mt-5">
                        <Form.Label className="mt-3 tit fst-italic">
                          Tip: Pricing around {getSymbolFromCurrency("TWD")}{parseFloat(TaiwanTip).toFixed(2)} may optimize sales.
                        </Form.Label>
                      </td>

                        </td>

                          <td>TWD</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("TWD"))} ${countriesData.priceRange[26].minPrice} - ${getSymbolFromCurrency(("TWD"))} ${countriesData.priceRange[26].maxPrice}`}</td>
                          <td>
                            <Form.Control
                            isInvalid={TaiwanListPrice != 0 && (TaiwanListPrice < countriesData.priceRange[26].minPrice || TaiwanListPrice > countriesData.priceRange[26].maxPrice )?  true : false}
                            value={TaiwanListPrice} onChange={handleChangeGlobalPriceTaiwan} type="text" />
                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentTaiwan && ( */}
                          <Form.Control  disabled={TaiwanDisType == 3 || TaiwanDisType == 1} value={TaiwanDisPercent} onChange={handleDefaultPercentageDiscountTaiwan} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtTaiwan && ( */}

                          <Form.Control disabled={TaiwanDisType == 2 || TaiwanDisType == 1} value={TaiwanDisAmt} onChange={handleDefaultDiscountAmtTaiwan} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                          <Form.Control 
                          isInvalid={formatNumber(TaiwanNetPrice) != "0.00" && (formatNumber(TaiwanNetPrice) < TaiwanminValue)? true : false} 
                          readOnly disabled 
                          value={TaiwanNetPrice == "" ? "0.00" : formatNumber(TaiwanNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>

            
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("TWD"))} {TaiwanminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                          <tr>
                          <td>Vietnam
                          <td className="col-12 font-italic mt-5">
                          <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("VND")}{parseFloat(VietnamTip).toFixed(2)} may optimize sales.
                          </Form.Label>
                        </td>

                        </td>

                          <td>VND</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("VND"))} ${countriesData.priceRange[27].minPrice} - ${getSymbolFromCurrency(("VND"))} ${countriesData.priceRange[27].maxPrice}`}</td>
                          <td>
                            <Form.Control
                             isInvalid={VietnamListPrice != 0 && (VietnamListPrice < countriesData.priceRange[27].minPrice || VietnamListPrice > countriesData.priceRange[27].maxPrice) ?  true : false}
                            value={VietnamListPrice} onChange={handleChangeGlobalPriceVietnam} type="text" />
                                 <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentVietnam && ( */}

                          <Form.Control disabled={VietmanDisType == 3 || VietmanDisType == 1} value={VietnamDisPercent} onChange={handleDefaultPercentageDiscountVietnam} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtVietnam && ( */}

                          <Form.Control disabled={VietmanDisType == 2 || VietmanDisType == 1} value={VietnamDisAmt} onChange={handleDefaultDiscountAmtVietnam} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(VietnamNetPrice) != "0.00" && (formatNumber(VietnamNetPrice) < VietnamminValue)? true : false} 
                          readOnly disabled 
                          value={VietnamNetPrice == "" ? "0.00" : formatNumber(VietnamNetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("VND"))} {VietnamminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 


                        <tr>
                          <td>South Africa
                          <td className="col-12 font-italic mt-5">
                            <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("KRW")}{parseFloat(SATip).toFixed(2)} may optimize sales.
                            </Form.Label>
                          </td>

                        </td>

                          <td>KRW</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("KRW"))} ${countriesData.priceRange[28].minPrice}  - ${getSymbolFromCurrency(("KRW"))} ${countriesData.priceRange[28].maxPrice}`}</td>
                          <td>
                            <Form.Control 
                              isInvalid={SAListPrice != 0 &&  (SAListPrice < countriesData.priceRange[28].minPrice || SAListPrice > countriesData.priceRange[28].maxPrice )?  true : false}
                            value={SAListPrice} onChange={handleChangeGlobalPriceSA} type="text" />
                              <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
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
                            {/* {showInputPercentSA && ( */}
                          <Form.Control disabled={SADisType == 3 || SADisType == 1} value={SADisPercent} onChange={handleDefaultPercentageDiscountSA} type="text" />
                            {/* )} */}
                          </td>
                          <td>
                            {/* {showInputDisAmtSA && ( */}
                          <Form.Control disabled={SADisType == 2 || SADisType == 1} value={SADisAmt} onChange={handleDefaultDiscountAmtSA} type="text" />
                            {/* )} */}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>

                          <Form.Control 
                          isInvalid={formatNumber(SANetPrice) != "0.00" && (formatNumber(SANetPrice) < SAminValue) ? true : false} 
                          readOnly disabled 
                          value={SANetPrice == "" ? "0.00" : formatNumber(SANetPrice)}  />
                          <Form.Control.Feedback type="invalid">
                                Not within range
                            </Form.Control.Feedback>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("KRW"))} {SAminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 
                          
                    </tbody>
                  </table>
                </div>
                )
        )}
        </>}
   
 

      </Card>
    </div>
  );
};

export default Pricing;
