import { PanelCtrl } from 'grafana/app/plugins/sdk';
import {loadPluginCss} from 'grafana/app/plugins/sdk';

loadPluginCss({
  dark: 'plugins/gnb/css/gnb.dark.css'
});

class AdministrationCtrl extends PanelCtrl {

  constructor($scope, $injector) {
    super($scope, $injector);
  }

  get panelPath() {
    if (this._panelPath === undefined) {
      this._panelPath = `/public/plugins/${this.pluginId}/`;
    }
    return this._panelPath;
  }
  
}

AdministrationCtrl.templateUrl = 'component/modules/administration/administration.html';

export { AdministrationCtrl as PanelCtrl };
