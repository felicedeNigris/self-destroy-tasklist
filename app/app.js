var ToDo = angular.module('ToDo',['ngRoute','firebase']);


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


    ToDo.controller('todoController',["$scope","$firebaseArray",function($scope, $firebaseArray){ // injecting AngularFire 
 
      
      var myData = new Firebase("https://f07yl5amjvh.firebaseio-demo.com/ToDos"); //create Firebase obj
      $scope.todos = $firebaseArray(myData); //Reading Database and adding to todos variable 
      $scope.historytodos = [];

      $scope.addTodo = function(){

        var datecreated = new Date().toString();
        
        $scope.todos.$add({'title':$scope.newtodo,'done':false, 'timetag': datecreated}); //push to Array 
  
        $scope.newtodo = '';
      };


      $scope.clearCompleted = function(){  // clear completed tasks
        $scope.todos.forEach(function(todo){ //for each todo if 'todo.done' , remove it.
          if(todo.done){
            $scope.todos.$remove(todo);
          }
        });
      };


      $scope.clickDone = function(todo){
        $scope.todos.$save(todo); //saves todo state when is checked
      };

      $scope.clearByDay = function(){  // clear completed tasks
        var today = new Date().getUTCDate();
        $scope.todos.forEach(function(todo){ //if todo is greater or equal to 2 delete
          if( today - todo.timetag.getUTCDate() >=2){
            $scope.todos.$remove(todo);
          }
        });
      };

      $scope.shoutOut = function(){
        console.log("Hello");
      };

      $scope.moveUpPriority = function($index){
        var toMove = $scope.todos[$index];
        delete $scope.todos[$index];
        $scope.todos.splice(0,0, toMove);
        $scope.todos.$save();
      };


    }]);
 
