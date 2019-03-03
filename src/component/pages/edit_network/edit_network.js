import {getNetwork, getNetworkList} from "../../../utils/network-util";

//TODO handle errors
class ModifyNetworkCtrl {

    constructor($scope, $injector, $http, backendSrv) {
        this.$scope = $scope;
        this.$injector = $injector;
        this.$http = $http;
        this.backendSrv = backendSrv;

        this.databases = [];
        this.backendSrv.get('api/datasources').then(
            data => this.databases = data.filter(db => db.type === "influxdb"),
            error => console.log(error)
        );

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

    getTableList() {
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

        this.$http(req).then(res => {
            res.data.results[0].series.forEach(t =>this.tables.push(t));
        });
    }

    getColumnList() {
        let table = document.getElementById("tables");
        this.columns = this.tables.find(c => c.name === table.options[table.selectedIndex].text).values;
    }

    updateNetwork() {
        let table = document.getElementById("tables");
        let column = document.getElementById("columns");
        let node = document.getElementById("nodes");
        let nodeID = this.networkSelected.nodes.find(c => c.name === node.options[node.selectedIndex].text);

        nodeID.sensor.databaseSensorUrl = this.databaseSelected.url;
        nodeID.sensor.databaseSensorUser = this.databaseSelected.user;
        nodeID.sensor.databaseSensorPassword = this.databaseSelected.password;
        nodeID.sensor.databaseSensorName = this.databaseSelected.database;
        nodeID.sensor.databaseSensorTable = table.options[table.selectedIndex].text;
        nodeID.sensor.databaseSensorColumn = column.options[column.selectedIndex].text;

        console.log(nodeID); //TODO UPDATE rete esistente sul server
    }
}

ModifyNetworkCtrl.templateUrl = 'public/plugins/gnb/component/pages/edit_network/edit_network.html';

export { ModifyNetworkCtrl };