module.exports = (express, app) => {
    const controller = require("../controllers/ticket.controller.js");
    const router = express.Router();

    router.put("/ticket", controller.ticket);

    router.get("/ticket/:ticketId", controller.ticket);

    router.post("/ticket", controller.ticket);

    router.delete("/ticket/:ticketId", controller.ticket);

    // add routes to server.
    app.use("/api/v1", router);
};
