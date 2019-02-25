import { PanelCtrl } from 'grafana/app/plugins/sdk';

// Remove up to here

class Ctrl extends PanelCtrl {

  constructor($scope, $http) {
    super($scope, $http);
    this.$http = $http;
  }

  link(scope, element) {
    this.initStyles();
  }

  inputFun () {
    var f = document.getElementById('upload').files[0];
    var r = new FileReader();
    var self = this;
    r.onload = function(e) {
      var contents = e.target.result;
      console.log(contents);
      self.test(contents);
    };
    r.readAsText(f);
  }
  test(dati) {
    var req = {
      method: 'POST',
      //url: 'https://api.bitcraftswe.it/api/save/78',
      url: 'http://localhost:8000/api/save/78',
      headers: {
        'Content-Type': 'application/json'
      },
      data: dati
    };

    this.$http(req)
        .then((res)=>{console.log(res.headers.toString())}, (res)=>{console.log("non va")});
  }

  initStyles() {
    window.System.import(this.panelPath + 'css/panel.base.css!');
    // Remove next lines if you don't need separate styles for light and dark themes
    if (grafanaBootData.user.lightTheme) {
      window.System.import(this.panelPath + 'css/panel.light.css!');
    } else {
      window.System.import(this.panelPath + 'css/panel.dark.css!');
    }
    // Remove up to here
  }

  get panelPath() {
    if (this._panelPath === undefined) {
      this._panelPath = `/public/plugins/${this.pluginId}/`;
    }
    return this._panelPath;
  }
  
}

Ctrl.templateUrl = 'panels/partials/template.html';

export { Ctrl as PanelCtrl };
