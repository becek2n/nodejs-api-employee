module.exports = (app) => {
    const employeeController = require("../controllers/employeeController");

    var router = require("express").Router();
    router.get("/", employeeController.getAll);
    router.get("/:id", employeeController.getByID);
    router.post("/", employeeController.insert);
    router.put("/:id", employeeController.update);
    router.delete("/:id", employeeController.delete);

    app.use("/employee", router);
}