
(function(){
//  var r0 = 1;
//  var m = 5;
//  var a = 3;
//  var n = 5;
  
  var r0 = 2836;
  var m = 2147483647;
  var a = 16807;
  var n = 50000;
  
  var firstLabContainer = document.querySelector('#first-lab-container');
  var secondLabContainer = document.querySelector('#second-lab-container');
  
  window.google.charts.load("current", {packages:["corechart"]});
  
  var firstLabButton = document.querySelector('#first-lab-but');
  firstLabButton.addEventListener('click', function() {  
    if (secondLabContainer.classList.contains('active')) {
      secondLabContainer.classList.remove('active');
    }
    
    firstLabContainer.classList.add('active');
  });
  
  var secondlabButton = document.querySelector('#second-lab-but');
  secondlabButton.addEventListener('click', function() {  
    if (firstLabContainer.classList.contains('active')) {
      firstLabContainer.classList.remove('active');
    }
    
    secondLabContainer.classList.add('active');
  });
  
  var generateDistributionsButton = document.querySelector('#generate-distributions-but');
  generateDistributionsButton.addEventListener('click', function(event) {
    event.preventDefault();

    var a = +document.querySelector('#a').value;
    var b = +document.querySelector('#b').value;
    var lambda = +document.querySelector('#lambda').value;
    var nu = +document.querySelector('#nu').value;
    
    var arrayOfRandomNumbers = getArrayOfRN(r0).map(function(rN) {
      return rN / m;
    });
    
    var expectedValue = getExpectedValue(arrayOfRandomNumbers);
    var dispersion = getDispersion(expectedValue, arrayOfRandomNumbers);
    var standardDeviation = getStandardDeviation(dispersion, n);
    
    var arrayOfRandomNumbersOfUniformDistribution = getArrayOfRandomNumbersOfUniformDistribution(a, b, arrayOfRandomNumbers);
    var expectedValueOfUniformDistribution = (a + b) / 2 ;
    var dispersionOfUniformDistribution = Math.pow(b - a, 2) / 12;
    var standardDeviationOfUniformDistribution = getStandardDeviation(dispersionOfUniformDistribution, n);
    showResults(arrayOfRandomNumbersOfUniformDistribution, expectedValueOfUniformDistribution, dispersionOfUniformDistribution,
               standardDeviationOfUniformDistribution, '#uniform-histogram', '#uniform-other-results', 'uniform distribution', false);
    
    
    var arrayOfRandomNumbersOfExponentDistribution = getArrayOfRandomNumbersOfExponentDistribution(lambda, arrayOfRandomNumbers)
    var expectedValueOfExponentDistribution = 1 / lambda;
    var dispersionOfExponentDistribution = 1 / Math.pow(lambda, 2);
    var standardDeviationOfExponentDistribution = getStandardDeviation(dispersionOfExponentDistribution, n);
    showResults(arrayOfRandomNumbersOfExponentDistribution, expectedValueOfExponentDistribution, dispersionOfExponentDistribution,
                standardDeviationOfExponentDistribution, '#exponent-histogram', '#exponent-other-results', 'exponent distribution', false);
      
    var arrayOfRandomNumbersOfGaussDistribution = getArrayOfRandomNumbersOfGaussDistribution(expectedValue, standardDeviation, arrayOfRandomNumbers);
    var expectedValueOfGaussDistribution = getExpectedValue(arrayOfRandomNumbersOfGaussDistribution)
    var dispersionOfGaussDistribution = getDispersion(expectedValueOfGaussDistribution, arrayOfRandomNumbersOfGaussDistribution)
    var standardDeviationOfGaussDistribution = getStandardDeviation(dispersionOfGaussDistribution, arrayOfRandomNumbersOfGaussDistribution.length);
    showResults(arrayOfRandomNumbersOfGaussDistribution, expectedValueOfGaussDistribution, dispersionOfGaussDistribution,
                standardDeviationOfGaussDistribution, '#gauss-histogram', '#gauss-other-results', 'gauss distribution', false);
    
    var arrayOfRandomNumbersOfGammaDistribution = getArrayOfRandomNumbersOfGammaDistribution(lambda, nu, arrayOfRandomNumbers);
    var expectedValueOfGammaDistribution = getExpectedValue(arrayOfRandomNumbersOfGammaDistribution)
    var dispersionOfGammaDistribution = getDispersion(expectedValueOfGammaDistribution, arrayOfRandomNumbersOfGammaDistribution)
    var standardDeviationOfGammaDistribution = getStandardDeviation(dispersionOfGammaDistribution, arrayOfRandomNumbersOfGammaDistribution.length);
    showResults(arrayOfRandomNumbersOfGammaDistribution, expectedValueOfGammaDistribution, dispersionOfGammaDistribution,
                standardDeviationOfGammaDistribution, '#gamma-histogram', '#gamma-other-results', 'gamma distribution', false);
  });
  
  var generateButton = document.querySelector('#generate-but');
  generateButton.addEventListener('click', function() {
    var arrayOfRandomNumbers = getArrayOfRN(r0).map(function(rN) {
      return rN / m;
    });
    
    var expectedValue = getExpectedValue(arrayOfRandomNumbers);
    var dispersion = getDispersion(expectedValue, arrayOfRandomNumbers);
    var standardDeviation = getStandardDeviation(dispersion, n);
    
    showResults(arrayOfRandomNumbers, expectedValue, dispersion, standardDeviation, '#histogram', '#other-results', 'histogram', true)
  });
  
  
  function showResults(arrayOfRandomNumbers, expectedValue, dispersion, standardDeviation, 
                       histogramContainer, otherResultsContainer, histogramTitle, isFirstLab) {	  
    if (isFirstLab) {
      var tAndL = getTandL();
    }
    
    var histogramArray = [['c','m']];
    var tickStep = 0;
    while (tickStep < 1) {
      histogramArray.push([tickStep, 0]);
      tickStep += 0.05;
      tickStep = +tickStep.toFixed(2);
    }
    
    for (var i = 0; i < arrayOfRandomNumbers.length; i++) {
      for (var j = 1; j < histogramArray.length - 1; j++) {
        if (arrayOfRandomNumbers[i] > histogramArray[j][0] &&
            arrayOfRandomNumbers[i] <= histogramArray[j + 1][0]) {
          histogramArray[j + 1][1]++;
          break;
        }
      }
    }
    
    window.google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable(histogramArray);

      var options = {
        title: histogramTitle,
        bar: {
          groupWidth: '95%'
        }
      };

      var chart = new google.visualization.ColumnChart(document.querySelector(histogramContainer));
      chart.draw(data, options);
    }
    
    var otherResultsContainer = document.querySelector(otherResultsContainer);
    otherResultsContainer.innerHTML = `
      <p>Expected value: ${expectedValue}</p>
      <p>Dispersion: ${dispersion}</p>
      <p>Standard deviation: ${standardDeviation}</p>
      ${isFirstLab ? '<p>T:' + tAndL.T + '</p>' : ''}
      ${isFirstLab ? '<p>L:' + tAndL.L + '</p>' : ''}
    `; 
  } 
  
  function getArrayOfRandomNumbersOfUniformDistribution(a, b, arrayOfRandomNumbers) {
    return arrayOfRandomNumbers.map(function(randomNumber) {
      return a + (b - a) * randomNumber;
    });
  }
  
  function getArrayOfRandomNumbersOfGaussDistribution(expectedValue, standardDeviation, arrayOfRandomNumbers) {
    var newArrayOfRandomNumbers = [];
    var i = 0;
    
    while (arrayOfRandomNumbers[i+5]) {
      var gaussRandomNumber = 0;
      
      for (var j = 0; j < 6; j++) {
        gaussRandomNumber += arrayOfRandomNumbers[i+j] - 3;
      }
      
      gaussRandomNumber = gaussRandomNumber * Math.sqrt(2) * standardDeviation + expectedValue;
      
      newArrayOfRandomNumbers.push(gaussRandomNumber)
      i += 6;
    }
    
    return newArrayOfRandomNumbers;
  }
  
  function getArrayOfRandomNumbersOfExponentDistribution(lambda, arrayOfRandomNumbers) {
    return arrayOfRandomNumbers.map(function(randomNumber) {
      return -(1 / lambda) * Math.log(randomNumber);  
    });
  }
  
  function getArrayOfRandomNumbersOfGammaDistribution(lambda, nu, arrayOfRandomNumbers) {
    var newArrayOfRandomNumbers = [];
    var i = 0;
    
    while (arrayOfRandomNumbers[i+nu]) {
      var gaussRandomNumber = 1;
      
      for (var j = 0; j < nu; j++) {
        gaussRandomNumber *= arrayOfRandomNumbers[i+j];
      }
      
      gaussRandomNumber = - (1 / lambda) * Math.log(gaussRandomNumber);
      
      newArrayOfRandomNumbers.push(gaussRandomNumber)
      i += nu;
    }
    
    return newArrayOfRandomNumbers;
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
  
  function getStandardDeviation(dispersion, n) {
    return Math.sqrt(dispersion / n);
  }
  
  
  function getTandL() {
    var arrayOfRandomNumbers = getArrayOfRN(r0);
    var rV = arrayOfRandomNumbers[arrayOfRandomNumbers.length - 1];
    var index = arrayOfRandomNumbers.length;
    var rVi = rV;
    
    while (rVi !== rV || index === arrayOfRandomNumbers.length) {
      rVi = lemerFunction(rVi);
      index++
    }
    
    var tempT = index - arrayOfRandomNumbers.length; //t = 2147483646 for Park and Miller
    
    var r0i = r0;
    var rTi = (function() {
      var t = tempT;
      var tempRT = r0;
      
      while (t > 0) {
        tempRT = lemerFunction(tempRT);
        t--;
      }
      
      return tempRT;
    })();
    
    var i = 0;
    while (r0i !== rTi) {
      r0i = lemerFunction(r0i);
      rTi = lemerFunction(rTi);
      i++;
    }
    
    var tempL = tempT + i;
    
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