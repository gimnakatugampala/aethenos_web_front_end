function formatNumber(number) {
    // Round to the second decimal place
    const roundedNumber = Number(number).toFixed(2);
  
    // Add commas for every thousand
    const formattedNumber = roundedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return formattedNumber;
  }

  export default formatNumber