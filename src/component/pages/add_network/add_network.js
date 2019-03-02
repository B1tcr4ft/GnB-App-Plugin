import {Network} from "gnb-network/es6";
import { saveNetwork } from '../../../utils/network-util'

//TODO handle errors
class AddNetworkCtrl {

    constructor($scope, $injector, $http, backendSrv) {
        this.$scope = $scope;
        this.$injector = $injector;
        this.$http = $http;
        this.backendSrv = backendSrv;

        this.databases = [];
        this.backendSrv.get('api/datasources').then(res => this.databases = res);
    }

    loadNetwork() {
        let f = document.getElementById('upload').files[0];
        let r = new FileReader();

        r.onload = e => {
            let contents = JSON.parse(e.target.result);
            //let network = Network.fromJSON(contents); //TODO use Network class to check for errors
            let database = document.getElementById("databases");
            let databaseID = this.databases.find(c => c.name === database.options[database.selectedIndex].text);

            contents.databaseWriteName = databaseID.database;
            contents.databaseWriteUrl = databaseID.url;
            contents.databaseWriteUser = databaseID.user;
            contents.databaseWritePassword = databaseID.password;

            saveNetwork(this.$http, contents).then(data => {}, error => console.log(error));
        };
        r.readAsText(f);
    }
}

AddNetworkCtrl.templateUrl = 'public/plugins/gnb/component/pages/add_network/add_network.html';

export {
    AddNetworkCtrl
};