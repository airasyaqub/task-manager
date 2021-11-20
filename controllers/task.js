

const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async-wrapper");
const {myCustomError: customError} = require("../errors/custom-error");


const getAllTasks = asyncWrapper(async (req, res) => { 
	const tasks = await Task.find({})
	res.status(200).json({ status: "success", data: tasks });
});


const getTask = asyncWrapper(async (req, res, next) => {
	const task = await Task.findById(req.params.id).exec();
	// const task = await Task.findOne({_id: req.params.id});
	if (!task) {

		return next(customError(`no record with id : ${req.params.id}`, 404));

		// const err = new Error('No record Found');

		// err.status = 404;

		// return next(err);

		// return 	res.status(404).json({ message: `no record with id : ${req.params.id}` });
	}
	res.status(200).json({ status: "success", data: task });
});


const createTask = asyncWrapper(async (req, res) => {
	const task = await Task.create(req.body);
	res.status(200).json({ status: "success", data: task });
});


const updateTask = asyncWrapper(async(req, res, next) => {
	const task = await Task.findOneAndUpdate({_id: req.params.id}, req.body, {
		new: true,
		runValidators: true
	});
	if (!task) {
		return next(customError(`no record with id : ${req.params.id}`, 404));
		// return 	res.status(404).json({ message: `no record with id : ${req.params.id}` });
	}
	res.status(200).json({ status: "success", data: task });
});


const deleteTask = asyncWrapper(async (req, res, next) => {
	const task = await Task.findOneAndDelete({_id: req.params.id});
	if (!task) {
		return next(customError(`no record with id : ${req.params.id}`, 404));
		// return 	res.status(404).json({ message: `no record with id : ${req.params.id}` });
	}
	res.status(200).json({ status: "success", message: `record with id deleted : ${req.params.id}` });
});


module.exports = {
	getAllTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask
}