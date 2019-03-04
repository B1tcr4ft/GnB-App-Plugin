import { appEvents } from 'grafana/app/core/core';
import {getNetwork, getNetworkList, updateNetwork} from "../../../utils/network-util";

class ModifyNetworkCtrl {

    constructor($scope, $injector, $http, backendSrv) {
        this.$scope = $scope;
        this.$injector = $injector;
        this.$http = $http;
        this.backendSrv = backendSrv;

        //TODO async
        this.databases = [];
        this.backendSrv.get('api/datasources').then(
            data => this.databases = data.filter(db => db.type === "influxdb"),
            error => appEvents.emit('alert-error', ['GnB App Error', error])
        );

        //TODO async
        this.networks = [];
        getNetworkList(this.$http).then(
            data => this.networks = data,
            error => appEvents.emit('alert-error', ['GnB App Error', error])
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
            error => appEvents.emit('alert-error', ['GnB App Error', error])
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

        this.$http(req).then(
            res => res.data.results[0].series.forEach(t =>this.tables.push(t)),
            error => appEvents.emit('alert-error', ['GnB App Error', error])
        );
    }

    getColumnList() {
        let table = document.getElementById("tables");
        this.columns = this.tables.find(c => c.name === table.options[table.selectedIndex].text).values;
    }

    update() {
        let table = document.getElementById("tables");
        let column = document.getElementById("columns");
        let node = document.getElementById("nodes");

        this.networkSelected.nodes.forEach(c => {
            if(c.name === node.options[node.selectedIndex].text) {
                c.sensor.databaseSensorUrl = this.databaseSelected.url;
                c.sensor.databaseSensorUser = this.databaseSelected.user;
                c.sensor.databaseSensorPassword = this.databaseSelected.password;
                c.sensor.databaseSensorName = this.databaseSelected.database;
                c.sensor.databaseSensorTable = table.options[table.selectedIndex].text;
                c.sensor.databaseSensorColumn = column.options[column.selectedIndex].text;
            }
        });

        console.log(JSON.stringify(this.networkSelected)); //TODO UPDATE rete esistente sul server
        updateNetwork(this.$http, this.networkSelected.id, this.networkSelected).then(
            data => appEvents.emit('alert-success', ['Network ' + this.networkSelected.name, data]),
            error => appEvents.emit('alert-warning', ['Network ' + this.networkSelected.name, error])
        );
    }
}

ModifyNetworkCtrl.templateUrl = 'public/plugins/gnb/component/pages/edit_network/edit_network.html';

export { ModifyNetworkCtrl };