/*!
 * 
 * Angle - Bootstrap Admin App + AngularJS
 * 
 * Author: @themicon_co
 * Website: http://themicon.co
 * License: http://support.wrapbootstrap.com/knowledge_base/topics/usage-licenses
 * 
 */

if (typeof $ === 'undefined') { throw new Error('This application\'s JavaScript requires jQuery'); }

// APP START
// ----------------------------------- 

var App = angular.module('angle', [
    'ngRoute',
    'ngAnimate',
    'ngStorage',
    'ngCookies',
    'pascalprecht.translate',
    'ui.bootstrap',
    'ui.router',
    'oc.lazyLoad',
    'cfp.loadingBar',
    'ngSanitize',
    'ngResource',
    'ebike-services',
    'ui.utils'
  ]);

App.run(["$rootScope", "$state", "$stateParams",  '$window', '$templateCache', "User", "RemoteStorage", function ($rootScope, $state, $stateParams, $window, $templateCache, User, RemoteStorage) {
    // Set reference to access them from any scope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$storage = $window.localStorage;

    // Uncomment this to disable template cache
    /*$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if (typeof(toState) !== 'undefined'){
          $templateCache.remove(toState.templateUrl);
        }
    });*/

    // Scope Globals
    // ----------------------------------- 
    $rootScope.app = {
      name: '宝旭生产商后台管理系统',
      description: '宝旭电动车生产商后台管理系统',
      year: ((new Date()).getFullYear()),
      layout: {
        isFixed: true,
        isCollapsed: false,
        isBoxed: false,
        isRTL: false,
        horizontal: false,
        isFloat: false,
        asideHover: false,
        theme: null
      },
      useFullLayout: false,
      hiddenFooter: false,
      viewAnimation: 'ng-fadeInUp'
    };
    $rootScope.user = {
      name:     'John',
      job:      'ng-developer',
      picture:  'app/img/dummy.png'
    };
    if(User.isAuthenticated()) {
      $rootScope.user = User.getCurrent();
      $rootScope.user.$promise.then(function () {
        $rootScope.user.picture = 'app/img/dummy.png';
        RemoteStorage.getAvatar($rootScope.user.id).success(function (buffer) {
          $rootScope.user.picture = buffer;
        });
      });
    };
    
}]);

/**=========================================================
 * Module: config.js
 * App routes and resources configuration
 =========================================================*/

App.config(['$stateProvider', '$locationProvider', '$urlRouterProvider', 'RouteHelpersProvider',
function ($stateProvider, $locationProvider, $urlRouterProvider, helper) {
  'use strict';

  // Set the following to true to enable the HTML5 Mode
  // You may have to set <base> tag in index and a routing configuration in your server
  $locationProvider.html5Mode(false);

  // default route
  $urlRouterProvider.otherwise('/page/login');

  // 
  // Application Routes
  // -----------------------------------   
  $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: helper.basepath('app.html'),
        controller: 'AppController',
        resolve: helper.resolveFor('modernizr', 'icons', 'toaster', 'ngTable', 'moment')
    })
    .state('app.dashboard', {
        url: '/dashboard',
        title: 'Dashboard',
        controller: 'DashboardController',
        templateUrl: helper.basepath('dashboard.html'),
        resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
    })
    .state('app.mass', {
        url: '/mass',
        title: 'Mass',
        controller: 'MassController',
        templateUrl: helper.basepath('mass.html')
    })
    .state('app.mass-compose', {
        url: '/mass/compose?touser',
        title: 'Mass Compose',
        controller: 'MassComposeController',
        templateUrl: helper.basepath('mass-compose.html')
    })
    .state('app.messages', {
        url: '/messages',
        title: 'Messages',
        controller: 'MessagesController',
        templateUrl: helper.basepath('messages.html')
    })
    .state('app.message-compose', {
        url: '/messages/compose?touser',
        title: 'Message Compose',
        controller: 'MessageComposeController',
        templateUrl: helper.basepath('message-compose.html')
    })
    .state('app.clients', {
        url: '/clients',
        title: 'Clients',
        controller: 'ClientsController',
        templateUrl: helper.basepath('clients.html'),
        resolve: helper.resolveFor('ngTableExport')
    })
    .state('app.bikes', {
        url: '/bikes',
        title: 'Bikes',
        controller: 'BikesController',
        templateUrl: helper.basepath('bikes.html')
    })
    .state('app.cruises', {
        url: '/cruises',
        title: 'Cruises',
        controller: 'CruisesController',
        templateUrl: helper.basepath('cruises.html')
    })
    .state('app.tests', {
        url: '/tests',
        title: 'Tests',
        controller: 'TestsController',
        templateUrl: helper.basepath('tests.html')
    })
    .state('app.manufacturers', {
        url: '/manufacturers',
        title: 'Manufacturers',
        controller: 'ManufacturersController',
        templateUrl: helper.basepath('manufacturers.html')
    })
    .state('app.manufacturers-add', {
        url: '/manufacturers-add',
        title: 'Manufacturers',
        templateUrl: helper.basepath('manufacturers-add.html')
    })
    .state('app.brands', {
        url: '/brands',
        title: 'Brands',
        controller: 'BrandsController',
        templateUrl: helper.basepath('brands.html')
    })
    .state('app.brands-add', {
        url: '/brands-add',
        title: 'Brands Add',
        templateUrl: helper.basepath('brands-add.html')
    })
    .state('app.brand', {
        url: '/brands/:brandId',
        title: 'Brands detail',
        templateUrl: helper.basepath('brand.html')
    })
    .state('app.devices', {
        url: '/devices',
        title: 'Devices',
        controller: 'DevicesController',
        templateUrl: helper.basepath('devices.html')
    })
    .state('app.statistic-brand', {
        url: '/statistic-brand',
        title: 'Statistic Brand',
        controller: 'StatisticBrandController',
        templateUrl: helper.basepath('statistic-brand.html'),
        resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
    })
    .state('app.statistic-region', {
        url: '/statistic-region',
        title: 'Statistic Region',
        controller: 'StatisticRegionController',
        templateUrl: helper.basepath('statistic-region.html'),
        resolve: helper.resolveFor('flot-chart','flot-chart-plugins')
    })
    .state('app.statistic-fault', {
        url: '/statistic-fault',
        title: 'Statistic Fault',
        controller: 'StatisticFaultController',
        templateUrl: helper.basepath('statistic-fault.html'),
        resolve: helper.resolveFor('flot-chart','flot-chart-plugins', 'angularjs-region')
    })
    .state('app.accounts', {
        url: '/accounts',
        title: 'Accounts',
        controller: 'AccountsController',
        templateUrl: helper.basepath('accounts.html')
    })
    .state('app.accounts-add', {
        url: '/accounts-add',
        title: 'Accounts Add',
        templateUrl: helper.basepath('accounts-add.html')
    })
    .state('app.account', {
        url: '/accounts/:accountId',
        title: 'Account',
        templateUrl: helper.basepath('account.html')
    })
    // 
    // Single Page Routes
    // ----------------------------------- 
    .state('page', {
        url: '/page',
        templateUrl: 'app/pages/page.html',
        resolve: helper.resolveFor('modernizr', 'icons', 'ebike-services'),
        controller: ["$rootScope", function($rootScope) {
            $rootScope.app.layout.isBoxed = false;
        }]
    })
    .state('page.login', {
        url: '/login',
        title: "Login",
        templateUrl: 'app/pages/login.html'
    })
    .state('page.recover', {
        url: '/recover',
        title: "Recover",
        templateUrl: 'app/pages/recover.html'
    })
    ;


}]).config(['$ocLazyLoadProvider', 'APP_REQUIRES', function ($ocLazyLoadProvider, APP_REQUIRES) {
    'use strict';

    // Lazy Load modules configuration
    $ocLazyLoadProvider.config({
      debug: false,
      events: true,
      modules: APP_REQUIRES.modules
    });

}]).config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide',
    function ( $controllerProvider, $compileProvider, $filterProvider, $provide) {
      'use strict';
      // registering components after bootstrap
      App.controller = $controllerProvider.register;
      App.directive  = $compileProvider.directive;
      App.filter     = $filterProvider.register;
      App.factory    = $provide.factory;
      App.service    = $provide.service;
      App.constant   = $provide.constant;
      App.value      = $provide.value;

}]).config(['$translateProvider', function ($translateProvider) {

    $translateProvider.useStaticFilesLoader({
        prefix : 'app/i18n/',
        suffix : '.json'
    });
    $translateProvider.preferredLanguage('zh_CN');
    $translateProvider.useLocalStorage();
    $translateProvider.usePostCompiling(true);

}]).config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeBar = true;
    cfpLoadingBarProvider.includeSpinner = false;
    cfpLoadingBarProvider.latencyThreshold = 500;
    cfpLoadingBarProvider.parentSelector = '.wrapper > section';
}]).config(['$tooltipProvider', function ($tooltipProvider) {

    $tooltipProvider.options({appendToBody: true});

}])
// .constant('urlBase', "http://0.0.0.0:3000/api")
.constant('urlBase', "http://121.40.108.30:3000/api")
.config(["LoopBackResourceProvider", "urlBase", function(LoopBackResourceProvider, urlBase) {
    // LoopBackResourceProvider.setAuthHeader('X-Access-Token');
    LoopBackResourceProvider.setUrlBase(urlBase);
}])
.config(["$httpProvider", function ($httpProvider) {
  $httpProvider.interceptors.push(["$q", "$location", "LoopBackAuth", function($q, $location, LoopBackAuth) {
    return {
      responseError: function(rejection) {
        if (rejection.status == 401) {
          LoopBackAuth.clearUser();
          LoopBackAuth.clearStorage();
          $location.path('/page/login')
        }
        return $q.reject(rejection);
      }
    };
  }]);
}])
;
/**=========================================================
 * Module: constants.js
 * Define constants to inject across the application
 =========================================================*/
