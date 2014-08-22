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
            var scope, Page;
            beforeEach(function() {
                scope = $rootScope.$new();
                $httpBackend.expectGET('/db/homepage/').
                    respond({title: "Site title"});
                Page = $controller('Page', {$scope: scope});
                $httpBackend.flush();
            });
            it('gets the homepage title', function() {
                expect(scope.homepage.title).toBe("Site title");
            });
            it('sets up the controller', function() {
                expect(scope.controller.title.editable).toBe(true);
            });
            it('can save a change to the title', function() {
                $httpBackend.expectPUT('/db/homepage/',
                        '{"title":"New title"}').
                    respond("New title");
                scope.homepage.title = "New title";
                scope.controller.save();
                expect(scope.controller.saving).toBe(true);
                $httpBackend.flush();
                expect(scope.controller.saving).toBe(false);
            });
        });
    });
});
