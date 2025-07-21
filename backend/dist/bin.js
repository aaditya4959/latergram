"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = __importDefault(require("os"));
const cluster_1 = __importDefault(require("cluster"));
const app_1 = __importDefault(require("./app"));
const dbConnection_1 = require("./Controller/dbConnection");
if (cluster_1.default.isPrimary) {
    // THis is the master process so fork the process for available cores
    const numCPUS = os_1.default.cpus().length;
    for (let i = 0; i < numCPUS; i++) {
        cluster_1.default.fork();
    }
    // logic for respawning the worker if a process dies
    cluster_1.default.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        cluster_1.default.fork(); // Optionally, respawn a worker if one dies
    });
}
else {
    // Call the database connection function and after that start the server.
    const PORT = process.env.PORT || 8080;
    (0, dbConnection_1.db)()
        .then(() => {
        // Start the server only after a successful DB connection
        app_1.default.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
        .catch((err) => {
        console.error("Failed to connect to the database:", err);
    });
}