App
  .constant('APP_COLORS', {
    'primary':                '#5d9cec',
    'success':                '#27c24c',
    'info':                   '#23b7e5',
    'warning':                '#ff902b',
    'danger':                 '#f05050',
    'inverse':                '#131e26',
    'green':                  '#37bc9b',
    'pink':                   '#f532e5',
    'purple':                 '#7266ba',
    'dark':                   '#3a3f51',
    'yellow':                 '#fad732',
    'gray-darker':            '#232735',
    'gray-dark':              '#3a3f51',
    'gray':                   '#dde6e9',
    'gray-light':             '#e4eaec',
    'gray-lighter':           '#edf1f2'
  })
  .constant('APP_MEDIAQUERY', {
    'desktopLG':             1200,
    'desktop':                992,
    'tablet':                 768,
    'mobile':                 480
  })
  .constant('APP_REQUIRES', {
    // jQuery based and standalone scripts
    scripts: {
      'flot-chart':         ['vendor/flot/jquery.flot.js'],
      'flot-chart-plugins': ['vendor/flot.tooltip/js/jquery.flot.tooltip.min.js',
                             'vendor/flot/jquery.flot.resize.js',
                             'vendor/flot/jquery.flot.pie.js',
                             'vendor/flot/jquery.flot.time.js',
                             'vendor/flot/jquery.flot.categories.js',
                             'vendor/flot/jquery.flot.stack.js',
                             'vendor/flot-spline/js/jquery.flot.spline.min.js'],
      'moment' :            ['vendor/moment/min/moment-with-locales.min.js'],
      'modernizr':          ['vendor/modernizr/modernizr.js'],
      'icons':              ['vendor/fontawesome/css/font-awesome.min.css',
                             'vendor/simple-line-icons/css/simple-line-icons.css']
    },
    // Angular based script (use the right module name)
    modules: [
      {name: 'toaster',                   files: ['vendor/angularjs-toaster/toaster.js',
                                                  'vendor/angularjs-toaster/toaster.css']},
      {name: 'ngTable',                   files: ['vendor/ng-table/dist/ng-table.min.js',
                                                  'vendor/ng-table/dist/ng-table.min.css']},
      {name: 'ngTableExport',             files: ['vendor/ng-table-export/ng-table-export.js']},
      {name: 'angularjs-region',          files: ['vendor/angularjs-region/angularjs-region.js']},
      {name: 'ebike-services',            files: ['vendor/ebike-services/ebike-lbservices.js',
                                                  'vendor/ebike-services/ebike-services.js'] }
    ]

  })
;
/**=========================================================
 * Module: access-login.js
 * Demo for login api
 =========================================================*/

App.controller('LoginFormController', ["$scope", "$state", "User", "$rootScope", function($scope, $state, User, $rootScope) {

  // bind here all data from the form
  $scope.account = {realm: 'manufacturer', rememberMe: true};
  // place the message if something goes wrong
  $scope.authMsg = '';

  $scope.login = function() {
    $scope.authMsg = '';

    if($scope.loginForm.$valid) {

      User.login($scope.account, function (accessToken) {
        $rootScope.user = accessToken.user;
        $rootScope.user.avatar = accessToken.user.avatar || 'app/img/dummy.png';
        $state.go('app.dashboard');
      }, function (error) {
        $scope.authMsg = error.data.error.message;
      })
    }
    else {
      // set as dirty if the user click directly to login so we show the validation messages
      $scope.loginForm.account_email.$dirty = true;
      $scope.loginForm.account_password.$dirty = true;
    }
  };

}]);

App.controller('ResetPasswordFormController', ["$scope", "$state", "User", function($scope, $state, User) {
  
  $scope.recover = {}
  
  $scope.reset = function () {
    $state.go('page.login')
  }
}])

/**=========================================================
 * Module: accounts-ctrl.js
 * Accounts Controller
 =========================================================*/

App.controller('AccountsController', ["$scope", "User", "ngTableParams", function ($scope, User, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'created DESC'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {realm: "manufacturer"}
      if($scope.filter.text != '') {
        opt.where.name = {like: $scope.filter.text}
      }
      User.find({filter:opt}, $defer.resolve)
      User.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
      })
    }
  })   
}])

App.controller('AccountsAddController', ["$scope", "User", "$state", "toaster", function ($scope, User, $state, toaster) {

  $scope.entity = {realm:'manufacturer'}
  
  $scope.submitted = false;
  $scope.validateInput = function(name, type) {
    var input = $scope.formValidate[name];
    return (input.$dirty || $scope.submitted) && input.$error[type];
  };

  // Submit form
  $scope.submitForm = function() {
    $scope.submitted = true;
    if ($scope.formValidate.$valid) {
      $scope.entity.username = $scope.entity.email
      User.create($scope.entity, function (entity) {
        toaster.pop('success', '新增成功', '已经添加帐号 '+entity.name)
        setTimeout(function () {
          $state.go('app.accounts')
        }, 2000)
      }, function (res) {
        toaster.pop('error', '新增错误', res.data.error.message)
      })
    } else {
      return false;
    }
  };
  
}])

App.controller('AccountController', ["$scope", "User", "$state", "toaster", function ($scope, User, $state, toaster) {

  // $scope.entity = User.findById({id: $state.params.accountId})
  $scope.entity = User.getCurrent()
  
  $scope.submitted = false;
  $scope.validateInput = function(name, type) {
    var input = $scope.formValidate[name];
    return (input.$dirty || $scope.submitted) && input.$error[type];
  };

  // Submit form
  $scope.submitForm = function() {
    $scope.submitted = true;
    if ($scope.formValidate.$valid) {
      User.upsert($scope.entity, function (entity) {
        toaster.pop('success', '更新成功', '已经更新帐号 '+entity.name)
        setTimeout(function () {
          // $state.go('app.accounts')
        }, 2000)
      }, function (res) {
        toaster.pop('error', '更新错误', res.data.error.message)
      })
    } else {
      return false;
    }
  };
  
}])
/**=========================================================
 * Module: bikes-ctrl.js
 * Bikes Controller
 =========================================================*/

App.controller('BikesController', ["$scope", "Bike", "ngTableParams", function ($scope, Bike, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'created DESC'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      if($scope.filter.text != '') {
        opt.where = {"serialNumber": {like: $scope.filter.text}}
      }
      Bike.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Bike.find({filter:opt}, $defer.resolve)
      })
    }
  })   
}])
/**=========================================================
 * Module: brands-ctrl.js
 * Brands Controller
 =========================================================*/

