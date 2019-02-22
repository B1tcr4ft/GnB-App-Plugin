import { Node } from "./node";
import * as jsbayes from 'jsbayes';

export class Network {
    /**
     * Build a network instance
     * @param name {string} the network name
     * @param DBWriteName {string} the database name (as it is called on Grafana's database list) where the nodes' probabilities will be registered
     * @param refreshTime {number} the interval time (in milliseconds) between the node updates
     * @param nodes {Node[]} the list of nodes
     */
    constructor(name, DBWriteName, refreshTime, nodes) {
        this.name = name;
        this.DBWriteName = DBWriteName;
        this.refreshTime = refreshTime;
        this.nodes = nodes;

        this.makeGraph();
    }

    /**
     * TODO
     * I'd like to make this function private but idk how
     */
    makeGraph() {
        if(this.graph != null) {
            return;
        }

        let graph = jsbayes.newGraph();

        //creating the nodes
        this.nodes.forEach(node => {
            let states = node.states.map(state => state.name);
            graph.addNode(node.ID, states);
        });

        //adding data to nodes
        this.nodes.forEach(node => {
            let graphNode = graph.node(node.ID);

            //setting parents
            node.parents.forEach(parent => graphNode.addParent(graph.node(parent)));

            //setting cpt
            let cpt = [];
            if(node.cpt.length === 1) {
                cpt = node.cpt[0].map(num => parseFloat(num));
            } else {
                node.cpt.forEach(entry => cpt.push(entry.map(num => parseFloat(num))));
            }
            graphNode.setCpt(cpt);
        });

        graph.sample(20000);

        this.graph = graph;
    }
}