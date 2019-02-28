import {AddNetworkCtrl} from './component/add_network/addNet';
import {ModifyNetworkCtrl} from './component/modify_network/modifyNet';
import {loadPluginCss} from 'grafana/app/plugins/sdk';

loadPluginCss({
    style: 'plugins/grafana-example-app/css/style.css'
});


export {
    AddNetworkCtrl,
    ModifyNetworkCtrl
};