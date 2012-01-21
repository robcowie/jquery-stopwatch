
var ELEM_SELECTOR = '#stopwatch';


module("Create & Destroy", {
    setup: function(){
        $elem = $(ELEM_SELECTOR);
    },
    teardown: function(){
        $elem.removeData();
    }
});

test("Basic initialise", function() {
    var elem = $elem.stopwatch('init');
    ok(elem instanceof Object);
    same(elem, $elem.stopwatch('init')); //init call on existing stopwatch
});

test("Default data", function() {
    var data = $elem.stopwatch('init').data('stopwatch');
    equals(data.updateInterval, 1000,
        'Default update interval should be 1000, not ' + data.updateInterval);
    equals(data.startTime, 0,
        'Default start time offset should be 0, not ' + data.startTime);
    equals(data.active, false);
});

test("User provided data", function() {
    var user_data = {startTime: 1000, updateInterval: 2000};
    var data = $elem.stopwatch('init', user_data).data('stopwatch');
    equals(data.startTime, user_data.startTime,
        'Start time offset should equal ' + user_data.startTime + ' not ' + data.startTime);
    equals(data.updateInterval, user_data.updateInterval,
        'Update interval should equal ' + user_data.updateInterval + ' not ' + data.updateInterval);
});

test("Destroy", function() {
    $elem.stopwatch('init').stopwatch('destroy');
    ok( !$elem.data('stopwatch') );
});



module("Start & Stop", {
    setup: function(){
        $elem = $(ELEM_SELECTOR);
        $elem.stopwatch('init');
    },
    teardown: function(){
        $elem.stopwatch('destroy');
    }
});

test("Start", function(){
    $elem.stopwatch('start');
    equals($elem.data('stopwatch').active, true);
});

test("Stop", function(){
    $elem.stopwatch('stop');
    equals($elem.data('stopwatch').active, false);
});

test("Toggle", function(){
    $elem.stopwatch('stop');
    $elem.stopwatch('toggle');
    equals($elem.data('stopwatch').active, true);
    $elem.stopwatch('toggle');
    equals($elem.data('stopwatch').active, false);
});



module("Standard Operation", {
    setup: function(){
        $elem = $(ELEM_SELECTOR);
        $elem.stopwatch('init');
    },
    teardown: function(){
        $elem.stopwatch('destroy');
    }
});

test("Render", function(){
    $elem.stopwatch('render');
    equals($elem.text(), '00:00:00');
});

test("Elapsed time", function(){
    var data = $elem.data('stopwatch');
    equals(data.elapsed, 0);
    $elem.stopwatch('start');
    stop();
    setTimeout(function(){
        equals(data.elapsed, 2000);
        start();
    }, 2500);
});

test("Get time", function(){
    var data = $elem.data('stopwatch');
    equals($elem.stopwatch('getTime'), 0);
    equals(data.elapsed, $elem.stopwatch('getTime'));
    $elem.stopwatch('start');
    stop();
    setTimeout(function(){
        equals($elem.stopwatch('getTime'), 2000);
        start();
    }, 2500);
});



module("Jintervals Formatting", {
    setup: function(){
        $elem = $(ELEM_SELECTOR);
    },
    teardown: function(){
        $elem.stopwatch('destroy');
    }
});

test("jsinterval formatting", function() {
    var user_data = {startTime: 1000, format: '{MM}:{SS}'};
    var data = $elem.stopwatch('init', user_data).data('stopwatch');
    equals(data.formatter(data.elapsed, data), '00:01',
        'Formatted output should be 00:01');
});



module("Reset", {
    setup: function(){
        $elem = $(ELEM_SELECTOR);
        $elem.stopwatch('init');
    },
    teardown: function(){
        $elem.removeData();
    }
});

test("from inactive", function(){
    $elem.stopwatch('start');
    stop();
    setTimeout(function(){
        $elem.stopwatch('stop'); //stop first, then reset
        $elem.stopwatch('reset');
        equals($elem.data('stopwatch').elapsed, $elem.data('stopwatch').startTime);
        start();
    }, 2000);
});

test("from active", function(){
    $elem.stopwatch('start');
    stop();
    setTimeout(function(){
        $elem.stopwatch('reset'); //reset whilst active, then stop
        $elem.stopwatch('stop');
        equals($elem.data('stopwatch').elapsed, $elem.data('stopwatch').startTime);
        start();
    }, 2000);
});



module("Non-Standard Operation", {
    setup: function(){
        $elem = $(ELEM_SELECTOR);
    },
    teardown: function(){
        $elem.stopwatch('destroy');
    }
});

test("Custom update interval", function(){
    // wait 2 secs, with update interval of 100 millis, elapsed should be 1900
    $elem.stopwatch('init', {updateInterval: 100});
    var data = $elem.data('stopwatch');
    equals(data.updateInterval, 100);
    $elem.stopwatch('start');
    stop();
    setTimeout(function(){
        equals(data.elapsed, 1900);
        start();
    }, 2000);
});
