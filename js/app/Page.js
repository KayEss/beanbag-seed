define(['markdown'], function() {
    return function($scope, $http) {
        $http.get('/db/homepage/').
            success(function(data) {
                $scope.homepage = data;
                $scope.controller = {
                    title: {editable: true},
                    html: function() {
                        return markdown.toHTML($scope.homepage.content || '');
                    },
                    save: function() {
                        $scope.controller.saving = true;
                        $http.put('/db/homepage/', $scope.homepage).
                            success(function() {
                                $scope.controller.saving = false;
                                $scope.controller.title.editing = false;
                            });
                    },
                };
            });
    };
});
