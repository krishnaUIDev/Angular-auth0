
(function() {

    'use strict';

    angular.module('slmfreeman')
        .controller('profileController', profileController);


    function profileController($http, store){
        var vm = this;
        vm.getMessage = getMessage;
        vm.getSecretMessage = getSecretMessage;
        vm.token = store.get('id_token');
        vm.message;

        vm.profile = store.get('profile');

        function getMessage(){
          $http.get('http://localhost:8080/api/public', {
              skipAuthorization: true
          }).then(function(response){
            vm.message = response.data.message;
          });
        }

        function getSecretMessage() {
            $http.get('http://localhost:8080/api/private', {
                Authorization: 'Bearer ' + vm.token
            }).then(function(response){
                vm.message = response.data.message;
            }).catch(function(response){
                console.log(response);
            });
        }
    }

})();