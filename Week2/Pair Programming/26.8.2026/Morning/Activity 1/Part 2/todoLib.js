let todosArray = []
let nextId = 0

function getAll() {
    return todosArray;
}

function addOne(task, completed, dueDate) {
    
    if (!task || completed === undefined || !dueDate) {
        return false;
    }
    const newTask = {
        id: nextId++,
        task,
        completed,
        dueDate
    };

    todosArray.push(newTask);
    

    return newTask;
}

function findById(id) {
    taskId = Number(id);

    if (!taskId) {
        return false;
    }

    task = todosArray.find(item => item.id === taskId);

    if (!task) {
        return false;
    }

    return task;
}

function updateOneById (id, updatedData) {
    task = findById(id);

    if (task) {
        if (updatedData.task) task.task = updatedData.task;
        if (updatedData.completed !== undefined) task.completed = updatedData.completed;
        if (updatedData.dueDate) task.dueDate = updatedData.dueDate;
        
        return task;
    }

    return false;
}

function deleteOneById (id) {
    index = todosArray.findIndex(item => item.id === Number(id));
    if (index === -1) return false;

    todosArray.splice(index, 1);
    return true;
}

const Todos = {
    getAll,
    addOne,
    findById,
    updateOneById,
    deleteOneById
}

module.exports = Todos;
