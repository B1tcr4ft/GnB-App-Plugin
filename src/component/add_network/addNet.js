import {Network} from "gnb-network/es6/src/network";

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
        this.backendSrv.get('api/datasources').then((res) => {
            this.databases = res;
        });
    }

    inputFun () {
        let f = document.getElementById('upload').files[0];
        let r = new FileReader();
        let self = this;
        r.onload = function(e) {
            var contents = e.target.result;
            let database = document.getElementById("databases"); //html select database
            //var rete = JSON.parse(contents); //json rete inserita da file

            var rete;
            self.databases.forEach(function(c){
                if(c.name === database.options[database.selectedIndex].text) { //appena trovo il database giusto aggiungo nel json della rete
                    /*rete.databaseWriteName = c.database;
                    rete.databaseWriteUrl = c.url;
                    rete.databaseWriteUser = c.user;
                    rete.databaseWritePassword = c.password;*/
                    rete = Network.fromJSON(contents);
                }
            });

            console.log(rete);
            self.test(rete);
        };
        r.readAsText(f);
    }

    test(dati) {
        var req = {
            method: 'POST',
            //url: 'https://api.bitcraftswe.it/api/save/78',
            url: 'https://api.bitcraftswe.it/api/save/89',
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