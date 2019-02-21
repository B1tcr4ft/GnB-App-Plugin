import {PanelCtrl} from  'app/plugins/sdk';
import '../css/example-app.css!'
import * as jsbayes from '../lib/jsbayes';
import * as jsbayesviz from '../lib/jsbayes-viz';

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
  let data = {
    "name": "Rete Bayesiana A",

    "databaseWriteName": "Influx2",
    "refreshTime": 5000,

    "nodes": [
      {
        "id": "A",
        "name": "Node A",
        "parents": ["B"],

        "states": [
          {"name": "State 0", "trigger": "%v>=90"},
          {"name": "State 1", "trigger": "40<%v<90"},
          {"name": "State 2", "trigger": "%v<=40"}
        ],
        "cpt": [
          [0.4, 0.1, 0.5],
          [0.2, 0.2, 0.6]
        ],

        "sensor": {
          "databaseSensorName": "Influx1",
          "databaseSensorTable": "Server1",
          "databaseSensorColumn": "CPU"
        }
      },
      {
        "id": "B",
        "name": "Node B",
        "parents": [],

        "states": [
          {"name": "State 0", "trigger": "%v>=50"},
          {"name": "State 1", "trigger": "%v<50"}
        ],
        "cpt": [
          [0.6, 0.4]
        ],

        "sensor": {}
      },
      {
        "id": "C",
        "name": "Node C",
        "parents": ["A", "B"],

        "states": [
          {"name": "State 0", "trigger": "%v>=50"},
          {"name": "State 1", "trigger": "0<=%v<50"}
        ],
        "cpt": [
          [0.4, 0.6],
          [0.2, 0.8],

          [0.3, 0.7],
          [0.4, 0.6],

          [0.1, 0.9],
          [0.7, 0.3]
        ],

        "sensor": {}
      }
    ]
  };

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

export {
  ExampleAppPanelCtrl as PanelCtrl
};

