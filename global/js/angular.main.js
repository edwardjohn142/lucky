app.controller('mainCtrl', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

    $rootScope.translate = function (lang) {
        $http({
            url:  './../json/' + lang + '.json',
            method: 'GET'
        }).then(function (success) {
            $rootScope.trans = success.data.lang;
            langJSON = $rootScope.trans;
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 1);
                $rootScope.current_language = lang;
                $rootScope.lang_open = false;
            $rootScope.pageLoading = false;
        }, function (error) {
            console.log(error);
            
        })
    };

    $rootScope.translate('en');

    
}]);