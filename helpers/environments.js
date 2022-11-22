// ! environments handler
// ! handle all environment related things

// dependencies

// module scaffolding
const environments = {};

environments.staging = {
    port: 5000,
    envName: 'staging'
};
environments.production = {
    port: 8000,
    envName: 'production'
};


// determing which environment was passed
const currentEnvironment = typeof (process.env.NODE_ENV) === 'string' ? process.env.NODE_ENV : 'staging';

// export corresponding environment object
const environmentToExport = typeof (environments[currentEnvironment]) === 'object' ? environments[currentEnvironment] : environments.staging;

// export module
module.exports = environmentToExport;