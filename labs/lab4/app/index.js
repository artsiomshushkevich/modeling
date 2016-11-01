(function() {
  var mu, lamda, p, j, p1, amountOfRequestsOfFirstSort, amountOfRequestsOfSecondSort, q1, q2;
  var COUNT_OF_TICKS = 20000;
  var counter;
  var tempCounter;

  $('#count-params-but').on('click', countParams);

  function countParams() {
    clearAll();

    mu = +$('#mu').val();
    lambda = +$('#lambda').val()
    p = +$('#p').val();
    counter  = Math.floor(1/mu);
    tempCounter = counter;
    if (p > 1) {
      alert('P more than 1');
      clearAll();

      return;
    }

    for (var i = 0; i < COUNT_OF_TICKS; i++) {
      goToNextState();
    }

    q1 = 1 - amountOfRequestsOfFirstSort / COUNT_OF_TICKS;
    q2 = 1 - amountOfRequestsOfSecondSort / COUNT_OF_TICKS;
    
    $('#results').append(`
      <p>Q1 = ${q1}</p>
      <p>Q2 = ${q2}</p>
    `);
 }

 function clearAll() {
   j = 0;
   p1 = 0; 
   amountOfRequestsOfFirstSort = 0;
   amountOfRequestsOfSecondSort = 0;
   q1 = 0;
   q2 = 0;
   
  //  $('input').val('');
   $('#results').empty();
 }
                                           
 function isRequestProcessed() {
   return Math.random() < mu;
 }

 function isRequestOfFirstSort() {
   return Math.random() < p;
 }

 function goToNextState() {
   if (p1 !== 0) {
     if (isRequestProcessed()) {
      //  amountOfRequestsOfFirstSort++;
       p1 = 0;

       if (j !== 0) {
         p1 = j;
         j = 0;
       }
     }
   }

   if (isRequestOfFirstSort()) {
     if (j === 1) {
       amountOfRequestsOfFirstSort++;
     } else if (j === 2) {
       amountOfRequestsOfSecondSort++;
       j === 1;
     } else if(j === 0 && p1 !== 0)  {
       j = 1;
     } else {
       p1 = 1;
     }
       
   } else {
     if (j !== 0) {
       amountOfRequestsOfSecondSort++;
     } else if (j === 0 && p1 !== 0)  {
       j = 2;
     } else {
       p1 = 2;
     }
   }
 }
})();