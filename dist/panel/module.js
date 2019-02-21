'use strict';

System.register(['app/plugins/sdk', '../css/example-app.css!'], function (_export, _context) {
  "use strict";

  var PanelCtrl, ExampleAppPanelCtrl;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  function getGraph(data) {
    var graph = jsbayes.newGraph();

    //creating the nodes
    data.nodes.map(function (node) {
      var status = node.states.map(function (state) {
        return state.name;
      });
      graph.addNode(node.id, status);
    });

    //adding data to nodes
    data.nodes.map(function (node) {
      var graphNode = graph.node(node.id);

      //setting parents
      node.parents.forEach(function (parent) {
        return graphNode.addParent(graph.node(parent));
      });

      //setting cpt
      var cpt = [];
      if (node.cpt.length === 1) {
        cpt = node.cpt[0].map(function (num) {
          return parseFloat(num);
        });
      } else {
        node.cpt.map(function (entry) {
          return cpt.push(entry.map(function (num) {
            return parseFloat(num);
          }));
        });
      }

      graphNode.setCpt(cpt);
    });

    graph.sample(20000);

    return graph;
  }

  return {
    setters: [function (_appPluginsSdk) {
      PanelCtrl = _appPluginsSdk.PanelCtrl;
    }, function (_cssExampleAppCss) {}],
    execute: function () {
      _export('PanelCtrl', ExampleAppPanelCtrl = function (_PanelCtrl) {
        _inherits(ExampleAppPanelCtrl, _PanelCtrl);

        function ExampleAppPanelCtrl($scope, $injector) {
          _classCallCheck(this, ExampleAppPanelCtrl);

          return _possibleConstructorReturn(this, (ExampleAppPanelCtrl.__proto__ || Object.getPrototypeOf(ExampleAppPanelCtrl)).call(this, $scope, $injector));
        }

        return ExampleAppPanelCtrl;
      }(PanelCtrl));

      ExampleAppPanelCtrl.template = '<svg id="bbn"></svg>';

      $(document).ready(function () {
        var data = {
          "name": "Rete Bayesiana A",

          "databaseWriteName": "Influx2",
          "refreshTime": 5000,

          "nodes": [{
            "id": "A",
            "name": "Node A",
            "parents": ["B"],

            "states": [{ "name": "State 0", "trigger": "%v>=90" }, { "name": "State 1", "trigger": "40<%v<90" }, { "name": "State 2", "trigger": "%v<=40" }],
            "cpt": [[0.4, 0.1, 0.5], [0.2, 0.2, 0.6]],

            "sensor": {
              "databaseSensorName": "Influx1",
              "databaseSensorTable": "Server1",
              "databaseSensorColumn": "CPU"
            }
          }, {
            "id": "B",
            "name": "Node B",
            "parents": [],

            "states": [{ "name": "State 0", "trigger": "%v>=50" }, { "name": "State 1", "trigger": "%v<50" }],
            "cpt": [[0.6, 0.4]],

            "sensor": {}
          }, {
            "id": "C",
            "name": "Node C",
            "parents": ["A", "B"],

            "states": [{ "name": "State 0", "trigger": "%v>=50" }, { "name": "State 1", "trigger": "0<=%v<50" }],
            "cpt": [[0.4, 0.6], [0.2, 0.8], [0.3, 0.7], [0.4, 0.6], [0.1, 0.9], [0.7, 0.3]],

            "sensor": {}
          }]
        };

        var graph = getGraph(data);

        var g = jsbayesviz.fromGraph(graph);

        jsbayesviz.draw({
          id: '#bbn',
          width: 800,
          height: 800,
          graph: g,
          samples: 15000
        });
      });

      _export('PanelCtrl', ExampleAppPanelCtrl);
    }
  };
});
//# sourceMappingURL=module.js.map
