define(['test', 'app/app'], function() {
    describe('app', function() {
        it('can load the module', function() {
            expect(angular.module('app')).toBeTruthy();
        });
    });
});
