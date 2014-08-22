requirejs.config({
    baseUrl: 'lib',
    shim: {
        'angular': {
            deps: ['jquery'],
            exports: 'angular',
        },
    },
    deps: ['app/app'],
});
