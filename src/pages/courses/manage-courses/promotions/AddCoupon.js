import React, { useEffect, useState } from 'react'
import { Card  } from 'antd';
import { Select } from "antd";
import {Radio as RadioAnt} from 'antd';
import Radio from '@mui/material/Radio';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import DateTimePicker from 'react-datetime-picker';
import { GetDiscountTypes , SavePriceDefault , GetPriceDefault , GetCoursePricingType , GetCountriesListPricing , AddFreeCouponAPI} from "../../../../api";
import getSymbolFromCurrency from 'currency-symbol-map'
import InputGroup from 'react-bootstrap/InputGroup';
import ErrorAlert from "../../../../commonFunctions/Alerts/ErrorAlert";
import formatNumber from '../../../../commonFunctions/NumberFormat';
import moment from 'moment';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


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

const AddCoupon = ({code}) => {

    const [selectedValue, setSelectedValue] = React.useState('free-coupon');
    const [start_date, setstart_date] = useState(new Date())

    const handleChange = (event) => {
      setSelectedValue(event.target.value);
    };

   

    //  ------------------------ Start Date ---------------------
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format
    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState("");
    const [couponCodeFree, setcouponCodeFree] = useState("")


  
    const handleStartDateChange = (event) => {
      const newStartDate = event.target.value;
  
      // Check if the new start date is not before the current date
      if (new Date(newStartDate) >= new Date(currentDate)) {
        setStartDate(newStartDate);
        setEndDate(calculateEndDate(newStartDate));
      }

      calculateEndDate(startDate)
    };
  
    const calculateEndDate = (start) => {
      const startDate = new Date(start);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7);
      return endDate.toISOString().split('T')[0];
    };


    useEffect(() => {
      setEndDate(calculateEndDate(currentDate));
    }, [])

    //  -------------- DISCOUNT COUPONS ----------
    const currentDateDiscount = new Date().toISOString().split('T')[0]; // Get current date in "YYYY-MM-DD" format
    const [startDateDiscount, setStartDateDiscount] = useState(currentDateDiscount);
    const [endDateDiscount, setEndDateDiscount] = useState("");
    const [couponCodeDiscount, setcouponCodeDiscount] = useState("")

      
    const handleStartDateChangeDiscount = (event) => {
      const newStartDate = event.target.value;
  
      // Check if the new start date is not before the current date
      if (new Date(newStartDate) >= new Date(currentDateDiscount)) {
        setStartDateDiscount(newStartDate);
        setEndDateDiscount(calculateEndDate(newStartDate));
      }

      calculateEndDateDiscount(startDateDiscount)
    };
  
    const calculateEndDateDiscount = (start) => {
      const startDate = new Date(start);
      const endDate = new Date(startDate);
      endDate.setDate(startDate.getDate() + 7);
      return endDate.toISOString().split('T')[0];
    };


    useEffect(() => {
      setEndDateDiscount(calculateEndDateDiscount(currentDateDiscount));
    }, [])


    const handleFreeCouponCreate = (e) =>{
        e.preventDefault();

    
        const isValid = /^[A-Z0-9]+$/.test(couponCodeFree);

        let SD = moment(new Date(startDate)).format('yyyy-MM-DD HH:mm:ss')
        let ED = moment(new Date(endDate)).format('yyyy-MM-DD HH:mm:ss')
        
        if (isValid || couponCodeFree == "") {
          console.log(moment(new Date(startDate)).format('yyyy-MM-DD HH:mm:ss'))
          console.log(moment(new Date(endDate)).format('yyyy-MM-DD HH:mm:ss'))
          console.log(couponCodeFree)

          AddFreeCouponAPI(code,SD,ED,couponCodeFree)
          
        } else {
          ErrorAlert("Error","Please Enter a Valid Coupon Code")
        }
        

    }

    const handleDiscountCouponCreate = (e) =>{
      var raw = [
        {
            "courseCode": `${code}`,
            "netPrice": `${USANetPrice}`,
            "listPrice": `${USAListPrice}`,
            "discountType": `${USADisType}`,
            "country": "America",
            "discountValue": `${USADisType == "1" ? 0.00 : USADisType == "2" ? USADisPercent : USADisAmt}`
        },
        {
            "courseCode": `${code}`,
            "netPrice": `${AusNetPrice}`,
            "listPrice": `${AusListPrice}`,
            "discountType":`${AusDisType}`,
            "country": "Australia",
            "discountValue": `${AusDisType == "1" ? 0.00 : AusDisType == "2" ? AusDisPercent : AusDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${BrazilNetPrice}`,
            "listPrice": `${BrazilListPrice}`,
            "discountType": `${BrazilDisType}`,
            "country": "Brazil",
            "discountValue": `${BrazilDisType == "1" ? 0.00 : BrazilDisType == "2" ? BrazilDisPercent : BrazilDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${CanadaNetPrice}`,
            "listPrice": `${CanadaListPrice}`,
            "discountType": `${CanadaDisType}`,
            "country": "Canada",
            "discountValue": `${CanadaDisType == "1" ? 0.00 : CanadaDisType == "2" ? CanadaDisPercent : CanadaDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${ChileNetPrice}`,
            "listPrice": `${ChileListPrice}`,
            "discountType": `${ChileDisType}`,
            "country": "Chile",
            "discountValue": `${ChileDisType == "1" ? 0.00 : ChileDisType == "2" ? ChileDisPercent : ChileDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${ColumbiaNetPrice}`,
            "listPrice": `${ColumbiaListPrice}`,
            "discountType": `${ColumbiaDisType}`,
            "country": "Columbia",
            "discountValue": `${ColumbiaDisType == "1" ? 0.00 : ColumbiaDisType == "2" ? ColumbiaDisPercent : ColumbiaDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${EgyptNetPrice}`,
            "listPrice": `${EgyptListPrice}`,
            "discountType": `${EgyptDisType}`,
            "country": "Egypt",
            "discountValue": `${EgyptDisType == "1" ? 0.00 : EgyptDisType == "2" ? EgyptDisPercent : EgyptDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${EUNetPrice}`,
            "listPrice": `${EUListPrice}`,
            "discountType": `${EUDisType}`,
            "country": "European Union",
            "discountValue": `${EUDisType == "1" ? 0.00 : EUDisType == "2" ? EUDisPercent : EUDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${GBPNetPrice}`,
            "listPrice": `${GBPListPrice}`,
            "discountType":`${GBPDisType}`,
            "country": "Great Britain",
            "discountValue": `${GBPDisType == "1" ? 0.00 : GBPDisType == "2" ? GBPDisPercent : GBPDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${IndonesiaNetPrice}`,
            "listPrice": `${IndonesiaListPrice}`,
            "discountType": `${IndonesiaDisType}`,
            "country": "Indonesia",
            "discountValue": `${IndonesiaDisType == "1" ? 0.00 : IndonesiaDisType == "2" ? IndonesiaDisPercent : IndonesiaDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${IsrealNetPrice}`,
            "listPrice": `${IsrealListPrice}`,
            "discountType": `${IsrealDisType}`,
            "country": "Israel",
            "discountValue": `${IsrealDisType == "1" ? 0.00 : IsrealDisType == "2" ? IsrealDisPercent : IsrealDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${IndiaNetPrice}`,
            "listPrice": `${IndiaListPrice}`,
            "discountType": `${IndiaDisType}`,
            "country": "India",
            "discountValue": `${IndiaDisType == "1" ? 0.00 : IndiaDisType == "2" ? IndiaDisPercent : IndiaDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${JapanNetPrice}`,
            "listPrice": `${JapanListPrice}`,
            "discountType": `${JapanDisType}`,
            "country": "Japan",
            "discountValue": `${JapanDisType == "1" ? 0.00 : JapanDisType == "2" ? JapanDisPercent : JapanDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${SKNetPrice}`,
            "listPrice": `${SKListPrice}`,
            "discountType": `${SKDisType}`,
            "country": "South Korea",
            "discountValue": `${SKDisType == "1" ? 0.00 : SKDisType == "2" ? SKDisPercent : SKDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${MexicoNetPrice}`,
            "listPrice": `${MexicoListPrice}`,
            "discountType": `${MexicoDisType}`,
            "country": "Mexico",
            "discountValue": `${MexicoDisType == "1" ? 0.00 : MexicoDisType == "2" ? MexicoDisPercent : MexicoDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${MalaysiaNetPrice}`,
            "listPrice": `${MalaysiaListPrice}`,
            "discountType": `${MalaysiaDisType}`,
            "country": "Malaysia",
            "discountValue": `${MalaysiaDisType == "1" ? 0.00 : MalaysiaDisType == "2" ? MalaysiaDisPercent : MalaysiaDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${NIgeriaNetPrice}`,
            "listPrice": `${NigeriaListPrice}`,
            "discountType": `${NigeriaDisType}`,
            "country": "Nigeria",
            "discountValue": `${NigeriaDisType == "1" ? 0.00 : NigeriaDisType == "2" ? NigeriaDisPercent : NigeriaDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${NorwayNetPrice}`,
            "listPrice": `${NorwayListPrice}`,
            "discountType": `${NorwayDisType}`,
            "country": "Norway",
            "discountValue": `${NorwayDisType == "1" ? 0.00 : NorwayDisType == "2" ? NorwayDisPercent : NorwayDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${PeruNetPrice}`,
            "listPrice": `${PeruListPrice}`,
            "discountType": `${PeruDisType}`,
            "country": "Peru",
            "discountValue": `${PeruDisType == "1" ? 0.00 : PeruDisType == "2" ? PeruDisPercent : PeruDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${PhilipinesNetPrice}`,
            "listPrice": `${PhilipinesListPrice}`,
            "discountType": `${PhilipinesDisType}`,
            "country": "Philippines",
            "discountValue": `${PhilipinesDisType == "1" ? 0.00 : PhilipinesDisType == "2" ? PhilipinesDisPercent : PhiliphinesDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${PolandNetPrice}`,
            "listPrice": `${PolandListPrice}`,
            "discountType": `${PolandDisType}`,
            "country": "Poland",
            "discountValue": `${PolandDisType == "1" ? 0.00 : PolandDisType == "2" ? PolandDisPercent : PolandDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${RomaniaNetPrice}`,
            "listPrice": `${RomaniaListPrice}`,
            "discountType": `${RomaniaDisType}`,
            "country": "Romania",
            "discountValue": `${RomaniaDisType == "1" ? 0.00 : RomaniaDisType == "2" ? RomaniaDisPercent : RomaniaDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${RussiaNetPrice}`,
            "listPrice": `${RussiaListPrice}`,
            "discountType":`${RussiaDisType}`,
            "country": "Russia",
            "discountValue": `${RussiaDisType == "1" ? 0.00 : RussiaDisType == "2" ? RussiaDisDisPercent : RussiaDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${SingaporeNetPrice}`,
            "listPrice": `${SingaporeListPrice}`,
            "discountType": `${SingaporeDisType}`,
            "country": "Singapore",
            "discountValue": `${SingaporeDisType == "1" ? 0.00 : SingaporeDisType == "2" ? SingaporeDisPercent : SingaporeDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${ThailandNetPrice}`,
            "listPrice": `${ThailandListPrice}`,
            "discountType": `${ThailandDisType}`,
            "country": "Thailand",
            "discountValue": `${ThailandDisType == "1" ? 0.00 : ThailandDisType == "2" ? ThailandDisPercent : ThailandDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${TurkeyNetPrice}`,
            "listPrice": `${TurkeyListPrice}`,
            "discountType": `${TurkeyDisType}`,
            "country": "Turkey",
            "discountValue": `${TurkeyDisType == "1" ? 0.00 : TurkeyDisType == "2" ? TurkeyDisPercent : TurkeyDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${TaiwanNetPrice}`,
            "listPrice": `${TaiwanListPrice}`,
            "discountType": `${TaiwanDisType}`,
            "country": "Taiwan",
            "discountValue":  `${TaiwanDisType == "1" ? 0.00 : TaiwanDisType == "2" ? TaiwanDisPercent : TaiwanDisAmt}`,
        },
        {
            "courseCode": `${code}`,
            "netPrice":`${VietnamNetPrice}`,
            "listPrice": `${VietnamListPrice}`,
            "discountType": `${VietmanDisType}`,
            "country": "Vietnam",
            "discountValue": `${VietmanDisType == "1" ? 0.00 : VietmanDisType == "2" ? VietnamDisPercent : VietnamDisAmt}`,
        },
           {
            "courseCode": `${code}`,
            "netPrice":`${SANetPrice}`,
            "listPrice": `${SAListPrice}`,
            "discountType": `${SADisType}`,
            "country": "South Africa",
            "discountValue": `${SADisType == "1" ? 0.00 : SADisType == "2" ? SADisPercent : SADisAmt}`,
        }
      ]


      console.log(raw)
    }
    
    


    // ------------------ Discount ------------------

    
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

    // 
       // Get the Countries List WITH THE PRICES
       GetCountriesListPricing(code,setcountriesData,
        setUSADisPercent,
        setDDisAmt,
        setUSADisType,
        setshowInputDisAmtUSA,
        setshowInputPercentUSA,
        setUSAListPrice,
        setUSANetPrice,
        // -----
        setAusDisPercent,
        setAusDisAmt,
        setAusDisType,
        setshowInputDisAmtAus,
        setshowInputPercentAus,
        setAusListPrice,
        setAusNetPrice,
        // -----
        setBrazilDisPercent,
        setBrazilDisAmt,
        setBrazilDisType,
        setshowInputDisAmtBrzail,
        setshowInputPercentBrzail,
        setBrazilListPrice,
        setBrazilNetPrice,
        // ---------
        setCanadaDisPercent,
        setCanadaDisAmt,
        setCanadaDisType,
        setshowInputDisAmtCanada,
        setshowInputPercentCanada,
        setCanadaListPrice,
        setCanadaNetPrice,
        //  -------------
        setChileDisPercent,
        setChileDisAmt,
        setChileDisType,
        setshowInputDisAmtChile,
        setshowInputPercentChile,
        setChileListPrice,
        setChileNetPrice,
        // -----------
        setColumbiaDisPercent,
        setColumbiaDisAmt,
        setColumbiaDisType,
        setshowInputDisAmtColumbia,
        setshowInputPercentColumbia,
        setColumbiaListPrice,
        setColumbiaNetPrice,
        // --------------
        setEgyptDisPercent,
        setEgyptDisAmt,
        setEgyptDisType,
        setshowInputDisAmtEgypt,
        setshowInputPercentEgypt,
        setEgyptListPrice,
        setEgyptNetPrice,
        // ---------
        setEUDisPercent,
        setEUDisAmt,
        setEUDisType,
        setshowInputDisAmtEU,
        setshowInputPercentEU,
        setEUListPrice,
        setEUNetPrice,
        // ----
        setGBPDisPercent,
        setGBPDisAmt,
        setGBPDisType,
        setshowInputDisAmtGBP,
        setshowInputPercentGBP,
        setGBPListPrice,
        setGBPNetPrice,
        // ------------
        setIndonesiaDisPercent,
        setIndonesiaDisAmt,
        setIndonesiaDisType,
        setshowInputDisAmtIndonesia,
        setshowInputPercentIndonesia,
        setIndonesiaListPrice,
        setIndonesiaNetPrice,
        // ---------------
        setIsrealDisPercent,
        setIsrealDisAmt,
        setIsrealDisType,
        setshowInputDisAmtIsreal,
        setshowInputPercentIsreal,
        setIsrealListPrice,
        setIsrealNetPrice,
        // -------
        setIndiaDisPercent,
        setIndiaDisAmt,
        setIndiaDisType,
        setshowInputDisAmtIndia,
        setshowInputPercentIndia,
        setIndiaListPrice,
        setIndiaNetPrice,
        // -------------
        setJapanDisPercent,
        setJapanDisAmt,
        setJapanDisType,
        setshowInputDisAmtJapan,
        setshowInputPercentJapan,
        setJapanListPrice,
        setJapanNetPrice,
        // ---------------
        setSKDisPercent,
        setSKDisAmt,
        setSKDisType,
        setshowInputDisAmtSK,
        setshowInputPercentSK,
        setSKListPrice,
        setSKNetPrice,
        // -------------
        setMexicoDisPercent,
        setMexicoDisAmt,
        setMexicoDisType,
        setshowInputDisAmtMexico,
        setshowInputPercentMexico,
        setMexicoListPrice,
        setMexicoNetPrice,
        // --------------
        setMalaysiaDisPercent,
        setMalaysiaDisAmt,
        setMalaysiaDisType,
        setshowInputDisAmtMalaysia,
        setshowInputPercentMalaysia,
        setMalaysiaListPrice,
        setMalaysiaNetPrice,
        // -------------
        setNigeriaDisPercent,
        setNigeriaDisAmt,
        setNigeriaDisType,
        setshowInputDisAmtNigeria,
        setshowInputPercentNigeria,
        setNigeriaListPrice,
        setNIgeriaNetPrice,
        // -----------
        setNorwayDisPercent,
        setNorwayDisAmt,
        setNorwayDisType,
        setshowInputDisAmtNorway,
        setshowInputPercentNorway,
        setNorwayListPrice,
        setNorwayNetPrice,
        // ----------
        setPeruDisPercent,
        setPeruDisAmt,
        setPeruDisType,
        setshowInputDisAmtPeru,
        setshowInputPercentPeru,
        setPeruListPrice,
        setPeruNetPrice,
        // -----------
        setPhilipinesDisPercent,
        setPhiliphinesDisAmt,
        setPhilipinesDisType,
        setshowInputDisAmtPhilipines,
        setshowInputPercentPhilipines,
        setPhilipinesListPrice,
        setPhilipinesNetPrice,
        // ----------
        setPolandDisPercent,
        setPolandDisAmt,
        setPolandDisType,
        setshowInputDisAmtPoland,
        setshowInputPercentPoland,
        setPolandListPrice,
        setPolandNetPrice,
        // --------------
        setRomaniaDisPercent,
        setRomaniaDisAmt,
        setRomaniaDisType,
        setshowInputDisAmtRomania,
        setshowInputPercentRomania,
        setRomaniaListPrice,
        setRomaniaNetPrice,
        // --------------
        setRussiaDisDisPercent,
        setRussiaDisAmt,
        setRussiaDisType,
        setshowInputDisAmtRussia,
        setshowInputPercentRussia,
        setRussiaListPrice,
        setRussiaNetPrice,
        // ------------------
        setSingaporeDisPercent,
        setSingaporeDisAmt,
        setSingaporeDisType,
        setshowInputDisAmtSingapore,
        setshowInputPercentSingapore,
        setSingaporeListPrice,
        setSingaporeNetPrice,
        // -------------
        setThailandDisPercent,
        setThailandDisAmt,
        setThailandDisType,
        setshowInputDisAmtThailand,
        setshowInputPercentThailand,
        setThailandListPrice,
        setThailandNetPrice,
        // ---------------
        setTurkeyDisPercent,
        setTurkeyDisAmt,
        setTurkeyDisType,
        setshowInputDisAmtTurkey,
        setshowInputPercentTurkey,
        setTurkeyListPrice,
        setTurkeyNetPrice,
        // -------------
        setTaiwanDisPercent,
        setTaiwanDisAmt,
        setTaiwanDisType,
        setshowInputDisAmtTaiwan,
        setshowInputPercentTaiwan,
        setTaiwanListPrice,
        setTaiwanNetPrice,
        // ----------
        setVietnamDisPercent,
        setVietnamDisAmt,
        setVietmanDisType,
        setshowInputDisAmtVietnam,
        setshowInputPercentVietnam,
        setVietnamListPrice,
        setVietnamNetPrice,
        // ------------
        setSADisPercent,
        setSADisAmt,
        setSADisType,
        setshowInputDisAmtSA,
        setshowInputPercentSA,
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
 
  }, [code])

  useEffect(() => {
    console.log(countriesData)
  }, [countriesData])
  


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

  const [USATip, setUSATip] = useState("")
  const [USAMinValue, setUSAMinValue] = useState("")

  const [showInputDisAmtUSA, setshowInputDisAmtUSA] = useState(false)
  const [showInputPercentUSA, setshowInputPercentUSA] = useState(false)

  // ---------------------
  // Discount Type USA
  const handleDefaultDiscountTypeUSA = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      setshowInputDisAmtUSA(false)
      setshowInputPercentUSA(false)

      setUSANetPrice(USAListPrice)

    }else if(value == '2'){

      setshowInputPercentUSA(true)
      setshowInputDisAmtUSA(false)
      console.log(USADisPercent)
      console.log(USAListPrice)

      setUSANetPrice(parseFloat(USAListPrice) - parseFloat(USAListPrice) * parseFloat(USADisPercent == "" ? 0 : USADisPercent)/100)


    }else if(value == '3'){

      setshowInputPercentUSA(false)
      setshowInputDisAmtUSA(true)

      setUSANetPrice(parseFloat(USAListPrice) - parseFloat(USADisAmt == "" ? 0 : USADisAmt))

    }else{
      setshowInputDisAmtUSA(false)
      setshowInputPercentUSA(false)
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
  const [AusTip, setAusTip] = useState("")
  const [AusminValue, setAusminValue] = useState("")

  const [showInputDisAmtAus, setshowInputDisAmtAus] = useState(false)
  const [showInputPercentAus, setshowInputPercentAus] = useState(false)

    // ---------------------
  // Discount Type Aus
  const handleDefaultDiscountTypeAus = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      setshowInputDisAmtAus(false)
      setshowInputPercentAus(false)

      setAusNetPrice(AusListPrice)

    }else if(value == '2'){

      setshowInputPercentAus(true)
      setshowInputDisAmtAus(false)

      console.log(AusDisPercent)
      console.log(AusListPrice)

      setAusNetPrice(parseFloat(AusListPrice) - parseFloat(AusListPrice) * parseFloat(AusDisPercent == "" ? 0 : AusDisPercent)/100)


    }else if(value == '3'){

      setshowInputPercentAus(false)
      setshowInputDisAmtAus(true)



      setAusNetPrice(parseFloat(AusListPrice) - parseFloat(AusDisAmt == "" ? 0 : AusDisAmt))

    }else{
      setshowInputDisAmtAus(false)
      setshowInputPercentAus(false)

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

  const [BrazilTip, setBrazilTip] = useState("")
  const [BrazilminValue, setBrazilminValue] = useState("")


  const [showInputDisAmtBrzail, setshowInputDisAmtBrzail] = useState(false)
  const [showInputPercentBrzail, setshowInputPercentBrzail] = useState(false)

      // ---------------------
  // Discount Type Brazil
  const handleDefaultDiscountTypeBrazil = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      setshowInputDisAmtBrzail(false)
      setshowInputPercentBrzail(false)

      setBrazilNetPrice(BrazilListPrice)

    }else if(value == '2'){

      setshowInputPercentBrzail(true)
      setshowInputDisAmtBrzail(false)


      console.log(BrazilDisPercent)
      console.log(BrazilListPrice)

      setBrazilNetPrice(parseFloat(BrazilListPrice) - parseFloat(BrazilListPrice) * parseFloat(BrazilDisPercent == "" ? 0 : BrazilDisPercent)/100)


    }else if(value == '3'){

      setshowInputPercentBrzail(false)
      setshowInputDisAmtBrzail(true)


      setBrazilNetPrice(parseFloat(BrazilListPrice) - parseFloat(BrazilDisAmt == "" ? 0 : BrazilDisAmt))

    }else{
      setshowInputPercentBrzail(false)
      setshowInputDisAmtBrzail(false)
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

  const [CanadaTip, setCanadaTip] = useState("")
  const [CanadaminValue, setCanadaminValue] = useState("")

  const [showInputDisAmtCanada, setshowInputDisAmtCanada] = useState(false)
  const [showInputPercentCanada, setshowInputPercentCanada] = useState(false)

      // ---------------------
  // Discount Type Canada
  const handleDefaultDiscountTypeCanada = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      setshowInputPercentCanada(false)
      setshowInputDisAmtCanada(false)

      setCanadaNetPrice(CanadaListPrice)

    }else if(value == '2'){

      setshowInputPercentCanada(true)
      setshowInputDisAmtCanada(false)

      console.log(CanadaDisPercent)
      console.log(CanadaListPrice)

      setCanadaNetPrice(parseFloat(CanadaListPrice) - parseFloat(CanadaListPrice) * parseFloat(CanadaDisPercent == "" ? 0 : CanadaDisPercent)/100)


    }else if(value == '3'){

      setshowInputPercentCanada(false)
      setshowInputDisAmtCanada(true)


      setCanadaNetPrice(parseFloat(CanadaListPrice) - parseFloat(CanadaDisAmt == "" ? 0 : CanadaDisAmt))

    }else{
      setshowInputPercentCanada(false)
      setshowInputDisAmtCanada(false)
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

  const [ChileTip, setChileTip] = useState("")
  const [ChileminValue, setChileminValue] = useState("")

  const [showInputDisAmtChile, setshowInputDisAmtChile] = useState(false)
  const [showInputPercentChile, setshowInputPercentChile] = useState(false)

   // ---------------------
  // Discount Type Chile
  const handleDefaultDiscountTypeChile = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      setshowInputPercentChile(false)
      setshowInputDisAmtChile(false)
      setChileNetPrice(ChileListPrice)

    }else if(value == '2'){


      setshowInputPercentChile(true)
      setshowInputDisAmtChile(false)

      console.log(ChileDisPercent)
      console.log(ChileListPrice)

      setChileNetPrice(parseFloat(ChileListPrice) - parseFloat(ChileListPrice) * parseFloat(ChileDisPercent == "" ? 0 : ChileDisPercent)/100)


    }else if(value == '3'){
    

      setshowInputPercentChile(false)
      setshowInputDisAmtChile(true)

      setChileNetPrice(parseFloat(ChileListPrice) - parseFloat(ChileDisAmt == "" ? 0 : ChileDisAmt))

    }else{
      setshowInputPercentChile(false)
      setshowInputDisAmtChile(false)
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

  const [ColumbiaTip, setColumbiaTip] = useState("")
  const [ColumbiaminValue, setColumbiaminValue] = useState("")

  const [showInputDisAmtColumbia, setshowInputDisAmtColumbia] = useState(false)
  const [showInputPercentColumbia, setshowInputPercentColumbia] = useState(false)


  // ---------------------
  // Discount Type Columbia
  const handleDefaultDiscountTypeColumbia = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      setshowInputPercentColumbia(false)
      setshowInputDisAmtColumbia(false)
      setColumbiaNetPrice(ColumbiaListPrice)

    }else if(value == '2'){

      setshowInputPercentColumbia(true)
      setshowInputDisAmtColumbia(false)

      console.log(ColumbiaDisPercent)
      console.log(ColumbiaListPrice)

      setColumbiaNetPrice(parseFloat(ColumbiaListPrice) - parseFloat(ColumbiaListPrice) * parseFloat(ColumbiaDisPercent == "" ? 0 : ColumbiaDisPercent)/100)


    }else if(value == '3'){
   
      setshowInputPercentColumbia(false)
      setshowInputDisAmtColumbia(true)

      setColumbiaNetPrice(parseFloat(ColumbiaListPrice) - parseFloat(ColumbiaDisAmt == "" ? 0 : ColumbiaDisAmt))

    }else{
      setshowInputPercentColumbia(false)
      setshowInputDisAmtColumbia(false)
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

  const [EgyptTip, setEgyptTip] = useState("")
  const [EgyptminValue, setEgyptminValue] = useState("")

  const [showInputDisAmtEgypt, setshowInputDisAmtEgypt] = useState(false)
  const [showInputPercentEgypt, setshowInputPercentEgypt] = useState(false)


    // ---------------------
  // Discount Type Egypt
  const handleDefaultDiscountTypeEgypt = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      setshowInputPercentEgypt(false)
      setshowInputDisAmtEgypt(false)
      setEgyptNetPrice(EgyptListPrice)

    }else if(value == '2'){


      setshowInputPercentEgypt(true)
      setshowInputDisAmtEgypt(false)
      console.log(EgyptDisPercent)
      console.log(EgyptListPrice)

      setEgyptNetPrice(parseFloat(EgyptListPrice) - parseFloat(EgyptListPrice) * parseFloat(EgyptDisPercent == "" ? 0 : EgyptDisPercent)/100)


    }else if(value == '3'){
 

      setshowInputPercentEgypt(false)
      setshowInputDisAmtEgypt(true)

      setEgyptNetPrice(parseFloat(EgyptListPrice) - parseFloat(EgyptDisAmt == "" ? 0 : EgyptDisAmt))

    }else{
      setshowInputPercentEgypt(false)
      setshowInputDisAmtEgypt(false)
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

  const [EUTip, setEUTip] = useState("")
  const [EUminValue, setEUminValue] = useState("")

  const [showInputDisAmtEU, setshowInputDisAmtEU] = useState(false)
  const [showInputPercentEU, setshowInputPercentEU] = useState(false)

      // ---------------------
  // Discount Type EU
  const handleDefaultDiscountTypeEU = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


      setshowInputDisAmtEU(false)
      setshowInputPercentEU(false)
      setEUNetPrice(EUListPrice)

    }else if(value == '2'){


      setshowInputPercentEU(true)
      setshowInputDisAmtEU(false)
      console.log(EUDisPercent)
      console.log(EUListPrice)

      setEUNetPrice(parseFloat(EUListPrice) - parseFloat(EUListPrice) * parseFloat(EUDisPercent == "" ? 0 : EUDisPercent)/100)


    }else if(value == '3'){
  

      
      setshowInputPercentEU(false)
      setshowInputDisAmtEU(true)

      setEUNetPrice(parseFloat(EUListPrice) - parseFloat(EUDisAmt == "" ? 0 : EUDisAmt))

    }else{
    
      setshowInputPercentEU(false)
      setshowInputDisAmtEU(false)
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

  const [GBPTip, setGBPTip] = useState("")
  const [GBPminValue, setGBPminValue] = useState("")

  const [showInputDisAmtGBP, setshowInputDisAmtGBP] = useState(false)
  const [showInputPercentGBP, setshowInputPercentGBP] = useState(false)

  // ---------------------
  // Discount Type GBP
  const handleDefaultDiscountTypeGBP = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      setshowInputPercentGBP(false)
      setshowInputDisAmtGBP(false)

      setGBPNetPrice(GBPListPrice)

    }else if(value == '2'){

 
      setshowInputPercentGBP(true)
      setshowInputDisAmtGBP(false)

      console.log(GBPDisPercent)
      console.log(GBPListPrice)

      setGBPNetPrice(parseFloat(GBPListPrice) - parseFloat(GBPListPrice) * parseFloat(GBPDisPercent == "" ? 0 : GBPDisPercent)/100)


    }else if(value == '3'){

       
      setshowInputPercentGBP(false)
      setshowInputDisAmtGBP(true)

      setGBPNetPrice(parseFloat(GBPListPrice) - parseFloat(GBPDisAmt == "" ? 0 : GBPDisAmt))

    }else{
      setshowInputPercentGBP(false)
      setshowInputDisAmtGBP(false)
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

  const [IndonesiaTip, setIndonesiaTip] = useState("")
  const [IndonesiaminValue, setIndonesiaminValue] = useState("")

  const [showInputDisAmtIndonesia, setshowInputDisAmtIndonesia] = useState(false)
  const [showInputPercentIndonesia, setshowInputPercentIndonesia] = useState(false)

    // ---------------------
  // Discount Type Indo
  const handleDefaultDiscountTypeIndo = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      setshowInputPercentIndonesia(false)
      setshowInputDisAmtIndonesia(false)

      setIndonesiaNetPrice(IndonesiaListPrice)

    }else if(value == '2'){

      setshowInputPercentIndonesia(true)
      setshowInputDisAmtIndonesia(false)

  
      console.log(IndonesiaDisPercent)
      console.log(IndonesiaListPrice)

      setIndonesiaNetPrice(parseFloat(IndonesiaListPrice) - parseFloat(IndonesiaListPrice) * parseFloat(IndonesiaDisPercent == "" ? 0 : IndonesiaDisPercent)/100)


    }else if(value == '3'){
 

      setshowInputPercentIndonesia(false)
      setshowInputDisAmtIndonesia(true)

      setIndonesiaNetPrice(parseFloat(IndonesiaListPrice) - parseFloat(IndonesiaDisAmt == "" ? 0 : IndonesiaDisAmt))

    }else{
      setshowInputPercentIndonesia(false)
      setshowInputDisAmtIndonesia(false)
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

  const [IsrealTip, setIsrealTip] = useState("")
  const [IsrealminValue, setIsrealminValue] = useState("")

  const [showInputDisAmtIsreal, setshowInputDisAmtIsreal] = useState(false)
  const [showInputPercentIsreal, setshowInputPercentIsreal] = useState(false)

      // ---------------------
  // Discount Type Isreal
  const handleDefaultDiscountTypeIsreal = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


      setshowInputDisAmtIsreal(false)
      setshowInputPercentIsreal(false)
      setIsrealNetPrice(IsrealListPrice)

    }else if(value == '2'){

      setshowInputDisAmtIsreal(false)
      setshowInputPercentIsreal(true)

      console.log(IsrealDisPercent)
      console.log(IsrealListPrice)

      setIsrealNetPrice(parseFloat(IsrealListPrice) - parseFloat(IsrealListPrice) * parseFloat(IsrealDisPercent == "" ? 0 : IsrealDisPercent)/100)


    }else if(value == '3'){

      setshowInputDisAmtIsreal(true)
      setshowInputPercentIsreal(false)

      setIsrealNetPrice(parseFloat(IsrealListPrice) - parseFloat(IsrealDisAmt == "" ? 0 : IsrealDisAmt))

    }else{
    

      setshowInputDisAmtIsreal(false)
      setshowInputPercentIsreal(false)
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

  const [IndiaTip, setIndiaTip] = useState("")
  const [IndiaminValue, setIndiaminValue] = useState("")

  const [showInputDisAmtIndia, setshowInputDisAmtIndia] = useState(false)
  const [showInputPercentIndia, setshowInputPercentIndia] = useState(false)

        // ---------------------
  // Discount Type India
  const handleDefaultDiscountTypeIndia = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){
      setshowInputPercentIndia(false)
      setshowInputDisAmtIndia(false)
      setIndiaNetPrice(IndiaListPrice)

    }else if(value == '2'){

  

      setshowInputPercentIndia(true)
      setshowInputDisAmtIndia(false)
      console.log(IndiaDisPercent)
      console.log(IndiaListPrice)

      setIndiaNetPrice(parseFloat(IndiaListPrice) - parseFloat(IndiaListPrice) * parseFloat(IndiaDisPercent == "" ? 0 : IndiaDisPercent)/100)


    }else if(value == '3'){


      setshowInputPercentIndia(false)
      setshowInputDisAmtIndia(true)

      setIndiaNetPrice(parseFloat(IndiaListPrice) - parseFloat(IndiaDisAmt == "" ? 0 : IndiaDisAmt))

    }else{


      setshowInputPercentIndia(false)
      setshowInputDisAmtIndia(false)
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

  const [JapanTip, setJapanTip] = useState("")
  const [JapanminValue, setJapanminValue] = useState("")

  const [showInputDisAmtJapan, setshowInputDisAmtJapan] = useState(false)
  const [showInputPercentJapan, setshowInputPercentJapan] = useState(false)

          // ---------------------
  // Discount Type Japan
  const handleDefaultDiscountTypeJapan = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      setshowInputPercentJapan(false)
      setshowInputDisAmtJapan(false)
      setJapanNetPrice(JapanListPrice)

    }else if(value == '2'){

    
      setshowInputPercentJapan(true)
      setshowInputDisAmtJapan(false)
      console.log(JapanDisPercent)
      console.log(JapanListPrice)

      setJapanNetPrice(parseFloat(JapanListPrice) - parseFloat(JapanListPrice) * parseFloat(JapanDisPercent == "" ? 0 : JapanDisPercent)/100)


    }else if(value == '3'){


      setshowInputPercentJapan(false)
      setshowInputDisAmtJapan(true)
      setJapanNetPrice(parseFloat(JapanListPrice) - parseFloat(JapanDisAmt == "" ? 0 : JapanDisAmt))

    }else{

      setshowInputPercentJapan(false)
      setshowInputDisAmtJapan(false)
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

  const [SKTip, setSKTip] = useState("")
  const [SKminValue, setSKminValue] = useState("")

  const [showInputDisAmtSK, setshowInputDisAmtSK] = useState(false)
  const [showInputPercentSK, setshowInputPercentSK] = useState(false)

           // ---------------------
  // Discount Type SK
  const handleDefaultDiscountTypeSK = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

    
      setshowInputPercentSK(false)
      setshowInputDisAmtSK(false)
      setSKNetPrice(SKListPrice)

    }else if(value == '2'){


      setshowInputPercentSK(true)
      setshowInputDisAmtSK(false)
      console.log(SKDisPercent)
      console.log(SKListPrice)

      setSKNetPrice(parseFloat(SKListPrice) - parseFloat(SKListPrice) * parseFloat(SKDisPercent == "" ? 0 : SKDisPercent)/100)


    }else if(value == '3'){
  

      setshowInputPercentSK(false)
      setshowInputDisAmtSK(true)

      setSKNetPrice(parseFloat(SKListPrice) - parseFloat(SKDisAmt == "" ? 0 : SKDisAmt))

    }else{

      setshowInputPercentSK(false)
      setshowInputDisAmtSK(false)
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

  const [MexicoTip, setMexicoTip] = useState("")
  const [MexicominValue, setMexicominValue] = useState("")

  const [showInputDisAmtMexico, setshowInputDisAmtMexico] = useState(false)
  const [showInputPercentMexico, setshowInputPercentMexico] = useState(false)


             // ---------------------
  // Discount Type Mexico
  const handleDefaultDiscountTypeMexico = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


      setshowInputPercentMexico(false)
      setshowInputDisAmtMexico(false)
      setMexicoNetPrice(MexicoListPrice)

    }else if(value == '2'){

     
      setshowInputPercentMexico(true)
      setshowInputDisAmtMexico(false)
      console.log(MexicoDisPercent)
      console.log(MexicoListPrice)

      setMexicoNetPrice(parseFloat(MexicoListPrice) - parseFloat(MexicoListPrice) * parseFloat(MexicoDisPercent == "" ? 0 : MexicoDisPercent)/100)


    }else if(value == '3'){
   

      setshowInputPercentMexico(false)
      setshowInputDisAmtMexico(true)

      setMexicoNetPrice(parseFloat(MexicoListPrice) - parseFloat(MexicoDisAmt == "" ? 0 : MexicoDisAmt))

    }else{


      setshowInputPercentMexico(false)
      setshowInputDisAmtMexico(false)

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

  const [MalaysiaTip, setMalaysiaTip] = useState("")
  const [MalaysiaminValue, setMalaysiaminValue] = useState("")

  const [showInputDisAmtMalaysia, setshowInputDisAmtMalaysia] = useState(false)

  const [showInputPercentMalaysia, setshowInputPercentMalaysia] = useState(false)

               // ---------------------
  // Discount Type Malaysia
  const handleDefaultDiscountTypeMalaysia = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


      setshowInputPercentMalaysia(false)
      setshowInputDisAmtMalaysia(false)
      setMalaysiaNetPrice(MalaysiaListPrice)

    }else if(value == '2'){


      setshowInputPercentMalaysia(true)
      setshowInputDisAmtMalaysia(false)

      console.log(MalaysiaDisPercent)
      console.log(MalaysiaListPrice)

      setMalaysiaNetPrice(parseFloat(MalaysiaListPrice) - parseFloat(MalaysiaListPrice) * parseFloat(MalaysiaDisPercent == "" ? 0 : MalaysiaDisPercent)/100)


    }else if(value == '3'){


      setshowInputPercentMalaysia(false)
      setshowInputDisAmtMalaysia(true)

      setMalaysiaNetPrice(parseFloat(MalaysiaListPrice) - parseFloat(MalaysiaDisAmt == "" ? 0 : MalaysiaDisAmt))

    }else{
      setshowInputPercentMalaysia(false)
      setshowInputDisAmtMalaysia(false)
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

  const [NigeriaTip, setNigeriaTip] = useState("")
  const [NigeriaminValue, setNigeriaminValue] = useState("")
  
  const [showInputDisAmtNigeria, setshowInputDisAmtNigeria] = useState(false)

  const [showInputPercentNigeria, setshowInputPercentNigeria] = useState(false)

        // ---------------------
  // Discount Type Nigeria
  const handleDefaultDiscountTypeNigeria = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){

      setshowInputPercentNigeria(false)
      setshowInputDisAmtNigeria(false)
      setNIgeriaNetPrice(NigeriaListPrice)

    }else if(value == '2'){

      
      setshowInputPercentNigeria(true)
      setshowInputDisAmtNigeria(false)

      console.log(NigeriaDisPercent)
      console.log(NigeriaListPrice)

      setNIgeriaNetPrice(parseFloat(NigeriaListPrice) - parseFloat(NigeriaListPrice) * parseFloat(NigeriaDisPercent == "" ? 0 : MalaysiaDisPercent)/100)


    }else if(value == '3'){

      setshowInputPercentNigeria(false)
      setshowInputDisAmtNigeria(true)

      setNIgeriaNetPrice(parseFloat(NigeriaListPrice) - parseFloat(NigeriaDisAmt == "" ? 0 : NigeriaDisAmt))

    }else{
     
      setshowInputPercentNigeria(false)
      setshowInputDisAmtNigeria(false)
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

  const [NorwayTip, setNorwayTip] = useState("")
  const [NorwayminValue, setNorwayminValue] = useState("")

  const [showInputDisAmtNorway, setshowInputDisAmtNorway] = useState(false)

  const [showInputPercentNorway, setshowInputPercentNorway] = useState(false)


          // ---------------------
  // Discount Type Norway
  const handleDefaultDiscountTypeNorway = (value) =>{
    // 1 - No Discount
    // 2 - Percentage
    // 3 - By Value

    if(value == '1'){


      setshowInputPercentNorway(false)
      setshowInputDisAmtNorway(false)
      setNorwayNetPrice(NorwayListPrice)

    }else if(value == '2'){


      setshowInputPercentNorway(true)
      setshowInputDisAmtNorway(false)
      console.log(NorwayDisPercent)
      console.log(NorwayListPrice)

      setNorwayNetPrice(parseFloat(NorwayListPrice) - parseFloat(NorwayListPrice) * parseFloat(NorwayDisPercent == "" ? 0 : NorwayDisPercent)/100)


    }else if(value == '3'){
  

      
      setshowInputPercentNorway(false)
      setshowInputDisAmtNorway(true)

      setNorwayNetPrice(parseFloat(NorwayListPrice) - parseFloat(NorwayDisAmt == "" ? 0 : NorwayDisAmt))

    }else{

      setshowInputPercentNorway(false)
      setshowInputDisAmtNorway(false)
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

  const [PeruTip, setPeruTip] = useState("")
  const [Peruminvalue, setPeruminvalue] = useState("")

  const [showInputDisAmtPeru, setshowInputDisAmtPeru] = useState(false)

  const [showInputPercentPeru, setshowInputPercentPeru] = useState(false)
  
         // ---------------------
    // Discount Type Peru
    const handleDefaultDiscountTypePeru = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){


        setshowInputPercentPeru(false)
        setshowInputDisAmtPeru(false)
        setPeruNetPrice(PeruListPrice)

      }else if(value == '2'){

       
        setshowInputPercentPeru(true)
        setshowInputDisAmtPeru(false)
        console.log(PeruDisPercent)
        console.log(PeruListPrice)

        setPeruNetPrice(parseFloat(PeruListPrice) - parseFloat(PeruListPrice) * parseFloat(PeruDisPercent == "" ? 0 : PeruDisPercent)/100)


      }else if(value == '3'){


        setshowInputPercentPeru(false)
        setshowInputDisAmtPeru(true)

        setPeruNetPrice(parseFloat(PeruListPrice) - parseFloat(PeruDisAmt == "" ? 0 : PeruDisAmt))

      }else{


        setshowInputPercentPeru(false)
        setshowInputDisAmtPeru(false)
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

  const [PhilipinesTip, setPhilipinesTip] = useState("")
  const [PhilipinesminValue, setPhilipinesminValue] = useState("")

  const [showInputDisAmtPhilipines, setshowInputDisAmtPhilipines] = useState(false)

  const [showInputPercentPhilipines, setshowInputPercentPhilipines] = useState(false)


          // ---------------------
    // Discount Type Philipines
    const handleDefaultDiscountTypePhilipines = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

       
        setshowInputPercentPhilipines(false)
        setshowInputDisAmtPhilipines(false)
        setPhilipinesNetPrice(PhilipinesListPrice)

      }else if(value == '2'){

 
        setshowInputPercentPhilipines(true)
        setshowInputDisAmtPhilipines(false)
        console.log(PhilipinesDisPercent)
        console.log(PhilipinesListPrice)

        setPhilipinesNetPrice(parseFloat(PhilipinesListPrice) - parseFloat(PhilipinesListPrice) * parseFloat(PhilipinesDisPercent == "" ? 0 : PhilipinesDisPercent)/100)


      }else if(value == '3'){


        setshowInputPercentPhilipines(false)
        setshowInputDisAmtPhilipines(true)

        setPhilipinesNetPrice(parseFloat(PhilipinesListPrice) - parseFloat(PhiliphinesDisAmt == "" ? 0 : PhiliphinesDisAmt))

      }else{
   
        setshowInputPercentPhilipines(false)
        setshowInputDisAmtPhilipines(false)
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

  const [PolandTip, setPolandTip] = useState("")
  const [PolandminValue, setPolandminValue] = useState("")

  const [showInputDisAmtPoland, setshowInputDisAmtPoland] = useState(false)

  const [showInputPercentPoland, setshowInputPercentPoland] = useState(false)


          // ---------------------
    // Discount Type Poland
    const handleDefaultDiscountTypePoland = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

    
        setshowInputPercentPoland(false)
        setshowInputDisAmtPoland(false)
        setPolandNetPrice(PolandListPrice)

      }else if(value == '2'){


        setshowInputPercentPoland(true)
        setshowInputDisAmtPoland(false)

        console.log(PolandDisPercent)
        console.log(PolandListPrice)

        setPolandNetPrice(parseFloat(PolandListPrice) - parseFloat(PolandListPrice) * parseFloat(PolandDisPercent == "" ? 0 : PolandDisPercent)/100)


      }else if(value == '3'){


        setshowInputPercentPoland(false)
        setshowInputDisAmtPoland(true)

        setPolandNetPrice(parseFloat(PolandListPrice) - parseFloat(PolandDisAmt == "" ? 0 : PolandDisAmt))

      }else{
     
        setshowInputPercentPoland(false)
        setshowInputDisAmtPoland(false)
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

  const [RomaniaTip, setRomaniaTip] = useState("")
  const [Romaniaminvalue, setRomaniaminvalue] = useState("")

  const [showInputDisAmtRomania, setshowInputDisAmtRomania] = useState(false)

  const [showInputPercentRomania, setshowInputPercentRomania] = useState(false)

            // ---------------------
    // Discount Type Romania
    const handleDefaultDiscountTypeRomania = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){


        setshowInputPercentRomania(false)
        setshowInputDisAmtRomania(false)
        setRomaniaNetPrice(RomaniaListPrice)

      }else if(value == '2'){

 
        setshowInputPercentRomania(true)
        setshowInputDisAmtRomania(false)
        console.log(RomaniaDisPercent)
        console.log(RomaniaListPrice)

        setRomaniaNetPrice(parseFloat(RomaniaListPrice) - parseFloat(RomaniaListPrice) * parseFloat(RomaniaDisPercent == "" ? 0 : RomaniaDisPercent)/100)


      }else if(value == '3'){


        setshowInputPercentRomania(false)
        setshowInputDisAmtRomania(true)

        setRomaniaNetPrice(parseFloat(RomaniaListPrice) - parseFloat(RomaniaDisAmt == "" ? 0 : RomaniaDisAmt))

      }else{


        setshowInputPercentRomania(false)
        setshowInputDisAmtRomania(false)
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

  const [RussiaTip, setRussiaTip] = useState("")
  const [RussiaminValue, setRussiaminValue] = useState("")

  const [showInputDisAmtRussia, setshowInputDisAmtRussia] = useState(false)

  const [showInputPercentRussia, setshowInputPercentRussia] = useState(false)

          // ---------------------
    // Discount Type Russia
    const handleDefaultDiscountTypeRussia = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        setshowInputPercentRussia(false)
        setshowInputDisAmtRussia(false)
        setRussiaNetPrice(RussiaListPrice)

      }else if(value == '2'){


        setshowInputPercentRussia(true)
        setshowInputDisAmtRussia(false)
        console.log(RussiaDisDisPercent)
        console.log(RussiaListPrice)

        setRussiaNetPrice(parseFloat(RussiaListPrice) - parseFloat(RussiaListPrice) * parseFloat(RussiaDisDisPercent == "" ? 0 : RussiaDisDisPercent)/100)


      }else if(value == '3'){
     

        
        setshowInputPercentRussia(false)
        setshowInputDisAmtRussia(true)

        setRussiaNetPrice(parseFloat(RussiaListPrice) - parseFloat(RussiaDisAmt == "" ? 0 : RussiaDisAmt))

      }else{
       
        setshowInputPercentRussia(false)
        setshowInputDisAmtRussia(false)
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

  const [SingaporeTip, setSingaporeTip] = useState("")
  const [SingaporeminValue, setSingaporeminValue] = useState("")

  const [showInputDisAmtSingapore, setshowInputDisAmtSingapore] = useState(false)

  const [showInputPercentSingapore, setshowInputPercentSingapore] = useState(false)

          // ---------------------
    // Discount Type Singapore
    const handleDefaultDiscountTypeSingapore = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

 
        setshowInputPercentSingapore(false)
        setshowInputDisAmtSingapore(false)
        setSingaporeNetPrice(SingaporeListPrice)

      }else if(value == '2'){

         
        setshowInputPercentSingapore(true)
        setshowInputDisAmtSingapore(false)
        console.log(SingaporeDisPercent)
        console.log(SingaporeListPrice)

        setSingaporeNetPrice(parseFloat(SingaporeListPrice) - parseFloat(SingaporeListPrice) * parseFloat(SingaporeDisPercent == "" ? 0 : SingaporeDisPercent)/100)


      }else if(value == '3'){
  

        setshowInputPercentSingapore(false)
        setshowInputDisAmtSingapore(true)

        setSingaporeNetPrice(parseFloat(SingaporeListPrice) - parseFloat(SingaporeDisAmt == "" ? 0 : SingaporeDisAmt))

      }else{
        setshowInputPercentSingapore(false)
        setshowInputDisAmtSingapore(false)
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

  const [ThailandTip, setThailandTip] = useState("")
  const [ThailandminValue, setThailandminValue] = useState("")

  const [showInputDisAmtThailand, setshowInputDisAmtThailand] = useState(false)

  const [showInputPercentThailand, setshowInputPercentThailand] = useState(false)

        // ---------------------
    // Discount Type Thailand
    const handleDefaultDiscountTypeThailand = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        setshowInputPercentThailand(false)
        setshowInputDisAmtThailand(false)
        setThailandNetPrice(ThailandListPrice)

      }else if(value == '2'){

        setshowInputPercentThailand(true)
        setshowInputDisAmtThailand(false)


        console.log(ThailandDisPercent)
        console.log(ThailandListPrice)

        setThailandNetPrice(parseFloat(ThailandListPrice) - parseFloat(ThailandListPrice) * parseFloat(ThailandDisPercent == "" ? 0 : ThailandDisPercent)/100)


      }else if(value == '3'){
   

        setshowInputPercentThailand(false)
        setshowInputDisAmtThailand(true)

        setThailandNetPrice(parseFloat(ThailandListPrice) - parseFloat(ThailandDisAmt == "" ? 0 : ThailandDisAmt))

      }else{
        setshowInputPercentThailand(false)
        setshowInputDisAmtThailand(false)
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

  const [TurkeyTip, setTurkeyTip] = useState("")
  const [TurkeyminValue, setTurkeyminValue] = useState("")

  const [showInputDisAmtTurkey, setshowInputDisAmtTurkey] = useState(false)

  const [showInputPercentTurkey, setshowInputPercentTurkey] = useState(false)

          // ---------------------
    // Discount Type Turkey
    const handleDefaultDiscountTypeTurkey = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

     
        setshowInputPercentTurkey(false)
        setshowInputDisAmtTurkey(false)
        setTurkeyNetPrice(TurkeyListPrice)

      }else if(value == '2'){


        setshowInputPercentTurkey(true)
        setshowInputDisAmtTurkey(false)
        console.log(TurkeyDisPercent)
        console.log(TurkeyListPrice)

        setTurkeyNetPrice(parseFloat(TurkeyListPrice) - parseFloat(TurkeyListPrice) * parseFloat(TurkeyDisPercent == "" ? 0 : TurkeyDisPercent)/100)


      }else if(value == '3'){


        setshowInputPercentTurkey(false)
        setshowInputDisAmtTurkey(true)

        setTurkeyNetPrice(parseFloat(TurkeyListPrice) - parseFloat(TurkeyDisAmt == "" ? 0 : TurkeyDisAmt))

      }else{
    

        
        setshowInputPercentTurkey(false)
        setshowInputDisAmtTurkey(false)
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

  const [TaiwanTip, setTaiwanTip] = useState("")
  const [TaiwanminValue, setTaiwanminValue] = useState("")

  const [showInputDisAmtTaiwan, setshowInputDisAmtTaiwan] = useState(false)

  const [showInputPercentTaiwan, setshowInputPercentTaiwan] = useState(false)

           // ---------------------
    // Discount Type Taiwan
    const handleDefaultDiscountTypeTaiwan = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

        setshowInputPercentTaiwan(false)
        setshowInputDisAmtTaiwan(false)
        setTaiwanNetPrice(TaiwanListPrice)

      }else if(value == '2'){

    
        setshowInputPercentTaiwan(true)
        setshowInputDisAmtTaiwan(false)
        console.log(TaiwanDisType)
        console.log(TaiwanListPrice)

        setTaiwanNetPrice(parseFloat(TaiwanListPrice) - parseFloat(TaiwanListPrice) * parseFloat(TaiwanDisType == "" ? 0 : TaiwanDisType)/100)


      }else if(value == '3'){


        setshowInputPercentTaiwan(false)
        setshowInputDisAmtTaiwan(true)

        setTaiwanNetPrice(parseFloat(TaiwanListPrice) - parseFloat(TaiwanDisAmt == "" ? 0 : TaiwanDisAmt))

      }else{
        setshowInputPercentTaiwan(false)
        setshowInputDisAmtTaiwan(false)
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

  const [VietnamTip, setVietnamTip] = useState("")
  const [VietnamminValue, setVietnamminValue] = useState("")


  const [showInputDisAmtVietnam, setshowInputDisAmtVietnam] = useState(false)

  const [showInputPercentVietnam, setshowInputPercentVietnam] = useState(false)


        // ---------------------
    // Discount Type Vietnam
    const handleDefaultDiscountTypeVietnam = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){

      
        setshowInputPercentVietnam(false)
        setshowInputDisAmtVietnam(false)
        setVietnamNetPrice(VietnamListPrice)

      }else if(value == '2'){

  
        setshowInputPercentVietnam(true)
        setshowInputDisAmtVietnam(false)
        console.log(VietmanDisType)
        console.log(VietnamListPrice)

        setVietnamNetPrice(parseFloat(VietnamListPrice) - parseFloat(VietnamListPrice) * parseFloat(VietmanDisType == "" ? 0 : VietmanDisType)/100)


      }else if(value == '3'){
   

        setshowInputPercentVietnam(false)
        setshowInputDisAmtVietnam(true)

        setVietnamNetPrice(parseFloat(VietnamListPrice) - parseFloat(VietnamDisAmt == "" ? 0 : VietnamDisAmt))

      }else{
      
        setshowInputPercentVietnam(false)
        setshowInputDisAmtVietnam(false)
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

  const [SATip, setSATip] = useState("")
  const [SAminValue, setSAminValue] = useState("")

  const [showInputDisAmtSA, setshowInputDisAmtSA] = useState(false)

  const [showInputPercentSA, setshowInputPercentSA] = useState(false)

      // ---------------------
    // Discount Type SA
    const handleDefaultDiscountTypeSA = (value) =>{
      // 1 - No Discount
      // 2 - Percentage
      // 3 - By Value

      if(value == '1'){


        setshowInputPercentSA(false)
        setshowInputDisAmtSA(false)
        setSANetPrice(SAListPrice)

      }else if(value == '2'){

 
        setshowInputPercentSA(true)
        setshowInputDisAmtSA(false)
        console.log(SADisType)
        console.log(SAListPrice)

        setSANetPrice(parseFloat(SAListPrice) - parseFloat(SAListPrice) * parseFloat(SADisType == "" ? 0 : SADisType)/100)


      }else if(value == '3'){
    

        
        setshowInputPercentSA(false)
        setshowInputDisAmtSA(true)

        setSANetPrice(parseFloat(SAListPrice) - parseFloat(SADisAmt == "" ? 0 : SADisAmt))

      }else{
        setshowInputPercentSA(false)
        setshowInputDisAmtSA(false)
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




  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2"> 

    <h5 className='p-2'><b>Create new Coupon</b></h5>

    <div className='row'>

        <div className='col-md-6'>
        <Card className='border border-dark border-3 h-100'>
            <Radio
                checked={selectedValue === 'free-coupon'}
                onChange={handleChange}
                value="free-coupon"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'A' }}
            />
            <span><b>Free Coupon</b></span>

            <div className='container'>
                <p>Creates a limited-time offer that allows up to 1000 students to enroll in your course for free.</p>

                <p>Expiry: 1000 redemptions or 7 days after activation, whichever comes first.</p>
            </div>

        </Card>
        </div>

        <div className='col-md-6'>
        <Card className='border border-dark border-3 h-100'>
            <Radio
                checked={selectedValue === 'discount-coupon'}
                onChange={handleChange}
                value="discount-coupon"
                name="radio-buttons"
                inputProps={{ 'aria-label': 'B' }}
            />
            <span><b>Discount Coupon</b></span>

            <div className='container'>
                <p>Creates a 30 day offer for a price you decide on with unlimited redemptions.</p>

                <p>Expiry: 30 days after activation</p>
            </div>

            </Card>
            </div>

    </div>

    {selectedValue == "free-coupon" && (
    <div className='container'>
    <div className='row my-5'>
      <div className='mb-3'>
        <h6><b>Start date:</b></h6>
        <input
        className='form-control'
        type="date"
        id="startDate"
        value={startDate}
        onChange={handleStartDateChange}
      />
      </div>
      
      <div className='mb-3'>
      
        <h6><b>End date:</b> <input class="form-control" type="text" value={endDate} aria-label="readonly input example" readonly /></h6>
      </div>
    </div>

    
      <Form.Group className='d-flex'  controlId="exampleForm.ControlInput1">
        <Form.Label><b>Enter coupon code (optional)</b></Form.Label>
        <Form.Control value={couponCodeFree} onChange={(e) => setcouponCodeFree(e.target.value.toUpperCase())} type="text" placeholder="Enter Coupon" />
      </Form.Group>

      <p>The coupon code must be between 6 - 20 characters, only UPPERCASE LETTERS (A-Z), numbers (0-9) and these symbols can be used: periods (.), dashes (-), and underscores (_). Coupon codes with lowercase or other symbols cannot be created. A coupon code can only be used once per course.</p>


      <div className='my-2'>
        <Button onClick={handleFreeCouponCreate} variant='contained'>Create Coupon</Button>
     </div>

    </div>
    )}


    {selectedValue == "discount-coupon" && (
        <div className='container'>

           <div className='row my-5'>
            <div className='mb-3'>
              <h6><b>Start date:</b></h6>
              <input
              className='form-control'
              type="date"
              id="startDate"
              value={startDateDiscount}
              onChange={handleStartDateChangeDiscount}
            />
            </div>
            
            <div className='mb-3'>
            
              <h6><b>End date:</b> <input class="form-control" type="text" value={endDateDiscount} aria-label="readonly input example" readonly /></h6>
            </div>
          </div>

        
        <Form.Group className='d-flex'  controlId="exampleForm.ControlInput1">
            <Form.Label><b>Enter coupon code (Optional):</b></Form.Label>
            <Form.Control value={couponCodeDiscount} onChange={(e) => setcouponCodeDiscount(e.target.value)} type="text" placeholder="Enter Coupon" />
        </Form.Group>
        couponCodeDiscount, 
        <p>The coupon code must be between 6 - 20 characters, only UPPERCASE LETTERS (A-Z), numbers (0-9) and these symbols can be used: periods (.), dashes (-), and underscores (_). Coupon codes with lowercase or other symbols cannot be created. A coupon code can only be used once per course.</p>

        <div className="pricing-container my-3">
          <div className="price-range-container p-3">
            <p><b>Enter discount price(s) for coupon:</b></p>

            <p>You have options to either:</p>
            <ol>
              <li>Only enter a Global discount price which will be applicable to all countries.</li>
              <p className="my-2">OR</p>
              <li>Enter specific discount prices for countries. The Global discount price will be applied for countries 
          not in the country list below. The Global discount price will also be applied for any country for 
          which you do not enter a discount price.
          </li>
            </ol>


            <div className="row">
                <p className='my-3'><b>Enter Global Discount Price (required):</b></p>

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
                <div className="col-md-3">
                <Form.Label className="pricing-label"><b>Discount %</b></Form.Label>
                <Form.Control value={DDisPercent} onChange={handleDefaultPercentageDiscount} type="text" />
                </div>
                )}

                {showDefaultValueDiscountInput && (

              <div className="col-md-3">
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

          

              <div className="col-6"></div>

       
            </div>
          </div>

      

          {/* Table */}
          <p className='my-3'><b>Enter Country Specific Discount Prices (optional):</b></p>
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
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {USATip}</Form.Label></td>
                        </td>

                          <td>USD</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("USD"))} ${countriesData[0].minPrice} - ${getSymbolFromCurrency(("USD"))} ${countriesData[0].maxPrice}`}</td>
                          <td>
                            <Form.Control value={USAListPrice}  onChange={handleChangeGlobalPriceUSA} type="text" />
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
                            {showInputPercentUSA && (
                          <Form.Control value={USADisPercent} onChange={handleDefaultPercentageDiscountUSA}  type="text" />
                            )}
                          </td>
                          <td>
                          {showInputDisAmtUSA && (
                          <Form.Control value={USADisAmt}  onChange={handleDefaultDiscountAmtUSA} type="text" />
                          )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{USANetPrice == "" ? "0.00" : formatNumber(USANetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("USD"))}{USAMinValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Australia
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {AusTip}</Form.Label></td>
                        </td>

                          <td>AUD</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("AUD"))} ${countriesData[1].minPrice} - ${getSymbolFromCurrency(("AUD"))} ${countriesData[1].maxPrice}`}</td>
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
                          {showInputPercentAus && (
                          <Form.Control value={AusDisPercent} onChange={handleDefaultPercentageDiscountAus} type="text" />
                            )}
                          
                          </td>
                          <td>
                          {showInputDisAmtAus && (
                          <Form.Control value={AusDisAmt} onChange={handleDefaultDiscountAmtAus} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{AusNetPrice == "" ? "0.00" : formatNumber(AusNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("AUD"))} {AusminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        
                        <tr>
                          <td>Brazil
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {BrazilTip}</Form.Label></td>
                        </td>

                          <td>BRL</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("BRL"))} ${countriesData[2].minPrice} - ${getSymbolFromCurrency(("BRL"))} ${countriesData[2].maxPrice}`}</td>
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
                            {showInputPercentBrzail && (
                                <Form.Control value={BrazilDisPercent} onChange={handleDefaultPercentageDiscountBrazil} type="text" />
                              )}
                          </td>
                          <td>
                            {showInputDisAmtBrzail && (

                          <Form.Control value={BrazilDisAmt} onChange={handleDefaultDiscountAmtBrazil} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{BrazilNetPrice == "" ? "0.00" : formatNumber(BrazilNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("BRL"))} {BrazilminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Canada
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {CanadaTip}</Form.Label></td>
                        </td>

                          <td>CAD</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("CAD"))} ${countriesData[3].minPrice} - ${getSymbolFromCurrency(("CAD"))} ${countriesData[3].maxPrice}`}</td>
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
                            {showInputPercentCanada && (
                          <Form.Control value={CanadaDisPercent} onChange={handleDefaultPercentageDiscountCanada} type="text" />
                            )}
                          </td>
                          <td>
                            
                            {showInputDisAmtCanada && (
                          <Form.Control value={CanadaDisAmt} onChange={handleDefaultDiscountAmtCanada} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{CanadaNetPrice == "" ? "0.00" : formatNumber(CanadaNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("CAD"))} {CanadaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>


                        <tr>
                          <td>Chile
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {ChileTip}</Form.Label></td>
                        </td>

                          <td>CLP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("CLP"))} ${countriesData[4].minPrice} - ${getSymbolFromCurrency(("CLP"))} ${countriesData[4].maxPrice}`}</td>
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
                            {showInputPercentChile && (
                              <Form.Control value={ChileDisPercent} onChange={handleDefaultPercentageDiscountChile} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtChile && (
                            <Form.Control value={ChileDisAmt}  onChange={handleDefaultDiscountAmtChile} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{ChileNetPrice == "" ? "0.00" : formatNumber(ChileNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("CLP"))} {ChileminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Columbia
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {ColumbiaTip}</Form.Label></td>
                        </td>

                          <td>COP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("COP"))} ${countriesData[5].minPrice} - ${getSymbolFromCurrency(("COP"))} ${countriesData[5].maxPrice}`}</td>
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
                            {showInputPercentColumbia && (
                                <Form.Control value={ColumbiaDisPercent} onChange={handleDefaultPercentageDiscountColumbia} type="text" />
                              )}
                          </td>
                          <td>
                            {showInputDisAmtColumbia && (
                          <Form.Control value={ColumbiaDisAmt} onChange={handleDefaultDiscountAmtColumbia} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{ColumbiaNetPrice == "" ? "0.00" : formatNumber(ColumbiaNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("COP"))} {ColumbiaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Egypt
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {EgyptTip}</Form.Label></td>
                        </td>

                          <td>EGP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("EGP"))} ${countriesData[6].minPrice} - ${getSymbolFromCurrency(("EGP"))} ${countriesData[6].maxPrice}`}</td>
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
                            {showInputPercentEgypt && (
                          <Form.Control value={EgyptDisPercent} onChange={handleDefaultPercentageDiscountEgypt} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtEgypt && (
                          <Form.Control value={EgyptDisAmt} onChange={handleDefaultDiscountAmtEgypt} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{EgyptNetPrice == "" ? "0.00" : formatNumber(EgyptNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("EGP"))}{EgyptminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>European Union
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {EUTip}</Form.Label></td>
                        </td>

                          <td>EUR</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("EUR"))} ${countriesData[7].minPrice}  - ${getSymbolFromCurrency(("EUR"))} ${countriesData[7].maxPrice}`}</td>
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
                            {showInputPercentEU && (
                          <Form.Control value={EUDisPercent} onChange={handleDefaultPercentageDiscountEU} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtEU && (
                            <Form.Control value={EUDisAmt} onChange={handleDefaultDiscountAmtEU} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{EUNetPrice == "" ? "0.00" : formatNumber(EUNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("EUR"))} {EUminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>
                        
                        <tr>
                          <td>Great Britain
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {GBPTip}</Form.Label></td>
                        </td>

                          <td>GBP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("GBP"))} ${countriesData[8].minPrice} - ${getSymbolFromCurrency(("GBP"))} ${countriesData[8].maxPrice}`}</td>
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
                            {showInputPercentGBP && (
                          <Form.Control value={GBPDisPercent} onChange={handleDefaultPercentageDiscountGBP} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtGBP && (
                              <Form.Control value={GBPDisAmt} onChange={handleDefaultDiscountAmtGBP} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{GBPNetPrice == "" ? "0.00" : formatNumber(GBPNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("GBP"))} {GBPminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Indonesia
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {IndonesiaTip}</Form.Label></td>
                        </td>

                          <td>IDR</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("IDR"))} ${countriesData[9].minPrice} - ${getSymbolFromCurrency(("IDR"))} ${countriesData[9].maxPrice}`}</td>
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
                            {showInputPercentIndonesia && (
                          <Form.Control value={IndonesiaDisPercent} onChange={handleDefaultPercentageDiscountIndo} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtIndonesia && (
                          <Form.Control value={IndonesiaDisAmt} onChange={handleDefaultDiscountAmtIndo} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{IndonesiaNetPrice == "" ? "0.00" : formatNumber(IndonesiaNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("IDR"))} {IndonesiaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Israel
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {IsrealTip}</Form.Label></td>
                        </td>

                          <td>ILS</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("ILS"))} ${countriesData[10].minPrice} - ${getSymbolFromCurrency(("ILS"))} ${countriesData[10].maxPrice}`}</td>
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
                            {showInputPercentIsreal && (

                            <Form.Control value={IsrealDisPercent} onChange={handleDefaultPercentageDiscountIsreal} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtIsreal && (

                          <Form.Control value={IsrealDisAmt} onChange={handleDefaultDiscountAmtIsreal} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{IsrealNetPrice == "" ? "0.00" : formatNumber(IsrealNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("ILS"))} {IsrealminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>India
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {IndiaTip}</Form.Label></td>
                        </td>

                          <td>INR</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("INR"))} ${countriesData[11].minPrice} - ${getSymbolFromCurrency(("INR"))} ${countriesData[11].maxPrice}`}</td>
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
                            {showInputPercentIndia && (
                          <Form.Control value={IndiaDisPercent} onChange={handleDefaultPercentageDiscountIndia} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtIndia && (

                          <Form.Control value={IndiaDisAmt} onChange={handleDefaultDiscountAmtIndia} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{IndiaNetPrice == "" ? "0.00" : formatNumber(IndiaNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("INR"))} {IndiaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Japan
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {JapanTip}</Form.Label></td>
                        </td>

                          <td>JPY</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("JPY"))} ${countriesData[12].minPrice} - ${getSymbolFromCurrency(("JPY"))} ${countriesData[12].maxPrice}`}</td>
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
                            {showInputPercentJapan && (

                          <Form.Control value={JapanDisPercent} onChange={handleDefaultPercentageDiscountJapan} type="text" />
                            )}
                          </td>
                          <td>
                            {
                              showInputDisAmtJapan && (

                        <Form.Control value={JapanDisAmt} onChange={handleDefaultDiscountAmtJapan} type="text" />
                              )
                            }
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{JapanNetPrice == "" ? "0.00" : formatNumber(JapanNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("JPY"))} {JapanminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>South Korea
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {SKTip}</Form.Label></td>
                        </td>

                          <td>KRW</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("KRW"))} ${countriesData[13].minPrice} - ${getSymbolFromCurrency(("KRW"))} ${countriesData[13].maxPrice}`}</td>
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
                              {showInputPercentSK && (

                          <Form.Control value={SKDisPercent} onChange={handleDefaultPercentageDiscountSK} type="text" />
                              )}
                          </td>
                          <td>
                            {showInputDisAmtSK && (
                              <Form.Control value={SKDisAmt} onChange={handleDefaultDiscountAmtSK} type="text" />

                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{SKNetPrice == "" ? "0.00" : formatNumber(SKNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("KRW"))} {SKminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Mexico
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {MexicoTip}</Form.Label></td>
                        </td>

                          <td>MXN</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("MXN"))} ${countriesData[14].minPrice} - ${getSymbolFromCurrency(("MXN"))} ${countriesData[14].maxPrice}`}</td>
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
                            {showInputPercentMexico && (
                          <Form.Control value={MexicoDisPercent} onChange={handleDefaultPercentageDiscountMexico} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtMexico && (

                            <Form.Control value={MexicoDisAmt} onChange={handleDefaultDiscountAmtMexico} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{MexicoNetPrice == "" ? "0.00" : formatNumber(MexicoNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("MXN"))} {MexicominValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Malaysia
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {MalaysiaTip}</Form.Label></td>
                        </td>

                          <td>MYR</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("MYR"))} ${countriesData[15].minPrice} - ${getSymbolFromCurrency(("MYR"))} ${countriesData[15].maxPrice}`}</td>
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
                            {showInputPercentMalaysia && (
                          <Form.Control value={MalaysiaDisPercent} onChange={handleDefaultPercentageDiscountMalaysia} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtMalaysia && (
                              <Form.Control 
                              value={MalaysiaDisAmt} onChange={handleDefaultDiscountAmtMalaysia} type="text" />

                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{MalaysiaNetPrice == "" ? "0.00" : formatNumber(MalaysiaNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("MYR"))}{MalaysiaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 
                        
                        <tr>
                          <td>Nigeria
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {NigeriaTip}</Form.Label></td>
                        </td>

                          <td>NGN</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("NGN"))} ${countriesData[16].minPrice} - ${getSymbolFromCurrency(("NGN"))} ${countriesData[16].maxPrice}`}</td>
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
                            {showInputPercentNigeria && (
                          <Form.Control value={NigeriaDisPercent} onChange={handleDefaultPercentageDiscountNigeria} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtNigeria && (
                              <Form.Control value={NigeriaDisAmt} onChange={handleDefaultDiscountAmtNigeria} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{NIgeriaNetPrice == "" ? "0.00" : formatNumber(NIgeriaNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("NGN"))}{NigeriaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 

                        <tr>
                          <td>Norway
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {NorwayTip}</Form.Label></td>
                        </td>

                          <td>NOK</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("NOK"))} ${countriesData[17].minPrice} - ${getSymbolFromCurrency(("NOK"))} ${countriesData[17].maxPrice}`}</td>
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
                            {showInputPercentNorway && (
                          <Form.Control value={NorwayDisPercent} onChange={handleDefaultPercentageDiscountNorway} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtNorway && (
                          <Form.Control value={NorwayDisAmt} onChange={handleDefaultDiscountAmtNorway} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{NorwayNetPrice == "" ? "0.00" : formatNumber(NorwayNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("NOK"))}{NorwayminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Peru
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {PeruTip}</Form.Label></td>
                        </td>

                          <td>PEN</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("PEN"))} ${countriesData[18].minPrice} - ${getSymbolFromCurrency(("PEN"))} ${countriesData[18].maxPrice}`}</td>
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
                            {showInputPercentPeru && (

                          <Form.Control value={PeruDisPercent} onChange={handleDefaultPercentageDiscountPeru} type="text" />
                            )}
                          </td>
                          <td>
                          
                            {showInputDisAmtPeru && (
                        <Form.Control value={PeruDisAmt} onChange={handleDefaultDiscountAmtPeru} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{PeruNetPrice == "" ? "0.00" : formatNumber(PeruNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("PEN"))} {Peruminvalue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 
                          

                          <tr>
                          <td>Philippines
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {PhilipinesTip}</Form.Label></td>
                        </td>

                          <td>PHP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("PHP"))} ${countriesData[19].minPrice} - ${getSymbolFromCurrency(("PHP"))} ${countriesData[19].maxPrice}`}</td>
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
                            {showInputPercentPhilipines && (
                              <Form.Control value={PhilipinesDisPercent} onChange={handleDefaultPercentageDiscountPhilipines} type="text" />

                            )}
                          </td>
                          <td>
                          {showInputDisAmtPhilipines && (
                          <Form.Control value={PhiliphinesDisAmt} onChange={handleDefaultDiscountAmtPhilipines} type="text" />
                          )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{PhilipinesNetPrice == "" ? "0.00" : formatNumber(PhilipinesNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("PHP"))} {PhilipinesminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 

                        <tr>
                          <td>Poland
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {PolandTip}</Form.Label></td>
                        </td>

                          <td>PLN</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("PLN"))} ${countriesData[20].minPrice} - ${getSymbolFromCurrency(("PLN"))} ${countriesData[20].maxPrice}`}</td>
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
                            {showInputPercentPoland && (

                          <Form.Control value={PolandDisPercent} onChange={handleDefaultPercentageDiscountPoland} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtPoland && (

                        <Form.Control value={PolandDisAmt} onChange={handleDefaultDiscountAmtPoland} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{PolandNetPrice == "" ? "0.00" : formatNumber(PolandNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("PLN"))} {PolandminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 

                        <tr>
                          <td>Romania
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {RomaniaTip}</Form.Label></td>
                        </td>

                          <td>RON</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("RON"))} ${countriesData[21].minPrice} - ${getSymbolFromCurrency(("RON"))} ${countriesData[21].maxPrice}`}</td>
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
                            {showInputPercentRomania && (
                          <Form.Control value={RomaniaDisPercent} onChange={handleDefaultPercentageDiscountRomania} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtRomania && (
                          <Form.Control value={RomaniaDisAmt} onChange={handleDefaultDiscountAmtRomania} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{RomaniaNetPrice == "" ? "0.00" : formatNumber(RomaniaNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum: {getSymbolFromCurrency(("RON"))} {Romaniaminvalue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 

                        <tr>
                          <td>Russia
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {RussiaTip}</Form.Label></td>
                        </td>

                          <td>RUB</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("RUB"))} ${countriesData[22].minPrice} - ${getSymbolFromCurrency(("RUB"))} ${countriesData[22].maxPrice}`}</td>
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
                            {showInputPercentRussia && (
                              
                          <Form.Control value={RussiaDisDisPercent} onChange={handleDefaultPercentageDiscountRussia} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtRussia && (
                          <Form.Control value={RussiaDisAmt} onChange={handleDefaultDiscountAmtRussia}  type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{RussiaNetPrice == "" ? "0.00" : formatNumber(RussiaNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("RUB"))} {RussiaminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                        <tr>
                          <td>Singapore
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {SingaporeTip}</Form.Label></td>
                        </td>

                          <td>SGD</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("SGD"))} ${countriesData[23].minPrice} - ${getSymbolFromCurrency(("SGD"))} ${countriesData[23].maxPrice}`}</td>
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
                            {showInputPercentSingapore && (
                          <Form.Control value={SingaporeDisPercent} onChange={handleDefaultPercentageDiscountSingapore} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtSingapore && (

                          <Form.Control value={SingaporeDisAmt} onChange={handleDefaultDiscountAmtSingapore} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{SingaporeNetPrice == "" ? "0.00" : formatNumber(SingaporeNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("SGD"))} {SingaporeminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 

                        <tr>
                          <td>Thailand
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {ThailandTip}</Form.Label></td>
                        </td>

                          <td>THB</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("THB"))} ${countriesData[24].minPrice} - ${getSymbolFromCurrency(("THB"))} ${countriesData[24].maxPrice}`}</td>
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
                            {showInputPercentThailand && (
                          <Form.Control value={ThailandDisPercent} onChange={handleDefaultPercentageDiscountThailand} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtThailand && (
                          <Form.Control value={ThailandDisAmt} onChange={handleDefaultDiscountAmtThailand} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{ThailandNetPrice == "" ? "0.00" : formatNumber(ThailandNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("THB"))} {ThailandminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 

                        <tr>
                          <td>Turkey
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {TurkeyTip}</Form.Label></td>
                        </td>

                          <td>TRY</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("TRY"))} ${countriesData[25].minPrice} - ${getSymbolFromCurrency(("TRY"))} ${countriesData[25].maxPrice}`}</td>
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
                            {showInputPercentTurkey && (
                          <Form.Control value={TurkeyDisPercent} onChange={handleDefaultPercentageDiscountTurkey} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtTurkey && (
                          <Form.Control value={TurkeyDisAmt} onChange={handleDefaultDiscountAmtTurkey} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{TurkeyNetPrice == "" ? "0.00" : formatNumber(TurkeyNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("TRY"))} {TurkeyminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                          <tr>
                          <td>Taiwan
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {TaiwanTip}</Form.Label></td>
                        </td>

                          <td>TWD</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("TWD"))} ${countriesData[26].minPrice} - ${getSymbolFromCurrency(("TWD"))} ${countriesData[26].maxPrice}`}</td>
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
                            {showInputPercentTaiwan && (
                          <Form.Control value={TaiwanDisPercent} onChange={handleDefaultPercentageDiscountTaiwan} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtTaiwan && (

                          <Form.Control value={TaiwanDisAmt} onChange={handleDefaultDiscountAmtTaiwan} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{TaiwanNetPrice == "" ? "0.00" : formatNumber(TaiwanNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("TWD"))} {TaiwanminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr>

                          <tr>
                          <td>Vietnam
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {VietnamTip}</Form.Label></td>
                        </td>

                          <td>VND</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("VND"))} ${countriesData[27].minPrice} - ${getSymbolFromCurrency(("VND"))} ${countriesData[27].maxPrice}`}</td>
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
                            {showInputPercentVietnam && (

                          <Form.Control value={VietnamDisPercent} onChange={handleDefaultPercentageDiscountVietnam} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtVietnam && (

                          <Form.Control value={VietnamDisAmt} onChange={handleDefaultDiscountAmtVietnam} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{VietnamNetPrice == "" ? "0.00" : formatNumber(VietnamNetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("VND"))} {VietnamminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 


                        <tr>
                          <td>South Africa
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip: {SATip}</Form.Label></td>
                        </td>

                          <td>KRW</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("KRW"))} ${countriesData[28].minPrice}  - ${getSymbolFromCurrency(("KRW"))} ${countriesData[28].maxPrice}`}</td>
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
                            {showInputPercentSA && (
                          <Form.Control value={SADisPercent} onChange={handleDefaultPercentageDiscountSA} type="text" />
                            )}
                          </td>
                          <td>
                            {showInputDisAmtSA && (
                          <Form.Control value={SADisAmt} onChange={handleDefaultDiscountAmtSA} type="text" />
                            )}
                          </td>
                          <td style={{whiteSpace:'nowrap'}}>
                              <h6>{SANetPrice == "" ? "0.00" : formatNumber(SANetPrice)}</h6>
                        <tr>
                        <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("KRW"))} {SAminValue}</Form.Label>

                        </tr>
                          </td>
                        
                        </tr> 
                          
              </tbody>
          </table>

        </div>


        <div className='my-2'>
            <Button onClick={handleDiscountCouponCreate} variant='contained'>Create Coupon</Button>
        </div>

        </div>
        )}
   

   {/* ------------- */}
  
 
    
  
    </Card>
    </div>
  )
}

export default AddCoupon