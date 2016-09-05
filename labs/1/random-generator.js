
(function(){
  
  var r0 = 2836;
  var m = 2147483647;
  var a = 16807;
  var n = 25000;
//  var deltaInterval = 0.2;
  var arrayOfRandomNumbers = [];
  
  var generateButton = document.querySelector('#generate-but');
  generateButton.addEventListener('click', showResults);
  
//  function getArrayOfPenetrationsAmounts() {
//    var currentIntervalValue = 0;
//    var arrayOfPenetrationsAmounts = [];
//    
//    while (currentIntervalValue < 1) {
//      arrayOfPenetrationsAmounts.push(0);
//      
//      for (var i = 0; i < arrayOfRandomNumbers.length; i++) {
//        if (arrayOfRandomNumbers[i] >= currentIntervalValue && 
//            arrayOfRandomNumbers[i] < (currentIntervalValue + deltaInterval)) {
//          arrayOfPenetrationsAmounts[arrayOfPenetrationsAmounts.length - 1]++;
//        }
//        
//      }
//      
//      currentIntervalValue += deltaInterval;
//      currentIntervalValue = +currentIntervalValue.toFixed(2);
//    }
//    
//    return arrayOfPenetrationsAmounts;
//  }
//  
//  function getArrayOfIntervals() {
//    var currentIntervalValue = 0;
//    var tempArrayOfIntervals = [];
//    
//    while (currentIntervalValue < 1) {
//      tempArrayOfIntervals.push(currentIntervalValue);
//      currentIntervalValue += deltaInterval;
//      currentIntervalValue = +currentIntervalValue.toFixed(2);
//    }
//    
//    return tempArrayOfIntervals;
//  }
//  
  
  
  
  function showResults() {
    if (arrayOfRandomNumbers.length > 0) {
      arrayOfRandomNumbers = [];
    }
    
    lemerFunction(r0, n);
    
//    var arrayOfPenetrationsAmounts = getArrayOfPenetrationsAmounts();
//    var arrayOfRelativeFrequencies = arrayOfPenetrationsAmounts.map(function(number) {
//      return number / arrayOfRandomNumbers.length;
//    });
//    
//    var arrayOfIntervals = getArrayOfIntervals();
  
    var data = [{
      x: arrayOfRandomNumbers,
      type: 'histogram'
    }];
    
    window.Plotly.newPlot('histogram', data); 
    
    var expectedValue = getExpectedValue();
    var dispersion = getDispersion(expectedValue);
    var standardDeviation = getStandardDeviation(dispersion);
    
    var otherResultsContainer = document.querySelector('#other-results');
    otherResultsContainer.innerHTML = `
      <p>Expected value: ${expectedValue}</p>
      <p>Dispersion: ${dispersion}</p>
      <p>Standard deviation: ${standardDeviation}</p>
    `;
    
    (function ()  {
      var flag = false;
      for (var i = 0; i < arrayOfRandomNumbers.length - 1; i++) {
        
        for (var j = i + 1; j < arrayOfRandomNumbers.length; j++) {
          if ((arrayOfRandomNumbers[i]) === (arrayOfRandomNumbers[j])) {
            flag = true;
            break;
          }
        }
        if (flag) {
          break;
        }
      }
      if (!flag) {
        alert('there is not');
      } else {
        alert('there is');
      }
    })();
  } 
  
  function getExpectedValue() {
    return arrayOfRandomNumbers.reduce(function(prevValue, curValue) {
      return prevValue + curValue
    }, 0) / arrayOfRandomNumbers.length;
  }
  
  function getDispersion(expectedValue) {
    var tempDispersionSum = 0;
    
    for (var i = 0; i < arrayOfRandomNumbers.length; i++) {
      tempDispersionSum += Math.pow(arrayOfRandomNumbers[i] - expectedValue, 2);
    }
    
    return tempDispersionSum * (1 / (arrayOfRandomNumbers.length - 1));
  }
  
  function getStandardDeviation(dispersion) {
    return Math.sqrt(dispersion / arrayOfRandomNumbers.length);
  }
  
  function lemerFunction(prevR, n) {
    if (n > 0) {
      var rN = prevR * a % m;
      var r = rN / m;

      arrayOfRandomNumbers.push(r);
      lemerFunction(rN, --n);
    }
  }
  

})(document, window);