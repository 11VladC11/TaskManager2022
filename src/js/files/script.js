// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

const tasksDOM = document.querySelector('ul.all-tasks');
const loadingDOM = document.querySelector('.loading-text');
const formDOM = document.querySelector('.task-form');
const taskInputDOM = document.querySelector('.task-input');
const formAlertDOM = document.querySelector('.form-alert');
const taskCompletedDOM = document.querySelector('#checkbox')
const showTask = async ()=>{
	loadingDOM.style.visibility = 'visible';
	try{
		const {data:{tasks},} = await axios.get('/api/v1/tasks')
		const allTasks = tasks.map((task)=>{
			const {completed, _id: taskID, name} = task;
			return `<li>
			<div class="task-info">
				<div class="task-status">
					<input id="checkbox" type="checkbox">
					<label for="checkbox">
						<div class="radio-check checked"></div>
					</label>
					<img class="checked" src="@img/icon-check.svg" alt="">
				</div>
				<div class="task-title ${completed}}">
					${name}
				</div>
			</div>
			<button type="button" class="delete-btn" data-id="${taskID}">
				<img src="@img/icon-cross.svg" alt="">
			</button>
		</li>`
		}).join('')
		tasksDOM.innerHTML = allTasks
	}catch(error){
		// tasksDOM.innerHTML= '<h5 class="empty-list">There was an error, please try later....</h5>'
	}
	loadingDOM.style.visibility='hidden';
}
showTask();

tasksDOM.addEventListener('click', async(e)=>{
	const el = e.target;
	if(el.parentElement.classList.contains('delete-btn')){
		loadingDOM.style.visibility = 'visible';
		const id = el.parentElement.dataset.id;
		try{
			await axios.delete(`/api/v1/tasks/${id}`)
			showTask()
		}catch(error){
			console.log(error);
		}
	}
	loadingDOM.style.visibility ='hidden';
})

formDOM.addEventListener('click', async(e)=>{
	e.preventDefault()
	const name =taskInputDOM.value;
	try{
		await axios.post(`/api/v1/tasks, ${name}`)
		showTask()
		taskInputDOM.value='';
		formAlertDOM.style.display = 'block'
		formAlertDOM.textContent=`succes, task added`
		formAlertDOM.classList.add('text-succes')
	}catch(error){
		formAlertDOM.style.display ="block";
		formAlertDOM.innerHTML = 'error, please try again'
	}
	setTimeout(()=>{
		formAlertDOM.style.display = 'none'
		formAlertDOM.classList.remove('text-success')
	},3000)
})

const closeTaskEdit = document.querySelector('.close-task-edit');
const contentEdit = document.querySelector('.content-task-edit')
const taskEdit = document.querySelector('.task-edit');
taskEdit.addEventListener('click',()=>{
		contentEdit.classList.add('hidden')
})
closeTaskEdit.addEventListener('click',()=>{
		contentEdit.classList.remove('hidden')
})
const taskstatus = document.querySelector('.task-status .task-edit-completed ');
taskstatus.addEventListener('click',()=>{
	if(!taskstatus.checked == true){
		document.querySelector('.edit-task .radio-check').classList.remove('checked');
		document.querySelector('.edit-task img').classList.remove('checked')

	}else{
		document.querySelector('.edit-task .radio-check').classList.add('checked');
		document.querySelector('.edit-task img').classList.add('checked')
	}
})

