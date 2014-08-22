define(['markdown'], function() {
    return function($scope, $http, $sce) {
        $http.get('/db/homepage/').
            success(function(data) {
                $scope.homepage = data;
                $scope.controller = {
                    editable: true,
                    html: function() {
                        return $sce.trustAsHtml(markdown.toHTML($scope.homepage.content || ''));
                    },
                    save: function() {
                        $scope.controller.saving = true;
                        $http.put('/db/homepage/', $scope.homepage).
                            success(function() {
                                $scope.controller.saving = false;
                                $scope.controller.editing = false;
                            });
                    },
                };
            });
    };
});
