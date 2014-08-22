define(['angular', 'app/Page'], function(angular, Page) {
    angular.module('app', []).
        controller("Page", ['$scope', Page]);
    angular.bootstrap(document, ['app']);
});
