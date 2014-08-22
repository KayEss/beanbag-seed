define([], function() {
    return function($scope, $http) {
        $http.get('/db/homepage/').
            success(function(data) {
                $scope.homepage = data;
            });
    };
});
