export class Sensor {
    /**
     * Build a sensor instance
     * @param DBSensorName {string} the database name
     * @param DBSensorTable
     * @param DBSensorColumn
     */
    constructor(DBSensorName, DBSensorTable, DBSensorColumn) {
        this.DBSensorName = DBSensorName;
        this.DBSensorTable = DBSensorTable;
        this.DBSensorColumn = DBSensorColumn;
    }

    /**
     * TODO
     * Push the current node value into the database
     * @param value the value to push
     */
    pushData(value) {

    }
}