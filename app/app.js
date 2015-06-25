(function(angular){
    'use strict';

var ToDo = angular.module('ToDo',['ngRoute','firebase','DataFactory']);


    ToDo.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
      $routeProvider.when('/',{
        templateUrl:"views/taskbar_view.html"
      });
      $routeProvider.when('/history',{
        templateUrl:"views/history.html"
      });
      $routeProvider.otherwise({
        redirectTo: "/"
      });
      $locationProvider.html5Mode({
        enabled:true, requireBase: false
      });
      
    }]);



    ToDo.controller('todoController', function($scope, $firebaseArray, DataFactory){ // injecting AngularFire & ToDoData Service 
 

      $scope.addTodo = function(newtodo){
        DataFactory.addNewTodo(newtodo);
      };

      $scope.clearCompleted = function(todo){
        DataFactory.clearFinished(todo);
      };

      $scope.clickDone = function(todo){
        DataFactory.markAsDone(todo);
      };

      $scope.moveUpPriority = function($index){
        DataFactory.Priority($index);
      };

    });

})(window.angular);



 
