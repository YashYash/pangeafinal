var app = angular.module('app', ['ngRoute', 'angular-flexslider']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: '/static/views/stream.html', controller: 'videoController' }).
        when('/charity/:id', { templateUrl: '/static/views/charity_details.html', controller: 'charityController' }).
        when('/giver/:id', { templateUrl: '/static/views/giver_details.html', controller: 'giverController' });
    when('/giver/analytics/:id', { templateUrl: '/static/views/giver_analytics.html', controller: 'giverController' });

}]);

var myapp = angular.module('myapp', ['ngRoute', 'angular-flexslider']);

myapp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: '/static/views/stream.html', controller: 'videoController' }).
        when('/charity/:id', { templateUrl: '/static/views/charity_details.html', controller: 'charityController' }).
        when('/giver/:id', { templateUrl: '/static/views/giver_details.html', controller: 'giverController' });

}]);

var analyticsApp = angular.module('analyticsApp', ['ngRoute', 'angular-flexslider']);

analyticsApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/', { templateUrl: '/static/views/analytics_view.html', controller: 'analyticsController' }).
        when('#/finance/:id', { templateUrl: '/static/views/finance_view.html', controller: 'financeController' });
    when('/count/:id', { templateUrl: '/static/views/count_view.html', controller: 'countController' });

}]);


app.directive('myPostRepeatDirective', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
//            (function (d, s, id) {
            var d = document;
            var s = 'script';
            var id = 'facebook-jssdk';
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=1453223734911171";
            fjs.parentNode.insertBefore(js, fjs);
//            }(document, 'script', 'facebook-jssdk'));
            element.parent().css('border', '1px solid black');
        }
    };
});

myapp.directive('myPostRepeatDirective', function () {
    return function (scope, element, attrs) {
        if (scope.$last) {
//            (function (d, s, id) {
            var d = document;
            var s = 'script';
            var id = 'facebook-jssdk';
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=1453223734911171";
            fjs.parentNode.insertBefore(js, fjs);
//            }(document, 'script', 'facebook-jssdk'));
            element.parent().css('border', '1px solid black');
        }
    };
});