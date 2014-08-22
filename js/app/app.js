define(['angular', 'app/Page'], function(angular, Page) {
    angular.module('app', []).
        controller("Page", ['$scope', '$http', '$sce', Page]);
    angular.bootstrap(document, ['app']);
});