App.controller('BrandsController', ["$scope", "Brand", "ngTableParams", function ($scope, Brand, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'created DESC', include:"manufacturer"}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      if($scope.filter.text != '') {
        opt.where = {"name": {like: $scope.filter.text}}
      }
      Brand.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Brand.find({filter:opt}, $defer.resolve)
      })
    }
  })   
}])

App.controller('BrandsAddController', ["$scope", "Brand", "$state", "toaster", "Manufacturer", function ($scope, Brand, $state, toaster, Manufacturer) {

  $scope.entity = {}
  
  $scope.manufacturers = Manufacturer.query()
  $scope.submitted = false;
  $scope.validateInput = function(name, type) {
    var input = $scope.formValidate[name];
    return (input.$dirty || $scope.submitted) && input.$error[type];
  };

  // Submit form
  $scope.submitForm = function() {
    $scope.submitted = true;
    if ($scope.formValidate.$valid) {
      Brand.create($scope.entity, function (entity) {
        toaster.pop('success', '新增成功', '已经添加品牌 '+entity.name)
        setTimeout(function () {
          $state.go('app.brands')
        }, 2000)
      }, function (res) {
        toaster.pop('error', '新增错误', res.data.error.message)
      })
    } else {
      return false;
    }
  };
  
}])

App.controller('BrandController', ["$scope", "Brand", "$state", "toaster", "Manufacturer", "ngTableParams", function ($scope, Brand, $state, toaster, Manufacturer, ngTableParams) {

  $scope.entity = Brand.findOne({filter:{where:{id:$state.params.brandId}, include:"manufacturer"}})
  $scope.model = ""
  
  $scope.submitted = false;
  $scope.validateInput = function(name, type) {
    var input = $scope.formValidate[name];
    return (input.$dirty || $scope.submitted) && input.$error[type];
  };

  var goBack = function (delay) {
    setTimeout(function () {
      $state.go('app.brands')
    }, delay || 2000);
  };
  // Submit form
  $scope.submitForm = function() {
    $scope.submitted = true;
    if ($scope.formValidate.$valid) {
      Brand.upsert($scope.entity, function (entity) {
        toaster.pop('success', '更新成功', '已经更新品牌 '+entity.name);
        goBack();
      }, function (res) {
        toaster.pop('error', '更新错误', res.data.error.message)
      })
    } else {
      return false;
    }
  };
  
  $scope.addNewModel = function () {
    if($scope.model === '') return
    if(!$scope.entity.models) $scope.entity.models = []
    if($scope.entity.models.indexOf($scope.model) >= 0) return
    $scope.entity.models.push($scope.model)
  }
  
  $scope.remove = function () {
    Brand.prototype$updateAttributes({id: $scope.entity.id}, {"status": 'removed'}).$promise
    .then(function (entity) {
      toaster.pop('success', '删除成功', '已经删除品牌 '+entity.name);
      goBack();
    }, function (err) {
      toaster.pop('error', '删除失败', '未成功删除品牌');
    });
  }
   
}])

/**=========================================================
 * Module: clients-ctrl.js
 * Clients Controller
 =========================================================*/

App.controller('ClientsController', ["$scope", "Bike", "ngTableParams", "LoopBackAuth", "$http", "$document", "$timeout", "urlBase", function ($scope, Bike, ngTableParams, LoopBackAuth, $http, $document, $timeout, urlBase) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'created DESC'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {}
      if($scope.filter.text != '') {
        opt.where['owner.username'] = {regex: $scope.filter.text}
      }
      Bike.countUserByManufacturer({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Bike.findUsersByManufacturer({filter:opt}, $defer.resolve)
      })
    }
  });
  
  $scope.generate = function () {
    $http.get(urlBase+'/bikes/exportUsers?access_token='+LoopBackAuth.accessTokenId, {
      responseType: 'arraybuffer'
    })
      .success(function (data, status, headers, config) {
        var blob = new Blob([data], {
          type: 'text/csv;charset=GBK;'
        });
        var downloadContainer = angular.element('<div data-tap-disabled="true"><a></a></div>');
        var downloadLink = angular.element(downloadContainer.children()[0]);
        downloadLink.attr('href', window.URL.createObjectURL(blob));
        downloadLink.attr('download', $scope.user.email+Date.now()+'.csv');
        downloadLink.attr('target', '_blank');

        $document.find('body').append(downloadContainer);
        $timeout(function () {
          downloadLink[0].click();
          downloadLink.remove();
        }, null);
      });
  }
  
}])
/**=========================================================
 * Module: cruises-ctrl.js
 * Cruises Controller
 =========================================================*/

App.controller('CruisesController', ["$scope", "Cruise", "ngTableParams", function ($scope, Cruise, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'created DESC', include:'bike'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      if($scope.filter.text != '') {
        opt.where = {"serialNumber": {like: $scope.filter.text}}
      }
      Cruise.find({filter:opt}, $defer.resolve)
      Cruise.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
      })
    }
  })   
}])
/**=========================================================
 * Module: dashboard-ctrl.js
 * Dashboard Controllers
 =========================================================*/

App.controller('DashboardController', ["$scope", "User", "Bike", "ngTableParams", function ($scope, User, Bike, ngTableParams) {
  
  $scope.statistic = {
    user: {added: 0, total: 0},
    bike: {added: 0, total: 0}
  }
  
  $scope.stat = function () {
    var days = 15
    var today = moment().endOf('day')
    var startOfDay = moment().startOf('day')
    var beginDate = moment().subtract(days, 'days').startOf('day')

    Bike.countUserByManufacturer({filter:{where: {"owner.created": {gte: startOfDay}}, "owner.realm": 'client' }}, function (result) {
      $scope.statistic.user.added = result.count
    })
    Bike.countUserByManufacturer({filter:{where: {"owner.realm": 'client' }}}, function (result) {
      $scope.statistic.user.total = result.count
    })
    Bike.count({where: {created: {gte: startOfDay}}}, function (result) {
      $scope.statistic.bike.added = result.count
    })
    Bike.count({}, function (result) {
      $scope.statistic.bike.total = result.count
    })
    
    // var userData = null
    var bikeData = null
    // User.stat({filter:{where:{created: {between: [beginDate, today]}, realm: 'client' }}}, function (results) {
    //   userData = {
    //     label: "新增用户",
    //     color: "#768294",
    //     data: []
    //   }
    //   for (var d = 1, i = 0; d <= days; d++) {
    //     var day = moment(today).subtract(days-d, 'days')
    //     var day2 = null
    //     while(i < results.length) {
    //       day2 = moment(results[i]._id.year+'-'+results[i]._id.month+'-'+results[i]._id.dayOfMonth, 'YYYY-MM-DD')
    //       if(day.isBefore(day2, 'day')) {
    //         day2 = null
    //         break;
    //       } else if(day.isSame(day2, 'day')) {
    //         break
    //       } else {
    //         day2 = null
    //         i++
    //       }
    //     }
    //     userData.data.push([day.format('MM/DD'), day2? results[i].count:0])
    //   }
    //   if(userData && bikeData) {
    //     $scope.chartData = [userData, bikeData]
    //   }
    // })
    Bike.stat({filter:{where:{created: {between: [beginDate, today]}}}}, function (results) {
      bikeData = {
        label: "新增车辆",
        color: "#1f92fe",
        data: []
      }
      for (var d = 1, i = 0; d <= days; d++) {
        var day = moment(today).subtract(days-d, 'days')
        var day2 = null
        while(i < results.length) {
          day2 = moment(results[i]._id.year+'-'+results[i]._id.month+'-'+results[i]._id.dayOfMonth, 'YYYY-MM-DD')
          if(day.isBefore(day2, 'day')) {
            day2 = null
            break;
          } else if(day.isSame(day2, 'day')) {
            break
          } else {
            day2 = null
            i++
          }
        }
        bikeData.data.push([day.format('MM/DD'), day2? results[i].count:0])
      }
      // if(userData && bikeData) {
      //   $scope.chartData = [userData, bikeData]
      // }
      $scope.chartData = [bikeData]
    })
  }
  
  $scope.stat()
  
  $scope.lineOptions = {
      series: {
          lines: {
              show: true,
              fill: 0.01
          },
          points: {
              show: true,
              radius: 4
          }
      },
      grid: {
          borderColor: '#eee',
          borderWidth: 1,
          hoverable: true,
          backgroundColor: '#fcfcfc'
      },
      tooltip: true,
      tooltipOpts: {
          content: function (label, x, y) { return x + ' : ' + y; }
      },
      xaxis: {
          tickColor: '#eee',
          mode: 'categories'
      },
      yaxis: {
          position: ($scope.app.layout.isRTL ? 'right' : 'left'),
          tickColor: '#eee'
      },
      shadowSize: 0
  };
    
}])

