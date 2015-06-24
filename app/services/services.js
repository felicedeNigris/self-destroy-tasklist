
Todo.value('fbURL', "https://mia-lista.firebaseio.com/ToDos")
.service('fbRef',function(fbURL){
  return new Firebase(fbURL);
});


//var myData = new Firebase("https://mia-lista.firebaseio.com/ToDos"); //create Firebase obj
  $scope.todos = $firebaseArray(myData); //Reading Database and adding to todos variable 
  return $scope.todos;



