
var page = require('webpage').create();
var fs = require('fs');
var url = fs.absolute('lib/test.html');
var system = require('system');

page.onConsoleMessage = function(msg) {
    if ( msg.substr(0, 6) == "[test]") {
        console.log(msg);
    } else {
        console.log("[console] " + msg);
    }
};
page.onError = function(msg, trace) {
    var msgStack = [];
    console.log("[error] " + msg);
    if (trace && trace.length) {
        trace.forEach(function(t) {
            msgStack.push('[error]  -> ' + t.file + ': ' + t.line +
                    (t.function ? ' (in function "' + t.function +'")' : ''));
        });
        console.log(msgStack.join('\n'));
    }
    phantom.exit(5);
};
page.onResourceRequested = function(request) {
    // console.log("[phantomjs] " + request.method + " " + request.url);
}

var doneRegEx = /^\d+ specs?, (\d+) failure/;
var noReallyDoneRegEx = /^Finished in \d[\d\.]* second/;
var rc;
page.onCallback = function(msg) {
    system.stdout.write(msg);
    var match = doneRegEx.exec(msg);
    if (match) {
        rc = match[1]==="0" ? 0 : 1;
        return;
    }
    match = noReallyDoneRegEx.exec(msg);
    if (match) {
        system.stdout.write('\n');
        phantom.exit(rc);
    }
}

page.open(url, function(status) {
    if (status !== 'success') {
        console.log("[phantomjs] Could not load!");
        phantom.exit(2);
    } else {
        page.includeJs('runner.js');
        page.evaluate(function(deps) {
            test_modules = test_modules.concat(deps);
        }, system.args.slice(1));
    }
});