/**=========================================================
 * Module: devices-ctrl.js
 * Devices Controller
 =========================================================*/

App.controller('DevicesController', ["$scope", "Device", "ngTableParams", function ($scope, Device, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'created DESC'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      if($scope.filter.text != '') {
        opt.where = {"serialNumber": {like: $scope.filter.text}}
      }
      Device.find({filter:opt}, $defer.resolve)
      Device.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
      })
    }
  })   
}])
/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/

App.controller('AppController',
  ['$rootScope', '$scope', '$state', '$translate', '$window', '$localStorage', '$timeout', 'toggleStateService', 'colors', 'browser', 'cfpLoadingBar', 'User',
  function($rootScope, $scope, $state, $translate, $window, $localStorage, $timeout, toggle, colors, browser, cfpLoadingBar, User) {
    "use strict";

    // Setup the layout mode
    $rootScope.app.layout.horizontal = ( $rootScope.$stateParams.layout == 'app-h') ;

    // Loading bar transition
    // ----------------------------------- 
    var thBar;
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        if($('.wrapper > section').length) // check if bar container exists
          thBar = $timeout(function() {
            cfpLoadingBar.start();
          }, 0); // sets a latency Threshold
    });
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        event.targetScope.$watch("$viewContentLoaded", function () {
          $timeout.cancel(thBar);
          cfpLoadingBar.complete();
        });
    });


    // Hook not found
    $rootScope.$on('$stateNotFound',
      function(event, unfoundState, fromState, fromParams) {
          console.log(unfoundState.to); // "lazy.state"
          console.log(unfoundState.toParams); // {a:1, b:2}
          console.log(unfoundState.options); // {inherit:false} + default options
      });
    // Hook error
    $rootScope.$on('$stateChangeError',
      function(event, toState, toParams, fromState, fromParams, error){
        console.log(error);
      });
    // Hook success
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState, toParams, fromState, fromParams) {
        // display new view from top
        $window.scrollTo(0, 0);
        // Save the route title
        $rootScope.currTitle = $state.current.title;
      });

    $rootScope.currTitle = $state.current.title;
    $rootScope.pageTitle = function() {
      var title = $rootScope.app.name + ' - ' + ($rootScope.currTitle || $rootScope.app.description);
      document.title = title;
      return title; 
    };

    // iPad may presents ghost click issues
    // if( ! browser.ipad )
      // FastClick.attach(document.body);

    // Close submenu when sidebar change from collapsed to normal
    $rootScope.$watch('app.layout.isCollapsed', function(newValue, oldValue) {
      if( newValue === false )
        $rootScope.$broadcast('closeSidebarMenu');
    });

    // Restore layout settings
    if( angular.isDefined($localStorage.layout) )
      $scope.app.layout = $localStorage.layout;
    else
      $localStorage.layout = $scope.app.layout;

    $rootScope.$watch("app.layout", function () {
      $localStorage.layout = $scope.app.layout;
    }, true);

    
    // Allows to use branding color with interpolation
    // {{ colorByName('primary') }}
    $scope.colorByName = colors.byName;

    // Logout 
    $scope.logout = function () {
      User.logout()
      $state.go('page.login')
    }
    
    // Internationalization
    // ----------------------

    $scope.language = {
      // Handles language dropdown
      listIsOpen: false,
      // list of available languages
      available: {
        'zh_CN':    '中文简体', 
        'en':       'English',
        'es_AR':    'Español'
      },
      // display always the current ui language
      init: function () {
        var proposedLanguage = $translate.proposedLanguage() || $translate.use();
        var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
        $scope.language.selected = $scope.language.available[ (proposedLanguage || preferredLanguage) ];
      },
      set: function (localeId, ev) {
        // Set the new idiom
        $translate.use(localeId);
        // save a reference for the current language
        $scope.language.selected = $scope.language.available[localeId];
        // finally toggle dropdown
        $scope.language.listIsOpen = ! $scope.language.listIsOpen;
      }
    };

    $scope.language.init();

    // Restore application classes state
    toggle.restoreState( $(document.body) );

    // cancel click event easily
    $rootScope.cancel = function($event) {
      $event.stopPropagation();
    };

}]);

/**=========================================================
 * Module: manufacturers-ctrl.js
 * Manufacturers Controller
 =========================================================*/

App.controller('ManufacturersController', ["$scope", "Manufacturer", "ngTableParams", function ($scope, Manufacturer, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'created DESC'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      if($scope.filter.text != '') {
        opt.where = {"name": {like: $scope.filter.text}}
      }
      Manufacturer.find({filter:opt}, $defer.resolve)
      Manufacturer.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
      })
    }
  })   

}])

App.controller('ManufacturersAddController', ["$scope", "$state", "Manufacturer", "toaster", function ($scope, $state, Manufacturer, toaster) {

  $scope.entity = {}
  
  $scope.submitted = false;
  $scope.validateInput = function(name, type) {
    var input = $scope.formValidate[name];
    return (input.$dirty || $scope.submitted) && input.$error[type];
  };

  // Submit form
  $scope.submitForm = function() {
    $scope.submitted = true;
    if ($scope.formValidate.$valid) {
      Manufacturer.create($scope.entity, function (entity) {
        toaster.pop('success', '新增制造商成功', '已经添加制造商 '+entity.name)
        setTimeout(function () {
          $state.go('app.manufacturers')
        }, 2000)
      }, function (res) {
        toaster.pop('error', '新增制造商错误', res.data.error.message)
        console.log(res)
      })
    } else {
      return false;
    }
  };
  
}])
/**=========================================================
 * Module: mass-ctrl.js
 * Mass Controller
 =========================================================*/

App.controller('MassController', ["$scope", "$rootScope", "$state", "Mass", "ngTableParams", function ($scope, $rootScope, $state, Mass, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {include: ['FromUser']}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {}
      if($scope.filter.text != '') {
        opt.where.Content = {regex: $scope.filter.text}
      }
      Mass.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Mass.find({filter:opt}, function (results) {
          $defer.resolve(results);
        })
      })
    }
  });
  
  $scope.delete = function (mass) {
    Mass.deleteById({id:mass.id}, function () {
      $scope.tableParams.reload();
    });
  }
}])

App.controller('MassComposeController', ["$scope", "$state", "Mass", "toaster", function ($scope, $state, Mass, toaster) {
  
  AMap.service('AMap.DistrictSearch', function () {
    var districtSearch = new AMap.DistrictSearch({
      level : 'country',
      subdistrict : 2    
    });
    
    districtSearch.search('中国', function (status, result) {
      $scope.provinces = result.districtList[0].districtList;
      $scope.$apply();
    });
  });
  $scope.region = {
    province: "",
    city: ""
  }
  $scope.submitForm = function () {
    var massBody = {
      where: {},
      Content: $scope.content
    };
    if($scope.region){
      if($scope.region.province && $scope.region.province !== "") {
        massBody.where.region = {
          province: $scope.region.province.name
        };
      }
      if($scope.region.city && $scope.region.city !== "") {
        var city = $scope.region.city.name;
        if(city.match(/市辖区$/m)){
          massBody.where.region.city = city.substr(0, city.length-3);          
        } else {
          massBody.where.region.city = city;
        }
      } 
    }
    Mass.create(massBody, function (result) {
      toaster.pop('success', '提交成功', "已经向服务器提交了发送请求！");
      setTimeout(function () {
        $state.go('app.mass');
      }, 2000);
    }, function (reaseon) {
      toaster.pop('error', '发送错误', res.data.error.mass);
    })
  }
}])
/**=========================================================
 * Module: messages-ctrl.js
 * Messages Controller
 =========================================================*/

