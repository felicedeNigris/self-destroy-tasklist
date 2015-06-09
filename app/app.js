var ToDo = angular.module('ToDo',['ngRoute']);


    ToDo.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
      $routeProvider.when('/taskbar_view',{templateUrl:"views/taskbar_view.html"});
      $routeProvider.otherwise({redirectTo: '/taskbar_view'});
      $locationProvider.html5Mode({enabled:true, requireBase: false});
      
    }]);


    ToDo.controller('todoController',["$scope",function($scope){
      $scope.todos = [
        {'title': 'Get Oil Change', 'done':false}
      ];
      
      $scope.addTodo = function(){
        $scope.todos.push({'title':$scope.newtodo,'done':false});
        $scope.newtodo = '';
      };
      $scope.clearCompleted = function(){
        $scope.todos = $scope.todos.filter(function(item){
          return !item.done;
        });
      };
      
    }]);
 
