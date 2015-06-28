

var ToDo = angular.module('ToDo',[]);

ToDo.service('DataFactory', ["$firebase", "$firebaseArray", "$scope" ,function($scope, $firebase, $firebaseArray){

      var myData = new Firebase("https://mia-lista.firebaseio.com/ToDos"); //create Firebase obj

      var todos = $firebaseArray(myData); //Reading Database & adding to todos variable

      return{

          getTodos : function(){
            return todos;
          },
          
          addNewTodo : function(newtodo){
            var datecreated = new Date().toString();
            todos.$add({'title':$scope.newtodo,'done':false, 'timetag': datecreated}); //push to array
            $scope.newtodo='';
          },

          clearFinished : function(todo){ //clear completed tasks
            todos.forEach(function(todo){ //for each todo if 'todo.done' , remove it.
              if(todo.done){
                todos.$remove(todo);
                }
              }
            );
          },

          markAsDone : function(todo){
            todos.$save(todo); //saves todo state when is checked
            //$scope.historytodos.push(todo); //push to history array 
            
          },

          Priority : function($index){
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
         },
       };
    }
]);
