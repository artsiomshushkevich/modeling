
(function(){
  var r0 = 1;
  var m = 657633;
  var a = 3;
  var n = 100000;
  
//  var r0 = 2836;
//  var m = 2147483647;
//  var a = 16807;
//  var n = 50000;
  
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
    var lambdaGamma = +document.querySelector('#lambda-gamma').value;
    
    var mx = +document.querySelector('#mx').value;
    var qx = +document.querySelector('#qx').value;
    
    
    var aTriangle = +document.querySelector('#a-triangle').value;
    var bTriangle = +document.querySelector('#b-triangle').value;
    
    var aSimpson = +document.querySelector('#a-simpson').value;
    var bSimpson = +document.querySelector('#b-simpson').value;
    
    
    var arrayOfRandomNumbers = [];
     
    for (var i = 0; i< 100000; i++) {
      arrayOfRandomNumbers.push(Math.random());
    }
    
    var expectedValue = getExpectedValue(arrayOfRandomNumbers);
    var dispersion = getDispersion(expectedValue, arrayOfRandomNumbers);
    var standardDeviation = getStandardDeviation(dispersion, n);
    
    
    var arrayOfRandomNumbersOfUniformDistribution = getArrayOfRandomNumbersOfUniformDistribution(a, b, arrayOfRandomNumbers);
    var expectedValueOfUniformDistribution = getExpectedValue(arrayOfRandomNumbersOfUniformDistribution) ;
    var dispersionOfUniformDistribution = getDispersion(expectedValueOfUniformDistribution, arrayOfRandomNumbersOfUniformDistribution);
    var standardDeviationOfUniformDistribution = getStandardDeviation(dispersionOfUniformDistribution, n);
    var uniformMinMax = getMinMax(arrayOfRandomNumbersOfUniformDistribution);
    showResults(uniformMinMax.min, uniformMinMax.max, arrayOfRandomNumbersOfUniformDistribution, expectedValueOfUniformDistribution, dispersionOfUniformDistribution,
               standardDeviationOfUniformDistribution, '#uniform-histogram', '#uniform-other-results', 'uniform distribution', false);
    
    
    var arrayOfRandomNumbersOfExponentDistribution = getArrayOfRandomNumbersOfExponentDistribution(lambda, arrayOfRandomNumbers)
    var expectedValueOfExponentDistribution = getExpectedValue(arrayOfRandomNumbersOfExponentDistribution);
    var dispersionOfExponentDistribution = getDispersion(expectedValueOfExponentDistribution,arrayOfRandomNumbersOfExponentDistribution);
    var standardDeviationOfExponentDistribution = getStandardDeviation(dispersionOfExponentDistribution, arrayOfRandomNumbersOfExponentDistribution.length);
    var exponentMinMax = getMinMax(arrayOfRandomNumbersOfExponentDistribution);
    showResults(exponentMinMax.min, exponentMinMax.max, arrayOfRandomNumbersOfExponentDistribution, expectedValueOfExponentDistribution, dispersionOfExponentDistribution,
                standardDeviationOfExponentDistribution, '#exponent-histogram', '#exponent-other-results', 'exponent distribution', false);
      
    var arrayOfRandomNumbersOfGaussDistribution = getArrayOfRandomNumbersOfGaussDistribution(mx, qx, arrayOfRandomNumbers);
    var expectedValueOfGaussDistribution = getExpectedValue(arrayOfRandomNumbersOfGaussDistribution)
    var dispersionOfGaussDistribution = getDispersion(expectedValueOfGaussDistribution, arrayOfRandomNumbersOfGaussDistribution)
    var standardDeviationOfGaussDistribution = getStandardDeviation(dispersionOfGaussDistribution, arrayOfRandomNumbersOfGaussDistribution.length);
    var gaussMinMax = getMinMax(arrayOfRandomNumbersOfGaussDistribution);
    showResults(gaussMinMax.min, gaussMinMax.max, arrayOfRandomNumbersOfGaussDistribution, expectedValueOfGaussDistribution, dispersionOfGaussDistribution,
                standardDeviationOfGaussDistribution, '#gauss-histogram', '#gauss-other-results', 'gauss distribution', false);
    
    var arrayOfRandomNumbersOfGammaDistribution = getArrayOfRandomNumbersOfGammaDistribution(lambdaGamma, nu, arrayOfRandomNumbers);
    var expectedValueOfGammaDistribution = getExpectedValue(arrayOfRandomNumbersOfGammaDistribution)
    var dispersionOfGammaDistribution = getDispersion(expectedValueOfGammaDistribution, arrayOfRandomNumbersOfGammaDistribution)
    var standardDeviationOfGammaDistribution = getStandardDeviation(dispersionOfGammaDistribution, arrayOfRandomNumbersOfGammaDistribution.length);
    var gammaMinMax = getMinMax(arrayOfRandomNumbersOfGammaDistribution);
    showResults(gammaMinMax.min, gammaMinMax.max, arrayOfRandomNumbersOfGammaDistribution, expectedValueOfGammaDistribution, dispersionOfGammaDistribution,
                standardDeviationOfGammaDistribution, '#gamma-histogram', '#gamma-other-results', 'gamma distribution', false);
    
    var arrayOfRandomNumbersOfTriangleDistribution = getArrayOfRandomNumbersOfTriangleDistribution(aTriangle, bTriangle, arrayOfRandomNumbers);
    var expectedValueOfTriangleDistribution = getExpectedValue(arrayOfRandomNumbersOfTriangleDistribution)
    var dispersionOfTriangleDistribution = getDispersion(expectedValueOfTriangleDistribution, arrayOfRandomNumbersOfTriangleDistribution)
    var standardDeviationOfTriangleDistribution = getStandardDeviation(dispersionOfTriangleDistribution, arrayOfRandomNumbersOfTriangleDistribution.length);
    var triangleMinMax = getMinMax(arrayOfRandomNumbersOfTriangleDistribution);
    showResults(triangleMinMax.min, triangleMinMax.max, arrayOfRandomNumbersOfTriangleDistribution, expectedValueOfTriangleDistribution, dispersionOfTriangleDistribution,
                standardDeviationOfTriangleDistribution, '#triangle-histogram', '#triangle-other-results', 'triangle distribution', false);
    
    var arrayOfRandomNumbersOfSimpsonsDistribution = getArrayOfRandomNumbersOfSimpsonsDistribution(aSimpson, bSimpson, arrayOfRandomNumbersOfUniformDistribution);
    var expectedValueOfSimpsonsDistribution = getExpectedValue(arrayOfRandomNumbersOfSimpsonsDistribution)
    var dispersionOfSimpsonsDistribution = getDispersion(expectedValueOfSimpsonsDistribution, arrayOfRandomNumbersOfSimpsonsDistribution)
    var standardDeviationOfSimpsonsDistribution = getStandardDeviation(dispersionOfSimpsonsDistribution, arrayOfRandomNumbersOfSimpsonsDistribution.length);
    var simpsonsMinMax = getMinMax(arrayOfRandomNumbersOfSimpsonsDistribution);
    showResults(simpsonsMinMax.min, simpsonsMinMax.max, arrayOfRandomNumbersOfSimpsonsDistribution, expectedValueOfSimpsonsDistribution, dispersionOfSimpsonsDistribution,
                standardDeviationOfSimpsonsDistribution, '#simpsons-histogram', '#simpsons-other-results', 'simpsons distribution', false);
  });
  
  var generateButton = document.querySelector('#generate-but');
  generateButton.addEventListener('click', function() {
    var arrayOfRandomNumbers = getArrayOfRN(r0).map(function(rN) {
      return rN / m;
    });
    
    var expectedValue = getExpectedValue(arrayOfRandomNumbers);
    var dispersion = getDispersion(expectedValue, arrayOfRandomNumbers);
    var standardDeviation = getStandardDeviation(dispersion, n);
    
    showResults(0, 1, arrayOfRandomNumbers, expectedValue, dispersion, standardDeviation, '#histogram', '#other-results', 'histogram', true)
  });
  
  
  function showResults(a, b, arrayOfRandomNumbers, expectedValue, dispersion, standardDeviation, 
                       histogramContainer, otherResultsContainer, histogramTitle, isFirstLab) {	  
    if (isFirstLab) {
      var tAndL = getTandL();
    }
    
    var tick = (b - a) / 20;
    var histogramArray = [['c','m']];
    var tickStep = a;
    while (tickStep < b + tick) {
      histogramArray.push([tickStep, 0]);
      tickStep += tick;
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
  
  function getMinMax(arrayOfRandomNumbers) {
    var tempMin = 1000000000;
    var tempMax = -1000000000;
    
    for (var i = 0; i < arrayOfRandomNumbers.length; i++) {
      if (tempMin > arrayOfRandomNumbers[i]) {
        tempMin = arrayOfRandomNumbers[i]
      }
      
      if (tempMax < arrayOfRandomNumbers[i]) {
        tempMax = arrayOfRandomNumbers[i];
      }
    }
    
    return {
      max: tempMax,
      min: tempMin
    }
  }
  
  function getArrayOfRandomNumbersOfGaussDistribution(expectedValue, standardDeviation, arrayOfRandomNumbers) {
    var newArrayOfRandomNumbers = [];
    var i = 0;
    
    while (arrayOfRandomNumbers[i + 5]) {
      var gaussRandomNumber = 0;
      
      for (var j = 0; j < 6; j++) {
        gaussRandomNumber += arrayOfRandomNumbers[i + j];
      }
      
      gaussRandomNumber = (gaussRandomNumber - 3) * Math.sqrt(2) * standardDeviation + expectedValue;
      
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
    
    while (arrayOfRandomNumbers[i + nu]) {
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
  
  function getArrayOfRandomNumbersOfTriangleDistribution(a, b, arrayOfRandomNumbers) {
    var newArrayOfRandomNumbers = [];
    var i = 0;
    
    while (arrayOfRandomNumbers[i + 2]) { 
      if (arrayOfRandomNumbers[i + 1] < 1 - arrayOfRandomNumbers[i]) {
        newArrayOfRandomNumbers.push(a + (b - a) * arrayOfRandomNumbers[i]);
      }
      
      i += 2;
    }
    return newArrayOfRandomNumbers;
  }
  
  function getArrayOfRandomNumbersOfSimpsonsDistribution(a, b, arrayOfRandomNumbers) {
    var newArrayOfRandomNumbers = [];
    var y = -1;
    var z = -1;
    
    for (var i = 0; i< arrayOfRandomNumbers.length; i++) {
      if (arrayOfRandomNumbers[i] > a / 2 && arrayOfRandomNumbers[i] < b / 2) {
        if (y === -1) {
          y = arrayOfRandomNumbers[i];
        } else {
          z = arrayOfRandomNumbers[i];
          
          newArrayOfRandomNumbers.push(y + z);
          
          y = -1;
          z = -1;
        }
        
      }
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