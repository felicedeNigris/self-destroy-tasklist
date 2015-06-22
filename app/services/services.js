//angular.module('todoService',[])
/*
Todo.factory('ToDoData', ["$scope","$firebaseArray", function($scope, $firebaseArray){ 

    var myData = new Firebase("https://mia-lista.firebaseio.com/ToDos"); //create Firebase obj
      $scope.todos = $firebaseArray(myData); //Reading Database and adding to todos variable 

      //$scope.historytodos = [{'title': "Old Task", 'done':true, 'timetag':new Date().toString()}];

      $scope.addTodo = function(){

      var datecreated = new Date().toString();
        
      $scope.todos.$add({'title':$scope.newtodo,'done':false, 'timetag': datecreated}); //push to Array 
  
      $scope.newtodo = '';
    };
});

*/