angular.module('buscapi').controller('IntegrationController', function($scope, $http) {

    $scope.Mensagem = "";

    $scope.obterPedido = function(numeroPedido) {
        
        var obj = {
            "user": {
                "password": "buscapigama8",
                "email": "daniellalopes2@gmail.com"
            }
        }
        
        $http.post('https://www.loggi.com/api/v1/usuarios/login/', obj)
        .then(function(response) {
            var urlPedido = "https://www.loggi.com/api/v1/pedidos-status/" + numeroPedido + "/";

            var req = {
                method: 'GET',
                url: urlPedido,
                headers: {
                    'Authorization': "ApiKey daniellalopes2@gmail.com:" + response.data.api_key
                }
            }

            $http(req).then(function successCallback(response) {
                switch (response.data.status) {
                    case "allocating":
                        $scope.Mensagem = "Pedido em alocação, procurando um mensageiro para atendê-lo.";
                        break;
                    case "accepted":
                        $scope.Mensagem = "Pedido aceito, mensageiro a caminho.";
                        break;
                    case "started":
                        $scope.Mensagem = "Mensageiro já chegou ao menos no primeiro ponto.";
                        break;
                    case "finished":
                        $scope.Mensagem = "Pedido finalizado.";
                        break;
                    case "cancelled":
                        $scope.Mensagem = "Pedido cancelado, sem cobrança.";
                        break; 
                    case "cancelledWithCharge":
                        $scope.Mensagem = "Pedido cancelado com cobrança..";
                        break;   
                    default:
                        break;
                }
                console.log(response.data);
            }, function errorCallback(response) {
                if (response.status == 404) {
                    $scope.Mensagem = "Pedido não encontrado";
                } else {
                    $scope.Mensagem = "Ocorreu um erro inesperado.";
                }
            })
        });
    };
});