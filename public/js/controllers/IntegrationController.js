angular.module('buscapi').controller('IntegrationController', function($scope, $http) {

    $scope.obterPedido = function(idPedido) {

        var apiKey;

        var obj = {
                "user": {
                    "password": "buscapigama8", 
                    "email": "daniellalopes2@gmail.com"
                }
            }

            $http.post('https://www.loggi.com/api/v1/usuarios/login/', obj)
            .then(function(response) {
                apiKey = response.data.api_key;
                $http.get('https://www.loggi.com/api/v1/pedidos-status/' + idPedido, {
                headers: {
                    'Authorization': 'ApiKey daniellalopes2@gmail.com:' + apiKey,
                    'content-type': 'application/json'
                }
            }).then(function(response) {
                console.log(response.data);
            });
        });    
    };
});