App.controller('MessagesController', ["$scope", "$rootScope", "$state", "Message", "ngTableParams", "RemoteStorage", function ($scope, $rootScope, $state, Message, ngTableParams, RemoteStorage) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {include: ['FromUser']}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      opt.where = {ToUserName: $scope.user.id}
      if($scope.filter.text != '') {
        opt.where.Content = {regex: $scope.filter.text}
      }
      Message.count({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
        Message.find({filter:opt}, function (results) {
          results.forEach(function (msg) {
            msg.FromUser.avatar = 'app/img/dummy.png';
            RemoteStorage.getAvatar(msg.FromUserName).success(function (buffer) {
              msg.FromUser.avatar = buffer;
            });
          });
          $defer.resolve(results);
        })
      })
    }
  });
  
  $scope.reply = function (user) {
    $rootScope.messageDraft = {
      touser: user
    }
    $state.go('app.message-compose');
  }
  
  $scope.delete = function (msg) {
    Message.deleteById({id: msg.id}, function () {
      $scope.tableParams.reload();
    });
  }
}])

App.controller('MessageComposeController', ["$scope", "$state", "Message", "ngTableParams", "toaster", function ($scope, $state, Message, ngTableParams, toaster) {
  
  $scope.submitForm = function (isValid) {
    
    Message.create({
      ToUserName: $scope.messageDraft.touser.id,
      Content: $scope.content
    }, function (result) {
      console.log($scope.messageDraft);
      toaster.pop('success', '发送成功', '已经向'+$scope.messageDraft.touser.name+"发送了消息！");
      setTimeout(function () {
        $state.go('app.messages');
      }, 2000);
      }, function (reaseon) {
      toaster.pop('error', '发送错误', res.data.error.message);
    })
  }
  
  $scope.tableParams = new ngTableParams({
    count: 10
  }, {
    counts: [],
    getData: function($defer, params) {
      var opt = {include: ['FromUser']}
      opt.limit = 10
      opt.skip = 0
      opt.where = {
        and: [{
          or:[{ToUserName: $scope.messageDraft.touser.id},{FromUserName: $scope.messageDraft.touser.id}]
        }]
      };
      Message.find({filter:opt}, function (results) {
        results.forEach(function (msg) {
          console.log($scope.user, msg);
          msg.avatar = msg.FromUserName == $scope.user.id ? $scope.user.picture: $scope.messageDraft.touser.avatar;
        });
        $defer.resolve(results);
      });
    }
  });
}])
/**=========================================================
 * Module: sidebar-menu.js
 * Handle sidebar collapsible elements
 =========================================================*/

App.controller('SidebarController', ['$rootScope', '$scope', '$state', '$http', '$timeout', 'Utils',
  function($rootScope, $scope, $state, $http, $timeout, Utils){

    var collapseList = [];

    // demo: when switch from collapse to hover, close all items
    $rootScope.$watch('app.layout.asideHover', function(oldVal, newVal){
      if ( newVal === false && oldVal === true) {
        closeAllBut(-1);
      }
    });

    // Check item and children active state
    var isActive = function(item) {

      if(!item) return;

      if( !item.sref || item.sref == '#') {
        var foundActive = false;
        angular.forEach(item.submenu, function(value, key) {
          if(isActive(value)) foundActive = true;
        });
        return foundActive;
      }
      else
        return $state.is(item.sref) || $state.includes(item.sref);
    };

    // Load menu from json file
    // ----------------------------------- 
    
    $scope.getMenuItemPropClasses = function(item) {
      return (item.heading ? 'nav-heading' : '') +
             (isActive(item) ? ' active' : '') ;
    };

    $scope.loadSidebarMenu = function() {

      var menuJson = 'server/sidebar-menu.json',
          menuURL  = menuJson + '?v=' + (new Date().getTime()); // jumps cache
      $http.get(menuURL)
        .success(function(items) {
           $scope.menuItems = items;
        })
        .error(function(data, status, headers, config) {
          alert('Failure loading menu');
        });
     };

     $scope.loadSidebarMenu();

    // Handle sidebar collapse items
    // ----------------------------------- 

    $scope.addCollapse = function($index, item) {
      collapseList[$index] = $rootScope.app.layout.asideHover ? true : !isActive(item);
    };

    $scope.isCollapse = function($index) {
      return (collapseList[$index]);
    };

    $scope.toggleCollapse = function($index, isParentItem) {


      // collapsed sidebar doesn't toggle drodopwn
      if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) return true;

      // make sure the item index exists
      if( angular.isDefined( collapseList[$index] ) ) {
        if ( ! $scope.lastEventFromChild ) {
          collapseList[$index] = !collapseList[$index];
          closeAllBut($index);
        }
      }
      else if ( isParentItem ) {
        closeAllBut(-1);
      }
      
      $scope.lastEventFromChild = isChild($index);

      return true;
    
    };

    function closeAllBut(index) {
      index += '';
      for(var i in collapseList) {
        if(index < 0 || index.indexOf(i) < 0)
          collapseList[i] = true;
      }
    }

    function isChild($index) {
      return (typeof $index === 'string') && !($index.indexOf('-') < 0);
    }

}]);

/**=========================================================
 * Module: statistic-ctrl.js
 * Statistic Controllers
 =========================================================*/

App.controller('StatisticBrandController', ["$scope", "Brand", "ngTableParams", function ($scope, Brand, ngTableParams) {
  
  $scope.barOptions = {
    series: {
        bars: {
            align: 'center',
            lineWidth: 0,
            show: true,
            barWidth: 0.6,
            fill: 0.9
        }
    },
    grid: {
        borderColor: '#eee',
        borderWidth: 1,
        hoverable: true,
        backgroundColor: '#fcfcfc'
    },
    tooltip: true,
    tooltipOpts: {
        content: function (label, x, y) { return x + ' : ' + y; }
    },
    xaxis: {
        tickColor: '#fcfcfc',
        mode: 'categories'
    },
    yaxis: {
        position: ($scope.app.layout.isRTL ? 'right' : 'left'),
        tickColor: '#eee'
    },
    shadowSize: 0
  };
  
  $scope.tableParams = new ngTableParams({
    count: 10,
  }, {
    getData: function($defer, params) {
      Brand.stat({beginDate: '"'+$scope.beginDate+'"', endDate: '"'+$scope.endDate+'"'}, function (result) {
        $scope.total = result.total
        $scope.aggregateTotal = result.aggregateTotal
        $defer.resolve(result.data)
        $scope.barData = [{
          label: "新增车辆",
          color: "#9cd159",
          data: []
        }]
        result.data.forEach(function (item) {
          $scope.barData[0].data.push([item._id, item.count])
        })
      })
    }
  })   
  
  $scope.endDate = moment().format('YYYY-MM-DD')
  $scope.beginDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
  $scope.openeds = [false, false]
  $scope.open = function($event, index) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openeds[index] = true
    $scope.openeds[++index%2] = false
  };
}])

App.controller('StatisticRegionController', ["$scope", "Bike", "ngTableParams", function ($scope, Bike, ngTableParams) {
    
  $scope.barOptions = {
    series: {
        bars: {
            align: 'center',
            lineWidth: 0,
            show: true,
            barWidth: 0.6,
            fill: 0.9
        }
    },
    grid: {
        borderColor: '#eee',
        borderWidth: 1,
        hoverable: true,
        backgroundColor: '#fcfcfc'
    },
    tooltip: true,
    tooltipOpts: {
        content: function (label, x, y) { return x + ' : ' + y; }
    },
    xaxis: {
        tickColor: '#fcfcfc',
        mode: 'categories'
    },
    yaxis: {
        position: ($scope.app.layout.isRTL ? 'right' : 'left'),
        tickColor: '#eee'
    },
    shadowSize: 0
  };
  
  $scope.tableParams = new ngTableParams({
    count: 10,
  }, {
    getData: function($defer, params) {
      Bike.statRegion({beginDate: '"'+$scope.beginDate+'"', endDate: '"'+ moment($scope.endDate).endOf('day').toDate()+'"'}, function (result) {
        $scope.total = result.total
        $scope.aggregateTotal = result.aggregateTotal
        $defer.resolve(result.data)
        $scope.barData = [{
          label: "新增车辆",
          color: "#9cd159",
          data: []
        }]
        result.data.forEach(function (item) {
          $scope.barData[0].data.push([item._id||'其他', item.count])
        })
      })
    }
  })   
  
  $scope.endDate = moment().format('YYYY-MM-DD')
  $scope.beginDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
  $scope.openeds = [false, false]
  $scope.open = function($event, index) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openeds[index] = true
    $scope.openeds[++index%2] = false
  };
}])

