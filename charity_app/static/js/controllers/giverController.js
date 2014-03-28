function giverController($scope, $http, $routeParams, $sce) {
    console.log($routeParams);

    $http.get('/api/v1/giver/' + $routeParams.id + '?format=json').success(function (data) {
        console.log(data);
        $scope.giver = data;
        console.log($scope.giver);
        console.log($scope.giver.video_url);
        $scope.giver.trusted_url = $sce.trustAsResourceUrl($scope.giver.video_url);
        console.log($scope.giver.trusted_url);

    });
    $scope.givervisit = function (item) {
        $http.post('/api/v1/giver_count/?format=json', {"giver_count": "visit", "giver": item.resource_uri}).
            success(function (response) {
                console.log(response);
                $location.path("/");
            });
    };
}