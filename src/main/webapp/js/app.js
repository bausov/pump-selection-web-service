angular.module('pump.modules.search',
    []
);

angular.module('pump.modules.manage',
    []
);

angular.module('pump.modules.constant',
    []
);

angular.module('pump.modules.route',
    [
        'ngRoute',
        'ngSanitize',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'pump.modules.search',
        'pump.modules.manage',
        'pump.modules.constant'
    ]
);

angular.module('pump.modules.route')
    .config(['$stateProvider', '$urlRouterProvider', '$locationProvider',function ($stateProvider, $urlRouterProvider, $locationProvider) {
        $locationProvider.hashPrefix('');

        $stateProvider
            .state('main', {
                url: '',
                templateUrl: getViewPath('components/menu-main.html')
            })
            .state('main.search', {
                url: '/search',
                templateUrl: getViewPath('search.html'),
                controller: 'searchCtrl'
            })
            .state('main.manage', {
                url: '/manage',
                templateUrl: getViewPath('components/menu-edit-left.html')
            })
            .state('main.manage.constant', {
                url: '/manage',
                templateUrl: getViewPath('constant.html'),
                controller: 'editPumpCtrl'
            })
            // MANAGE
            .state('main.manage.manage', {
                url: '/manage0',
                templateUrl: getViewPath('manage.html'),
                controller: 'manageCtrl'
            })
            .state('main.manage.countries', {
                url: '/countries',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.pumpTypes', {
                url: '/pumpTypes',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.sealTypes', {
                url: '/sealTypes',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.materials', {
                url: '/materials',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.sealMaterials', {
                url: '/sealMaterials',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.bushingMaterials', {
                url: '/bushingMaterials',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.connectionTypes', {
                url: '/connectionTypes',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.dn', {
                url: '/dn',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.connectionAngleTypes', {
                url: '/connectionAngleTypes',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.pressures', {
                url: '/pressures',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.temperatures', {
                url: '/temperatures',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.driverAssemblyTypes', {
                url: '/driverAssemblyTypes',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.explosionProofTypes', {
                url: '/explosionProofTypes',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.motorPowerTypes', {
                url: '/motorPowerTypes',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.motorFrameSizes', {
                url: '/motorFrameSizes',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            })
            .state('main.manage.motorSpeedTypes', {
                url: '/motorSpeedTypes',
                templateUrl: getViewPath('manage/constant.html'),
                controller: 'constantCtrl'
            });

        $urlRouterProvider.otherwise('/search');

        function getViewPath(view) {
            return '/pump/view/' + view;
        }

    }])

    .run(function ($rootScope, $timeout) {


        $rootScope.state = {};
        $rootScope.success = 'Completed';
        $rootScope.error = 'Something goes wrong =(';

        $rootScope.startViewReload = function () {
            $rootScope.state.viewReload = true;
        };

        $rootScope.stopViewReload = function () {
            $rootScope.state.viewReload = false;
        };

        $rootScope.cleanUpNotification = function () {
            $rootScope.state.notification = undefined;
        };

        $rootScope.showPostReloadNotification = function () {
            $rootScope.state.notification = $rootScope.state.postReloadNotification;
            $rootScope.state.postReloadNotification = undefined;
        };

        $rootScope.addNotification = function (type, message, hideView) {
            $rootScope.state.notification = {
                type: type,
                message: message,
                hideView: hideView || false
            };
            $timeout(function () {
                $rootScope.cleanUpNotification();
            }, 3000);
        };

        $rootScope.addPostReloadNotification = function (type, message, hideView) {
            $rootScope.state.postReloadNotification = {
                type: type,
                message: message,
                hideView: hideView || false
            };
        };

        //Global route events
        $rootScope.$on('$routeChangeStart', function (next, current) {
            $rootScope.cleanUpNotification();
            $rootScope.startViewReload();
        });

        $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {

            $rootScope.showPostReloadNotification();
            $rootScope.stopViewReload();

            if (rejection.status == 500) {
                $rootScope.addNotification('danger', 'Internal server error: "' + rejection.data + '"', true);
            } else if (rejection.status == 400) {
                var headerError = rejection.headers("error-msg");
                if (headerError) {
                    $rootScope.addNotification('danger', 'Unable to get data: "' + headerError + '"', true);
                } else {
                    $rootScope.addNotification('danger', 'Unable to get data: "' + rejection.data + '"', true);
                }
            } else {
                $rootScope.addNotification('danger', 'Service error, code: "' + rejection.status + '"', true);
            }
        });

        $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
            $rootScope.showPostReloadNotification();
            $rootScope.stopViewReload();
        });
    });