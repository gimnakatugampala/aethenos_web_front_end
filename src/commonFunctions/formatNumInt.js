function formatNumInt(number) {
    // Ensure the input is an integer
    const roundedNumber = Math.floor(number);
  
    // Convert the number to a string and add commas for every thousand
    const formattedNumber = roundedNumber.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
    return formattedNumber;
  }
  
  export default formatNumInt;
  