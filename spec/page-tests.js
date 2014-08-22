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
        afterEach(function() {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });
        it('can load the controller', function() {
            $httpBackend.expectGET('/db/homepage/').
                respond({title: "Site title"});
            expect($controller('Page', {$scope: $rootScope.$new()})).toBeTruthy();
            $httpBackend.flush();
        });
        describe('on load', function() {
            it('gets the homepage title', function() {
                var scope = $rootScope.$new();
                $httpBackend.expectGET('/db/homepage/').
                    respond({title: "Site title"});
                var Page = $controller('Page', {$scope: scope});
                $httpBackend.flush();
                expect(scope.homepage.title).toBe("Site title");
            });
        });
    });
});
