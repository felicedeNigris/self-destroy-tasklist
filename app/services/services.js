

var ToDo = angular.module('ToDo',['ngRoute','firebase']);

ToDo.factory('DataFactory', [ "$firebaseArray", "$scope" ,function($scope, $firebaseArray){

      var myData = new Firebase("https://mia-lista.firebaseio.com/ToDos"); //create Firebase obj

      var todos = $firebaseArray(myData); //Reading Database & adding to todos variable

      return{

          getTodos : function(todos){
            return $scope.todos;
          },
          
          addNewTodo : function(newtodo){
            var datecreated = new Date().toString();
            $scope.todos.$add({'title':$scope.newtodo,'done':false, 'timetag': datecreated}); //push to array
            $scope.newtodo='';
          },

          clearFinished : function(todo){ //clear completed tasks
            $scope.todos.forEach(function(todo){ //for each todo if 'todo.done' , remove it.
              if(todo.done){
                $scope.todos.$remove(todo);
                }
              }
            );
          },

          markAsDone : function(todo){
            $scope.todos.$save(todo); //saves todo state when is checked
            $scope.historytodos.push(todo); //push to history array 
            
          },

          Priority : function($index){
            var toMove = $scope.todos[$index]; //save copy of $index todo
          
             $scope.todos.splice($index,1); //removes item at $index 
             $scope.todos.splice(0,0, toMove); //adds item toMove to the start of array

             var backup = $scope.todos; //copy back up array

             for(var b = 0; b<= $scope.todos.length; b++){
              $scope.todos.$remove($scope.todos[b]); //remove items from array
             }
             for(var i = 0; i<= backup.length; i++){
              $scope.todos.$add(backup[i]); // add items from back up array
             }
         },
       };
    }
]);