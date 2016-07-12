/**
 * Created by Bhalani on 4/22/2016.
 */
function TodoCtrl($scope) {
    $scope.todos = [];
    $scope.markAll = false;
    $scope.addTodo = function(){
        if(event.keyCode == 13 && $scope.todoText)
        {
            $scope.todos.push({text:$scope.todoText, done:false});
            $scope.todoText ="";
        }
    };
    $scope.isTodo = function(){
        return $scope.todos.legth > 0;
    }
    $scope.toggleEditMode = function (){
        $(event.target).closest('li').toggleClass('editing');
    };
    $sope.remaining = function () {
        var count = 0;
        angular.forEach ($scope.todos, function(todo) {
            count += todo.done ? 0 :1; });
        return count;
    };
    $scope.hasDone - function() {
        return ($scope.todos.length != $scope.remaining());
    }
    $scope.itemText = function(){
        return ($scope.todos.length - $scope.remaining() > 1) ? "items" : "item";
    };
    $scope.toggleMarkAll = function() {
        angular.forEach ($scope.todos, function (todo) {
            todo.done = $scope.markAll;
        });
    };

    $scope.clear = function(){
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEarch(oldTodos, function(todo){
            if (!todo.done) $scope.todos.push(todo);
        });
    };
}