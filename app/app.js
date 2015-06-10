var ToDo = angular.module('ToDo',['ngRoute']);


    ToDo.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
      $routeProvider.when('/',{templateUrl:"views/taskbar_view.html"});
      $routeProvider.otherwise({redirectTo: '/'});
      $locationProvider.html5Mode({enabled:true, requireBase: false});
      
    }]);


    ToDo.controller('todoController',["$scope",function($scope){
      $scope.todos = [
        {'title': 'Get Oil Change', 'done':false}
      ];
      
      $scope.addTodo = function(){
        $scope.datecreated = new Date();
        $scope.myData = new Firebase("https://f07yl5amjvh.firebaseio-demo.com/ToDos");
        $scope.todos.push({'title':$scope.newtodo,'done':false, 'timetag': $scope.datecreated.getDay() });
        $scope.myData.push({'title':$scope.newtodo, 'done':false, 'timetag': $scope.datecreated.getDay() }); //push to Firebase
        $scope.newtodo = '';
      };
      $scope.clearCompleted = function(){
        $scope.todos = $scope.todos.filter(function(item){
          return !item.done;
        });
      };
      $scope.clearByDay = function(){
        $scope.datecreated = new Date();
        for(var todoIt = 0; todoIt< todos.length; todoIt ++){
          if($scope.todos[todoIt].timetag - $scope.datecreated.getDay() === 6 || $scope.datecreated.getDay() - $scope.todos[todoIt].timetag === 6){
            delete $scope.todos[todoIt];
          }
        }
      }
    }]);
 
