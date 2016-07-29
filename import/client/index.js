import {createApp} from 'mantra-core';
import initContext from './configs/context';

// modules
import coreModule from './modules/core';
import customerModule from './modules/customer';
import supportModule from './modules/support_person';

export function init () {
    // init context
    const context = initContext();

    // create app
    const app = createApp(context);
    app.loadModule(coreModule);
    app.loadModule(customerModule);
    app.loadModule(supportModule);
    app.init();
}
