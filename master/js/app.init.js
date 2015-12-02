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
    
    AMap.service('AMap.DistrictSearch', function () {
      var districtSearch = new AMap.DistrictSearch({
        level : 'country',
        subdistrict : 2    
      });
    
      districtSearch.search('中国', function (status, result) {
        $rootScope.provinces = result.districtList[0].districtList;
      });
    });
    
}]);
