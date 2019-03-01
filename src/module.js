import './sass/gnb.dark.scss';

import {AddNetworkCtrl} from './component/add_network/addNet';
import {ModifyNetworkCtrl} from './component/modify_network/modifyNet';
import {loadPluginCss} from 'grafana/app/plugins/sdk';

loadPluginCss({
    dark: 'plugins/gnb/css/gnb.dark.css'
});

export {
    AddNetworkCtrl,
    ModifyNetworkCtrl
};