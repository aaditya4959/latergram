import os from "os"
import express from "express"
import cluster from "cluster"
import app from "./app";
import { db } from "./Controller/dbConnection";

if(cluster.isPrimary){
    // THis is the master process so fork the process for available cores
    const numCPUS = os.cpus().length;

    for(let i = 0 ; i<numCPUS ; i++){
        cluster.fork();
    }

    // logic for respawning the worker if a process dies
    cluster.on('exit', (worker, code, signal) => {
           console.log(`worker ${worker.process.pid} died`);
           cluster.fork(); // Optionally, respawn a worker if one dies
    });
}else {
    // Call the database connection function and after that start the server.
    const PORT = process.env.PORT || 8080;

    
    db()
        .then(() => {
            // Start the server only after a successful DB connection
            app.listen(PORT, () => {
                console.log(`Server is running on http://localhost:${PORT}`);
            });
        })
        .catch((err) => {
            console.error("Failed to connect to the database:", err);
        });
}
