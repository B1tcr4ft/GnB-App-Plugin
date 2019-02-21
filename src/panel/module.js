import {PanelCtrl} from  'app/plugins/sdk';
import '../css/example-app.css!'
import 'bayes.js'

class ExampleAppPanelCtrl extends PanelCtrl {

  constructor($scope, $injector) {
    super($scope, $injector);
  }

}
ExampleAppPanelCtrl.template = '<svg id="bbn"></svg>';

$(document).ready(function() {
  $.getJSON('exampleA.json', function (data) {
    let graph = getGraph(data);

    let g = jsbayesviz.fromGraph(graph);

    jsbayesviz.draw({
      id: '#bbn',
      width: 800,
      height: 800,
      graph: g,
      samples: 15000
    });
  });
});

export {
  ExampleAppPanelCtrl as PanelCtrl
};

