import {appEvents} from 'grafana/app/core/core';

export let AlertType = {
    SUCCESS: {value: 0, name: "alert-success"},
    WARNING: {value: 1, name: "alert-warning"},
    ERROR: {value: 2, name: "alert-error"}
};

/**
 * Send an alert with the given message
 * @param alertType {AlertType} the alert type
 * @param title {string} the title
 * @param message {string} the message
 */
export function alert(alertType, title, message) {
    appEvents.emit(alertType.name, [title, message]);
}