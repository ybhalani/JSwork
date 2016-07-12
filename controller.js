/**
 * Created by yashbhalani on 6/16/16.
 */

angular.module('Aytgebtucation')
.controller('LoginController',
        ['$scope' , '$rootScope', '$location', 'AuthenticationService' , 
        
            function ($scope , $rootScope, $location, AuthenticationService ) {
                
                AuthenticationService.ClearCredentials();
                
                $scope.login = function () {
                    
                    $scope.dataLoading = true;
                    AuthenticationService.Login($scope.username , $scope.password, function (response) {
                        
                        if(response.success){
                            AuthenticationService.SetCredentials($scope.username, $scope.password);
                            $location.path('/');
                            
                        }
                        else {
                            $scope.error = response.message;
                            $scope.dataLoading = false;
                        }
                        
                    });
                    
                    
                };
                
            }
        ]  
);

$('#getCompaniesBtn').click(function () {
    
})