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
        //stuff here
        this.graph = graph;
    }
}