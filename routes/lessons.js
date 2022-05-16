const express = require("express");
const router = express.Router();
const controllers = require("../controllers/lessonControllers");

router.get("/", async (req, res) => {
	try {
		let allLessons = await controllers.getAll();
		return res.status(200).send(allLessons);
	} catch (err) {
		return res.status(500).end(err);
	}
});

router.get("/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let resultById = await controllers.getById(id);
		if (resultById === null) {
			res.status(404).end();
		} else {
			res.status(200).send(resultById);
		}
	} catch (err) {
		res.status(500).end(err);
	}
});

router.delete("/:id([0-9]+)", async (req, res) => {
	const id = +req.params.id;
	try {
		let deletedResult = await controllers.deleteById(id);
		if (deletedResult === false) {
			return res.status(404).end();
		} else {
			res.status(200).send(deletedResult);
		}
	} catch (err) {
		res.status(500).end();
	}
});

router.post("/", async (reg, res) => {
	let newLesson = reg.body;
	try {
		let createdLesson = await controllers.add(newLesson);
		res.status(201).send(createdLesson);
	} catch (err) {
		res.status(500).end(err);
	}
});

router.get("/with-category-name", async (req, res) => {
	try {
		let allLessons = await controllers.getAllWithCategoryNames();
		return res.status(200).send(allLessons);
	} catch (err) {
		return res.status(500).end(err);
	}
});

module.exports = router;
