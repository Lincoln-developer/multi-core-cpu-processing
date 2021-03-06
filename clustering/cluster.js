import cluster from "cluster";
import os from "os";

const numCPUs = os.cpus().length;

if(cluster.isMaster){
    for(let i = 0; i < numCPUs; i++){
        cluster.fork;
    };
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
    })
}else{
    require('./index.js')();
}