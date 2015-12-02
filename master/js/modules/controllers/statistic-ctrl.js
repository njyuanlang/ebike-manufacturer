/**=========================================================
 * Module: statistic-ctrl.js
 * Statistic Controllers
 =========================================================*/

App.controller('StatisticBrandController', function ($scope, Bike, ngTableParams) {
  
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
        clickable: true,
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
  
  var filter = {};

  $scope.tableParams = new ngTableParams({
    count: 10,
  }, {
    getData: function($defer, params) {
      filter.beginDate = moment($scope.beginDate).valueOf();
      filter.endDate = moment($scope.endDate).valueOf();
      if($scope.region.city) {
        filter.where["owner.region"] = {
          province:$scope.region.province.name,
          city: $scope.region.city.name
        };
      } else if($scope.region.province) {
        filter.where = {"owner.region.province": $scope.region.province.name}
      }
      filter.limit = params.count();
      filter.skip = (params.page()-1)*filter.limit;
      Bike.statistic({filter:filter}, function (result) {
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
      });
    }
  })   
  
  $scope.goRoot = function () {
    filter = {
      where: {},
      groupBy: "brand.name"
    }    
    $scope.tableParams.reload();
  };
  $scope.goRoot();
  
  $scope.goSubCatagory = function (event, pos, item) {
    if(item) {
      filter.where = {"brand.name": $scope.tableParams.data[item.dataIndex]._id};
      filter.groupBy = "model";
      $scope.tableParams.reload();
    }
  };

  $scope.endDate = moment().format('YYYY-MM-DD')
  $scope.beginDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
  $scope.openeds = [false, false]
  $scope.open = function($event, index) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openeds[index] = true
    $scope.openeds[++index%2] = false
  };
  $scope.region = {};
})

App.controller('StatisticRegionController', function ($scope, Bike, ngTableParams, Brand) {
    
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
        clickable: true,
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
  
  var filter = {}

  $scope.tableParams = new ngTableParams({
    count: 10,
  }, {
    getData: function($defer, params) {
      filter.beginDate = moment($scope.beginDate).valueOf();
      filter.endDate = moment($scope.endDate).valueOf();
      if($scope.model) {
        filter.where.model = $scope.model;
      } else if($scope.brand) {
        filter.where["brand.id"] = $scope.brand.id;
      }
      filter.limit = params.count();
      filter.skip = (params.page()-1)*filter.limit;
      Bike.statistic({filter:filter}, function (result) {
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
        });
      });
    }
  })   
  
  $scope.goRoot = function () {
    filter = {
      where: {},
      groupBy: "owner.region.province"
    }    
    $scope.tableParams.reload();
  };
  $scope.goRoot();
  
  $scope.goSubCatagory = function (event, pos, item) {
    if(item) {
      filter.where = {"owner.region.province": $scope.tableParams.data[item.dataIndex]._id};
      filter.groupBy = "owner.region.city";
      $scope.tableParams.reload();
    }
  };

  $scope.endDate = moment().format('YYYY-MM-DD')
  $scope.beginDate = moment().subtract(30, 'days').format('YYYY-MM-DD')
  $scope.openeds = [false, false]
  $scope.open = function($event, index) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.openeds[index] = true
    $scope.openeds[++index%2] = false
  };
  $scope.brands = Brand.find({filter:{limit: 99999}});
})

App.controller('StatisticFaultController', function ($scope, Test, ngTableParams, Brand, ChinaRegion) {
  
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
})