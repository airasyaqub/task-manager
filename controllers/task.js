

const Task = require("../models/Task");


const getAllTasks = async (req, res) => {
	try {
		const tasks = await Task.find({})
		res.status(200).json({ tasks });
	} catch(err) {
		res.status(400).json({ message: err.message });
	}
};

const getTask = async (req, res) => {
	try {
		const task = await Task.findById(req.params.id).exec();
		// const task = await Task.findOne({_id: req.params.id});
		if (!task) {
			return 	res.status(404).json({ message: `no record with id : ${req.params.id}` });
		}
		res.status(200).json({ task });
	} catch(err) {
		res.status(400).json({ message: err.message });
	}
};


const createTask = async (req, res) => {
	try {
		const task = await Task.create(req.body);
		res.status(200).json({ task });
	} catch(err) {
		res.status(400).json({ message: err.message });
	}
};


const updateTask = async (req, res) => {
	try {
		const task = await Task.findOneAndUpdate({_id: req.params.id}, req.body, {
			new: true,
			runValidators: true
		});
		if (!task) {
			return 	res.status(404).json({ message: `no record with id : ${req.params.id}` });
		}
		res.status(200).json({task});
	} catch(err) {
		res.status(400).json({ message: err.message });
	}
};


const deleteTask = async (req, res) => {
	try {
		const task = await Task.findOneAndDelete({_id: req.params.id});
		if (!task) {
			return 	res.status(404).json({ message: `no record with id : ${req.params.id}` });
		}
		res.status(200).json({ message: `record with id deleted : ${req.params.id}` });
	} catch(err) {
		res.status(400).json({ message: err.message });
	}
};


module.exports = {
	getAllTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask
}