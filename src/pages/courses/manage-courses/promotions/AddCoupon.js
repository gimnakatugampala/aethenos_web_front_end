import React, { useEffect, useState } from 'react'
import { Card  } from 'antd';
import { Select } from "antd";
import {Radio as RadioAnt} from 'antd';
import Radio from '@mui/material/Radio';
import Form from 'react-bootstrap/Form';
import Button from '@mui/material/Button';
import DateTimePicker from 'react-datetime-picker';
import { GetDiscountTypes , SavePriceDefault , GetPriceDefaultCoupon , GetCoursePricingType , GetCountriesListPricing , AddFreeCouponAPI, GetCountriesDiscountCoupons, SaveDiscountDouponsAPI} from "../../../../api";
import getSymbolFromCurrency from 'currency-symbol-map'
import InputGroup from 'react-bootstrap/InputGroup';
import ErrorAlert from "../../../../commonFunctions/Alerts/ErrorAlert";
import formatNumber from '../../../../commonFunctions/NumberFormat';
import moment from 'moment';

import ButtonSpinner from '../../../../commonFunctions/loaders/Spinner/ButtonSpinner';

import { DatePicker, Space } from 'antd';
import FormatNumbers from '../../../../commonFunctions/FormatNumbers';



const AddCoupon = ({code}) => {

    const [selectedValue, setSelectedValue] = React.useState('free-coupon');
    const [start_date, setstart_date] = useState(new Date())

    const [loading_btn, setloading_btn] = useState(false)

    const handleChange = (event) => {
      setSelectedValue(event.target.value);

      console.log(event.target.value)
    };

   

    //  ------------------------ Start Date ---------------------
    const currentDate = moment().startOf('day'); // Get current date
    const [startDate, setStartDate] = useState(currentDate);
    const [endDate, setEndDate] = useState(moment().add(7, 'days'));
    const [couponCodeFree, setcouponCodeFree] = useState('');
    // const [loading_btn, setLoadingBtn] = useState(false);
  
    useEffect(() => {
      if (startDate) {
        setEndDate(moment(startDate).add(7, 'days'));
      }
    }, [startDate]);
  
    const handleStartDateChange = (date) => {
      if (date && date.isSameOrAfter(currentDate, 'day')) {
        setStartDate(date);
      }
    };
  
    const calculateEndDate = (start) => {
      const startDate = moment(start, 'DD-MM-YYYY'); // Parse start date in DD-MM-YYYY format
      const endDate = startDate.add(7, 'days'); // Add 7 days to the start date
  
      return endDate.format('DD-MM-YYYY'); // Format the end date as DD-MM-YYYY
    };
  
    

    // useEffect(() => {
    //   setEndDate(calculateEndDate(currentDate));
    // }, [])

    //  -------------- DISCOUNT COUPONS ----------
    const currentDateDiscount = moment().format('DD-MM-YYYY'); // Get current date in "DD-MM-YYYY" format
    const [startDateDiscount, setStartDateDiscount] = useState(currentDateDiscount);
    const [endDateDiscount, setEndDateDiscount] = useState("");
    const [couponCodeDiscount, setcouponCodeDiscount] = useState("");

      
    const handleStartDateChangeDiscount = (date) => {
      if (date && date.isSameOrAfter(currentDate, 'day')) {
        const newStartDate = date.format('DD-MM-YYYY');
        if (moment(newStartDate, 'DD-MM-YYYY').isSameOrAfter(currentDateDiscount, 'day')) {
          setStartDateDiscount(newStartDate);
          setEndDateDiscount(calculateEndDateDiscount(newStartDate));
        }
      }
    };
  
    const calculateEndDateDiscount = (start) => {
      const startDate = moment(start, 'DD-MM-YYYY');
      const endDate = startDate.clone().add(30, 'days');
      return endDate.format('DD-MM-YYYY');
    };
  
    useEffect(() => {
      setEndDateDiscount(calculateEndDateDiscount(startDateDiscount));
    }, [startDateDiscount]);


    const handleFreeCouponCreate = (e) => {
      e.preventDefault();
  
      // Updated regex to allow periods, dashes, and underscores
      const isValid = /^[A-Z0-9._-]{6,20}$/.test(couponCodeFree);
  
      let SD = moment(new Date(startDate)).format('YYYY-MM-DD HH:mm:ss');
      let ED = moment(new Date(endDate)).format('YYYY-MM-DD HH:mm:ss');
  
      if (isValid || couponCodeFree === "") {
          console.log(SD);
          console.log(ED);
          console.log(couponCodeFree);
  
          setloading_btn(true);
  
          AddFreeCouponAPI(code, SD, ED, couponCodeFree, setloading_btn);
      } else {
          ErrorAlert("Error", "Please enter a valid coupon code. It must be between 6-20 characters and may include only UPPERCASE letters (A-Z), numbers (0-9), periods (.), dashes (-), and underscores (_).");
          setloading_btn(false)
      }
  };
  

    const handleDiscountCouponCreate = (e) =>{
      setloading_btn(true)

      console.log(startDateDiscount)
      console.log(endDateDiscount)
   
       // Updated regex to allow periods, dashes, and underscores
       const isValid = /^[A-Z0-9._-]{6,20}$/.test(couponCodeDiscount);

       // Parse and format start and end dates from DD-MM-YYYY to YYYY-MM-DD HH:mm:ss
        let SD = moment(startDateDiscount, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss');
        let ED = moment(endDateDiscount, 'DD-MM-YYYY').format('YYYY-MM-DD HH:mm:ss');

       if (isValid || couponCodeDiscount == "") {
        
        if(DDiscountValue == "" || DDiscountPercent == "" || DDiscountPercent == 0 || DDiscountAmount == "" || DDiscountAmount == 0){
          ErrorAlert("Error","Global Price cannot be empty")
          setloading_btn(false)
          return
      }

   
      var raw = {
        "code":`${couponCodeDiscount}`,
        "start_date":`${SD}`,
        "end_date":`${ED}`,
        "course_code":`${code}`,
        "global_list_price":`${DGlobalPricing == "" ? 0 : DGlobalPricing}`,
        "global_discount_price":`${DDiscountValue == "" ? 0 : DDiscountValue}`,
        "global_discount_percentage":`${DDiscountPercent == "" ? 0 : DDiscountPercent}`,
        "global_discount":`${DDiscountAmount == "" ? 0 : DDiscountAmount}`,
        "prices":[
            {
             "discount":`${USADiscountPercent == "" ? 0 : USADiscountPercent}`,
             "discount_amount":`${USADiscountAmount == "" ? 0 : USADiscountAmount}`,
             "discount_price":`${USADiscountValue == "" ? 0 : USADiscountValue}`,
             "list_price":`${USAListPrice == "" ? 0 : USAListPrice}`,
             "country_name":"United States"
            },
            {
             "discount":`${AusDiscountPercent == "" ? 0 : AusDiscountPercent}`,
             "discount_amount":`${AusDiscountAmount == "" ? 0 : AusDiscountAmount}`,
             "discount_price":`${AusDiscountValue == "" ? 0 : AusDiscountValue}`,
             "list_price":`${AusListPrice == "" ? 0 : AusListPrice}`,
             "country_name":"Australia"
            },
            {
             "discount":`${BrazilDiscountPercent == "" ? 0 : BrazilDiscountPercent}`,
             "discount_amount":`${BrazilDiscountAmount == "" ? 0 : BrazilDiscountAmount}`,
             "discount_price":`${BrazilDiscountValue == "" ? 0 : BrazilDiscountValue}`,
             "list_price":`${BrazilListPrice == "" ? 0 : BrazilListPrice}`,
             "country_name":"Brazil"
            },
            {
             "discount":`${CanadaDiscountPercent == "" ? 0 : CanadaDiscountPercent}`,
             "discount_amount":`${CanadaDiscountAmount == "" ? 0 : CanadaDiscountAmount}`,
             "discount_price":`${CanadaDiscountValue == "" ? 0 : CanadaDiscountValue}`,
             "list_price":`${CanadaListPrice == "" ? 0 : CanadaListPrice}`,
             "country_name":"Canada"
            },
            {
             "discount":`${ChileDiscountPercent == "" ? 0 : ChileDiscountPercent}`,
             "discount_amount":`${ChileDiscountAmount == "" ? 0 : ChileDiscountAmount}`,
             "discount_price":`${ChileDiscountValue == "" ? 0 : ChileDiscountValue}`,
             "list_price":`${ChileListPrice == "" ? 0 : ChileListPrice}`,
             "country_name":"Chile"
            },
            {
             "discount":`${ColumbiaDiscountPercent == "" ? 0 : ColumbiaDiscountPercent}`,
             "discount_amount":`${ColumbiaDiscountAmount == "" ? 0 : ColumbiaDiscountAmount}`,
             "discount_price":`${ColumbiaDiscountValue == "" ? 0 : ColumbiaDiscountValue}`,
             "list_price":`${ColumbiaListPrice == "" ? 0 : ColumbiaListPrice}`,
             "country_name":"Colombia"
            },
            {
             "discount":`${EgyptDiscountPercent == "" ? 0 : EgyptDiscountPercent}`,
             "discount_amount":`${EgyptDiscountAmount == "" ? 0 : EgyptDiscountAmount}`,
             "discount_price":`${EgyptDiscountValue == "" ? 0 : EgyptDiscountValue}`,
             "list_price":`${EgyptListPrice == "" ? 0 : EgyptListPrice}`,
             "country_name":"Egypt"
            },
            {
             "discount":`${EUDiscountPercent == "" ? 0 : EUDiscountPercent}`,
             "discount_amount":`${EUDiscountAmount == "" ? 0 : EUDiscountAmount}`,
             "discount_price":`${EUDiscountValue == "" ? 0 : EUDiscountValue}`,
             "list_price":`${EUListPrice == "" ? 0 : EUListPrice}`,
             "country_name":"European Union"
            },
            {
             "discount":`${GBPDiscountPercent == "" ? 0 : GBPDiscountPercent}`,
             "discount_amount":`${GBPDiscountAmount == "" ? 0 : GBPDiscountAmount}`,
             "discount_price":`${GBPDiscountValue == "" ? 0 : GBPDiscountValue}`,
             "list_price":`${GBPListPrice == ""? 0 : GBPListPrice}`,
             "country_name":"United Kingdom"
            },
            {
             "discount":`${IndonesiaDiscountPercent == "" ? 0 : IndonesiaDiscountPercent}`,
             "discount_amount":`${IndonesiaDiscountAmount == "" ? 0 : IndonesiaDiscountAmount}`,
             "discount_price":`${IndonesiaDiscountValue == "" ? 0 : IndonesiaDiscountValue}`,
             "list_price":`${IndonesiaListPrice == "" ? 0 : IndonesiaListPrice}`,
             "country_name":"Indonesia"
            },
            {
             "discount":`${IsrealDiscountPercent == "" ? 0 : IsrealDiscountPercent}`,
             "discount_amount":`${IsrealDiscountAmount == "" ? 0 : IsrealDiscountAmount}`,
             "discount_price":`${IsrealDiscountValue == "" ? 0 : IsrealDiscountValue}`,
             "list_price":`${IsrealListPrice == "" ? 0 : IsrealListPrice}`,
             "country_name":"Israel"
            },
            {
             "discount":`${IndiaDiscountPercent == "" ? 0 : IndiaDiscountPercent}`,
             "discount_amount":`${IndiaDiscountAmount == "" ? 0 : IndiaDiscountAmount}`,
             "discount_price":`${IndiaDiscountValue == "" ? 0 : IndiaDiscountValue}`,
             "list_price":`${IndiaListPrice == "" ? 0 : IndiaListPrice}`,
             "country_name":"India"
            },
            {
             "discount":`${JapanDiscountPercent == "" ? 0 : JapanDiscountPercent}`,
             "discount_amount":`${JapanDiscountAmount == "" ? 0 : JapanDiscountAmount}`,
             "discount_price":`${JapanDiscountValue == "" ? 0 : JapanDiscountValue}`,
             "list_price":`${JapanListPrice == "" ? 0 : JapanListPrice}`,
             "country_name":"Japan"
            },
            {
             "discount":`${SKDiscountPercent == "" ? 0 : SKDiscountPercent}`,
             "discount_amount":`${SKDiscountAmount == "" ? 0 : SKDiscountAmount}`,
             "discount_price":`${SKDiscountValue == "" ? 0 : SKDiscountValue}`,
             "list_price":`${SKListPrice == "" ? 0 : SKListPrice}`,
             "country_name":"South Korea"
            },
            {
             "discount":`${MexicoDicountPercent == "" ? 0 : MexicoDicountPercent}`,
             "discount_amount":`${MexicoDisountAmount == "" ? 0: MexicoDisountAmount}`,
             "discount_price":`${MexicoDiscountValue == "" ? 0 : MexicoDiscountValue}`,
             "list_price":`${MexicoListPrice == "" ? 0 : MexicoListPrice}`,
             "country_name":"Mexico"
            },
            {
             "discount":`${MalaysiaDiscountPercent == "" ? 0 : MalaysiaDiscountPercent}`,
             "discount_amount":`${MalaysiaDiscountAmount == "" ? 0: MalaysiaDiscountAmount}`,
             "discount_price":`${MalaysiaDiscountValue == "" ? 0 : MalaysiaDiscountValue}`,
             "list_price":`${MalaysiaListPrice == "" ? 0 : MalaysiaListPrice}`,
             "country_name":"Malaysia"
            },
            {
             "discount":`${NigeriaDiscountPercent == "" ? 0 : NigeriaDiscountPercent}`,
             "discount_amount":`${NigeriaDiscountAmount == "" ? 0 : NigeriaDiscountAmount}`,
             "discount_price":`${NigeriaDiscountValue == "" ? 0 : NigeriaDiscountValue}`,
             "list_price":`${NigeriaListPrice == "" ? 0 : NigeriaListPrice}`,
             "country_name":"Nigeria"
            },
            {
             "discount":`${NorwayDiscountPercent == "" ? 0 : NorwayDiscountPercent}`,
             "discount_amount":`${NorwayDiscountAmount == "" ? 0 : NorwayDiscountAmount}`,
             "discount_price":`${NorwayDiscountValue == "" ? 0 : NorwayDiscountValue}`,
             "list_price":`${NorwayListPrice == "" ? 0 : NorwayListPrice}`,
             "country_name":"Norway"
            },
            {
             "discount":`${PeruDiscountPercent == "" ? 0 : PeruDiscountPercent}`,
             "discount_amount":`${PeruDiscountAmount == "" ? 0 : PeruDiscountAmount}`,
             "discount_price":`${PeruDiscountValue == "" ? 0 : PeruDiscountValue}`,
             "list_price":`${PeruListPrice == "" ? 0 : PeruListPrice}`,
             "country_name":"Peru"
            },
            {
             "discount":`${PhilipinesDiscountPercent == "" ? 0 : PhilipinesDiscountPercent}`,
             "discount_amount":`${PhilipinesAmount == "" ? 0 : PhilipinesAmount}`,
             "discount_price":`${PhiliphinesDiscountValue == "" ? 0 : PhiliphinesDiscountValue}`,
             "list_price":`${PhilipinesListPrice == "" ? 0 : PhilipinesListPrice}`,
             "country_name":"Philippines"
            },
            {
             "discount":`${PolandDiscountPercent == "" ? 0 : PolandDiscountPercent}`,
             "discount_amount":`${PolandDiscountAmount == "" ? 0 : PolandDiscountAmount}`,
             "discount_price":`${PolandDiscountValue == "" ? 0 : PolandDiscountValue}`,
             "list_price":`${PolandListPrice == "" ? 0 : PolandListPrice}`,
             "country_name":"Poland"
            },
            {
             "discount":`${RomaniaDiscountPercent == "" ? 0 : RomaniaDiscountPercent}`,
             "discount_amount":`${RomaniaDiscountAmount == "" ? 0 : RomaniaDiscountAmount}`,
             "discount_price":`${RomaniaDiscountValue == "" ? 0 : RomaniaDiscountValue}`,
             "list_price":`${RomaniaListPrice == "" ? 0 : RomaniaListPrice}`,
             "country_name":"Romania"
            },
            {
             "discount":`${RussiaDiscountPercent == "" ? 0 : RussiaDiscountPercent}`,
             "discount_amount":`${RussiaDiscountAmount == "" ? 0 : RussiaDiscountAmount}`,
             "discount_price":`${RussiaDiscountValue == "" ? 0 : RussiaDiscountValue}`,
             "list_price":`${RussiaListPrice == "" ? 0 : RussiaListPrice}`,
             "country_name":"Russia"
            },
            {
             "discount":`${SingaporeDiscountPercent == "" ? 0 : SingaporeDiscountPercent}`,
             "discount_amount":`${SingaporeDiscountAmount == "" ? 0 : SingaporeDiscountAmount}`,
             "discount_price":`${SingaporeDiscountValue == "" ? 0 : SingaporeDiscountValue}`,
             "list_price":`${SingaporeListPrice == "" ? 0 : SingaporeListPrice}`,
             "country_name":"Singapore"
            },
            {
             "discount":`${ThailandDiscountPercent == "" ? 0 : ThailandDiscountPercent}`,
             "discount_amount":`${ThailandDiscountAmount == "" ? 0 : ThailandDiscountAmount}`,
             "discount_price":`${ThailandDiscountValue == "" ? 0 : ThailandDiscountValue}`,
             "list_price":`${ThailandListPrice == "" ? 0 : ThailandListPrice}`,
             "country_name":"Thailand"
            },
            {
             "discount":`${TurkeyDiscountPercent == "" ? 0 : TurkeyDiscountPercent}`,
             "discount_amount":`${TurkeyDiscountAmount == "" ? 0 : TurkeyDiscountAmount}`,
             "discount_price":`${TurkeyDiscountValue == "" ? 0 : TurkeyDiscountValue}`,
             "list_price":`${TurkeyListPrice == "" ? 0 : TurkeyListPrice}`,
             "country_name":"Turkey"
            },
            {
             "discount":`${TaiwanDiscountPercent == "" ? 0 : TaiwanDiscountPercent}`,
             "discount_amount":`${TaiwanDiscountAmount == "" ? 0 : TaiwanDiscountAmount}`,
             "discount_price":`${TaiwanDiscountValue == "" ? 0 : TaiwanDiscountValue}`,
             "list_price":`${TaiwanListPrice == "" ? 0 : TaiwanListPrice}`,
             "country_name":"Taiwan"
            },
            {
             "discount":`${VietnamDiscountPercent == "" ? 0 : VietnamDiscountPercent}`,
             "discount_amount":`${VietnamDisocuntAmount == "" ? 0 : VietnamDisocuntAmount}`,
             "discount_price":`${VietnamDiscountValue == "" ? 0 : VietnamDiscountValue}`,
             "list_price":`${VietnamListPrice == "" ? 0 : VietnamListPrice}`,
             "country_name":"Vietnam"
            },
            {
             "discount":`${SADiscountPercent == "" ? 0 : SADiscountPercent}`,
             "discount_amount":`${SADiscountAmount == "" ? 0 : SADiscountAmount}`,
             "discount_price":`${SADiscountValue == "" ? 0 : SADiscountValue}`,
             "list_price":`${SAListPrice == "" ? 0 : SAListPrice}`,
             "country_name":"South Africa"
            }
        ]
        }

      
        console.log(raw)
        SaveDiscountDouponsAPI(code,raw,setloading_btn)
       }else{
        ErrorAlert("Error", "Please enter a valid coupon code. It must be between 6-20 characters and may include only UPPERCASE letters (A-Z), numbers (0-9), periods (.), dashes (-), and underscores (_).");
        setloading_btn(false)
       }

 



    }

    const validateCouponCode = (code) => {
   
      
      // Check for allowed characters
      const allowedCharacters = /^[A-Z0-9._-]+$/;
      if (!allowedCharacters.test(code)) {
        return "Coupon code can only contain uppercase letters (A-Z), numbers (0-9), periods (.), dashes (-), and underscores (_).";
      }
      
      return null; // No errors
    };
    
    


    // ------------------ Discount ------------------

    

  const [countriesData, setcountriesData] = useState([])

  const [DGlobalPricing, setDGlobalPricing] = useState("")
  const [DTip, setDTip] = useState("")

  const [DDiscountValue, setDDiscountValue] = useState("")
  const [DDiscountPercent, setDDiscountPercent] = useState("")
  const [DDiscountAmount, setDDiscountAmount] = useState("")

  const [MinDefaultValue, setMinDefaultValue] = useState("")

  const [PriceRangeMinDefault, setPriceRangeMinDefault] = useState("")
  const [PriceRangeMaxDefault, setPriceRangeMaxDefault] = useState("")


  

  useEffect(() => {


 

    // Get The Default Pricing
    GetPriceDefaultCoupon(code,setDGlobalPricing,setPriceRangeMinDefault,setPriceRangeMaxDefault,setMinDefaultValue,setDTip)

    

      GetCountriesDiscountCoupons(code,setcountriesData,
        setUSATip,
        setUSAMinValue,
        setUSAListPrice,
        // -------------
        setAusTip,
        setAusminValue,
        setAusListPrice,
        //  ---------
        setBrazilTip,
        setBrazilminValue,
        setBrazilListPrice,
        // ---------
        setCanadaTip,
        setCanadaminValue,
        setCanadaListPrice,
        // ---------
        setChileTip,
        setChileminValue,
        setChileListPrice,
        // ------------
        setColumbiaTip,
        setColumbiaminValue,
        setColumbiaListPrice,
        // --------
        setEgyptTip,
        setEgyptminValue,
        setEgyptListPrice,
        // ---------
        setEUTip,
        setEUminValue,
        setEUListPrice,
        // ----------
        setGBPTip,
        setGBPminValue,
        setGBPListPrice,
        // -----
        setIndonesiaTip,
        setIndonesiaminValue,
        setIndonesiaListPrice,
        // -------
        setIsrealTip,
        setIsrealminValue,
        setIsrealListPrice,
        // ----------
        setIndiaTip,
        setIndiaminValue,
        setIndiaListPrice,
        // -------
        setJapanTip,
        setJapanminValue,
        setJapanListPrice,
        // --------
        setSKTip,
        setSKminValue,
        setSKListPrice,
        // -------
        setMexicoTip,
        setMexicominValue,
        setMexicoListPrice,
        // ----------
        setMalaysiaTip,
        setMalaysiaminValue,
        setMalaysiaListPrice,
        // ----------
        setNigeriaTip,
        setNigeriaminValue,
        setNigeriaListPrice,
        // ---------
        setNorwayTip,
        setNorwayminValue,
        setNorwayListPrice,
        // ----------
        setPeruTip,
        setPeruminvalue,
        setPeruListPrice,
        // ----------
        setPhilipinesTip,
        setPhilipinesminValue,
        setPhilipinesListPrice,
        // ------------
        setPolandTip,
        setPolandminValue,
        setPolandListPrice,
        // ---------
        setRomaniaTip,
        setRomaniaminvalue,
        setRomaniaListPrice,
        // ----------
        setRussiaTip,
        setRussiaminValue,
        setRussiaListPrice,
        // -------
        setSingaporeTip,
        setSingaporeminValue,
        setSingaporeListPrice,
        // ---------
        setThailandTip,
        setThailandminValue,
        setThailandListPrice,
        // -----------
        setTurkeyTip,
        setTurkeyminValue,
        setTurkeyListPrice,
        // ---------
        setTaiwanTip,
        setTaiwanminValue,
        setTaiwanListPrice,
        // -----------
        setVietnamTip,
        setVietnamminValue,
        setVietnamListPrice,
        // --------------
        setSATip,
        setSAminValue,
        setSAListPrice
        )
 
  }, [code])

 
  



  //  ---------------------


// Enter Global Price
  const handleChangeGlobalPrice = (e) => {

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(DGlobalPricing) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setDDiscountValue(Number.parseFloat(e.target.value))
      setDDiscountPercent((((Number.parseFloat(DGlobalPricing) - Number.parseFloat(e.target.value)) / Number.parseFloat(DGlobalPricing).toFixed(2)) * 100).toFixed(2))
      setDDiscountAmount((Number.parseFloat(DGlobalPricing) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setDDiscountValue("")
      setDDiscountPercent(0)
      setDDiscountAmount(0)
    }

  }



  //  ---------------------


  // LIST COUNTRIES FUNCTIONS
  // LIST PRICE

  // USA
  const [USAListPrice, setUSAListPrice] = useState("")


  const [USADiscountValue, setUSADiscountValue] = useState("")
  const [USADiscountPercent, setUSADiscountPercent] = useState("")
  const [USADiscountAmount, setUSADiscountAmount] = useState("")

  const [USATip, setUSATip] = useState("")
  const [USAMinValue, setUSAMinValue] = useState("")

  // ---------------------

  // Enter Global Price USA
  const handleChangeGlobalPriceUSA = (e) => {

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(USAListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setUSADiscountValue(Number.parseFloat(e.target.value))
      setUSADiscountPercent((((Number.parseFloat(USAListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(USAListPrice).toFixed(2)) * 100).toFixed(2))
      setUSADiscountAmount((Number.parseFloat(USAListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setUSADiscountValue("")
      setUSADiscountPercent(0)
      setUSADiscountAmount(0)
    }
   


  }




  // ---------------------
  
  const [AusListPrice, setAusListPrice] = useState("")
  

  const [AusDiscountValue, setAusDiscountValue] = useState("")
  const [AusDiscountPercent, setAusDiscountPercent] = useState("")
  const [AusDiscountAmount, setAusDiscountAmount] = useState("")

  const [AusTip, setAusTip] = useState("")
  const [AusminValue, setAusminValue] = useState("")



    // ---------------------
 

  // Enter Global Price Aus
  const handleChangeGlobalPriceAus = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(AusListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setAusDiscountValue(Number.parseFloat(e.target.value))
      setAusDiscountPercent((((Number.parseFloat(AusListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(AusListPrice).toFixed(2)) * 100).toFixed(2))
      setAusDiscountAmount((Number.parseFloat(AusListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setAusDiscountValue("")
      setAusDiscountPercent(0)
      setAusDiscountAmount(0)
    }
   



  }




  // ---------------------


  const [BrazilListPrice, setBrazilListPrice] = useState("")
 
  const [BrazilDiscountValue, setBrazilDiscountValue] = useState("")
  const [BrazilDiscountPercent, setBrazilDiscountPercent] = useState("")
  const [BrazilDiscountAmount, setBrazilDiscountAmount] = useState("")

  const [BrazilTip, setBrazilTip] = useState("")
  const [BrazilminValue, setBrazilminValue] = useState("")



      // ---------------------
  

  // Enter Global Price Brazil
  const handleChangeGlobalPriceBrazil = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(BrazilListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setBrazilDiscountValue(Number.parseFloat(e.target.value))
      setBrazilDiscountPercent((((Number.parseFloat(BrazilListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(BrazilListPrice).toFixed(2)) * 100).toFixed(2))
      setBrazilDiscountAmount((Number.parseFloat(BrazilListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setBrazilDiscountValue("")
      setBrazilDiscountPercent(0)
      setBrazilDiscountAmount(0)
    }
   

  }




  // ---------------------

  const [CanadaListPrice, setCanadaListPrice] = useState("")
 

  const [CanadaDiscountValue, setCanadaDiscountValue] = useState("")
  const [CanadaDiscountPercent, setCanadaDiscountPercent] = useState("")
  const [CanadaDiscountAmount, setCanadaDiscountAmount] = useState("")

  const [CanadaTip, setCanadaTip] = useState("")
  const [CanadaminValue, setCanadaminValue] = useState("")


      // ---------------------
 

  // Enter Global Price Canada
  const handleChangeGlobalPriceCanada = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(CanadaListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setCanadaDiscountValue(Number.parseFloat(e.target.value))
      setCanadaDiscountPercent((((Number.parseFloat(CanadaListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(CanadaListPrice).toFixed(2)) * 100).toFixed(2))
      setCanadaDiscountAmount((Number.parseFloat(CanadaListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setCanadaDiscountValue("")
      setCanadaDiscountPercent(0)
      setCanadaDiscountAmount(0)
    }
   

  }


  


  // ---------------------

  const [ChileListPrice, setChileListPrice] = useState("")
 

  const [ChileDiscountValue, setChileDiscountValue] = useState("")
  const [ChileDiscountPercent, setChileDiscountPercent] = useState("")
  const [ChileDiscountAmount, setChileDiscountAmount] = useState("")

  const [ChileTip, setChileTip] = useState("")
  const [ChileminValue, setChileminValue] = useState("")


   // ---------------------
  

  // Enter Global Price Chile
  const handleChangeGlobalPriceChile = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(ChileListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setChileDiscountValue(Number.parseFloat(e.target.value))
      setChileDiscountPercent((((Number.parseFloat(ChileListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(ChileListPrice).toFixed(2)) * 100).toFixed(2))
      setChileDiscountAmount((Number.parseFloat(ChileListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setChileDiscountValue("")
      setChileDiscountPercent(0)
      setChileDiscountAmount(0)
    }
   

  }


  

  // ---------------------

  const [ColumbiaListPrice, setColumbiaListPrice] = useState("")
 
  const [ColumbiaDiscountValue, setColumbiaDiscountValue] = useState("")
  const [ColumbiaDiscountPercent, setColumbiaDiscountPercent] = useState("")
  const [ColumbiaDiscountAmount, setColumbiaDiscountAmount] = useState("")

  const [ColumbiaTip, setColumbiaTip] = useState("")
  const [ColumbiaminValue, setColumbiaminValue] = useState("")




  // ---------------------
  

  // Enter Global Price Columbia
  const handleChangeGlobalPriceColumbia = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(ColumbiaListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setColumbiaDiscountValue(Number.parseFloat(e.target.value))
      setColumbiaDiscountPercent((((Number.parseFloat(ColumbiaListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(ColumbiaListPrice).toFixed(2)) * 100).toFixed(2))
      setColumbiaDiscountAmount((Number.parseFloat(ColumbiaListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setColumbiaDiscountValue("")
      setColumbiaDiscountPercent(0)
      setColumbiaDiscountAmount(0)
    }
   

  }


  

  // ---------------------

  const [EgyptListPrice, setEgyptListPrice] = useState("")


  const [EgyptDiscountValue, setEgyptDiscountValue] = useState("")
  const [EgyptDiscountPercent, setEgyptDiscountPercent] = useState("")
  const [EgyptDiscountAmount, setEgyptDiscountAmount] = useState("")

  const [EgyptTip, setEgyptTip] = useState("")
  const [EgyptminValue, setEgyptminValue] = useState("")




    // ---------------------


  // Enter Global Price Egypt
  const handleChangeGlobalPriceEgypt = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(EgyptListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setEgyptDiscountValue(Number.parseFloat(e.target.value))
      setEgyptDiscountPercent((((Number.parseFloat(EgyptListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(EgyptListPrice).toFixed(2)) * 100).toFixed(2))
      setEgyptDiscountAmount((Number.parseFloat(EgyptListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setEgyptDiscountValue("")
      setEgyptDiscountPercent(0)
      setEgyptDiscountAmount(0)
    }

  }

   
  

  // ---------------------

  const [EUListPrice, setEUListPrice] = useState("")
  

  const [EUDiscountValue, setEUDiscountValue] = useState("")
  const [EUDiscountPercent, setEUDiscountPercent] = useState("")
  const [EUDiscountAmount, setEUDiscountAmount] = useState("")

  const [EUTip, setEUTip] = useState("")
  const [EUminValue, setEUminValue] = useState("")



      // ---------------------
 

  // Enter Global Price EU
  const handleChangeGlobalPriceEU = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(EUListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setEUDiscountValue(Number.parseFloat(e.target.value))
      setEUDiscountPercent((((Number.parseFloat(EUListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(EUListPrice).toFixed(2)) * 100).toFixed(2))
      setEUDiscountAmount((Number.parseFloat(EUListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setEUDiscountValue("")
      setEUDiscountPercent(0)
      setEUDiscountAmount(0)
    }

  }



  // ---------------------

  const [GBPListPrice, setGBPListPrice] = useState("")
 

  const [GBPDiscountValue, setGBPDiscountValue] = useState("")
  const [GBPDiscountPercent, setGBPDiscountPercent] = useState("")
  const [GBPDiscountAmount, setGBPDiscountAmount] = useState("")

  const [GBPTip, setGBPTip] = useState("")
  const [GBPminValue, setGBPminValue] = useState("")


  // ---------------------
 

  // Enter Global Price GBP
  const handleChangeGlobalPriceGBP = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(GBPListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setGBPDiscountValue(Number.parseFloat(e.target.value))
      setGBPDiscountPercent((((Number.parseFloat(GBPListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(GBPListPrice).toFixed(2)) * 100).toFixed(2))
      setGBPDiscountAmount((Number.parseFloat(GBPListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setGBPDiscountValue("")
      setGBPDiscountPercent(0)
      setGBPDiscountAmount(0)
    }


  }



  // ---------------------

  const [IndonesiaListPrice, setIndonesiaListPrice] = useState("")


  const [IndonesiaDiscountValue, setIndonesiaDiscountValue] = useState("")
  const [IndonesiaDiscountPercent, setIndonesiaDiscountPercent] = useState("")
  const [IndonesiaDiscountAmount, setIndonesiaDiscountAmount] = useState("")

  const [IndonesiaTip, setIndonesiaTip] = useState("")
  const [IndonesiaminValue, setIndonesiaminValue] = useState("")


    // ---------------------
  

  // Enter Global Price Indo
  const handleChangeGlobalPriceIndo = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(IndonesiaListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setIndonesiaDiscountValue(Number.parseFloat(e.target.value))
      setIndonesiaDiscountPercent((((Number.parseFloat(IndonesiaListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(IndonesiaListPrice).toFixed(2)) * 100).toFixed(2))
      setIndonesiaDiscountAmount((Number.parseFloat(IndonesiaListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setIndonesiaDiscountValue("")
      setIndonesiaDiscountPercent(0)
      setIndonesiaDiscountAmount(0)
    }

  }


  

  // ---------------------

  const [IsrealListPrice, setIsrealListPrice] = useState("")


  const [IsrealDiscountValue, setIsrealDiscountValue] = useState("")
  const [IsrealDiscountPercent, setIsrealDiscountPercent] = useState("")
  const [IsrealDiscountAmount, setIsrealDiscountAmount] = useState("")

  const [IsrealTip, setIsrealTip] = useState("")
  const [IsrealminValue, setIsrealminValue] = useState("")


      // ---------------------
 

  // Enter Global Price Isreal
  const handleChangeGlobalPriceIsreal = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(IsrealListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setIsrealDiscountValue(Number.parseFloat(e.target.value))
      setIsrealDiscountPercent((((Number.parseFloat(IsrealListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(IsrealListPrice).toFixed(2)) * 100).toFixed(2))
      setIsrealDiscountAmount((Number.parseFloat(IsrealListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setIsrealDiscountValue("")
      setIsrealDiscountPercent(0)
      setIsrealDiscountAmount(0)
    }

  }

 
  

  // ---------------------

  const [IndiaListPrice, setIndiaListPrice] = useState("")


  const [IndiaDiscountValue, setIndiaDiscountValue] = useState("")
  const [IndiaDiscountPercent, setIndiaDiscountPercent] = useState("")
  const [IndiaDiscountAmount, setIndiaDiscountAmount] = useState("")

  const [IndiaTip, setIndiaTip] = useState("")
  const [IndiaminValue, setIndiaminValue] = useState("")


        // ---------------------
 

  // Enter Global Price India
  const handleChangeGlobalPriceIndia = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(IndiaListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setIndiaDiscountValue(Number.parseFloat(e.target.value))
      setIndiaDiscountPercent((((Number.parseFloat(IndiaListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(IndiaListPrice).toFixed(2)) * 100).toFixed(2))
      setIndiaDiscountAmount((Number.parseFloat(IndiaListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setIndiaDiscountValue("")
      setIndiaDiscountPercent(0)
      setIndiaDiscountAmount(0)
    }

  }



    // -------------------

  const [JapanListPrice, setJapanListPrice] = useState("")


  const [JapanDiscountValue, setJapanDiscountValue] = useState("")
  const [JapanDiscountPercent, setJapanDiscountPercent] = useState("")
  const [JapanDiscountAmount, setJapanDiscountAmount] = useState("")

  const [JapanTip, setJapanTip] = useState("")
  const [JapanminValue, setJapanminValue] = useState("")


          // ---------------------
 

  // Enter Global Price Japan
  const handleChangeGlobalPriceJapan = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseInt(JapanListPrice) < Number.parseInt(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setJapanDiscountValue(Number.parseInt(e.target.value))
      setJapanDiscountPercent((((Number.parseInt(JapanListPrice) - Number.parseInt(e.target.value)) / Number.parseInt(JapanListPrice)) * 100))
      setJapanDiscountAmount((Number.parseInt(JapanListPrice) - Number.parseInt(e.target.value)))
    }else if(e.target.value == ""){
      setJapanDiscountValue("")
      setJapanDiscountPercent(0)
      setJapanDiscountAmount(0)
    }

  }

 

    // -------------------

  const [SKListPrice, setSKListPrice] = useState("")

  const [SKDiscountValue, setSKDiscountValue] = useState("")
  const [SKDiscountPercent, setSKDiscountPercent] = useState("")
  const [SKDiscountAmount, setSKDiscountAmount] = useState("")

  const [SKTip, setSKTip] = useState("")
  const [SKminValue, setSKminValue] = useState("")


           // ---------------------

  // Enter Global Price SK
  const handleChangeGlobalPriceSK = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(SKListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setSKDiscountValue(Number.parseFloat(e.target.value))
      setSKDiscountPercent((((Number.parseFloat(SKListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(SKListPrice).toFixed(2)) * 100).toFixed(2))
      setSKDiscountAmount((Number.parseFloat(SKListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setSKDiscountValue("")
      setSKDiscountPercent(0)
      setSKDiscountAmount(0)
    }

  }


    // -------------------

  const [MexicoListPrice, setMexicoListPrice] = useState("")

  const [MexicoDiscountValue, setMexicoDiscountValue] = useState("")
  const [MexicoDicountPercent, setMexicoDicountPercent] = useState("")
  const [MexicoDisountAmount, setMexicoDisountAmount] = useState("")

  const [MexicoTip, setMexicoTip] = useState("")
  const [MexicominValue, setMexicominValue] = useState("")



  // ---------------------
 
  // Enter Global Price Mexico
  const handleChangeGlobalPriceMexico = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(MexicoListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setMexicoDiscountValue(Number.parseFloat(e.target.value))
      setMexicoDicountPercent((((Number.parseFloat(MexicoListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(MexicoListPrice).toFixed(2)) * 100).toFixed(2))
      setMexicoDisountAmount((Number.parseFloat(MexicoListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setMexicoDiscountValue("")
      setMexicoDicountPercent(0)
      setMexicoDisountAmount(0)
    }


  }

    

    // -------------------

  const [MalaysiaListPrice, setMalaysiaListPrice] = useState("")
 

  const [MalaysiaDiscountValue, setMalaysiaDiscountValue] = useState("")
  const [MalaysiaDiscountPercent, setMalaysiaDiscountPercent] = useState("")
  const [MalaysiaDiscountAmount, setMalaysiaDiscountAmount] = useState("")

  const [MalaysiaTip, setMalaysiaTip] = useState("")
  const [MalaysiaminValue, setMalaysiaminValue] = useState("")


               // ---------------------


  // Enter Global Price Malaysia
  const handleChangeGlobalPriceMalaysia = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(MalaysiaListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setMalaysiaDiscountValue(Number.parseFloat(e.target.value))
      setMalaysiaDiscountPercent((((Number.parseFloat(MalaysiaListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(MalaysiaListPrice).toFixed(2)) * 100).toFixed(2))
      setMalaysiaDiscountAmount((Number.parseFloat(MalaysiaListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setMalaysiaDiscountValue("")
      setMalaysiaDiscountPercent(0)
      setMalaysiaDiscountAmount(0)
    }


  }


    // -------------------

  const [NigeriaListPrice, setNigeriaListPrice] = useState("")
 

  const [NigeriaDiscountValue, setNigeriaDiscountValue] = useState("")
  const [NigeriaDiscountPercent, setNigeriaDiscountPercent] = useState("")
  const [NigeriaDiscountAmount, setNigeriaDiscountAmount] = useState("")

  const [NigeriaTip, setNigeriaTip] = useState("")
  const [NigeriaminValue, setNigeriaminValue] = useState("")
  

     // ---------------------


  // Enter Global Price Nigeria
  const handleChangeGlobalPriceNigeria = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(NigeriaListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setNigeriaDiscountValue(Number.parseFloat(e.target.value))
      setNigeriaDiscountPercent((((Number.parseFloat(NigeriaListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(NigeriaListPrice).toFixed(2)) * 100).toFixed(2))
      setNigeriaDiscountAmount((Number.parseFloat(NigeriaListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setNigeriaDiscountValue("")
      setNigeriaDiscountPercent(0)
      setNigeriaDiscountAmount(0)
    }


  }



    // -------------------

  const [NorwayListPrice, setNorwayListPrice] = useState("")


  const [NorwayDiscountValue, setNorwayDiscountValue] = useState("")
  const [NorwayDiscountPercent, setNorwayDiscountPercent] = useState("")
  const [NorwayDiscountAmount, setNorwayDiscountAmount] = useState("")

  const [NorwayTip, setNorwayTip] = useState("")
  const [NorwayminValue, setNorwayminValue] = useState("")



          // ---------------------
 

  // Enter Global Price Norway
  const handleChangeGlobalPriceNorway = (e) => {

    console.log(e.target.value)

    const numberOnlyRegex = /^[0-9]+$/;

    if(Number.parseFloat(NorwayListPrice) < Number.parseFloat(e.target.value)){
      return
    }


    if(numberOnlyRegex.test(e.target.value)){
      setNorwayDiscountValue(Number.parseFloat(e.target.value))
      setNorwayDiscountPercent((((Number.parseFloat(NorwayListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(NorwayListPrice).toFixed(2)) * 100).toFixed(2))
      setNorwayDiscountAmount((Number.parseFloat(NorwayListPrice) - Number.parseFloat(e.target.value)))
    }else if(e.target.value == ""){
      setNorwayDiscountValue("")
      setNorwayDiscountPercent(0)
      setNorwayDiscountAmount(0)
    }

  }



    // -------------------

  const [PeruListPrice, setPeruListPrice] = useState("")


  const [PeruDiscountValue, setPeruDiscountValue] = useState("")
  const [PeruDiscountPercent, setPeruDiscountPercent] = useState("")
  const [PeruDiscountAmount, setPeruDiscountAmount] = useState("")

  const [PeruTip, setPeruTip] = useState("")
  const [Peruminvalue, setPeruminvalue] = useState("")

  
         // ---------------------
   

    // Enter Global Price Peru
    const handleChangeGlobalPricePeru = (e) => {


      console.log(e.target.value)

      const numberOnlyRegex = /^[0-9]+$/;
  
      if(Number.parseFloat(PeruListPrice) < Number.parseFloat(e.target.value)){
        return
      }
  
  
      if(numberOnlyRegex.test(e.target.value)){
        setPeruDiscountValue(Number.parseFloat(e.target.value))
        setPeruDiscountPercent((((Number.parseFloat(PeruListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(PeruListPrice).toFixed(2)) * 100).toFixed(2))
        setPeruDiscountAmount((Number.parseFloat(PeruListPrice) - Number.parseFloat(e.target.value)))
      }else if(e.target.value == ""){
        setPeruDiscountValue("")
        setPeruDiscountPercent(0)
        setPeruDiscountAmount(0)
      }

    }



    // -------------------

  const [PhilipinesListPrice, setPhilipinesListPrice] = useState("")
 

  const [PhiliphinesDiscountValue, setPhiliphinesDiscountValue] = useState("")
  const [PhilipinesDiscountPercent, setPhilipinesDiscountPercent] = useState("")
  const [PhilipinesAmount, setPhilipinesAmount] = useState("")


  const [PhilipinesTip, setPhilipinesTip] = useState("")
  const [PhilipinesminValue, setPhilipinesminValue] = useState("")



          // ---------------------
   

    // Enter Global Price Philipines
    const handleChangeGlobalPricePhilipines = (e) => {

  
      console.log(e.target.value)

      const numberOnlyRegex = /^[0-9]+$/;
  
      if(Number.parseFloat(PhilipinesListPrice) < Number.parseFloat(e.target.value)){
        return
      }
  
  
      if(numberOnlyRegex.test(e.target.value)){
        setPhiliphinesDiscountValue(Number.parseFloat(e.target.value))
        setPhilipinesDiscountPercent((((Number.parseFloat(PhilipinesListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(PhilipinesListPrice).toFixed(2)) * 100).toFixed(2))
        setPhilipinesAmount((Number.parseFloat(PhilipinesListPrice) - Number.parseFloat(e.target.value)))
      }else if(e.target.value == ""){
        setPhiliphinesDiscountValue("")
        setPhilipinesDiscountPercent(0)
        setPhilipinesAmount(0)
      }


    }

    // -------------------

  const [PolandListPrice, setPolandListPrice] = useState("")

  const [PolandDiscountValue, setPolandDiscountValue] = useState("")
  const [PolandDiscountPercent, setPolandDiscountPercent] = useState("")
  const [PolandDiscountAmount, setPolandDiscountAmount] = useState("")


  const [PolandTip, setPolandTip] = useState("")
  const [PolandminValue, setPolandminValue] = useState("")


          // ---------------------
   

    // Enter Global Price Poland
    const handleChangeGlobalPricePoland = (e) => {

      console.log(e.target.value)

      const numberOnlyRegex = /^[0-9]+$/;
  
      if(Number.parseFloat(PolandListPrice) < Number.parseFloat(e.target.value)){
        return
      }
  
  
      if(numberOnlyRegex.test(e.target.value)){
        setPolandDiscountValue(Number.parseFloat(e.target.value))
        setPolandDiscountPercent((((Number.parseFloat(PolandListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(PolandListPrice).toFixed(2)) * 100).toFixed(2))
        setPolandDiscountAmount((Number.parseFloat(PolandListPrice) - Number.parseFloat(e.target.value)))
      }else if(e.target.value == ""){
        setPolandDiscountValue("")
        setPolandDiscountPercent(0)
        setPolandDiscountAmount(0)
      }

    }

    // -------------------


  const [RomaniaListPrice, setRomaniaListPrice] = useState("")


  const [RomaniaDiscountValue, setRomaniaDiscountValue] = useState("")
  const [RomaniaDiscountPercent, setRomaniaDiscountPercent] = useState("")
  const [RomaniaDiscountAmount, setRomaniaDiscountAmount] = useState("")

  const [RomaniaTip, setRomaniaTip] = useState("")
  const [Romaniaminvalue, setRomaniaminvalue] = useState("")


            // ---------------------
  

    // Enter Global Price Romania
    const handleChangeGlobalPriceRomania = (e) => {

      console.log(e.target.value)

      const numberOnlyRegex = /^[0-9]+$/;
  
      if(Number.parseFloat(RomaniaListPrice) < Number.parseFloat(e.target.value)){
        return
      }
  
  
      if(numberOnlyRegex.test(e.target.value)){
        setRomaniaDiscountValue(Number.parseFloat(e.target.value))
        setRomaniaDiscountPercent((((Number.parseFloat(RomaniaListPrice) - Number.parseFloat(e.target.value))/ Number.parseFloat(RomaniaListPrice).toFixed(2)) * 100).toFixed(2))
        setRomaniaDiscountAmount((Number.parseFloat(RomaniaListPrice) - Number.parseFloat(e.target.value)))
      }else if(e.target.value == ""){
        setRomaniaDiscountValue("")
        setRomaniaDiscountPercent(0)
        setRomaniaDiscountAmount(0)
      }

    }



    // -------------------

  const [RussiaListPrice, setRussiaListPrice] = useState("")


  const [RussiaDiscountValue, setRussiaDiscountValue] = useState("")
  const [RussiaDiscountPercent, setRussiaDiscountPercent] = useState("")
  const [RussiaDiscountAmount, setRussiaDiscountAmount] = useState("")

  const [RussiaTip, setRussiaTip] = useState("")
  const [RussiaminValue, setRussiaminValue] = useState("")

          // ---------------------
   

    // Enter Global Price Russia
    const handleChangeGlobalPriceRussia = (e) => {

      console.log(e.target.value)

      const numberOnlyRegex = /^[0-9]+$/;
  
      if(Number.parseFloat(RussiaListPrice) < Number.parseFloat(e.target.value)){
        return
      }
  
  
      if(numberOnlyRegex.test(e.target.value)){
        setRussiaDiscountValue(Number.parseFloat(e.target.value))
        setRussiaDiscountPercent((((Number.parseFloat(RussiaListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(RussiaListPrice).toFixed(2)) * 100).toFixed(2))
        setRussiaDiscountAmount((Number.parseFloat(RussiaListPrice) - Number.parseFloat(e.target.value)))
      }else if(e.target.value == ""){
        setRussiaDiscountValue("")
        setRussiaDiscountPercent(0)
        setRussiaDiscountAmount(0)
      }

    }



    // -------------------

  const [SingaporeListPrice, setSingaporeListPrice] = useState("")
 

  const [SingaporeDiscountValue, setSingaporeDiscountValue] = useState("")
  const [SingaporeDiscountPercent, setSingaporeDiscountPercent] = useState("")
  const [SingaporeDiscountAmount, setSingaporeDiscountAmount] = useState("")

  const [SingaporeTip, setSingaporeTip] = useState("")
  const [SingaporeminValue, setSingaporeminValue] = useState("")

          // ---------------------
 

    // Enter Global Price Singapore
    const handleChangeGlobalPriceSingapore = (e) => {

      console.log(e.target.value)

      const numberOnlyRegex = /^[0-9]+$/;
  
      if(Number.parseFloat(SingaporeListPrice) < Number.parseFloat(e.target.value)){
        return
      }
  
  
      if(numberOnlyRegex.test(e.target.value)){
        setSingaporeDiscountValue(Number.parseFloat(e.target.value))
        setSingaporeDiscountPercent((((Number.parseFloat(SingaporeListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(SingaporeListPrice).toFixed(2)) * 100).toFixed(2))
        setSingaporeDiscountAmount((Number.parseFloat(SingaporeListPrice) - Number.parseFloat(e.target.value)))
      }else if(e.target.value == ""){
        setSingaporeDiscountValue("")
        setSingaporeDiscountPercent(0)
        setSingaporeDiscountAmount(0)
      }

    }

   
    // -------------------

  const [ThailandListPrice, setThailandListPrice] = useState("")
 

  const [ThailandDiscountValue, setThailandDiscountValue] = useState("")
  const [ThailandDiscountPercent, setThailandDiscountPercent] = useState("")
  const [ThailandDiscountAmount, setThailandDiscountAmount] = useState("")

  const [ThailandTip, setThailandTip] = useState("")
  const [ThailandminValue, setThailandminValue] = useState("")

        // ---------------------


    // Enter Global Price Thailand
    const handleChangeGlobalPriceThailand = (e) => {

      console.log(e.target.value)

      const numberOnlyRegex = /^[0-9]+$/;
  
      if(Number.parseFloat(ThailandListPrice) < Number.parseFloat(e.target.value)){
        return
      }
  
  
      if(numberOnlyRegex.test(e.target.value)){
        setThailandDiscountValue(Number.parseFloat(e.target.value))
        setThailandDiscountPercent((((Number.parseFloat(ThailandListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(ThailandListPrice).toFixed(2)) * 100).toFixed(2))
        setThailandDiscountAmount((Number.parseFloat(ThailandListPrice) - Number.parseFloat(e.target.value)))
      }else if(e.target.value == ""){
        setThailandDiscountValue("")
        setThailandDiscountPercent(0)
        setThailandDiscountAmount(0)
      }

    }


    // -------------------

  const [TurkeyListPrice, setTurkeyListPrice] = useState("")


  const [TurkeyDiscountValue, setTurkeyDiscountValue] = useState("")
  const [TurkeyDiscountPercent, setTurkeyDiscountPercent] = useState("")
  const [TurkeyDiscountAmount, setTurkeyDiscountAmount] = useState("")

  const [TurkeyTip, setTurkeyTip] = useState("")
  const [TurkeyminValue, setTurkeyminValue] = useState("")

          // ---------------------
  

    // Enter Global Price Turkey
    const handleChangeGlobalPriceTurkey = (e) => {

      console.log(e.target.value)

      const numberOnlyRegex = /^[0-9]+$/;
  
      if(Number.parseFloat(TurkeyListPrice) < Number.parseFloat(e.target.value)){
        return
      }
  
  
      if(numberOnlyRegex.test(e.target.value)){
        setTurkeyDiscountValue(e.target.value)
        setTurkeyDiscountPercent(((Number.parseFloat(e.target.value).toFixed(2) / Number.parseFloat(TurkeyListPrice).toFixed(2)) * 100).toFixed(2))
        setTurkeyDiscountAmount((Number.parseFloat(TurkeyListPrice) - Number.parseFloat(e.target.value)))
      }else if(e.target.value == ""){
        setTurkeyDiscountValue("")
        setTurkeyDiscountPercent(0)
        setTurkeyDiscountAmount(0)
      }

    }



    // -------------------

  const [TaiwanListPrice, setTaiwanListPrice] = useState("")


  const [TaiwanDiscountValue, setTaiwanDiscountValue] = useState("")
  const [TaiwanDiscountPercent, setTaiwanDiscountPercent] = useState("")
  const [TaiwanDiscountAmount, setTaiwanDiscountAmount] = useState("")

  const [TaiwanTip, setTaiwanTip] = useState("")
  const [TaiwanminValue, setTaiwanminValue] = useState("")


           // ---------------------
   

    // Enter Global Price Taiwan
    const handleChangeGlobalPriceTaiwan = (e) => {

      console.log(e.target.value)

      const numberOnlyRegex = /^[0-9]+$/;
  
      if(Number.parseFloat(TaiwanListPrice) < Number.parseFloat(e.target.value)){
        return
      }
  
  
      if(numberOnlyRegex.test(e.target.value)){
        setTaiwanDiscountValue(Number.parseFloat(e.target.value))
        setTaiwanDiscountPercent((((Number.parseFloat(TaiwanListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(TaiwanListPrice).toFixed(2)) * 100).toFixed(2))
        setTaiwanDiscountAmount((Number.parseFloat(TaiwanListPrice) - Number.parseFloat(e.target.value)))
      }else if(e.target.value == ""){
        setTaiwanDiscountValue("")
        setTaiwanDiscountPercent(0)
        setTaiwanDiscountAmount(0)
      }

    }

  

    // -------------------

  const [VietnamListPrice, setVietnamListPrice] = useState("")


  const [VietnamDiscountValue, setVietnamDiscountValue] = useState("")
  const [VietnamDiscountPercent, setVietnamDiscountPercent] = useState("")
  const [VietnamDisocuntAmount, setVietnamDisocuntAmount] = useState("")

  const [VietnamTip, setVietnamTip] = useState("")
  const [VietnamminValue, setVietnamminValue] = useState("")


        // ---------------------
   

    // Enter Global Price Vietnam
    const handleChangeGlobalPriceVietnam = (e) => {

      console.log(e.target.value)

      const numberOnlyRegex = /^[0-9]+$/;
  
      if(Number.parseFloat(VietnamListPrice) < Number.parseFloat(e.target.value)){
        return
      }
  
  
      if(numberOnlyRegex.test(e.target.value)){
        setVietnamDiscountValue(Number.parseFloat(e.target.value))
        setVietnamDiscountPercent((((Number.parseFloat(VietnamListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(VietnamListPrice).toFixed(2)) * 100).toFixed(2))
        setVietnamDisocuntAmount((Number.parseFloat(VietnamListPrice) - Number.parseFloat(e.target.value)))
      }else if(e.target.value == ""){
        setVietnamDiscountValue("")
        setVietnamDiscountPercent(0)
        setVietnamDisocuntAmount(0)
      }

    }

 

    // -------------------

  const [SAListPrice, setSAListPrice] = useState("")


  const [SADiscountValue, setSADiscountValue] = useState("")
  const [SADiscountPercent, setSADiscountPercent] = useState("")
  const [SADiscountAmount, setSADiscountAmount] = useState("")

  const [SATip, setSATip] = useState("")
  const [SAminValue, setSAminValue] = useState("")

   

    // Enter Global Price SA
    const handleChangeGlobalPriceSA = (e) => {

      console.log(e.target.value)

      const numberOnlyRegex = /^[0-9]+$/;
  
      if(Number.parseFloat(SAListPrice) < Number.parseFloat(e.target.value)){
        return
      }
  
  
      if(numberOnlyRegex.test(e.target.value)){
        setSADiscountValue(Number.parseFloat(e.target.value))
        setSADiscountPercent((((Number.parseFloat(SAListPrice) - Number.parseFloat(e.target.value)) / Number.parseFloat(SAListPrice).toFixed(2)) * 100).toFixed(2))
        setSADiscountAmount((Number.parseFloat(SAListPrice) - Number.parseFloat(e.target.value)))
      }else if(e.target.value == ""){
        setSADiscountValue("")
        setSADiscountPercent(0)
        setSADiscountAmount(0)
      }

    }


    // -------------------

    useEffect(() => {
      console.log(selectedValue)
    }, [selectedValue])
    




  return (
    <div className='col-md-8'>
    <Card className="py-2 my-2"> 

    <h5 className='p-2'><b>Create new Coupon</b></h5>

    <div className='row'>

        <div className='col-md-6'>
        <Card className='border border-dark border-3 h-100'>
            <Radio
                checked={selectedValue == 'free-coupon'}
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
                checked={selectedValue == 'discount-coupon'}
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
          <h6><b>Start date (DD-MM-YYYY):</b></h6>
          <DatePicker
            format="DD-MM-YYYY"
            size="large"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>

        <div className='mb-3'>
          <h6><b>End date (DD-MM-YYYY):</b></h6>
          <DatePicker
            format="DD-MM-YYYY"
            size="large"
            value={endDate}
            disabled
          />
        </div>
      </div>

      <Form.Group className='d-flex' controlId="exampleForm.ControlInput1">
        <Form.Label><b>Enter coupon code (optional)</b></Form.Label>
        <Form.Control
          value={couponCodeFree}
          onChange={(e) => setcouponCodeFree(e.target.value.toUpperCase())}
          type="text"
          placeholder="Enter Coupon"
        />
      </Form.Group>

      <p>
        The coupon code must be between 6 - 20 characters, only UPPERCASE LETTERS (A-Z), numbers (0-9) and these symbols can be used: periods (.), dashes (-), and underscores (_). Coupon codes with lowercase or other symbols cannot be created. A coupon code can only be used once per course.
      </p>

      <div className='my-2'>
        {loading_btn
          ? <Button variant='contained' disabled>Loading...</Button>
          : <Button onClick={handleFreeCouponCreate} variant='contained'>Create Coupon</Button>
        }
      </div>
    </div>
    )}


    {selectedValue == "discount-coupon" && (
        <div className='container'>

<div className='row my-5'>
        <div className='mb-3'>
          <h6><b>Start date (DD-MM-YYYY):</b></h6>
          <DatePicker
            format="DD-MM-YYYY"
            size="large"
            value={moment(startDateDiscount, 'DD-MM-YYYY')}
            onChange={handleStartDateChangeDiscount}
          />
        </div>

        <div className='mb-3'>
          <h6><b>End date (DD-MM-YYYY):</b></h6>
          <DatePicker
            format="DD-MM-YYYY"
            size="large"
            value={moment(endDateDiscount, 'DD-MM-YYYY')}
            disabled
          />
        </div>
      </div>

 
     

        
        <Form.Group className='d-flex'  controlId="exampleForm.ControlInput1">
            <Form.Label><b>Enter coupon code (Optional):</b></Form.Label>
            <Form.Control value={couponCodeDiscount} onChange={(e) => setcouponCodeDiscount(e.target.value.toUpperCase())} type="text" placeholder="Enter Coupon" />
        </Form.Group>
  
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


            <div className="row border border-dark p-2">
                <p className='my-3'><b>Enter Global Discount Price (required):</b></p>
              
              <div className="price-range col-md-3">
                <Form.Label className="pricing-label"><b>Global List Price (USD)</b></Form.Label>
                  <InputGroup>
                    <InputGroup.Text id="basic-addon1">$</InputGroup.Text>
                    <Form.Control
                    value={FormatNumbers(DGlobalPricing)}
                    disabled readOnly
                      placeholder="USD"
                      aria-label="USD"
                      aria-describedby="basic-addon1"
                    />
                  </InputGroup>
                  <Form.Label style={{fontSize:'13px',whiteSpace:'nowrap'}}><i>Price range: ${FormatNumbers(PriceRangeMinDefault)} – ${FormatNumbers(PriceRangeMaxDefault)}</i></Form.Label>
              </div>

              <div className="col-md-3">

              <Form.Label className="pricing-label"><b>Discount Amount (USD)</b></Form.Label>
                  <Form.Control
                    disabled
                    readOnly
                    value={DDiscountAmount}
                    type="text"
                  />
               
            


              <Form.Label style={{fontSize: '13px', whiteSpace: 'nowrap'}}>
                    <i>Tip: Pricing around ${parseFloat(DTip).toFixed(2)} may optimise sales</i>
                </Form.Label>

              </div>

              
               
                <div className="col-md-2">
                <Form.Label className="pricing-label"><b>Discount %</b></Form.Label>
                <Form.Control disabled readOnly value={DDiscountPercent}  type="text" />
                </div>
               

                <div className="col-md-3">

                <Form.Label className="pricing-label"><b>Global Discounted Price (USD)</b></Form.Label>
                <Form.Control 
                isInvalid={DDiscountValue != 0 && DDiscountValue < parseFloat(MinDefaultValue).toFixed(2)} 
                onChange={handleChangeGlobalPrice} 
                value={DDiscountValue} type="text" />

                <Form.Control.Feedback type="invalid">
                      Not within range
                </Form.Control.Feedback>

                  <Form.Label style={{fontSize: '13px', whiteSpace: 'nowrap'}}>
                    <i>Minimum: ${FormatNumbers(parseFloat(MinDefaultValue).toFixed(2))}</i>
                  </Form.Label>
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

                <th scope="col">Discount Amount</th>
                <th scope="col">Discount %</th>
                <th scope="col">Discounted Price</th>
              
               
              </tr>
            </thead>

          

            <tbody>

        {/* australia */}
            <tr>
                <td>Australia
                <td className="col-12 font-italic mt-5">  
                    <Form.Label className="mt-3 tit fst-italic">
                        Tip: Pricing around {getSymbolFromCurrency("AUD")}{parseFloat(AusTip).toFixed(2)} may maximise sales.
                    </Form.Label>
                </td>

              </td>

                <td>AUD</td>
                <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("AUD"))} ${countriesData[1] != null && FormatNumbers(countriesData[1].minPrice)} - ${getSymbolFromCurrency(("AUD"))} ${countriesData[1] != null && FormatNumbers(countriesData[1].maxPrice)}`}</td>
                <td>
                  <Form.Control disabled readOnly value={FormatNumbers(AusListPrice)}  type="text" />
                </td>
                <td>

                <Form.Control 
                  disabled 
                  readOnly 
                  value={AusDiscountAmount} 
                  type="text" 
              />

                </td>
                <td>
              
                <Form.Control disabled readOnly value={AusDiscountPercent}  type="text" />
                </td>
                <td>

              
                <Form.Control 
                  isInvalid={AusDiscountValue != 0 && AusDiscountValue < parseFloat(AusminValue).toFixed(2)} 
                  value={AusDiscountValue} 
                  onChange={handleChangeGlobalPriceAus} 
                  type="text" />

                  <Form.Control.Feedback type="invalid">
                    Not within range
                  </Form.Control.Feedback>

              <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                  Minimum: {getSymbolFromCurrency("AUD")} {FormatNumbers(parseFloat(AusminValue).toFixed(2))}
              </Form.Label>
          </td>


                      
                        
                        </tr>

                  
              {/* Brazil */}
              <tr>
                      <td>Brazil
                      <td className="col-12 font-italic mt-5">  
                        <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("BRL")}{parseFloat(BrazilTip).toFixed(2)} may maximise sales.
                        </Form.Label>
                    </td>

                    </td>

                      <td>BRL</td>
                      <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("BRL"))} ${countriesData[2] != null && FormatNumbers(countriesData[2].minPrice)} - ${getSymbolFromCurrency(("BRL"))} ${countriesData[2] != null && FormatNumbers(countriesData[2].maxPrice)}`}</td>
                      <td>
                        <Form.Control disabled readOnly value={FormatNumbers(BrazilListPrice)}  type="text" />
                      </td>
                      <td>

                      <Form.Control
                      disabled
                      readOnly
                      value={BrazilDiscountAmount}
                      type="text"
                    />


                      </td>
                      <td>
                          <Form.Control disabled readOnly value={BrazilDiscountPercent}  type="text" />
                          
                      </td>
                      <td>


                      <Form.Control 
                      isInvalid={BrazilDiscountValue != 0 && BrazilDiscountValue < parseFloat(BrazilminValue).toFixed(2)}
                      value={BrazilDiscountValue} 
                      onChange={handleChangeGlobalPriceBrazil} 
                      type="text" />

                      <Form.Control.Feedback type="invalid">
                      Not within range
                      </Form.Control.Feedback>

              

                    <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                      Minimum: {getSymbolFromCurrency("BRL")} {FormatNumbers(parseFloat(BrazilminValue).toFixed(2))}
                    </Form.Label>
                  </td>


                    
                    
                    </tr>

                    
              {/* canada */}
              <tr>
                    <td>Canada
                    <td className="col-12 font-italic mt-5">  
                      <Form.Label className="mt-3 tit fst-italic">
                          Tip: Pricing around {getSymbolFromCurrency("CAD")}{parseFloat(CanadaTip).toFixed(2)} may maximise sales.
                      </Form.Label>
                  </td>

                  </td>

                    <td>CAD</td>
                    <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("CAD"))} ${countriesData[3] != null && FormatNumbers(countriesData[3].minPrice)} - ${getSymbolFromCurrency(("CAD"))} ${countriesData[3] != null && FormatNumbers(countriesData[3].maxPrice)}`}</td>
                    <td>
                      <Form.Control disabled readOnly value={FormatNumbers(CanadaListPrice)}  type="text" />
                    </td>
                    <td>

                    <Form.Control
                    disabled
                    readOnly
                    value={CanadaDiscountAmount}
                    type="text"
                  />

                  


                    </td>
                    <td>
                  
                    <Form.Control disabled readOnly value={CanadaDiscountPercent}  type="text" />
                      
                    </td>

                    <td>

                    <Form.Control 
                      isInvalid={CanadaDiscountValue != 0 && CanadaDiscountValue < parseFloat(CanadaminValue).toFixed(2)}
                      value={CanadaDiscountValue} onChange={handleChangeGlobalPriceCanada} type="text" />

                      <Form.Control.Feedback type="invalid">
                      Not within range
                      </Form.Control.Feedback>
                
          
                  
                  <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                    Minimum: {getSymbolFromCurrency("CAD")} {FormatNumbers(parseFloat(CanadaminValue).toFixed(2))}
                  </Form.Label>
                </td>


                  
                  
                  </tr>


            {/* chile */}
            <tr>
              <td>Chile
              <td className="col-12 font-italic mt-5">  
            <Form.Label className="mt-3 tit fst-italic">
                Tip: Pricing around {getSymbolFromCurrency("CLP")}{parseFloat(ChileTip).toFixed(2)} may maximise sales.
            </Form.Label>
        </td>

            </td>

              <td>CLP</td>
              <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("CLP"))} ${countriesData[4] != null && FormatNumbers(countriesData[4].minPrice)} - ${getSymbolFromCurrency(("CLP"))} ${countriesData[4] != null && FormatNumbers(countriesData[4].maxPrice)}`}</td>
              <td>
                <Form.Control disabled readOnly value={FormatNumbers(ChileListPrice)}  type="text" />
              </td>
              <td>


              <Form.Control
              disabled
              readOnly
              value={ChileDiscountAmount}
              type="text"
            />
          

              </td>
              <td>
                  <Form.Control disabled readOnly value={ChileDiscountPercent}  type="text" />
              </td>
              <td>

              <Form.Control
          isInvalid={ChileDiscountValue != 0 && ChileDiscountValue < parseFloat(ChileminValue).toFixed(2)}
          value={ChileDiscountValue} onChange={handleChangeGlobalPriceChile} type="text" />

          <Form.Control.Feedback type="invalid">
          Not within range
          </Form.Control.Feedback>
            

            <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
              Minimum: {getSymbolFromCurrency("CLP")} {FormatNumbers(parseFloat(ChileminValue).toFixed(2))}
            </Form.Label>
          </td>

              
            
            </tr>

            {/* columbia */}
            <tr>
                          <td>Colombia
                          <td className="col-12 font-italic mt-5">  
                          <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("COP")}{parseFloat(ColumbiaTip).toFixed(2)} may maximise sales.
                          </Form.Label>
                      </td>

                        </td>

                          <td>COP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("COP"))} ${countriesData[5] != null && FormatNumbers(countriesData[5].minPrice)} - ${getSymbolFromCurrency(("COP"))} ${countriesData[5] != null && FormatNumbers(countriesData[5].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(ColumbiaListPrice)}  type="text" />
                          </td>
                          <td>

                          <Form.Control
                            
                            disabled
                            readOnly
                            value={ColumbiaDiscountAmount}
                            type="text"
                          />

                          </td>
                          <td>
                              <Form.Control disabled readOnly value={ColumbiaDiscountPercent}  type="text" />
                          </td>
                          <td>
                         
                          <Form.Control 
                              isInvalid={ColumbiaDiscountValue != 0 && ColumbiaDiscountValue < parseFloat(ColumbiaminValue).toFixed(2)}
                              value={ColumbiaDiscountValue} onChange={handleChangeGlobalPriceColumbia} type="text" />

                              <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>

                          <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                            Minimum: {getSymbolFromCurrency("COP")} {FormatNumbers(parseFloat(ColumbiaminValue).toFixed(2))}
                          </Form.Label>
                        </td>


                     
                        
                        </tr>


                {/* egypt */}
                <tr>
                          <td>Egypt
                          <td className="col-12 font-italic mt-5">  
                                <Form.Label className="mt-3 tit fst-italic">
                                    Tip: Pricing around {getSymbolFromCurrency("EGP")}{parseFloat(EgyptTip).toFixed(2)} may maximise sales.
                                </Form.Label>
                            </td>

                        </td>

                          <td>EGP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("EGP"))} ${countriesData[6] != null && FormatNumbers(countriesData[6].minPrice)} - ${getSymbolFromCurrency(("EGP"))} ${countriesData[6] != null && FormatNumbers(countriesData[6].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(EgyptListPrice)}  type="text" />
                          </td>
                          <td>
                       
                          <Form.Control
                          disabled
                          readOnly
                          value={EgyptDiscountAmount}
                          type="text"
                        />



                          </td>
                          <td>
                            
                          <Form.Control disabled readOnly value={EgyptDiscountPercent}  type="text" />
                            
                          </td>
                          <td>
                      

                          <Form.Control 
                          isInvalid={EgyptDiscountValue != 0 && EgyptDiscountValue < parseFloat(EgyptminValue).toFixed(2)}
                          value={EgyptDiscountValue} onChange={handleChangeGlobalPriceEgypt} type="text" />

                          <Form.Control.Feedback type="invalid">
                          Not within range
                          </Form.Control.Feedback>



                        <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                          Minimum: {getSymbolFromCurrency("EGP")} {FormatNumbers(parseFloat(EgyptminValue).toFixed(2))}
                        </Form.Label>
                      </td>

                      
                        
                        </tr>

                {/* eu */}
                <tr>
                          <td>European Union
                          <td className="col-12 font-italic mt-5">  
                        <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("EUR")}{parseFloat(EUTip).toFixed(2)} may maximise sales.
                        </Form.Label>
                    </td>

                        </td>

                          <td>EUR</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("EUR"))} ${countriesData[7] != null && FormatNumbers(countriesData[7].minPrice)}  - ${getSymbolFromCurrency(("EUR"))} ${countriesData[7] != null && FormatNumbers(countriesData[7].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(EUListPrice)}  type="text" />
                          </td>
                          <td>
                        

                          <Form.Control
                          
                          disabled
                          readOnly
                          value={EUDiscountAmount}
                          type="text"
                        />
                        


                          </td>
                          <td>
                           
                          <Form.Control disabled readOnly value={EUDiscountPercent} type="text" />
                            
                          </td>
                          <td>

                          <Form.Control
                              isInvalid={EUDiscountValue != 0 && EUDiscountValue < parseFloat(EUminValue).toFixed(2)}
                              value={EUDiscountValue} onChange={handleChangeGlobalPriceEU} type="text" />

                              <Form.Control.Feedback type="invalid">
                              Not within range
                              </Form.Control.Feedback>
                                                    
                       

                        <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                          Minimum: {getSymbolFromCurrency("EUR")} {FormatNumbers(parseFloat(EUminValue).toFixed(2))}
                        </Form.Label>
                      </td>

                       
                        
                        </tr>


                {/* india */}
                <tr>
                          <td>India
                          <td className="col-12 font-italic mt-5">  
                          <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("INR")}{parseFloat(IndiaTip).toFixed(2)} may maximise sales.
                          </Form.Label>
                      </td>

                        </td>

                          <td>INR</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("INR"))} ${countriesData[11] != null && FormatNumbers(countriesData[11].minPrice)} - ${getSymbolFromCurrency(("INR"))} ${countriesData[11] != null && FormatNumbers(countriesData[11].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(IndiaListPrice)}  type="text" />
                          </td>
                          <td>
                    
                          <Form.Control
                          disabled
                          readOnly
                          value={IndiaDiscountAmount}
                          type="text"
                        />



                          </td>
                          <td>
                          
                          <Form.Control disabled readOnly value={IndiaDiscountPercent}  type="text" />
                           
                          </td>
                          <td>
                   
                          <Form.Control 
                            isInvalid={IndiaDiscountValue != 0 && IndiaDiscountValue < parseFloat(IndiaminValue).toFixed(2)}
                            value={IndiaDiscountValue} onChange={handleChangeGlobalPriceIndia} type="text" />

                            <Form.Control.Feedback type="invalid">
                            Not within range
                            </Form.Control.Feedback>
                        

                        <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                          Minimum: {getSymbolFromCurrency("INR")} {FormatNumbers(parseFloat(IndiaminValue).toFixed(2))}
                        </Form.Label>
                      </td>

                    
                        
                        </tr>


                    {/* indonesia */}
                    <tr>
                          <td>Indonesia
                          <td className="col-12 font-italic mt-5">  
                            <Form.Label className="mt-3 tit fst-italic">
                                Tip: Pricing around {getSymbolFromCurrency("IDR")}{parseFloat(IndonesiaTip).toFixed(2)} may maximise sales.
                            </Form.Label>
                        </td>

                        </td>

                          <td>IDR</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("IDR"))} ${countriesData[9] != null && FormatNumbers(countriesData[9].minPrice)} - ${getSymbolFromCurrency(("IDR"))} ${countriesData[9] != null && FormatNumbers(countriesData[9].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(IndonesiaListPrice)} type="text" />
                          </td>
                          <td>
                      

                          <Form.Control
                            disabled
                            readOnly
                            value={IndonesiaDiscountAmount}
                            type="text"
                          />



                          </td>
                          <td>
                           
                          <Form.Control disabled readOnly  value={IndonesiaDiscountPercent}  type="text" />
                            
                          </td>
                          <td>


                          <Form.Control 
                        isInvalid={IndonesiaDiscountValue != 0 && IndonesiaDiscountValue < parseFloat(IndonesiaminValue).toFixed(2)}
                        value={IndonesiaDiscountValue} onChange={handleChangeGlobalPriceIndo} type="text" />

                        <Form.Control.Feedback type="invalid">
                          Not within range
                        </Form.Control.Feedback>
                          
                          
                          <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                            Minimum: {getSymbolFromCurrency("IDR")} {FormatNumbers(parseFloat(IndonesiaminValue).toFixed(2))}
                          </Form.Label>
                        </td>


                        
                        </tr>


                    {/* isreal */}
                    <tr>
                          <td>Israel
                          <td className="col-12 font-italic mt-5">  
                            <Form.Label className="mt-3 tit fst-italic">
                                Tip: Pricing around {getSymbolFromCurrency("ILS")}{parseFloat(IsrealTip).toFixed(2)} may maximise sales.
                            </Form.Label>
                        </td>

                        </td>

                          <td>ILS</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("ILS"))} ${countriesData[10] != null && FormatNumbers(countriesData[10].minPrice)} - ${getSymbolFromCurrency(("ILS"))} ${countriesData[10] != null && FormatNumbers(countriesData[10].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(IsrealListPrice)}  type="text" />
                          </td>
                          <td>
                         
                          <Form.Control
                              
                              disabled
                              readOnly
                              value={IsrealDiscountAmount}
                              type="text"
                            />

                          </td>
                          <td>
                            <Form.Control disabled readOnly value={IsrealDiscountPercent}  type="text" />
                          
                          </td>
                          <td>

                            <Form.Control
                            isInvalid={IsrealDiscountValue != 0 && IsrealDiscountValue < parseFloat(IsrealminValue).toFixed(2)}
                            value={IsrealDiscountValue} onChange={handleChangeGlobalPriceIsreal} type="text" />

                            <Form.Control.Feedback type="invalid">
                                Not within range
                              </Form.Control.Feedback>
                          
                          
                            <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                              Minimum: {getSymbolFromCurrency("ILS")} {FormatNumbers(parseFloat(IsrealminValue).toFixed(2))}
                            </Form.Label>
                          </td>


                     
                        
                        </tr>


                    {/* japan */}
                    <tr>
                      <td>Japan
                    <td className="col-12 font-italic mt-5">  
                      <Form.Label  className="mt-3 tit fst-italic"> Tip:  Pricing around {getSymbolFromCurrency(("JPY"))}{JapanTip} may maximise sales.</Form.Label></td>
                    </td>

                      <td>JPY</td>
                      <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("JPY"))} ${countriesData[12] != null && countriesData[12].minPrice} - ${getSymbolFromCurrency(("JPY"))} ${countriesData[12] != null && countriesData[12].maxPrice}`}</td>
                      <td>
                        <Form.Control disabled readOnly value={JapanListPrice}  type="text" />
                      </td>
                      <td>
                  
                      <Form.Control
                    
                    disabled
                    readOnly
                    value={JapanDiscountAmount}
                    type="text"
                  />



                      </td>
                      <td>
                      <Form.Control disabled readOnly value={JapanDiscountPercent}  type="text" />
                        
                      </td>
                      <td>
                      

                      <Form.Control 
                  isInvalid={JapanDiscountValue != 0 && JapanDiscountValue < JapanminValue}
                  value={JapanDiscountValue} onChange={handleChangeGlobalPriceJapan} type="text" />

                  <Form.Control.Feedback type="invalid">
                      Not within range
                    </Form.Control.Feedback>

                      

                        <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                          Minimum: {getSymbolFromCurrency("JPY")} {JapanminValue}
                        </Form.Label>
                      </td>

                  
                    
                    </tr>


                  {/* malaysia */}
                    <tr>
                          <td>Malaysia
                          <td className="col-12 font-italic mt-5">  
                        <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("MYR")}{parseFloat(MalaysiaTip).toFixed(2)} may maximise sales.
                        </Form.Label>
                    </td>

                        </td>

                          <td>MYR</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("MYR"))} ${countriesData[15] != null && FormatNumbers(countriesData[15].minPrice)} - ${getSymbolFromCurrency(("MYR"))} ${countriesData[15] != null && FormatNumbers(countriesData[15].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(MalaysiaListPrice)}  type="text" />
                          </td>
                          <td>
                       
                          <Form.Control
                           
                            disabled
                            readOnly
                            value={MalaysiaDiscountAmount}
                            type="text"
                          />

                          </td>
                          <td>
                          
                          <Form.Control disabled readOnly value={MalaysiaDiscountPercent}  type="text" />
                          
                          </td>
                          <td>
                          
                          <Form.Control 
                            isInvalid={MalaysiaDiscountValue != 0 && MalaysiaDiscountValue < parseFloat(MalaysiaminValue).toFixed(2)}
                            value={MalaysiaDiscountValue} onChange={handleChangeGlobalPriceMalaysia} type="text" />

                            <Form.Control.Feedback type="invalid">
                              Not within range
                            </Form.Control.Feedback>


                          <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                            Minimum: {getSymbolFromCurrency("MYR")} {FormatNumbers(parseFloat(MalaysiaminValue).toFixed(2))}
                          </Form.Label>
                        </td>


                      
                        
                        </tr>

                    {/* mexico */}
                    <tr>
                      <td>Mexico
                      <td className="col-12 font-italic mt-5">  
                      <Form.Label className="mt-3 tit fst-italic">
                          Tip: Pricing around {getSymbolFromCurrency("MXN")}{parseFloat(MexicoTip).toFixed(2)} may maximise sales.
                      </Form.Label>
                  </td>

                    </td>

                      <td>MXN</td>
                      <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("MXN"))} ${countriesData[14] != null && FormatNumbers(countriesData[14].minPrice)} - ${getSymbolFromCurrency(("MXN"))} ${countriesData[14] != null && FormatNumbers(countriesData[14].maxPrice)}`}</td>
                      <td>
                        <Form.Control disabled readOnly value={FormatNumbers(MexicoListPrice)}  type="text" />
                      </td>
                      <td>

                      <Form.Control
                        
                        disabled
                        readOnly
                        value={MexicoDisountAmount}
                        type="text"
                      />

                
                      
                      </td>
                      <td>
                        
                      <Form.Control disabled readOnly value={MexicoDicountPercent}  type="text" />
                      
                      </td>
                      <td>

                      <Form.Control 
                    isInvalid={MexicoDiscountValue != 0 && MexicoDiscountValue < parseFloat(MexicominValue).toFixed(2)}
                      value={MexicoDiscountValue} onChange={handleChangeGlobalPriceMexico} type="text" />

                      <Form.Control.Feedback type="invalid">
                        Not within range
                      </Form.Control.Feedback>
                      

                      <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                        Minimum: {getSymbolFromCurrency("MXN")} {FormatNumbers(parseFloat(MexicominValue).toFixed(2))}
                      </Form.Label>
                    </td>


                    
                    
                    </tr>

                    {/* nigeria */}
                    <tr>
                          <td>Nigeria
                          <td className="col-12 font-italic mt-5">  
                          <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("NGN")}{parseFloat(NigeriaTip).toFixed(2)} may maximise sales.
                          </Form.Label>
                      </td>

                        </td>

                          <td>NGN</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("NGN"))} ${countriesData[15] != null && FormatNumbers(countriesData[16].minPrice)} - ${getSymbolFromCurrency(("NGN"))} ${countriesData[16] != null && FormatNumbers(countriesData[16].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(NigeriaListPrice)}  type="text" />
                          </td>
                          <td>

                          <Form.Control
                        
                        disabled
                        readOnly
                        value={NigeriaDiscountAmount}
                        type="text"
                      />
                     

                          </td>
                          <td>
                          <Form.Control disabled readOnly value={NigeriaDiscountPercent}  type="text" />
                          </td>
                          <td>
                  


                          <Form.Control 
                          isInvalid={NigeriaDiscountValue != 0 && NigeriaDiscountValue < parseFloat(NigeriaminValue).toFixed(2)}
                          onChange={handleChangeGlobalPriceNigeria} value={NigeriaDiscountValue} type="text" />

                          <Form.Control.Feedback type="invalid">
                          Not within range
                          </Form.Control.Feedback>
                     
                      <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                        Minimum: {getSymbolFromCurrency("NGN")} {FormatNumbers(parseFloat(NigeriaminValue).toFixed(2))}
                      </Form.Label>
                    </td>


                        
                        
                        </tr> 

                    {/* norway */}
                    <tr>
                      <td>Norway
                      <td className="col-12 font-italic mt-5">  
                        <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("NOK")}{parseFloat(NorwayTip).toFixed(2)} may maximise sales.
                        </Form.Label>
                    </td>

                    </td>

                      <td>NOK</td>
                      <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("NOK"))} ${countriesData[17] != null && FormatNumbers(countriesData[17].minPrice)} - ${getSymbolFromCurrency(("NOK"))} ${countriesData[17] != null && FormatNumbers(countriesData[17].maxPrice)}`}</td>
                      <td>
                        <Form.Control disabled readOnly value={FormatNumbers(NorwayListPrice)}  type="text" />
                      </td>
                      <td>
                    
                      <Form.Control
                        disabled
                        readOnly
                        value={NorwayDiscountAmount}
                        type="text"
                      />


                      </td>
                      <td>
                        
                      <Form.Control disabled readOnly value={NorwayDiscountPercent}  type="text" />
                        
                      </td>
                      <td>

                      <Form.Control 
                  isInvalid={NorwayDiscountValue != 0 && NorwayDiscountValue < parseFloat(NorwayminValue).toFixed(2)}
                  value={NorwayDiscountValue} onChange={handleChangeGlobalPriceNorway} type="text" />

                  <Form.Control.Feedback type="invalid">
                    Not within range
                  </Form.Control.Feedback>
                    
                      
                      <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                        Minimum: {getSymbolFromCurrency("NOK")} {FormatNumbers(parseFloat(NorwayminValue).toFixed(2))}
                      </Form.Label>
                    </td>

                  
                    
                    </tr>

                    {/* peru */}
                    <tr>
                          <td>Peru
                          <td className="col-12 font-italic mt-5">  
                            <Form.Label className="mt-3 tit fst-italic">
                                Tip: Pricing around {getSymbolFromCurrency("PEN")}{parseFloat(PeruTip).toFixed(2)} may maximise sales.
                            </Form.Label>
                        </td>

                        </td>

                          <td>PEN</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("PEN"))} ${countriesData[18] != null && FormatNumbers(countriesData[18].minPrice)} - ${getSymbolFromCurrency(("PEN"))} ${countriesData[18] != null && FormatNumbers(countriesData[18].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(PeruListPrice)}  type="text" />
                          </td>
                          <td>

                          <Form.Control
                      disabled
                      readOnly
                      value={PeruDiscountAmount}
                      type="text"
                    />
                   

                          </td>
                          <td>
                          

                          <Form.Control disabled readOnly value={PeruDiscountPercent}  type="text" />
                          
                          </td>
                          <td>


                            <Form.Control 
                          isInvalid={PeruDiscountValue != 0 && PeruDiscountValue < parseFloat(Peruminvalue).toFixed(2)}
                          onChange={handleChangeGlobalPricePeru} value={PeruDiscountValue} type="text" />

                          <Form.Control.Feedback type="invalid">
                          Not within range
                          </Form.Control.Feedback>
                    
            
                    <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                      Minimum: {getSymbolFromCurrency("PEN")} {FormatNumbers(parseFloat(Peruminvalue).toFixed(2))}
                    </Form.Label>
                  </td>


                     
                        
                        </tr> 


                    {/* philiphines */}
                    <tr>
                          <td>Philippines
                          <td className="col-12 font-italic mt-5">  
                          <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("PHP")}{parseFloat(PhilipinesTip).toFixed(2)} may maximise sales.
                          </Form.Label>
                      </td>

                        </td>

                          <td>PHP</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("PHP"))} ${countriesData[19] != null && FormatNumbers(countriesData[19].minPrice)} - ${getSymbolFromCurrency(("PHP"))} ${countriesData[19] != null && FormatNumbers(countriesData[19].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(PhilipinesListPrice)}  type="text" />
                          </td>
                          <td>

                          <Form.Control
                          disabled
                          readOnly
                          value={PhilipinesAmount}
                          type="text"
                        />
                        

                          </td>
                          <td>                       
                            <Form.Control disabled readOnly value={PhilipinesDiscountPercent}  type="text" />

                          </td>
                          <td>


                          <Form.Control 
                        isInvalid={PhiliphinesDiscountValue != 0 && PhiliphinesDiscountValue < parseFloat(PhilipinesminValue).toFixed(2)}
                        value={PhiliphinesDiscountValue} onChange={handleChangeGlobalPricePhilipines} type="text" />

                        <Form.Control.Feedback type="invalid">
                        Not within range
                        </Form.Control.Feedback>
                  
                
                    <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                      Minimum: {getSymbolFromCurrency("PHP")} {FormatNumbers(parseFloat(PhilipinesminValue).toFixed(2))}
                    </Form.Label>
                  </td>


                       
                        
                        </tr>


                    {/* poland */}
                    <tr>
                      <td>Poland
                      <td className="col-12 font-italic mt-5">  
                        <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("PLN")}{parseFloat(PolandTip).toFixed(2)} may maximise sales.
                        </Form.Label>
                    </td>

                    </td>

                      <td>PLN</td>
                      <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("PLN"))} ${countriesData[20] != null && FormatNumbers(countriesData[20].minPrice)} - ${getSymbolFromCurrency(("PLN"))} ${countriesData[20] != null && FormatNumbers(countriesData[20].maxPrice)}`}</td>
                      <td>
                        <Form.Control disabled readOnly value={FormatNumbers(PolandListPrice)}  type="text" />
                      </td>
                      <td>
                    

                      <Form.Control
                      disabled
                      readOnly
                      value={PolandDiscountAmount}
                      type="text"
                    />

                      </td>
                      <td>

                      <Form.Control disabled readOnly value={PolandDiscountPercent}  type="text" />
                        
                      </td>
                      <td>

                      <Form.Control 
                    isInvalid={PolandDiscountValue != 0 && PolandDiscountValue < parseFloat(PolandminValue).toFixed(2)}
                    value={PolandDiscountValue} onChange={handleChangeGlobalPricePoland} type="text" />

                    <Form.Control.Feedback type="invalid">
                    Not within range
                    </Form.Control.Feedback>
                
                
                    <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                      Minimum: {getSymbolFromCurrency("PLN")} {FormatNumbers(parseFloat(PolandminValue).toFixed(2))}
                    </Form.Label>
                  </td>

                      
                    
                    </tr> 


                    {/* romania */}
                    <tr>
                          <td>Romania
                          <td className="col-12 font-italic mt-5">  
                              <Form.Label className="mt-3 tit fst-italic">
                                  Tip: Pricing around {getSymbolFromCurrency("RON")}{parseFloat(RomaniaTip).toFixed(2)} may maximise sales.
                              </Form.Label>
                          </td>

                        </td>

                          <td>RON</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("RON"))} ${countriesData[21] != null && FormatNumbers(countriesData[21].minPrice)} - ${getSymbolFromCurrency(("RON"))} ${countriesData[21] != null && FormatNumbers(countriesData[21].maxPrice)}`}</td>
                          <td>
                            <Form.Control value={FormatNumbers(RomaniaListPrice)}  type="text" />
                          </td>
                          <td>
                       

                          <Form.Control
                            
                            disabled
                            readOnly
                            value={RomaniaDiscountAmount}
                            type="text"
                          />




                          </td>
                          <td>
                            
                          <Form.Control disabled readOnly value={RomaniaDiscountPercent}  type="text" />
                           
                          </td>
                          <td>


                            <Form.Control 
                      isInvalid={RomaniaDiscountValue != 0 && RomaniaDiscountValue < parseFloat(Romaniaminvalue).toFixed(2)}
                      value={RomaniaDiscountValue} onChange={handleChangeGlobalPriceRomania} type="text" />

                      <Form.Control.Feedback type="invalid">
                      Not within range
                      </Form.Control.Feedback>
                         
                          
                          <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                            Minimum: {getSymbolFromCurrency("RON")} {FormatNumbers(parseFloat(Romaniaminvalue).toFixed(2))}
                          </Form.Label>
                        </td>


                      
                        
                        </tr> 


                    {/* russia */}
                    <tr>
                          <td>Russia
                          <td className="col-12 font-italic mt-5">  
                      <Form.Label className="mt-3 tit fst-italic">
                          Tip: Pricing around {getSymbolFromCurrency("RUB")}{parseFloat(RussiaTip).toFixed(2)} may maximise sales.
                      </Form.Label>
                  </td>

                        </td>

                          <td>RUB</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("RUB"))} ${countriesData[22] != null && FormatNumbers(countriesData[22].minPrice)} - ${getSymbolFromCurrency(("RUB"))} ${countriesData[22] != null && FormatNumbers(countriesData[22].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(RussiaListPrice)}  type="text" />
                          </td>
                          <td>
                       


                          <Form.Control
                        
                        disabled
                        readOnly
                        value={RussiaDiscountAmount}
                        type="text"
                      />
                     



                          </td>
                          <td>

                          <Form.Control disabled readOnly value={RussiaDiscountPercent}  type="text" />
                            
                          </td>
                          <td>

                          <Form.Control 
                      isInvalid={RussiaDiscountValue != 0 && RussiaDiscountValue < parseFloat(RussiaminValue).toFixed(2)}
                      value={RussiaDiscountValue} onChange={handleChangeGlobalPriceRussia} type="text" />

                      <Form.Control.Feedback type="invalid">
                        Not within range
                      </Form.Control.Feedback>
                   
                      <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                        Minimum: {getSymbolFromCurrency("RUB")} {FormatNumbers(parseFloat(RussiaminValue).toFixed(2))}
                      </Form.Label>
                    </td>


                        
                        
                        </tr>

                  {/* signopre */}
                  <tr>
                          <td>Singapore
                          <td className="col-12 font-italic mt-5">  
                            <Form.Label className="mt-3 tit fst-italic">
                                Tip: Pricing around {getSymbolFromCurrency("SGD")}{parseFloat(SingaporeTip).toFixed(2)} may maximise sales.
                            </Form.Label>
                        </td>

                        </td>

                          <td>SGD</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("SGD"))} ${countriesData[23] != null && FormatNumbers(countriesData[23].minPrice)} - ${getSymbolFromCurrency(("SGD"))} ${countriesData[23] != null && FormatNumbers(countriesData[23].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(SingaporeListPrice)}  type="text" />
                          </td>
                          <td>
                         

                          <Form.Control
                        
                        disabled
                        readOnly
                        value={SingaporeDiscountAmount}
                        type="text"
                      />

                          </td>
                          <td>
                            
                          <Form.Control disabled readOnly value={SingaporeDiscountPercent}  type="text" />
                           
                          </td>
                          <td>


                          <Form.Control 
                    isInvalid={SingaporeDiscountValue != 0 && SingaporeDiscountValue < parseFloat(SingaporeminValue).toFixed(2)}
                    value={SingaporeDiscountValue} onChange={handleChangeGlobalPriceSingapore} type="text" />

                    <Form.Control.Feedback type="invalid">
                    Not within range
                    </Form.Control.Feedback>
                       
                      
                        <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                          Minimum: {getSymbolFromCurrency("SGD")} {FormatNumbers(parseFloat(SingaporeminValue).toFixed(2))}
                        </Form.Label>
                      </td>

                        
                        
                        </tr> 

                  {/* south africa */}
                  <tr>
                    <td>South Africa
                    <td className="col-12 font-italic mt-5">  
                      <Form.Label className="mt-3 tit fst-italic">
                          Tip: Pricing around {getSymbolFromCurrency("KRW")}{parseFloat(SATip).toFixed(2)} may maximise sales.
                      </Form.Label>
                  </td>

                  </td>

                    <td>KRW</td>
                    <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("KRW"))} ${countriesData[28] != null && FormatNumbers(countriesData[28].minPrice)}  - ${getSymbolFromCurrency(("KRW"))} ${countriesData[28] != null && FormatNumbers(countriesData[28].maxPrice)}`}</td>
                    <td>
                      <Form.Control disabled readOnly value={FormatNumbers(SAListPrice)}  type="text" />
                    </td>
                    <td>
                    

                    <Form.Control
                    disabled
                    readOnly
                    value={SADiscountAmount}
                    type="text"
                  />
              

                    </td>
                    <td>
                      
                    <Form.Control disabled readOnly value={SADiscountPercent}  type="text" />
                  
                    </td>
                    <td>


                    <Form.Control 
                  isInvalid={SADiscountValue != 0 && SADiscountValue < parseFloat(SAminValue).toFixed(2)}
                  value={SADiscountValue} onChange={handleChangeGlobalPriceSA} type="text" />

                  <Form.Control.Feedback type="invalid">
                  Not within range
                  </Form.Control.Feedback>
                  
                  <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                    Minimum: {getSymbolFromCurrency("ZAR")} {FormatNumbers(parseFloat(SAminValue).toFixed(2))}
                  </Form.Label>
                </td>


                  
                  </tr> 

                  {/* south korea */}
                  <tr>
                          <td>South Korea
                          <td className="col-12 font-italic mt-5">  
                            <Form.Label className="mt-3 tit fst-italic">
                                Tip: Pricing around {getSymbolFromCurrency("KRW")}{parseFloat(SKTip).toFixed(2)} may maximise sales.
                            </Form.Label>
                        </td>

                        </td>

                          <td>KRW</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("KRW"))} ${countriesData[13] != null && FormatNumbers(countriesData[13].minPrice)} - ${getSymbolFromCurrency(("KRW"))} ${countriesData[13] != null && FormatNumbers(countriesData[13].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(SKListPrice)}  type="text" />
                          </td>
                          <td>

                          <Form.Control
                     
                        disabled
                        readOnly
                        value={SKDiscountAmount}
                        type="text"
                      />
                          

                          </td>
                          <td>
                          <Form.Control disabled readOnly value={SKDiscountPercent}  type="text" />
                              
                          </td>
                          <td>
                          

                          <Form.Control 
                          isInvalid={SKDiscountValue != 0 && SKDiscountValue < parseFloat(SKminValue).toFixed(2)}
                          value={SKDiscountValue} onChange={handleChangeGlobalPriceSK} type="text" />

                          <Form.Control.Feedback type="invalid">
                            Not within range
                          </Form.Control.Feedback>
                        

                          <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                            Minimum: {getSymbolFromCurrency("KRW")} {FormatNumbers(parseFloat(SKminValue).toFixed(2))}
                          </Form.Label>
                        </td>


                       
                        
                        </tr>

                  {/* taiwan */}
                  <tr>
                          <td>Taiwan
                          <td className="col-12 font-italic mt-5">  
                            <Form.Label className="mt-3 tit fst-italic">
                                Tip: Pricing around {getSymbolFromCurrency("TWD")}{parseFloat(TaiwanTip).toFixed(2)} may maximise sales.
                            </Form.Label>
                        </td>

                        </td>

                          <td>TWD</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("TWD"))} ${countriesData[26] != null && FormatNumbers(countriesData[26].minPrice)} - ${getSymbolFromCurrency(("TWD"))} ${countriesData[26] != null && FormatNumbers(countriesData[26].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(TaiwanListPrice)}  type="text" />
                          </td>
                          <td>
                        

                          <Form.Control
                            
                            disabled
                            readOnly
                            value={TaiwanDiscountAmount}
                            type="text"
                          />


                          </td>
                          <td>
                            
                          <Form.Control disabled readOnly value={TaiwanDiscountPercent}  type="text" />
                           
                          </td>
                          <td>

                          <Form.Control 
                      isInvalid={TaiwanDiscountValue != 0 && TaiwanDiscountValue < parseFloat(TaiwanminValue).toFixed(2)}
                      onChange={handleChangeGlobalPriceTaiwan} value={TaiwanDiscountValue} type="text" />

                      <Form.Control.Feedback type="invalid">
                        Not within range
                      </Form.Control.Feedback>
                    
                          
                          <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                            Minimum: {getSymbolFromCurrency("TWD")} {FormatNumbers(parseFloat(TaiwanminValue).toFixed(2))}
                          </Form.Label>
                        </td>

                        
                        
                        </tr>


                  {/* thailand */}
                  <tr>
                        <td>Thailand
                        <td className="col-12 font-italic mt-5">  
                      <Form.Label className="mt-3 tit fst-italic">
                          Tip: Pricing around {getSymbolFromCurrency("THB")}{parseFloat(ThailandTip).toFixed(2)} may maximise sales.
                      </Form.Label>
                  </td>

                      </td>

                        <td>THB</td>
                        <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("THB"))} ${countriesData[24] != null && FormatNumbers(countriesData[24].minPrice)} - ${getSymbolFromCurrency(("THB"))} ${countriesData[24] != null && FormatNumbers(countriesData[24].maxPrice)}`}</td>
                        <td>
                          <Form.Control disabled readOnly value={FormatNumbers(ThailandListPrice)}  type="text" />
                        </td>
                        <td>
                    
                        <Form.Control
                        
                        disabled
                        readOnly
                        value={ThailandDiscountAmount}
                        type="text"
                      />


                        </td>
                        <td>
                          
                        <Form.Control disabled readOnly value={ThailandDiscountPercent}  type="text" />
                          
                        </td>
                        <td>
                      

                        <Form.Control 
                    isInvalid={ThailandDiscountValue != 0 && ThailandDiscountValue < parseFloat(ThailandminValue).toFixed(2)}
                    value={ThailandDiscountValue} onChange={handleChangeGlobalPriceThailand} type="text" />

                    <Form.Control.Feedback type="invalid">
                    Not within range
                    </Form.Control.Feedback>
                    
                      <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                        Minimum: {getSymbolFromCurrency("THB")} {FormatNumbers(parseFloat(ThailandminValue).toFixed(2))}
                      </Form.Label>
                    </td>


                      
                      
                      </tr> 

                  {/* uk */}
                  <tr>
                      <td>United Kingdom
                      <td className="col-12 font-italic mt-5">  
                          <Form.Label className="mt-3 tit fst-italic">
                              Tip: Pricing around {getSymbolFromCurrency("GBP")}{parseFloat(GBPTip).toFixed(2)} may maximise sales.
                          </Form.Label>
                      </td>

                    </td>

                      <td>GBP</td>
                      <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("GBP"))} ${countriesData[8] != null && FormatNumbers(countriesData[8].minPrice)} - ${getSymbolFromCurrency(("GBP"))} ${countriesData[8] != null && FormatNumbers(countriesData[8].maxPrice)}`}</td>
                      <td>
                        <Form.Control disabled readOnly value={FormatNumbers(GBPListPrice)}  type="text" />
                      </td>
                      <td>


                      <Form.Control
                      disabled
                      readOnly
                      value={GBPDiscountAmount}
                      type="text"
                    />

                      

                      </td>
                      <td>
                    
                      <Form.Control disabled readOnly value={GBPDiscountPercent}  type="text" />
                        
                      </td>
                      <td>

                      <Form.Control 
                      isInvalid={GBPDiscountValue != 0 && GBPDiscountValue < parseFloat(GBPminValue).toFixed(2)}
                      value={GBPDiscountValue} onChange={handleChangeGlobalPriceGBP} type="text" />
                      <Form.Control.Feedback type="invalid">
                      Not within range
                      </Form.Control.Feedback>
                    

                    <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                      Minimum: {getSymbolFromCurrency("GBP")} {FormatNumbers(parseFloat(GBPminValue).toFixed(2))}
                    </Form.Label>
                  </td>


                      
                    
                    </tr>


              {/* usa */}
                  <tr>
                    <td >United States
                    <td className="col-12 font-italic mt-5">  
                      <Form.Label className="mt-3 tit fst-italic">
                          Tip: Pricing around {getSymbolFromCurrency("USD")}{parseFloat(USATip).toFixed(2)} may maximise sales.
                      </Form.Label>
                  </td>

                  </td>
                  
                    <td>USD</td>
                    <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("USD"))} ${countriesData[0] != null && FormatNumbers(countriesData[0].minPrice)} - ${getSymbolFromCurrency(("USD"))} ${countriesData[0] != null && FormatNumbers(countriesData[0].maxPrice)}`}</td>
                    <td>
                      <Form.Control  disabled readOnly value={FormatNumbers(USAListPrice)}   type="text" />
                    </td>
                    <td>

                    <Form.Control 
                        disabled readOnly value={USADiscountAmount} type="text" />

                   


                    </td>
                    <td>
                    
                    <Form.Control disabled readOnly value={USADiscountPercent}  type="text" />
                      
                    </td>
                    <td>
                     
                    <Form.Control 
                    isInvalid={USADiscountValue != 0 && USADiscountValue < parseFloat(USAMinValue).toFixed(2)} 
                    value={USADiscountValue}  
                    onChange={handleChangeGlobalPriceUSA} 
                    type="text" />
                    <Form.Control.Feedback type="invalid">
                              Not within range
                      </Form.Control.Feedback>
                      

                        <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                          Minimum: {getSymbolFromCurrency("USD")}{FormatNumbers(parseFloat(USAMinValue).toFixed(2))}
                        </Form.Label>
                      </td>

                
                        
                        </tr>


                {/* vietnam */}
                <tr>
                          <td>Vietnam
                          <td className="col-12 font-italic mt-5">  
                        <Form.Label className="mt-3 tit fst-italic">
                            Tip: Pricing around {getSymbolFromCurrency("VND")}{parseFloat(VietnamTip).toFixed(2)} may maximise sales.
                        </Form.Label>
                    </td>

                        </td>

                          <td>VND</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("VND"))} ${countriesData[27] != null && FormatNumbers(countriesData[27].minPrice)} - ${getSymbolFromCurrency(("VND"))} ${countriesData[27] != null && FormatNumbers(countriesData[27].maxPrice)}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={FormatNumbers(VietnamListPrice)}  type="text" />
                          </td>
                          <td>
                         

                          <Form.Control
                       
                       disabled
                       readOnly
                       value={VietnamDisocuntAmount}
                       type="text"
                     />


                          </td>
                          <td>
                          
                          <Form.Control disabled readOnly value={VietnamDiscountPercent} type="text" />
                           
                          </td>
                          <td>
                     

                          <Form.Control 
                          isInvalid={VietnamDiscountValue != 0 && VietnamDiscountValue < parseFloat(VietnamminValue).toFixed(2)}
                          onChange={handleChangeGlobalPriceVietnam} value={VietnamDiscountValue} type="text" />

                          <Form.Control.Feedback type="invalid">
                          Not within range
                          </Form.Control.Feedback>

                      <Form.Label style={{fontSize: '12px', whiteSpace: 'nowrap'}}>
                        Minimum: {getSymbolFromCurrency("VND")} {FormatNumbers(parseFloat(VietnamminValue).toFixed(2))}
                      </Form.Label>
                    </td>


                       
                        
                        </tr> 

                        
                      
                       


                      

                       

                        

                        
                        
                      
                        

                        

                       
                        
                       

                        

                         
                        
                       

                        

                        
                          

                         

                        

                       

                        

                        
                        

                        {/* <tr>
                          <td>Turkey
                        <td className="col-12 font-italic mt-5">  
                          <Form.Label  className="mt-3 tit fst-italic"> Tip:  Pricing around {getSymbolFromCurrency(("TRY"))}{TurkeyTip} may maximise sales.</Form.Label></td>
                        </td>

                          <td>TRY</td>
                          <td style={{whiteSpace:'nowrap'}}>{`${getSymbolFromCurrency(("TRY"))} ${countriesData[25] != null && countriesData[25].minPrice} - ${getSymbolFromCurrency(("TRY"))} ${countriesData[25] != null && countriesData[25].maxPrice}`}</td>
                          <td>
                            <Form.Control disabled readOnly value={TurkeyListPrice}  type="text" />
                          </td>
                          <td>
                          <Form.Control onChange={handleChangeGlobalPriceTurkey} value={TurkeyDiscountValue} type="text" />
                          </td>
                          <td>
                     
                          <Form.Control disabled readOnly value={TurkeyDiscountPercent}  type="text" />
                           
                          </td>
                          <td>
                            
                          <Form.Control disabled readOnly value={TurkeyDiscountAmount}  type="text" />

                          <Form.Label style={{fontSize:'12px',whiteSpace:'nowrap'}}>Minimum:{getSymbolFromCurrency(("TRY"))} {TurkeyminValue}</Form.Label>
                           
                          </td>
                        
                        
                        </tr> */}

                          

                          


                        
                          
              </tbody>
          

          </table>

                    {/* pricing rules */}
                    <div className="p-3">

        <p>* Other EUR countries: Bulgaria, Czech Republic, Hungary, Poland, Romania, Sweden, Andorra, Monaco, Montenegro, San Marino, Vatican City, Kosovo.</p>

        <p>** Other USD countries: Puerto Rico, Guam, America Samoa, U.S. Virgin Islands, Northern Marina Islands, Ecuador, El Salvador, Zimbabwe, The British Virgin Islands, The Turks and Caicos, Timor and Leste, Bonaire, Micronesia, Palau, Marshall Islands.</p>
        </div>

        </div>

        <div className='my-2'>
        {loading_btn
          ? <Button variant='contained' disabled>Loading...</Button>
          : <Button onClick={handleDiscountCouponCreate} variant='contained'>Create Coupon</Button>
        }
      </div>


       

        </div>
        )}
   

   {/* ------------- */}
  
 
    
  
    </Card>
    </div>
  )
}

export default AddCoupon