define(['angular'], function(angular) {
    angular.module('app', []).
        controller("Page", ['$scope', function() {
            var self = this, args = arguments;
            require(['app/Page'], function(controller) {
                var $rootScope = angular.element('html').scope();
                $rootScope.$apply(function() {controller.apply(self, args);});
            });
        }]);
    angular.bootstrap(document, ['app']);
});
