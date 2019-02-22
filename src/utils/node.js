import { State } from "./state";
import { Sensor } from "./sensor";

export class Node {
    /**
     * Build a node instance
     * @param ID {string} the node ID
     * @param name {string} the node name
     * @param parents {string[]} list of parent nodes' ID
     * @param states {State[]} list of states
     * @param cpt {string[]} list of cpts
     * @param sensor {Sensor} the sensor specs
     */
    constructor(ID, name, parents, states, cpt, sensor) {
        this.ID = ID;
        this.name = name;
        this.parents = parents;
        this.states = states;
        this.cpt = cpt;
        this.sensor = sensor;
    }
}