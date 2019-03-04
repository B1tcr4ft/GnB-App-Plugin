class CreateNetworkCtrl {

    constructor($scope, $injector, $http) {
        this.$scope = $scope;
        this.$injector = $injector;
        this.$http = $http;
    }

}

CreateNetworkCtrl.templateUrl = 'public/plugins/gnb/component/pages/create_network/create_network.html';

export { CreateNetworkCtrl };