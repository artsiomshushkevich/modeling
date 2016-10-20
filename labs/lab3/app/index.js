(function() {
    var p1, p2, c, t1, j, t2, amountOfSolved, amountOfMissed, amountInQueue, pOt, a, lQueue;

    var AMOUNT_OF_TICKS = 20000;

    $('#count-param-but').on('click', getParams);
    
    function getParams() {
        p1 = +$('#p1').val();
        p2 = +$('#p2').val();
        
        if (p1 > 1 || p2 > 1) {
            alert('Incorrect probabilities!');

            clearInputs();
        } else {
            c = 2;
            t1 = 0;
            j = 0;
            t2 = 0;
            amountOfSolved = 0;
            amountOfMissed = 0;
            amountInQueue = 0;

            for (var i = 0; i < AMOUNT_OF_TICKS; i++) {
                goToNextState();
            }

            pOt = amountOfMissed / AMOUNT_OF_TICKS;

            lQueue = amountInQueue / AMOUNT_OF_TICKS;

            a = amountOfSolved / AMOUNT_OF_TICKS;

            $('#params').empty();
            $('#params').append(`
                <p>A = ${a}</p>
                <p>Pot = ${pOt}</p>
                <p>Lqueue = ${lQueue}</p>
            `);
            
            clearInputs();
        }
       
    }
    
    function clearInputs() {
        $('#p1').val('');
        $('#p2').val('');
    }

    function isNotP1() {
        return Math.random() > p1;
    }

    function isNotP2() {
        return Math.random() > p2;
    }

    function goToNextState() {
        if (t2 === 1) {
            if (isNotP2()) {
                amountOfSolved++;
                t2 = 0;

                if (j >= 1) {
                    j--;
                    t2 = 1;
                }
            }
        }

        if (t1 === 1) {
            if (isNotP1()) {
                if (j === 0) {
                    if (t2 === 0) {
                        t2 = 1;
                    } else {
                        j++;
                       
                    }
                } else if (j === 1) {
                    j++;
                      
                } else {
                    amountOfMissed++;
                    
                }
                t1 = 0;
            }
        }

        c--;

      if (j > 0) {
          amountInQueue++;
      }

        if (c === 0) {
            c = 2;
            if (t1 === 1) {
                amountOfMissed++;
            } else {
                t1 = 1;
            }
        }      
    }   
})();