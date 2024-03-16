export const retrieveTodosFromLocalStorage = () => {
    return window.localStorage.getItem("todos");
}


export const addToLocalStorage = (todos) => {
    window.localStorage.setItem('todos', JSON.stringify(todos));
}

export const deleteTaskFromLocalStorage = (id) => {
    let res = JSON.parse(window.localStorage.getItem('todos'));
    res = res.filter(ele => ele.id !== id);
    window.localStorage.setItem('todos', JSON.stringify(res));
}

export const editTodoTextInLocalStorage = (index, todo) => {
    let res = JSON.parse(window.localStorage.getItem('todos'));
    res[index].text = todo?.text;
    const newStoredArray = JSON.stringify(res);
    window.localStorage.setItem('todos', newStoredArray);
}

export const editTodoStatusInLocalStorage = (index, todo) => {
    let res = JSON.parse(window.localStorage.getItem('todos'));
    res[index].status = todo.status;
    const newStoredArray = JSON.stringify(res);
    window.localStorage.setItem('todos', newStoredArray);
}