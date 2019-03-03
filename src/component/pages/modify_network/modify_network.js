import {getNetwork, getNetworkList} from "../../../utils/network-util";

//TODO handle errors
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
    }

    async getDatabaseListAsync() {
        await this.backendSrv.get('api/datasources').then(
            data => {
                this.databases = data.filter(db => db.type === "influxdb");
                return this.databases;
            },
            error => {
                console.log(error);
                return [];
            }
        );
    }

    async getNetworkListAsync() {
        await getNetworkList(this.$http).then(
            data => {
                this.networks = data;
                return this.networks;
            },
            error => {
                console.log(error);
                return [];
            }
        );
    }

    async getNodeList() {
        let network = document.getElementById("networks");
        let networkID = this.networks.find(c => c.name === network.options[network.selectedIndex].text).id;

        await getNetwork(this.$http, networkID).then(
            data => {
                this.nodes = data.nodes;
                this.networkSelected = data;
            },
            error => console.log(error)
        );
    }

    async getTableList() {
        let database = document.getElementById("databases");
        this.databaseSelected = this.databases.find(c => c.name === database.options[database.selectedIndex].text);

        let databaseURL = this.databaseSelected.url;
        let databaseName = this.databaseSelected.database;
        let databaseUsername = this.databaseSelected.user;
        let databasePassword = this.databaseSelected.password;

        let req = {
            method: 'GET',
            url: databaseURL + '/query?u=' + databaseUsername + '&p=' + databasePassword + '&db=' + databaseName + "&q=SHOW FIELD KEYS"
        };

        await this.$http(req).then(res => {
            res.data.results[0].series.forEach(t =>this.tables.push(t));
        });
    }

    async getColumnList() {
        let table = document.getElementById("tables");
        this.columns = await this.tables.find(c => c.name === table.options[table.selectedIndex].text).values;
    }

    updateNetwork() {
        let table = document.getElementById("tables");
        let column = document.getElementById("columns");
        let node = document.getElementById("nodes");

        this.networkSelected.nodes.forEach(function(n){
           if (n.name === node.options[node.selectedIndex].text){
               n.sensor.databaseSensorUrl = this.databaseSelected.url;
               n.sensor.databaseSensorUser = this.databaseSelected.user;
               n.sensor.databaseSensorPassword = this.databaseSelected.password;
               n.sensor.databaseSensorName = this.databaseSelected.database;
               n.sensor.databaseSensorTable = table.options[table.selectedIndex].text;
               n.sensor.databaseSensorColumn = column.options[column.selectedIndex].text;
           }
        });

        console.log(this.networkSelected); //TODO UPDATE rete esistente sul server
    }
}

ModifyNetworkCtrl.templateUrl = 'public/plugins/gnb/component/pages/modify_network/modify_network.html';

export { ModifyNetworkCtrl };