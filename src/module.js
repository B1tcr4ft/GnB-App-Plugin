import './sass/gnb.dark.scss';

import {AddNetworkCtrl} from './component/pages/add_network/add_network';
import {ModifyNetworkCtrl} from './component/pages/edit_network/edit_network';
import {DeleteNetworkCtrl} from "./component/pages/delete_network/delete_network";
import {GnbAppConfigCtrl} from "./component/config/config";
import {loadPluginCss} from 'grafana/app/plugins/sdk';

loadPluginCss({
    dark: 'plugins/gnb/css/gnb.dark.css'
});

export {
    AddNetworkCtrl,
    ModifyNetworkCtrl,
    DeleteNetworkCtrl,
    GnbAppConfigCtrl as ConfigCtrl
};