var ToDo = angular.module('ToDo',['ngRoute','firebase']);


    ToDo.config(['$routeProvider','$locationProvider',function($routeProvider, $locationProvider) {
      $routeProvider.when('/',{templateUrl:"views/taskbar_view.html"});
      $routeProvider.otherwise({redirectTo: '/'});
      $locationProvider.html5Mode({enabled:true, requireBase: false});
      
    }]);


    ToDo.controller('todoController',["$scope","$firebaseArray",function($scope, $firebaseArray){ // injecting AngularFire 
 
      
      var myData = new Firebase("https://f07yl5amjvh.firebaseio-demo.com/ToDos"); //create Firebase obj
      $scope.todos = $firebaseArray(myData); //Reading Database and adding to todos variable 

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

      $scope.clearByDay = function(){
        $scope.datecreated = new Date();
        for(var todoIt = 0; todoIt< todos.length; todoIt ++){
          if($scope.todos[todoIt].timetag - $scope.datecreated.getDay() === 6 || $scope.datecreated.getDay() - $scope.todos[todoIt].timetag === 6){
            delete $scope.todos[todoIt];
          }
        }
      };
    }]);
 
