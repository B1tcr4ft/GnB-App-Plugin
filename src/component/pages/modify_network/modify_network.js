import {getNetwork, getNetworkList} from "../../../utils/network-util";

//TODO handle errors
class ModifyNetworkCtrl {

    constructor($scope, $injector, $http, backendSrv) {
        this.$scope = $scope;
        this.$injector = $injector;
        this.$http = $http;
        this.backendSrv = backendSrv;

        this.databases = [];
        this.backendSrv.get('api/datasources').then(data => this.databases = data.filter(db => db.type === "influxdb"));

        this.networks = [];
        getNetworkList(this.$http).then(
            data => this.networks = data,
            error => console.log(error)
        );

        this.nodes = [];
        this.tables = [];
        this.columns = [];
        this.networkSelected = null;
        this.databaseSelected = null;
    }

    getNodeList() {
        let network = document.getElementById("networks");
        let networkID = this.networks.find(c => c.name === network.options[network.selectedIndex].text).id;

        getNetwork(this.$http, networkID).then(
            data => {
                this.nodes = data.nodes;
                this.networkSelected = data;
            },
            error => console.log(error)
        );
    }

    getTables() {
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

ModifyNetworkCtrl.templateUrl = 'public/plugins/gnb/component/pages/modify_network/modify_network.html';

export {
    ModifyNetworkCtrl
};