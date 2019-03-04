import {alert,AlertType} from "../../../utils/alert-util";
import {Network} from "gnb-network/es6";
import { saveNetwork } from '../../../utils/network-util'

class AddNetworkCtrl {

    constructor($scope, $injector, $http, backendSrv) {
        this.$scope = $scope;
        this.$injector = $injector;
        this.$http = $http;
        this.backendSrv = backendSrv;

        //TODO async
        this.databases = [];
        this.backendSrv.get('api/datasources').then(
            data => this.databases = data,
            error => alert(AlertType.ERROR, 'GnB App Error', error)
        );
    }

    loadNetwork() {
        let file = document.getElementById('upload').files[0];
        let fileReader = new FileReader();

        fileReader.onload = event => {
            let contents = JSON.parse(event.target.result);
            let network = Network.fromJSON(contents);
            let database = document.getElementById("databases");
            let databaseID = this.databases.find(c => c.name === database.options[database.selectedIndex].text);

            network.setDatabase(
                databaseID.database, databaseID.url,
                databaseID.user, databaseID.password
            );

            console.log(JSON.stringify(network.toJSON()));
            saveNetwork(this.$http, network.toJSON()).then(
                data => alert(AlertType.SUCCESS, 'Network ' + contents.name, data),
                error => alert(AlertType.WARNING, 'Network ' + contents.name, error)
            );
        };
        fileReader.readAsText(file);
    }
}

AddNetworkCtrl.templateUrl = 'public/plugins/gnb/component/pages/add_network/add_network.html';

export { AddNetworkCtrl };