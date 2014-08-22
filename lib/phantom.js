
var page = require('webpage').create();
var fs = require('fs');
var url = fs.absolute('lib/test.html');
var system = require('system');

function colored(color, str) {
    var ansi = {
        green: '\x1B[32m',
        red: '\x1B[31m',
        yellow: '\x1B[33m',
        none: '\x1B[0m'
    };
    return ansi[color] + str + ansi.none;
}

page.onConsoleMessage = function(msg) {
    if ( msg.substr(0, 6) == "[test]") {
        console.log(msg);
    } else {
        console.log("[console] " + msg);
    }
};
page.onError = function(msg, trace) {
    var printed = false, ellipsis = false;
    console.log(colored('red', "[error] " + msg));
    if (trace && trace.length) {
        trace.forEach(function(t) {
            if ( !t.file.match(/require/) ) {
                printed = true; ellipsis = false;
                console.log('[error]  -> ' + t.file + ': ' + t.line +
                        (t.function ? ' (in function "' + t.function +'")' : ''));
            } else if ( printed && !ellipsis ) {
                ellipsis = true;
                console.log(colored('yellow', '[error]  -> \u2022\u2022\u2022'));
            }
        });
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

