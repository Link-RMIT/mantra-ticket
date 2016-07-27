a=require('./configs.js');
b=require('./method_names.js');
c=require('./publications.js');
module.exports = Object.assign.apply(
    undefined,
    [
        './configs.js',
        './method_names.js',
        './publications.js',
    ].map(require.bind(this))
);
