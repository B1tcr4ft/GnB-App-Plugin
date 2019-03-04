import {loadPluginCss, PanelCtrl} from 'grafana/app/plugins/sdk';

loadPluginCss({
    dark: 'plugins/gnb/css/gnb.dark.css'
});

class AdministrationCtrl extends PanelCtrl {

    constructor($scope, $injector) {
        super($scope, $injector);
    }

}

AdministrationCtrl.templateUrl = 'component/modules/administration/administration.html';

export {AdministrationCtrl as PanelCtrl};