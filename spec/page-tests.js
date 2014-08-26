define(['test', 'app/app'], function() {
    describe('Page controller', function() {
        beforeEach(module('app'));
        var $controller, $rootScope, $httpBackend, $sce;
        beforeEach(function() {
            angular.mock.inject(function(_$controller_, _$rootScope_,
                    _$httpBackend_, _$sce_) {
                $controller = _$controller_;
                $rootScope = _$rootScope_;
                $httpBackend = _$httpBackend_;
                $sce = _$sce_;
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
                expect(scope.controller.editable).toBe(true);
            });
            it('can save a change to the title', function() {
                $httpBackend.expectPUT(
                        '/db/homepage/',
                        {title: "New title"}).
                    respond({title: "New title"});
                scope.homepage.title = "New title";
                scope.controller.save();
                expect(scope.controller.saving).toBe(true);
                $httpBackend.flush();
                expect(scope.controller.saving).toBe(false);
            });
            describe('html', function() {
                it('gets emtpy html', function() {
                    expect(scope.controller.html()).toBe("");
                });
                it('gets a paragraph', function() {
                    scope.homepage.content = 'Paragraph';
                    expect($sce.getTrustedHtml(scope.controller.html())).
                        toBe('<p>Paragraph</p>');
                });
            });
        });
    });
});
