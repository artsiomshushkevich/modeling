
(function(){
  var r0 = 1;
  var m = 5;
  var a = 3;
  var n = 50000;
  
//  var r0 = 2836;
//  var m = 2147483647;
//  var a = 16807;
//  var n = 50000;
  
  var firstLabContainer = document.querySelector('#first-lab-container');
  var secondLabContainer = document.querySelector('#second-lab-container');
  
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
  
  var generateButton = document.querySelector('#generate-but');
  generateButton.addEventListener('click', showResults);
  
  
  function showResults() {
    var arrayOfRandomNumbers = getArrayOfRN(r0).map(function(rN) {
      return rN / m;
    });
    var expectedValue = getExpectedValue(arrayOfRandomNumbers);
    var dispersion = getDispersion(expectedValue, arrayOfRandomNumbers);
    var standardDeviation = getStandardDeviation(dispersion, arrayOfRandomNumbers);
    
    var tAndL = getTandL();
    

    var histogramArray = [['c','m']];
    var tickStep = 0;
    while (tickStep < 1) {
      histogramArray.push([tickStep, 0]);
      tickStep +=0.05;
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
    
    window.google.charts.load("current", {packages:["corechart"]});
    window.google.charts.setOnLoadCallback(drawChart);

    function drawChart() {
      var data = google.visualization.arrayToDataTable(histogramArray);

      var options = {
        title: 'histogram',
        bar: {
          groupWidth: '95%'
        }
      };

      var chart = new google.visualization.ColumnChart(document.getElementById('histogram'));
      chart.draw(data, options);
    }
    
    var otherResultsContainer = document.querySelector('#other-results');
    otherResultsContainer.innerHTML = `
      <p>Expected value: ${expectedValue}</p>
      <p>Dispersion: ${dispersion}</p>
      <p>Standard deviation: ${standardDeviation}</p>
      <p>T: ${tAndL.T}</p>
      <p>L: ${tAndL.L}</p>
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