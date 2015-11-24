/**=========================================================
 * Module: clients-ctrl.js
 * Clients Controller
 =========================================================*/

App.controller('ClientsController', function ($scope, Bike, ngTableParams, LoopBackAuth, $http, $document, $timeout, urlBase) {
  
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
  
})