
(function(){
  var r0 = 2836;
  var m = 2147483647;
  var a = 16807;
  var n = 50000;
  

  
//  var r0 = 1;
//  var m = 5;
//  var a = 3;
//  var n = 7;
  
  var generateButton = document.querySelector('#generate-but');
  generateButton.addEventListener('click', showResults);
    
  function showResults() {
    var arrayOfRandomNumbers = getArrayOfRN(r0).map(function(rN){
      return rN / m;
    });
    var expectedValue = getExpectedValue(arrayOfRandomNumbers);
    var dispersion = getDispersion(expectedValue, arrayOfRandomNumbers);
    var standardDeviation = getStandardDeviation(dispersion, arrayOfRandomNumbers);
    
    var tAndL = getTandL();
    
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
      <p>T: ${tAndL.T === -1 ? 'T more than N' : tAndL.T}</p>
      <p>L: ${tAndL.L === -1 ? 'L more than 2*N - 1' : tAndL.L}</p>
    `; 
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
  
  
  function getTandL() {
    var arrayOfRN = getArrayOfRN(r0);
    var rV = lemerFunction(arrayOfRN[arrayOfRN.length - 1]);
    var rVi = rV;
    var i = 0;
    var tempT = -1;
    var tempL = -1;
    var rVt = r0;
    
    while (i < n) {
      var rVi = lemerFunction(rVi);
      if (rV === rVi) {
        rVt = rVi;
        tempT = i + 1;
        break;
      }
      
      i++;
    }
    
    i = 0;
    rVi = r0;
    rVt = lemerFunction(rVt);
    
    while (i < n) {
      rVi = lemerFunction(rVi);
      rVt = lemerFunction(rVt);
      
      if (rVi === rVt) {
        tempL = i + tempT;
        break;
      }
      
      i++;
    } 
    
    return {
      T: tempT,
      L: tempL
    }
  }
  
  function lemerFunction(r) {
    return r * a % m;
  }
  
  function getArrayOfRN(r) {
    var arrayOfRandomNumbers = [];
    var tempN = n;
    var rN = r;
    
    while (tempN !== 1) {
      rN = lemerFunction(rN);
      arrayOfRandomNumbers.push(rN);
      
      tempN--;
    }
    
    return arrayOfRandomNumbers;
  }
})(document, window);