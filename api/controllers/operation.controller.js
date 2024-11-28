const { Router } = require("express");
const Operation = require("../models/operation.model.js");

class OperationController {
  constructor() {
    this.router = Router();
    this.router.post("/create", this.create.bind(this));
    this.router.get("/all", this.all.bind(this));
    this.router.get("/one", this.retrieve.bind(this));
    this.router.put("/update", this.update.bind(this));
    this.router.delete("/delete", this.delete.bind(this));
  }

  getRouter() {
    return this.router;
  }

  async create(req, res) {
    const newOperation = req.body;

    if (!newOperation) {
      res.status(400).send("Missing operation");
      return;
    }

    const operation = new Operation(newOperation);

    await operation.save().then(() => {
      res.json(operation);
    });
  }

  async all(req, res) {
    await Operation.findAll().then((operations) => {
      res.json(operations);
    });
  }

  async retrieve(req, res) {
    const id = req.query["operation_id"];

    if (!id) res.status(400).send("Missing operation_id");

    await Operation.findOne({ where: { operation_id: id } }).then((operation) => {
      res.json(operation);
    });
  }

  async retrieveByPartnumber(req, res) {
    const partnumber = req.query["partnumber"];

    if (!partnumber) res.status(400).send("Missing partnumber");

    await Operation.findOne({ where: { partnumber: partnumber } }).then(
      (operation) => {
        res.json(operation);
      }
    );
  }

  async retrieveByRegNum(req, res) {
    const regNum = req.query["reg_num"];

    if (!regNum) res.status(400).send("Missing reg_num");

    await Operation.findOne({ where: { reg_num: regNum } }).then((operation) => {
      res.json(operation);
    });
  }

  async retrieveByStatus(req, res) {
    const status = req.query["status_ok"];

    if (!status) res.status(400).send("Missing status_ok");

    await Operation.findAll({ where: { status_ok: status } }).then((operations) => {
      res.json(operations);
    });
  }

  retrieveByEngineModelNum(req, res) {
    const engineModelNum = req.query["engine_model_num"];

    if (!engineModelNum) res.status(400).send("Missing engine_model_num");

    Operation.findAll({ where: { engine_model_num: engineModelNum } }).then(
      (operations) => {
        res.json(operations);
      }
    );
  }

  async update(req, res) {
    const id = req.body["operation_id"];
    const operationToUpdate = req.body;

    if (!id) res.status(400).send("Missing operation_id");

    if (!operationToUpdate) res.status(400).send("Missing operation");

    await Operation.findOne({ where: { operation_id: id } }).then((operation) => {
      if (!operation) {
        res.status(404).send("Operation not found");
      } else {
        operation.update(operationToUpdate).then(() => {
          res.json(operationToUpdate);
        });
      }
    });
  }

  async delete(req, res) {
    const id = req.query["operation_id"];

    if (!id) res.status(400).send("Missing operation_id");

    await Operation.findOne({ where: { operation_id: id } }).then((operation) => {
      if (!operation) {
        res.status(404).send("Operation not found");
      } else {
        operation.destroy().then(() => {
          res.json(operation);
        });
      }
    });
  }
}

module.exports = { OperationController: OperationController };
