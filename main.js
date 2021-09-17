const BACKEND_URL = 'http://localhost:3000/task';

const TEXT = document.querySelector('.text');
const BUTTON = document.querySelector('.button');

BUTTON.addEventListener('click', () => {
    const NEW_TASK = TEXT.value;
    if (NEW_TASK) {
        const DATA = {
            task: NEW_TASK
        }
        fetch(BACKEND_URL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(DATA)
        })
            .then(response => response.json())
            .then(() => getTask())
    } else {
        document.querySelector('.modal').style.visibility = 'visible';
    }
})

function getTask() {
    TEXT.value = '';
    fetch(BACKEND_URL)
        .then(response => response.json())
        .then((data) => render(data))
}
getTask();

function render(data) {
    document.querySelector('.wrapperTask').innerHTML = '';
    const TASK = data;
    TASK.forEach(element => {
        let tamplate = `
            <div class="task">
            <input data-id="${element.id}" data-name="delete" type="checkbox" >
           <label >${element.task}</label> 
        </div>
          `
        document.querySelector('.wrapperTask').innerHTML += tamplate;

    });
}


document.querySelector('.wrapperTask').addEventListener('click', (event) => {

    if (event.target.dataset.name === 'delete') {
        let id = event.target.dataset.id
        if (id != 1) {
            fetch(`${BACKEND_URL}/${id}`, {
                method: 'DELETE'
            })
                .then(response => response.json())
                .then(() => getTask())
        } else {
            document.querySelector('.modal1').style.visibility = 'visible';
        }
    }

})

document.querySelectorAll('.uil-times').forEach(elem => {
    elem.addEventListener('click', () => {
        document.querySelector('.modal').style.visibility = 'hidden';
        document.querySelector('.modal1').style.visibility = 'hidden';
    })
})
