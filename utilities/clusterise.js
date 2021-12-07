/*
clusterising app
connecting to atlas
starting server
*/

const cluster = require("cluster");

const clusterise = (port, numOfCPUs, app) => {
    if (cluster.isMaster) {
        for (let i = 0; i < numOfCPUs; i++) {
            cluster.fork();
        }

        // forking new cluster when existing cluster dies
        cluster.on("exit", (worker, code, signal) => {
            console.log(`Worker PID: ${process.pid} died..`);
            cluster.fork();
        });
    } else {
        app.listen(port, () => console.log(`NODE CLUSTER STARTED AT PORT: ${port} PID:${process.pid}`));
    }
}

module.exports = clusterise;
