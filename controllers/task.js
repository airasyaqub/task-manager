
const getAllTasks = (req, res) => {
	res.send('get all tasks');
};


const getTask = (req, res) => {
	res.send('get single task');
};


const createTask = (req, res) => {
	res.send('create new task');
};


const updateTask = (req, res) => {
	res.send('update a task');
};


const deleteTask = (req, res) => {
	res.send('delete task');
};


module.exports = {
	getAllTasks,
	getTask,
	createTask,
	updateTask,
	deleteTask
}