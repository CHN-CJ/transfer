import Transfer from './Transfer/Transfer';

const components = {
    Transfer
    //等价于："Transfer": Transfer
}

export default {
    install(app) {
        for (let comp in components) {
            app.component(comp, components[comp]);
        }
        //等价于 app.component("Transfer", Transfer);
    }
}