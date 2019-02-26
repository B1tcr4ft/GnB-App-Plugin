
class AddNetworkCtrl {

    constructor($scope, $injector, $http, backendSrv) {
        this.$scope = $scope;
        this.$injector = $injector;
        this.$http = $http;
        this.backendSrv = backendSrv;
        this.databases = [];
        this.getDatabases();
    }

    getDatabases() {
        var self=this;
        var g =self.backendSrv.get('api/datasources');
        console.log(g);
    }

    inputFun () {
        var f = document.getElementById('upload').files[0];
        var r = new FileReader();
        var self = this;
        r.onload = function(e) {
            var contents = e.target.result;
            console.log(contents);
            self.test(contents);
        };
        r.readAsText(f);
    }

    test(dati) {
        var req = {
            method: 'POST',
            //url: 'https://api.bitcraftswe.it/api/save/78',
            url: 'https://api.bitcraftswe.it/api/save/88',
            headers: {
                'Content-Type': 'application/json'
            },
            data: dati
        };

        this.$http(req);
    }
}

AddNetworkCtrl.templateUrl = 'public/plugins/grafana-example-app/component/add_network/addNet.html';

export {
    AddNetworkCtrl
};