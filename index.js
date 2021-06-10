window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});


const url = '/api';

function getTasks() {
    const listItems = document.querySelectorAll('li');
    listItems.forEach(item => item.remove());
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const tasks = data;
            const taskList = document.querySelector('#task-list');
            tasks.map(task => {
                const template = document.createElement('template');

                const listIem = `<li id=${task._id}>${task.item}<button id=${task._id} class="remove" onClick='deleteTask()'>X</button></li>`;
                template.innerHTML = listIem;

                taskList.appendChild(template.content);


            });
        });

}

function addTask() {
    const text = document.querySelector('#task').value;
    if (!text) {
        return alert('empty tasks are not allowed!');
    }
    document.querySelector('#task').value = '';
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            item: text
        }),
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => getTasks());
}

function deleteTask() {
    const taskId = event.target.id;
    const taskElem = document.getElementById(taskId);
    taskElem.remove();
    fetch(url + '/' + taskId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => response.json())
        .then(data => console.log(data));
}