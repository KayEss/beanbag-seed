require.config({
    baseUrl: '../www/lib',
    paths: {
        'boot': '../../lib/jasmine-boot',
        'test': '../../lib/console',
    },
    shim: {
        'angular': {exports: 'angular', deps:['jquery']},
        'angular-mocks': {exports: 'module', deps: ['angular', 'boot']},
        'angular-ui-router': {deps: ['angular']},
        'boot': {deps: ['jasmine']},
        'test': {deps: ['boot', 'angular-mocks']},
        'jquery': {exports: '$'},
        'jasmine': {exports: 'jasmineRequire', deps: ['jquery']},
        'jasmine-jquery': {deps: ['jasmine']},
    },
    deps: test_modules,
    callback: function() {
        var jasmineEnv = jasmine.getEnv();
        var consoleReporter = new jasmineRequire.ConsoleReporter()({
            showColors: true,
            timer: new jasmine.Timer,
            print: function() {
                window.callPhantom.apply(window, arguments);
            }
        });
        jasmineEnv.addReporter(consoleReporter);
        jasmineEnv.execute();
    }
});
