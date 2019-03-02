//TODO replace $http somehow

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

        $http(req).then(res => resolve(res.data), error => reject(error));
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

        $http(req).then(res => resolve(res.data), error => reject(error));
    });
}