App.controller('StatisticFaultController', ["$scope", "Test", "ngTableParams", "Brand", "ChinaRegion", function ($scope, Test, ngTableParams, Brand, ChinaRegion) {
  
  $scope.barStackedOptions = {
      series: {
          stack: true,
          bars: {
              align: 'center',
              lineWidth: 0,
              show: true,
              barWidth: 0.6,
              fill: 0.9
          }
      },
      grid: {
          borderColor: '#eee',
          borderWidth: 1,
          hoverable: true,
          backgroundColor: '#fcfcfc'
      },
      tooltip: true,
      tooltipOpts: {
          content: function (label, x, y) { return x + ' : ' + y; }
      },
      xaxis: {
          tickColor: '#fcfcfc',
          mode: 'categories',
          categories: ["30", "60", "90", "120", "150", "180", "210", "240", "270", "300", "330", "360"]
      },
      yaxis: {
          tickColor: '#eee'
      },
      shadowSize: 0
  };
    
  $scope.tableParams = new ngTableParams({
    count: 10,
  }, {
    getData: function($defer, params) {
      var filter = null
      if(($scope.brand && $scope.brand.name !== "全部品牌") 
        || ($scope.province && $scope.province.name !== "全部地区") ) {
        filter = {where:{}}
        if($scope.brand.name !== "全部品牌") filter.where["bike.brand.name"] = $scope.brand.name
        if($scope.province.name !== "全部地区") filter.where["bike.owner.region.province"] = $scope.province.name
      }
      Test.stat({filter: filter}, function (result) {
        $defer.resolve(result)
        $scope.barStackedData = [
          { label: "刹车", color: "#9cd159", data: [] },
          { label: "电机", color: "#4a8ef1", data: [] },
          { label: "控制器", color: "#f0693a", data: [] },
          { label: "转把", color: "#51bff2", data: [] }
        ]
        result.forEach(function (item) {
          if($scope.type === "all" || $scope.type === "brake")
            $scope.barStackedData[0].data.push([item._id, item.brake])
          if($scope.type === "all" || $scope.type === "motor")
            $scope.barStackedData[1].data.push([item._id, item.motor])
          if($scope.type === "all" || $scope.type === "controller")
            $scope.barStackedData[2].data.push([item._id, item.controller])
          if($scope.type === "all" || $scope.type === "steering")
            $scope.barStackedData[3].data.push([item._id, item.steering])
        })
      })
    }
  })   

  Brand.find({filter:{fields:{name:true}}}, function (result) {
    $scope.brands = [{name: "全部品牌"}].concat(result)
    $scope.brand = $scope.brands[0]
  })
  $scope.provinces = [{name: "全部地区"}].concat(ChinaRegion.provinces)
  $scope.province = $scope.provinces[0]
  $scope.type = "all"
  $scope.filter = { where:{} }
}])
/**=========================================================
 * Module: tests-ctrl.js
 * Tests Controller
 =========================================================*/

App.controller('TestsController', ["$scope", "Test", "ngTableParams", function ($scope, Test, ngTableParams) {
  
  $scope.filter = {text: ''}
  $scope.tableParams = new ngTableParams({
    count: 10,
    filter: $scope.filter.text
  }, {
    getData: function($defer, params) {
      var opt = {order: 'created DESC'}
      opt.limit = params.count()
      opt.skip = (params.page()-1)*opt.limit
      if($scope.filter.text != '') {
        opt.where = {"bike.serialNumber": {like: $scope.filter.text}}
      }
      Test.count({where: opt.where}, function (result) {
        // console.log(result)
        $scope.tableParams.total(result.count)
        Test.find({filter:opt}, $defer.resolve)
      })
    }
  })   
}])
/**=========================================================
 * Module: flot.js
 * Initializes the Flot chart plugin and handles data refresh
 =========================================================*/

App.directive('flot', ['$http', '$timeout', function($http, $timeout) {
  'use strict';
  return {
    restrict: 'EA',
    template: '<div></div>',
    scope: {
      dataset: '=?',
      options: '=',
      series: '=',
      callback: '=',
      src: '='
    },
    link: linkFunction
  };
  
  function linkFunction(scope, element, attributes) {
    var height, plot, plotArea, width;
    var heightDefault = 220;

    plot = null;

    width = attributes.width || '100%';
    height = attributes.height || heightDefault;

    plotArea = $(element.children()[0]);
    plotArea.css({
      width: width,
      height: height
    });

    function init() {
      var plotObj;
      if(!scope.dataset || !scope.options) return;
      plotObj = $.plot(plotArea, scope.dataset, scope.options);
      scope.$emit('plotReady', plotObj);
      if (scope.callback) {
        scope.callback(plotObj, scope);
      }

      return plotObj;
    }

    function onDatasetChanged(dataset) {
      if (plot) {
        plot.setData(dataset);
        plot.setupGrid();
        return plot.draw();
      } else {
        plot = init();
        onSerieToggled(scope.series);
        return plot;
      }
    }
    scope.$watchCollection('dataset', onDatasetChanged, true);

    function onSerieToggled (series) {
      if( !plot || !series ) return;
      var someData = plot.getData();
      for(var sName in series) {
        angular.forEach(series[sName], toggleFor(sName));
      }
      
      plot.setData(someData);
      plot.draw();
      
      function toggleFor(sName) {
        return function (s, i){
          if(someData[i] && someData[i][sName])
            someData[i][sName].show = s;
        };
      }
    }
    scope.$watch('series', onSerieToggled, true);
    
    function onSrcChanged(src) {

      if( src ) {

        $http.get(src)
          .success(function (data) {

            $timeout(function(){
              scope.dataset = data;
            });

        }).error(function(){
          $.error('Flot chart: Bad request.');
        });
        
      }
    }
    scope.$watch('src', onSrcChanged);
  }

}]);

/**=========================================================
 * Module: navbar-search.js
 * Navbar search toggler * Auto dismiss on ESC key
 =========================================================*/

App.directive('searchOpen', ['navSearch', function(navSearch) {
  'use strict';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.toggle);
    }]
  };

}]).directive('searchDismiss', ['navSearch', function(navSearch) {
  'use strict';

  var inputSelector = '.navbar-form input[type="text"]';

  return {
    restrict: 'A',
    controller: ["$scope", "$element", function($scope, $element) {

      $(inputSelector)
        .on('click', function (e) { e.stopPropagation(); })
        .on('keyup', function(e) {
          if (e.keyCode == 27) // ESC
            navSearch.dismiss();
        });
        
      // click anywhere closes the search
      $(document).on('click', navSearch.dismiss);
      // dismissable options
      $element
        .on('click', function (e) { e.stopPropagation(); })
        .on('click', navSearch.dismiss);
    }]
  };

}]);


/**=========================================================
 * Module: now.js
 * Provides a simple way to display the current time formatted
 =========================================================*/

App.directive("now", ['dateFilter', '$interval', function(dateFilter, $interval){
    return {
      restrict: 'E',
      link: function(scope, element, attrs){
        
        var format = attrs.format;

        function updateTime() {
          var dt = dateFilter(new Date(), format);
          element.text(dt);
        }

        updateTime();
        $interval(updateTime, 1000);
      }
    };
}]);
/**=========================================================
 * Module: sidebar.js
 * Wraps the sidebar and handles collapsed state
 =========================================================*/

