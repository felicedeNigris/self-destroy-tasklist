
var ToDo = angular.module('ToDo',['ngRoute','firebase']);

//SERVICE

ToDo.service("TodoService",function($firebaseArray){

  var ref = new Firebase("https://mia-lista.firebaseio.com/ToDos"); //create Firebase obj
  
  var todoArray = $firebaseArray(ref); //add (private variable)
  
  this.getTodos = function(){
    return todoArray; //Reading Database & adding to todos variable
  };

  this.addTodo = function(newtodo){
    return todoArray.$add(newtodo); //push to array
  };

  this.updateTodo = function(todo){
    return todoArray.$save(todo); // saves todo state (as done or not done)
  };

  this.clearTodo = function(){
  
    todoArray.forEach(function(todo){ //for each todo if 'todo.done' , remove it.
      if(todo.done){
        todoArray.$remove(todo);
        }
      }
    );
  };
});


//  var datecreated = new Date().toString(); //date obj
/*
.factory("PriorityFactory", function(TodoFactory){
  function Priority($index){
  var toMove = todos[$index]; //save copy of $index todo
          
    todos.splice($index,1); //removes item at $index 
    todos.splice(0,0, toMove); //adds item toMove to the start of array

    var backup = todos; //copy back up array

    for(var b = 0; b<= todos.length; b++){
    todos.$remove(todos[b]); //remove items from array
    }
    for(var i = 0; i<= backup.length; i++){
    todos.$add(backup[i]); // add items from back up array
    }
  }
  return Priority($index); 
});
*/



// CONFIG

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



//CONTROLLERS

    ToDo.controller('todoController',['$scope','TodoService',function($scope,TodoService){ // injecting AngularFire & Factory
      
      $scope.todos = TodoService.getTodos();
      
      $scope.newtodo = {'title':'','done':false,'timetag':new Date().toString()};
      
      $scope.addTodo = function(){
        console.log($scope.newtodo);
        TodoService.addTodo($scope.newtodo); //add title to todo array
      };

      $scope.clearCompleted = function(todo){
        TodoService.clearTodo(todo);
      };

      $scope.clickDone = function(todo){
        todo.done = true;
        TodoService.updateTodo(todo); //updates todo state
      };
      /*
      $scope.moveUpPriority = function($index){
        TodoService.Priority($index);
      };
      */
    }]);



 
