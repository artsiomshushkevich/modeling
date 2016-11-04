(function() {
  var mu, lambda, p, 
      queue, channel,
      q1, q2, 
      amountOfMissedRequestsOfSecondSort, amountOfMissedRequestsOfSecondSort, 
      timeOfGeneratingRequest, timeOfResolvingRequest, 
      generatingRequestCounter, resolvingRequestCounter,
      amountOfRequestsOfFirstSort, amountOfRequestsOfSecondSort;

  var COUNT_OF_TICKS = 20000;

  $('#count-params-but').on('click', countParams);

  function countParams() {
    mu = +$('#mu').val();
    lambda = +$('#lambda').val();
    p = +$('#p').val();

    if (p > 1) {
      alert('P more than 1');
      clearAll();

      return;
    }

    clearAll();

    for (var i = 0; i < COUNT_OF_TICKS; i++) {
      goToNextState();
    }

    q1 = 1 - amountOfMissedRequestsOfFirstSort / amountOfRequestsOfFirstSort;
    q2 = 1 - amountOfMissedRequestsOfSecondSort / amountOfRequestsOfSecondSort;

    $('#results').append(`
      <p>Q1 = ${q1}</p>
      <p>Q2 = ${q2}</p>
    `);
  }

  function clearAll() {
    queue = 0;
    channel = 0; 
    amountOfMissedRequestsOfFirstSort = 0;
    amountOfMissedRequestsOfSecondSort = 0;
    amountOfRequestsOfFirstSort = 0;
    amountOfRequestsOfSecondSort = 0;
    q1 = 0;
    q2 = 0;
    timeOfGeneratingRequest = getNumberByExponencialDistribution(lambda);
    generatingRequestCounter = 0;
    resolvingRequestCounter = -1;
  
    $('#results').empty();
  }
                                           
  function getNumberByExponencialDistribution(number) {
    return -(1 / number) * Math.log(Math.random());
  }

  function isRequestOfFirstSort() {
    return getNumberByExponencialDistribution(Math.random()) < p;
  }

  function goToNextState() {
    if (resolvingRequestCounter !== -1) {
      resolvingRequestCounter++;
    }

    generatingRequestCounter++;

    if (resolvingRequestCounter > timeOfResolvingRequest) {
      if (queue !== 0) {
        channel = queue;
        queue = 0;
        resolvingRequestCounter = 0;
      } else {
        queue = 0;
        channel = 0;
        resolvingRequestCounter = -1;
      }
    }

    if (generatingRequestCounter > timeOfGeneratingRequest) {
      if (isRequestOfFirstSort()) {
        amountOfRequestsOfFirstSort++;

        if (channel === 0) {
          channel = 1;
          resolvingRequestCounter++;
          timeOfResolvingRequest = getNumberByExponencialDistribution(mu);
        } else if (channel === 1) {
          if (queue === 0) {
            queue = 1;
          } else if (queue === 1) {
            amountOfMissedRequestsOfFirstSort++
          } else {
            queue = 1;
            amountOfMissedRequestsOfSecondSort++;
          }
        } else {
          if (queue === 0) {
            queue = 2;       
          } else {
            amountOfMissedRequestsOfSecondSort++;  
          }

          channel = 1;
          resolvingRequestCounter = 0;
          timeOfResolvingRequest = getNumberByExponencialDistribution(mu);
        } 
      } else {
        amountOfRequestsOfSecondSort++;

        if (channel === 0) {
          channel = 2;
          resolvingRequestCounter++;
          timeOfResolvingRequest = getNumberByExponencialDistribution(mu);
        } else {
          if (queue !== 0) {
            amountOfMissedRequestsOfSecondSort++;
          } else {
            queue = 2;
          }
        }
      }

      generatingRequestCounter = 0;
      timeOfGeneratingRequest = getNumberByExponencialDistribution(lambda);
    }
  }
})();