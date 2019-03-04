//TODO replace $http somehow
//TODO replace API URL with config's url

/**
 * Start a network with the given ID
 * @param $http
 * @param networkID {string} the ID of the network
 * @returns {Promise} the response data | the error
 */
export function startNetwork($http, networkID) {
    return new Promise((resolve, reject) => {
        let req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/start/' + networkID
        };

        $http(req).then(res => resolve(res.data), error => reject(error.data));
    });
}

/**
 * Stop a network with the given ID
 * @param $http
 * @param networkID {string} the ID of the network
 * @returns {Promise} the response data | the error
 */
export function stopNetwork($http, networkID) {
    return new Promise((resolve, reject) => {
        let req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/stop/' + networkID
        };

        $http(req).then(res => resolve(res.data), error => reject(error.data));
    });
}

/**
 * Save a new network with the given json
 * @param $http
 * @param json {JSON} json file containing the definition of the network
 * @returns {Promise} the response data | the error
 */
export function saveNetwork($http, json) {
    return new Promise((resolve, reject) => {
        let req = {
            method: 'POST',
            url: 'https://api.bitcraftswe.it/api/save',
            headers: {
                'Content-Type': 'application/json'
            },
            data: json
        };

        $http(req).then(res => resolve(res.data), error => reject(error.data));
    });
}

/**
 * Delete a network with the given ID
 * @param $http
 * @param networkID {string} the ID of the network
 * @returns {Promise} the response data | the error
 */
export function deleteNetwork($http, networkID) {
    return new Promise((resolve, reject) => {
        let req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/delete/' + networkID
        };

        $http(req).then(res => resolve(res.data), error => reject(error.data));
    });
}

/**
 * Update a network with the given ID
 * @param $http
 * @param networkID {string} the ID of the network
 * @param json {JSON} json file containing the definition of the network
 * @returns {Promise} the response data | the error
 */
export function updateNetwork($http, networkID, json) {
    return new Promise((resolve, reject) => {
        let req = {
            method: 'POST',
            url: 'https://api.bitcraftswe.it/api/update/' + networkID,
            headers: {
                'Content-Type': 'application/json'
            },
            data: json
        };

        $http(req).then(res => resolve(res.data), error => reject(error.data));
    });
}

/**
 * Get a network with the given ID
 * @param $http
 * @param networkID {string} the ID of the network
 * @returns {Promise} the response data | the error
 */
export function getNetwork($http, networkID) {
    return new Promise((resolve, reject) => {
        let req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/retrieve/' + networkID
        };

        $http(req).then(res => resolve(res.data), error => reject(error.data));
    });
}

/**
 * Get a list of all networks
 * @param $http
 * @returns {Promise} the response data | the error
 */
export function getNetworkList($http) {
    return new Promise((resolve, reject) => {
        let req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/retrieve/all'
        };

        $http(req).then(res => resolve(res.data), error => reject(error.data));
    });
}

/**
 * Get an svg containing the static visualization
 * of the graph of the given network ID
 * @param $http
 * @param networkID {string} the ID of the network
 * @returns {Promise} the response data | the error
 */
export function getStaticGraph($http, networkID) {
    return new Promise((resolve, reject) => {
        let req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/static-graph/' + networkID
        };

        $http(req).then(res => resolve(res.data), error => reject(error.data));
    });
}

/**
 * Get an svg containing the dynamic visualization
 * of the graph of the given network ID
 * @param $http
 * @param networkID {string} the ID of the network
 * @returns {Promise} the response data | the error
 */
export function getDynamicGraph($http, networkID) {
    return new Promise((resolve, reject) => {
        let req = {
            method: 'GET',
            url: 'https://api.bitcraftswe.it/api/dynamic-graph/' + networkID
        };

        $http(req).then(res => resolve(res.data), error => reject(error.data));
    });
}