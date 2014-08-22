define(['test', 'app/app'], function() {
    describe('Page controller', function() {
        beforeEach(module('app'));
        var $controller, $rootScope, $httpBackend;
        beforeEach(function() {
            angular.mock.inject(function(_$controller_, _$rootScope_, _$httpBackend_) {
                $controller = _$controller_;
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
            });
        });
        it('can load the controller', function() {
            expect($controller('Page', {$scope: $rootScope.$new()})).toBeTruthy();
        });
        describe('first load', function() {
            it('pushes new data to the server', function() {
            });
        });
    });
});
