"use strict";

System.register([], function (_export, _context) {
    "use strict";

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
        setters: [],
        execute: function () {}
    };
});
//# sourceMappingURL=bayes.js.map
