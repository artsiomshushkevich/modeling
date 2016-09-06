
(function(){
  var r0 = 2836;
  var m = 2147483647;
  var a = 16807;
  var n = 50000;
  
//  var r0 = 61;
//  var m = 64;
//  var a = 63;
//  var n = 10;
  
  var generateButton = document.querySelector('#generate-but');
  generateButton.addEventListener('click', showResults);
    
  function showResults() {
    var arrayOfRandomNumbers = lemerFunction(r0);
    var expectedValue = getExpectedValue(arrayOfRandomNumbers);
    var dispersion = getDispersion(expectedValue, arrayOfRandomNumbers);
    var standardDeviation = getStandardDeviation(dispersion, arrayOfRandomNumbers);
    
    
    var data = [{
      x: arrayOfRandomNumbers,
      type: 'histogram'
    }];
    window.Plotly.newPlot('histogram', data); 
    
    var otherResultsContainer = document.querySelector('#other-results');
    otherResultsContainer.innerHTML = `
      <p>Expected value: ${expectedValue}</p>
      <p>Dispersion: ${dispersion}</p>
      <p>Standard deviation: ${standardDeviation}</p>
    `;
  } 
  
  function getPeriod(arrayOfRandomNumbers) {
    var period = -1;
    
    for (var i = 0; i < arrayOfRandomNumbers.length - 1 ; i++) {
      var indexOfOccurence = arrayOfRandomNumbers.indexOf(arrayOfRandomNumbers[i], i + 1);

      if (arrayOfRandomNumbers.indexOf(arrayOfRandomNumbers[i], i + 1) !== -1) {
        period = indexOfOccurence - i;
        
        return period;
      }
    }
      
    return period;  
  }
  
  function getExpectedValue(arrayOfRandomNumbers) {
    return arrayOfRandomNumbers.reduce(function(prevValue, curValue) {
      return prevValue + curValue;
    }, 0) / arrayOfRandomNumbers.length;
  }
  
  function getDispersion(expectedValue, arrayOfRandomNumbers) {
    var tempDispersionSum = 0;
    
    for (var i = 0; i < arrayOfRandomNumbers.length; i++) {
      tempDispersionSum += Math.pow(arrayOfRandomNumbers[i] - expectedValue, 2);
    }
    
    return tempDispersionSum * (1 / (arrayOfRandomNumbers.length - 1));
  }
  
  function getStandardDeviation(dispersion, arrayOfRandomNumbers) {
    return Math.sqrt(dispersion / arrayOfRandomNumbers.length);
  }
  
  function lemerFunction(prevR) {
    var arrayOfRandomNumbers = [];
    
    while (n > 0) {
      var rN = prevR * a % m;
      var r = rN / m;
      prevR = rN;
      
      arrayOfRandomNumbers.push(r);
      n--;
    }
    
    return arrayOfRandomNumbers;
  } 
})(document, window);