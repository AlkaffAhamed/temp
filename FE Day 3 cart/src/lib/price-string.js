export const getPriceString = (priceNum) => 
{
  if (priceNum % 1 !== 0) 
  {
    // Price is not integer
    const priceString = priceNum.toFixed(2).toString();
    const dollars = priceString.substring(0, priceString.indexOf('.'));
    const cents = priceString.substring(priceString.indexOf('.'));
    return insertCommas(parseInt(dollars)) + cents;
  }
  
  return insertCommas(priceNum);
}
  
  
function insertCommas(num) 
{
  let arr = [];
  if (num < 1000) 
  {
    return num;
  }
  else 
  {
    let restOfNum = num % 1000;
    arr.unshift(restOfNum);
    arr.unshift(',');
    num = (num - restOfNum) / 1000;
    arr.unshift(insertCommas(num));
  }
  return arr.join('');
}