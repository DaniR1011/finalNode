const express = require("express");
const router = express.Router();
const classes = require("../domain/services/service-classes");
const order = require("../domain/services/service-order");
const family = require("../domain/services/service-family");
const species = require("../domain/services/service-species");

router.get("/classes", classes.GetAll);
router.post("/classes", classes.Create);
router.get("/order", order.GetAll);
router.post("/order", order.Create);
router.get("/family", family.GetAll);
router.post("/family", family.Create);
router.get("/species", species.GetAll);
router.post("/species", species.Create);

module.exports = router;