App.directive('sidebar', ['$rootScope', '$window', 'Utils', function($rootScope, $window, Utils) {
  
  var $win  = $($window);
  var $body = $('body');
  var $scope;
  var $sidebar;
  var currentState = $rootScope.$state.current.name;

  return {
    restrict: 'EA',
    template: '<nav class="sidebar" ng-transclude></nav>',
    transclude: true,
    replace: true,
    link: function(scope, element, attrs) {
      
      $scope   = scope;
      $sidebar = element;

      var eventName = Utils.isTouch() ? 'click' : 'mouseenter' ;
      var subNav = $();
      $sidebar.on( eventName, '.nav > li', function() {

        if( Utils.isSidebarCollapsed() || $rootScope.app.layout.asideHover ) {

          subNav.trigger('mouseleave');
          subNav = toggleMenuItem( $(this) );

          // Used to detect click and touch events outside the sidebar          
          sidebarAddBackdrop();

        }

      });

      scope.$on('closeSidebarMenu', function() {
        removeFloatingNav();
      });

      // Normalize state when resize to mobile
      $win.on('resize', function() {
        if( ! Utils.isMobile() )
          $body.removeClass('aside-toggled');
      });

      // Adjustment on route changes
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
        currentState = toState.name;
        // Hide sidebar automatically on mobile
        $('body.aside-toggled').removeClass('aside-toggled');

        $rootScope.$broadcast('closeSidebarMenu');
      });

    }
  };

  function sidebarAddBackdrop() {
    var $backdrop = $('<div/>', { 'class': 'dropdown-backdrop'} );
    $backdrop.insertAfter('.aside-inner').on("click mouseenter", function () {
      removeFloatingNav();
    });
  }

  // Open the collapse sidebar submenu items when on touch devices 
  // - desktop only opens on hover
  function toggleTouchItem($element){
    $element
      .siblings('li')
      .removeClass('open')
      .end()
      .toggleClass('open');
  }

  // Handles hover to open items under collapsed menu
  // ----------------------------------- 
  function toggleMenuItem($listItem) {

    removeFloatingNav();

    var ul = $listItem.children('ul');
    
    if( !ul.length ) return $();
    if( $listItem.hasClass('open') ) {
      toggleTouchItem($listItem);
      return $();
    }

    var $aside = $('.aside');
    var $asideInner = $('.aside-inner'); // for top offset calculation
    // float aside uses extra padding on aside
    var mar = parseInt( $asideInner.css('padding-top'), 0) + parseInt( $aside.css('padding-top'), 0);
    var subNav = ul.clone().appendTo( $aside );
    
    toggleTouchItem($listItem);

    var itemTop = ($listItem.position().top + mar) - $sidebar.scrollTop();
    var vwHeight = $win.height();

    subNav
      .addClass('nav-floating')
      .css({
        position: $scope.app.layout.isFixed ? 'fixed' : 'absolute',
        top:      itemTop,
        bottom:   (subNav.outerHeight(true) + itemTop > vwHeight) ? 0 : 'auto'
      });

    subNav.on('mouseleave', function() {
      toggleTouchItem($listItem);
      subNav.remove();
    });

    return subNav;
  }

  function removeFloatingNav() {
    $('.dropdown-backdrop').remove();
    $('.sidebar-subnav.nav-floating').remove();
    $('.sidebar li.open').removeClass('open');
  }

}]);
/**=========================================================
 * Module: toggle-state.js
 * Toggle a classname from the BODY Useful to change a state that 
 * affects globally the entire layout or more than one item 
 * Targeted elements must have [toggle-state="CLASS-NAME-TO-TOGGLE"]
 * User no-persist to avoid saving the sate in browser storage
 =========================================================*/

App.directive('toggleState', ['toggleStateService', function(toggle) {
  'use strict';
  
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {

      var $body = $('body');

      $(element)
        .on('click', function (e) {
          e.preventDefault();
          var classname = attrs.toggleState;
          
          if(classname) {
            if( $body.hasClass(classname) ) {
              $body.removeClass(classname);
              if( ! attrs.noPersist)
                toggle.removeState(classname);
            }
            else {
              $body.addClass(classname);
              if( ! attrs.noPersist)
                toggle.addState(classname);
            }
            
          }

      });
    }
  };
  
}]);

/**=========================================================
 * Module: browser.js
 * Browser detection
 =========================================================*/

App.service('browser', function(){
  "use strict";

  var matched, browser;

  var uaMatch = function( ua ) {
    ua = ua.toLowerCase();

    var match = /(opr)[\/]([\w.]+)/.exec( ua ) ||
      /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
      /(version)[ \/]([\w.]+).*(safari)[ \/]([\w.]+)/.exec( ua ) ||
      /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
      /(msie) ([\w.]+)/.exec( ua ) ||
      ua.indexOf("trident") >= 0 && /(rv)(?::| )([\w.]+)/.exec( ua ) ||
      ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
      [];

    var platform_match = /(ipad)/.exec( ua ) ||
      /(iphone)/.exec( ua ) ||
      /(android)/.exec( ua ) ||
      /(windows phone)/.exec( ua ) ||
      /(win)/.exec( ua ) ||
      /(mac)/.exec( ua ) ||
      /(linux)/.exec( ua ) ||
      /(cros)/i.exec( ua ) ||
      [];

    return {
      browser: match[ 3 ] || match[ 1 ] || "",
      version: match[ 2 ] || "0",
      platform: platform_match[ 0 ] || ""
    };
  };

  matched = uaMatch( window.navigator.userAgent );
  browser = {};

  if ( matched.browser ) {
    browser[ matched.browser ] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.version);
  }

  if ( matched.platform ) {
    browser[ matched.platform ] = true;
  }

  // These are all considered mobile platforms, meaning they run a mobile browser
  if ( browser.android || browser.ipad || browser.iphone || browser[ "windows phone" ] ) {
    browser.mobile = true;
  }

  // These are all considered desktop platforms, meaning they run a desktop browser
  if ( browser.cros || browser.mac || browser.linux || browser.win ) {
    browser.desktop = true;
  }

  // Chrome, Opera 15+ and Safari are webkit based browsers
  if ( browser.chrome || browser.opr || browser.safari ) {
    browser.webkit = true;
  }

  // IE11 has a new token so we will assign it msie to avoid breaking changes
  if ( browser.rv )
  {
    var ie = "msie";

    matched.browser = ie;
    browser[ie] = true;
  }

  // Opera 15+ are identified as opr
  if ( browser.opr )
  {
    var opera = "opera";

    matched.browser = opera;
    browser[opera] = true;
  }

  // Stock Android browsers are marked as Safari on Android.
  if ( browser.safari && browser.android )
  {
    var android = "android";

    matched.browser = android;
    browser[android] = true;
  }

  // Assign the name and platform variable
  browser.name = matched.browser;
  browser.platform = matched.platform;


  return browser;

});
/**=========================================================
 * Module: colors.js
 * Services to retrieve global colors
 =========================================================*/
 
App.factory('colors', ['APP_COLORS', function(colors) {
  
  return {
    byName: function(name) {
      return (colors[name] || '#fff');
    }
  };

}]);

/**=========================================================
 * Module: nav-search.js
 * Services to share navbar search functions
 =========================================================*/
 
App.service('navSearch', function() {
  var navbarFormSelector = 'form.navbar-form';
  return {
    toggle: function() {
      
      var navbarForm = $(navbarFormSelector);

      navbarForm.toggleClass('open');
      
      var isOpen = navbarForm.hasClass('open');
      
      navbarForm.find('input')[isOpen ? 'focus' : 'blur']();

    },

    dismiss: function() {
      $(navbarFormSelector)
        .removeClass('open')      // Close control
        .find('input[type="text"]').blur() // remove focus
        .val('')                    // Empty input
        ;
    }
  };

});
/**=========================================================
 * Module: helpers.js
 * Provides helper functions for routes definition
 =========================================================*/

App.provider('RouteHelpers', ['APP_REQUIRES', function (appRequires) {
  "use strict";

  // Set here the base of the relative path
  // for all app views
  this.basepath = function (uri) {
    return 'app/views/' + uri;
  };

  // Generates a resolve object by passing script names
  // previously configured in constant.APP_REQUIRES
  this.resolveFor = function () {
    var _args = arguments;
    return {
      deps: ['$ocLazyLoad','$q', function ($ocLL, $q) {
        // Creates a promise chain for each argument
        var promise = $q.when(1); // empty promise
        for(var i=0, len=_args.length; i < len; i ++){
          promise = andThen(_args[i]);
        }
        return promise;

        // creates promise to chain dynamically
        function andThen(_arg) {
          // also support a function that returns a promise
          if(typeof _arg == 'function')
              return promise.then(_arg);
          else
              return promise.then(function() {
                // if is a module, pass the name. If not, pass the array
                var whatToLoad = getRequired(_arg);
                // simple error check
                if(!whatToLoad) return $.error('Route resolve: Bad resource name [' + _arg + ']');
                // finally, return a promise
                return $ocLL.load( whatToLoad );
              });
        }
        // check and returns required data
        // analyze module items with the form [name: '', files: []]
        // and also simple array of script files (for not angular js)
        function getRequired(name) {
          if (appRequires.modules)
              for(var m in appRequires.modules)
                  if(appRequires.modules[m].name && appRequires.modules[m].name === name)
                      return appRequires.modules[m];
          return appRequires.scripts && appRequires.scripts[name];
        }

      }]};
  }; // resolveFor

  // not necessary, only used in config block for routes
  this.$get = function(){};

}]);


