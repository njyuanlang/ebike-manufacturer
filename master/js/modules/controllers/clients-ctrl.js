/**=========================================================
 * Module: clients-ctrl.js
 * Clients Controller
 =========================================================*/

App.controller('ClientsController', function ($scope, Bike, ngTableParams) {
  
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
        opt.where.username = {like: $scope.filter.text}
      }
      Bike.findUsersByManufacturer({filter:opt}, $defer.resolve)
      Bike.countUserByManufacturer({where: opt.where}, function (result) {
        $scope.tableParams.total(result.count)
      })
    }
  })   
})