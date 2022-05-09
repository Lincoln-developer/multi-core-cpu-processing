import express  from "express";
import cluster from "cluster";
import os from "os";

//Number of CPU cores on the localmachine
const numCPUs = os.cpus().length

const port = 8000;

const StartExpressServer = () => {
    const app = express();
    console.log(`worker ${process.pid} started`)
    app.get('/', (req, res) => {
        res.send('Hello, server!')
    });

    app.listen(port, () => console.log(`Server started on port ${port}`));
}
//checking whether the cluster isMaster
    if(cluster.isMaster){
        console.log(`Master ${process.pid} is running`);
        //forking workers
        for(let i = 0; i < numCPUs; i++){
            cluster.fork();
        };
        cluster.on("exit", (worker,code, signal)=>{
            console.log(`worker ${worker.process.pid} has died`);
            //Forking another worker
            cluster.fork();
        })
    }else{
        StartExpressServer();
    }

  



