function videoController($scope, $http, $routeParams, $sce, $location) {
    console.log($routeParams);
    $http.get('/api/v1/charity_full/?format=json').success(function (data) {
        $scope.items = data.append;
        console.log(data);
        $scope.all = data.objects;
        $scope.loadMore = function () {
            var last = $scope.all[$scope.all.length - 1];
            for (var k = 1; k <= 2; k++) {
                $scope.all.push(last + i);
            }
        };
        $scope.fliersOnly = function () {
            $scope.searchText = "flying";
        };
        for (var i = 0; i < $scope.all.length; i++) {
            $scope.all[i].trusted_url = $sce.trustAsResourceUrl($scope.all[i].video_url);
            console.log($scope.all[i].trusted_url);
            $scope.random = function () {
                return Math.random();
            };
            $scope.all[i].random_giver = $scope.all[i].charity.givers[Math.floor(Math.random() * $scope.all[i].charity.givers.length)];
        }
    });


    $scope.facebookLike = function (item) {
        $http.post('/api/v1/click_count/?format=json', {"facebook_count": "like", "video": item.resource_uri}).
            success(function (response) {
                console.log(response);
                $location.path("/");

            });
    };

    $scope.facebookShare = function (item) {
        $http.post('/api/v1/click_count/?format=json', {"facebook_count": "share", "video": item.resource_uri}).
            success(function (response) {
                console.log(response);
                $location.path("/");
            });
    };

    $scope.facebookSend = function (item) {
        $http.post('/api/v1/click_count/?format=json', {"facebook_count": "send", "video": item.resource_uri}).
            success(function (response) {
                console.log(response);
                $location.path("/");
            });
    };
    $scope.giverclick = function (item) {
        $http.post('/api/v1/giver_count/?format=json', {"giver_count": "click", "giver": item.resource_uri}).
            success(function (response) {
                console.log(response);
                $location.path("/");
            });
    };
    $scope.section = function (id) {
        $scope.section_id = id;
    };

    $scope.is = function (id) {
        return $scope.section_id == id;
    };
    $http.get('/api/v1/click_count/?format=json').success(function (stuff) {
        console.log("clickcounts");
        console.log(stuff);
        $scope.count = stuff.meta;
        $scope.everything = stuff.objects;
        $scope.allcounts = stuff.objects;
        $scope.shares = [];
        $scope.likes = [];
        $scope.sends = [];
        console.log($scope.all[0].charity.id);
        for (var i = 0; i < $scope.everything.length; i++) {
            console.log($scope.everything[i].facebook_count);
            if ($scope.everything[i].facebook_count == "share") {
                $scope.shares.push($scope.everything[i]);

            }
            if ($scope.everything[i].facebook_count == "like") {
                $scope.likes.push($scope.everything[i]);

            }
            if ($scope.everything[i].facebook_count == "send") {
                $scope.sends.push($scope.everything[i]);

            }

        }
        console.log("news");
        console.log($scope.shares);
        console.log($scope.likes);
        console.log($scope.sends);


    });
    $scope.slides = [
        'http://flexslider.woothemes.com/images/kitchen_adventurer_cheesecake_brownie.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_lemon.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_donut.jpg',
        'http://flexslider.woothemes.com/images/kitchen_adventurer_caramel.jpg'
    ];
}

