.. highlight:: javascript

.. _usage:

Some usage examples
===================

1. Initialise and start a default timer
---------------------------------------

::

    $('').stopwatch().stopwatch('start');


2. Initialise and bind start/stop to click
------------------------------------------

::

    $('').stopwatch().click(function(){
        $(this).stopwatch('toggle')
    });


3. Bind to ``tick`` event and reset when 10 seconds has elapsed
---------------------------------------------------------------

::

    $('').stopwatch().bind('tick.stopwatch', function(e, elapsed){
        if (elapsed >= 10000) {
            $(this).stopwatch('reset')
        }
    }).stopwatch('start');


4. Start at non-zero elapsed time
---------------------------------

::

    $('').stopwatch({startTime:10000000}).stopwatch('start');