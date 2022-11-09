/*jshint esversion: 8 */

/* Получение описания вакансий по API */
import {createMenu, showMenu} from './drop-down_menu.js';

/* Получение описания вакансий */
async function getDescription(id) {
	let response = await fetch(`https://api.hh.ru/vacancies/${id}?host=hh.ru`, {
						method: "GET",
						headers: {
								"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Mobile Safari/537.36"
						}
					});
	
	let content = await response.json();
	return content.description;
}

/* Добавление вакансий на страницу */
async function showVacancies(content) {
/* находим section куда будут добавляться вакансий */
const vacanciesSection = document.querySelector(".vacancies-section");

/* дефолтный логотип, если его нет */
const img = "img/png/no_logo.png";

let arrForm = [];

content.forEach(async (vacancy) => {
	/* Создала массив с Form, чтобы потом добавить в меню */
	arrForm.push(vacancy.schedule.name);

	let description = await getDescription(vacancy.id);

	const vacanciesBlock = document.createElement("div");
	vacanciesBlock.className = "vacancies-block";
	vacanciesBlock.innerHTML += `
	<div class="vacancies-block__left-wrapper left-wrapper">
		<img class="left-wrapper__label" src="${(vacancy.employer.logo_urls === null) ? img : (vacancy.employer.logo_urls.original) }" >
		<p class="left-wrapper__text text"><span class="text__span">Form: </span>${vacancy.schedule.name}</p>
		<p class="left-wrapper__text text"><span class="text__span">Company: </span>${vacancy.employer.name}</p>
		<p class="left-wrapper__text text"><span class="text__span">Web: </span><a href="${(vacancy.alternate_url) ? (vacancy.alternate_url) : "#"}">${(vacancy.alternate_url) ? (vacancy.alternate_url) : "-"}</a></p>
		<p class="left-wrapper__text text"><span class="text__span">Address: </span>${vacancy.area.name}</p>
	</div>
	<div class="vacancies-block__right-wrapper right-wrapper">
		<h2  class="right-wrapper__title title">${vacancy.name}</h2>
		<div class="parent-for-text">
			<div class="right-wrapper__text">${description}</div>
		</div>
	</div>`;
	addBtn(vacanciesBlock.querySelector(".right-wrapper__text"));
	vacanciesSection.append(vacanciesBlock);
	});
		createMenu(arrForm);
		showMenu();
}

/* Получение вакансий по API */
async function getResponse(i = 0) {
	let response = await fetch(`https://api.hh.ru/vacancies/?per_page=5&page=${i}`, {
						method: "GET",
						headers: {
								"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Mobile Safari/537.36"
						}
					});
	let content = await response.json();
	content = content.items;

	return content;
} 

/* Проверка на добавление кнопки more details */
async function addBtn(block) {
	if(block.innerHTML.length > 220){
		addMoreBtn(block);
	}
}

/* Добавление кнопок. Механизм скрытия/раскрытия. */
function addMoreBtn(textField) {
	const openText = "more details";
	const closeText = "close";
	
	const moreBtn = document.createElement("div");
	moreBtn.classList.add("moreBtn");
	const moreBtnText = document.createTextNode(openText);
	moreBtn.appendChild(moreBtnText);
	textField.parentElement.appendChild(moreBtn, textField);

	moreBtn.addEventListener("click", function(event){
		event.preventDefault();
		if (moreBtn.innerHTML == openText){
			textField.classList.add("openFullText");
			moreBtn.innerHTML = closeText;
		} else {
			textField.classList.remove("openFullText");
			moreBtn.innerHTML = openText;
		}
	}); 
}

export {getDescription, showVacancies, getResponse};