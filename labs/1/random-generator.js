
(function(){
  
  var r0 = 2836;
  var m = 2147483647;
  var a = 16807;
  var n = 10000;
//  var deltaInterval = 0.2;
  var arrayOfRandomNumbers = [];
  
  var generateButton = document.querySelector('#generate-but');
  generateButton.addEventListener('click', showHistrogram);
  
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
  
  function showHistrogram() {
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
    
    Plotly.newPlot('histogram', data); 
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