/**=========================================================
 * Module: toggle-state.js
 * Services to share toggle state functionality
 =========================================================*/

App.service('toggleStateService', ['$rootScope', function($rootScope) {

  var storageKeyName  = 'toggleState';

  // Helper object to check for words in a phrase //
  var WordChecker = {
    hasWord: function (phrase, word) {
      return new RegExp('(^|\\s)' + word + '(\\s|$)').test(phrase);
    },
    addWord: function (phrase, word) {
      if (!this.hasWord(phrase, word)) {
        return (phrase + (phrase ? ' ' : '') + word);
      }
    },
    removeWord: function (phrase, word) {
      if (this.hasWord(phrase, word)) {
        return phrase.replace(new RegExp('(^|\\s)*' + word + '(\\s|$)*', 'g'), '');
      }
    }
  };

  // Return service public methods
  return {
    // Add a state to the browser storage to be restored later
    addState: function(classname){
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      if(!data)  {
        data = classname;
      }
      else {
        data = WordChecker.addWord(data, classname);
      }

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },

    // Remove a state from the browser storage
    removeState: function(classname){
      var data = $rootScope.$storage[storageKeyName];
      // nothing to remove
      if(!data) return;

      data = WordChecker.removeWord(data, classname);

      $rootScope.$storage[storageKeyName] = angular.toJson(data);
    },
    
    // Load the state string and restore the classlist
    restoreState: function($elem) {
      var data = angular.fromJson($rootScope.$storage[storageKeyName]);
      
      // nothing to restore
      if(!data) return;
      $elem.addClass(data);
    }

  };

}]);
/**=========================================================
 * Module: utils.js
 * Utility library to use across the theme
 =========================================================*/

App.service('Utils', ["$window", "APP_MEDIAQUERY", function($window, APP_MEDIAQUERY) {
    'use strict';
    
    var $html = angular.element("html"),
        $win  = angular.element($window),
        $body = angular.element('body');

    return {
      // DETECTION
      support: {
        transition: (function() {
                var transitionEnd = (function() {

                    var element = document.body || document.documentElement,
                        transEndEventNames = {
                            WebkitTransition: 'webkitTransitionEnd',
                            MozTransition: 'transitionend',
                            OTransition: 'oTransitionEnd otransitionend',
                            transition: 'transitionend'
                        }, name;

                    for (name in transEndEventNames) {
                        if (element.style[name] !== undefined) return transEndEventNames[name];
                    }
                }());

                return transitionEnd && { end: transitionEnd };
            })(),
        animation: (function() {

            var animationEnd = (function() {

                var element = document.body || document.documentElement,
                    animEndEventNames = {
                        WebkitAnimation: 'webkitAnimationEnd',
                        MozAnimation: 'animationend',
                        OAnimation: 'oAnimationEnd oanimationend',
                        animation: 'animationend'
                    }, name;

                for (name in animEndEventNames) {
                    if (element.style[name] !== undefined) return animEndEventNames[name];
                }
            }());

            return animationEnd && { end: animationEnd };
        })(),
        requestAnimationFrame: window.requestAnimationFrame ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame ||
                               window.msRequestAnimationFrame ||
                               window.oRequestAnimationFrame ||
                               function(callback){ window.setTimeout(callback, 1000/60); },
        touch: (
            ('ontouchstart' in window && navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
            (window.DocumentTouch && document instanceof window.DocumentTouch)  ||
            (window.navigator['msPointerEnabled'] && window.navigator['msMaxTouchPoints'] > 0) || //IE 10
            (window.navigator['pointerEnabled'] && window.navigator['maxTouchPoints'] > 0) || //IE >=11
            false
        ),
        mutationobserver: (window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver || null)
      },
      // UTILITIES
      isInView: function(element, options) {

          var $element = $(element);

          if (!$element.is(':visible')) {
              return false;
          }

          var window_left = $win.scrollLeft(),
              window_top  = $win.scrollTop(),
              offset      = $element.offset(),
              left        = offset.left,
              top         = offset.top;

          options = $.extend({topoffset:0, leftoffset:0}, options);

          if (top + $element.height() >= window_top && top - options.topoffset <= window_top + $win.height() &&
              left + $element.width() >= window_left && left - options.leftoffset <= window_left + $win.width()) {
            return true;
          } else {
            return false;
          }
      },
      langdirection: $html.attr("dir") == "rtl" ? "right" : "left",
      isTouch: function () {
        return $html.hasClass('touch');
      },
      isSidebarCollapsed: function () {
        return $body.hasClass('aside-collapsed');
      },
      isSidebarToggled: function () {
        return $body.hasClass('aside-toggled');
      },
      isMobile: function () {
        return $win.width() < APP_MEDIAQUERY.tablet;
      }
    };
}]);
/**=========================================================
 * Module: filters.js
 * Common userful filter
 =========================================================*/

App.filter("percentage", ["$filter", function ($filter) {
  return function (input, decimals) {
    return $filter('number')(input * 100, decimals || 0) + '%';
  }
}]);

App.filter("moment", function () {
  return function (input, format) {
    return moment(input).format(format || 'YYYY-MM-DD HH:mm:ss');
  }
});

App.filter("moment_unix", function () {
  return function (input, format) {
    return moment.unix(input).format(format || 'YYYY-MM-DD HH:mm:ss');
  }
});

/**=========================================================
 * Module: login-filter.js
 * Login filter
 =========================================================*/

App.filter("loginError", function () {
  var dictionary =  {
    "login failed": '登录失败'
  }
  return function (state) {
    return dictionary[state]
  }
})

/**=========================================================
 * Module: Mass filters.js
 * Mass filter
 =========================================================*/

App.filter("mass_filter", ["$filter", function ($filter) {
  return function (input) {
    if(input && input.region){ 
      var desc = input.region.province;
      desc += input.region.city||'';
      return desc+"用户";
    };
    return "全部用户";
  }
}]);


/**=========================================================
 * Module: test-filter.js
 * Test task filter
 =========================================================*/

App.filter("testState", function () {
  var dictionary =  {
    testing: '系统扫描中...',
    pass: '正常',
    error: '故障',
    repairing: '系统修复中...',
    repaired: '修复',
    broken: '故障'
  }
  return function (state) {
    return dictionary[state]
  }
})

.filter("testCountError", function () {
  return function (items) {
    var errors = items.reduce(function (previousValue, currentValue) {
      if(currentValue.state !== 'pass') previousValue++
      return previousValue
    }, 0)
    return errors
  }
})

.filter("testRepairedPercent", function () {
  return function (items) {
    var errors = 0
    var repaireds = 0
    items.forEach(function (item) {
      if(item.state !== 'pass') errors++
      if(item.state === 'repaired') repaireds++
    })
    
    return errors ? Math.round(repaireds*100/errors)+'%': 'N/A'
  }
})
// To run this code, edit file 
// index.html or index.jade and change
// html data-ng-app attribute from
// angle to myAppName
// ----------------------------------- 

var myApp = angular.module('myAppName', ['angle']);

myApp.run(["$log", function($log) {

  $log.log('I\'m a line from custom.js');

}]);

myApp.config(["RouteHelpersProvider", function(RouteHelpersProvider) {

  // Custom Route definition
  
}]);

myApp.controller('oneOfMyOwnController', ["$scope", function($scope) {
  /* controller code */
}]);

myApp.directive('oneOfMyOwnDirectives', function() {
  /*directive code*/
});

myApp.config(["$stateProvider", function($stateProvider /* ... */) {
  /* specific routes here (see file config.js) */
}]);
