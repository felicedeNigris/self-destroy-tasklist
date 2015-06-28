
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

  this.prioritize= function($index){
    var toMove = todoArray[$index]; //save copy of $index todo
          
    todoArray.splice($index,1); //removes item at $index 
    todoArray.splice(0,0, toMove); //adds item toMove to the start of array

    var backup = todoArray; //copy back up array

    for(var b = 0; b<= todoArray.length; b++){
    todoArray.$remove(todoArray[b]); //remove items from array
    }
    for(var i = 0; i<= backup.length; i++){
    todoArray.$add(backup[i]); // add items from back up array
    }
  
  };
  
});

ToDo.service("HistoryService",function($firebaseArray){

  var historyRef = new Firebase("https://mia-lista.firebaseio.com/"+"history"); //link to firebase 

  var historyArray = $firebaseArray(historyRef); // create a history array 

  this.getHistory = function(){
    return historyArray; //returns historyArray
  };

  this.addtoHistory = function(todo){
    return historyArray.$add(todo);
  };

  this.clearAll = function(todo){
    historyArray.forEach(function(todo){ //for each todo if 'todo.done' , remove it.
        historyArray.$remove(todo);
        }
    );
  };

});

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

    ToDo.controller('todoController',['$scope','TodoService', 'HistoryService', function($scope,TodoService, HistoryService){ // injecting AngularFire & Factory
      
      $scope.todos = TodoService.getTodos();
      
      $scope.newtodo = {'title':'','done':false,'timetag':new Date().toString()};

      $scope.historytodos = HistoryService.getHistory(); // get history object

      $scope.addhistory = {'title':''}; // blank history todo array
      
      $scope.addTodo = function(){
        //console.log($scope.newtodo);
        TodoService.addTodo($scope.newtodo); //add title to todo array
      };

      $scope.clearCompleted = function(todo){
        TodoService.clearTodo(todo);
      };

      $scope.clickDone = function(todo){
        TodoService.updateTodo(todo); //updates todo state
        HistoryService.addtoHistory(todo); //add done todo to history array
      };
      
      $scope.moveUpPriority = function($index){
        TodoService.prioritize($index);
      };

      $scope.clearHistory = function(todo){
        HistoryService.clearAll(todo);
      };
      
    }]);



 
