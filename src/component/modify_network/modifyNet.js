
class ModifyNetworkCtrl {

    constructor($scope, $injector, $http, backendSrv) {
        this.$scope = $scope;
        this.$injector = $injector;
        this.$http = $http;
        this.backendSrv = backendSrv;

        this.databases = [];
        this.networks = [];
        this.nodes = [];
        this.tables = [];
        this.columns = [];
        this.networkSelected;
        this.getDatabases();
        this.getNetworks();
    }

    testInflux(db) {
        return db.type === "influxdb";
    }
    getDatabases() {
        this.backendSrv.get('api/datasources').then((res) => {
            this.databases = res.filter(this.testInflux);
        });
    }

    getNetworks() {
        var req = {
            method: 'POST',
            //url: 'https://api.bitcraftswe.it/api/save/78',
            url: 'https://api.bitcraftswe.it/api/retrieve/all'
        };

        this.$http(req).then((res) => {
            this.networks = res.data;
        });
    }

    getNodes(){
        let network = document.getElementById("networks");
        var idRete = null;
        this.networks.forEach(function(c){
            if(c.name === network.options[network.selectedIndex].text) {
                 idRete = c.id;
            }
        });

        var req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/retrieve/'+idRete
        };

        var self = this;
        this.$http(req).then((res) => {
            self.nodes = res.data.nodes;
            this.networkSelected = res.data;
            console.log(this.networkSelected);
        });

    }

    getTables(){
        let database = document.getElementById("databases");
        let url;
        let name;
        this.tables = [];
        this.databases.forEach(function(c) {
            if (c.name === database.options[database.selectedIndex].text) { //appena trovo il database giusto aggiungo nel json della rete
                url = c.url;
                name = c.database;
            }
        });

        var req = {
            method: 'GET',
            url: url+'/query?db='+name+"&q=SHOW FIELD KEYS"

        };

        let self = this;
        this.$http(req).then((res) => {
            res.data.results[0].series.forEach(function (t){
                self.tables.push(t);
            });
        });
    }

    getColumns(){
        let self = this;
        let table = document.getElementById("tables");
        this.columns = [];
        this.tables.forEach(function (t) {
            if (t.name === table.options[table.selectedIndex].text){
                t.values.forEach(function(c){
                    self.columns.push(c);
                });
            }
        });
    }
}

ModifyNetworkCtrl.templateUrl = 'public/plugins/grafana-example-app/component/modify_network/modifyNet.html';

export {
    ModifyNetworkCtrl
};