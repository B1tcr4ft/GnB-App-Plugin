import { PanelCtrl } from 'grafana/app/plugins/sdk'; // will be resolved to app/plugins/sdk


// Remove up to here

class Ctrl extends PanelCtrl {

  constructor($scope, $injector) {
    super($scope, $injector);
  }

  link(scope, element) {
    this.initStyles();
    this.prova();
  }

  prova(){
    var jsbayes=require('jsbayes');
    var jsbayesviz=require('jsbayes-viz');

    var g = jsbayes.newGraph();
    var n1 = g.addNode('n1', ['true', 'false']);
    var n2 = g.addNode('n2', ['true', 'false']);
    var n3 = g.addNode('n3', ['true', 'false']);

    n2.addParent(n1);
    n3.addParent(n2);
    console.log(g);

    g.reinit();
    g.sample(20000);

    let draw = jsbayesviz.fromGraph(g);

    jsbayesviz.draw({
      id: '#bbn',
      width: 800,
      height: 800,
      graph: draw,
      samples: 15000
    });
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

Ctrl.template = '<svg id="bbn"></svg>';

export { Ctrl as PanelCtrl };
