
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
        this.networkSelected = null;
        this.databaseSelected = null;
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
            method: 'GET',
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
        let self = this;
        this.databases.forEach(function(c) {
            if (c.name === database.options[database.selectedIndex].text) { //appena trovo il database giusto aggiungo nel json della rete
                self.databaseSelected = c;
                url = c.url;
                name = c.database;
            }
        });

        var req = {
            method: 'GET',
            url: url+'/query?db='+name+"&q=SHOW FIELD KEYS"

        };

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

    sendUpdates(){
        let table = document.getElementById("tables");
        let column = document.getElementById("columns");
        let node = document.getElementById("nodes");
        let self = this;
        this.networkSelected.nodes.forEach(function(n){
           if (n.name === node.options[node.selectedIndex].text){
               n.sensor.databaseSensorUrl = self.databaseSelected.url;
               n.sensor.databaseSensorUser = self.databaseSelected.user;
               n.sensor.databaseSensorPassword = self.databaseSelected.password;
               n.sensor.databaseSensorName = self.databaseSelected.database;
               n.sensor.databaseSensorTable = table.options[table.selectedIndex].text;
               n.sensor.databaseSensorColumn = column.options[column.selectedIndex].text;
           }
        });
        //TODO UPDATE rete esistente sul server
        console.log(this.networkSelected);
    }
}

ModifyNetworkCtrl.templateUrl = 'public/plugins/grafana-example-app/component/modify_network/modifyNet.html';

export {
    ModifyNetworkCtrl
};