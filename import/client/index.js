import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import customerModule from './modules/customer';

export function init () {
    // init context
    const context = initContext();

    // create app
    const app = createApp(context);
    app.loadModule(coreModule);
    app.loadModule(customerModule);
    app.init();
}
