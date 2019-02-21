import {PanelCtrl} from  'app/plugins/sdk';
import '../css/example-app.css!'

class ExampleAppPanelCtrl extends PanelCtrl {

  constructor($scope, $injector) {
    super($scope, $injector);
  }

}

function getGraph(data) {
  let graph = jsbayes.newGraph();

  //creating the nodes
  data.nodes.map(node => {
    let status = node.states.map(state => state.name);
    graph.addNode(node.id, status);
  });

  //adding data to nodes
  data.nodes.map(node => {
    let graphNode = graph.node(node.id);

    //setting parents
    node.parents.forEach(parent => graphNode.addParent(graph.node(parent)));

    //setting cpt
    let cpt = [];
    if(node.cpt.length === 1) {
      cpt = node.cpt[0].map(num => parseFloat(num));
    } else {
      node.cpt.map(entry => cpt.push(entry.map(num => parseFloat(num))));
    }

    graphNode.setCpt(cpt);
  });

  graph.sample(20000);

  return graph;
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

