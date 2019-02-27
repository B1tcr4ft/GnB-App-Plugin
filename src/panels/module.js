import { PanelCtrl } from 'grafana/app/plugins/sdk';

// Remove up to here

class Ctrl extends PanelCtrl {

  constructor($scope, $injector) {
    super($scope, $injector);
    //this.initStyles();
  }

  /*initStyles() {
    window.System.import(this.panelPath + 'css/style.css!');
    // Remove next lines if you don't need separate styles for light and dark themes
    f (grafanaBootData.user.lightTheme) {
      window.System.import(this.panelPath + 'css/panel.light.css!');
    } else {
      window.System.import(this.panelPath + 'css/panel.dark.css!');
    }
    // Remove up to here
  }*/

  get panelPath() {
    if (this._panelPath === undefined) {
      this._panelPath = `/public/plugins/${this.pluginId}/`;
    }
    return this._panelPath;
  }
  
}

Ctrl.templateUrl = 'panels/partials/template.html';

export { Ctrl as PanelCtrl };
