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
	<div class="vacancies-block__left-wrapper vacancies-card">
		<img class="vacancies-card__label" src="${(vacancy.employer.logo_urls === null) ? img : (vacancy.employer.logo_urls.original) }" >
		<div class="vacancies-card__text"><span class="vacancies-card__span">Form: </span>${vacancy.schedule.name}</div>
		<div class="vacancies-card__text"><span class="vacancies-card__span">Company: </span>${vacancy.employer.name}</div>
		<div class="vacancies-card__text"><span class="vacancies-card__span">Web: </span><a href="${(vacancy.alternate_url) ? (vacancy.alternate_url) : "#"}">${(vacancy.alternate_url) ? (vacancy.alternate_url) : "-"}</a></div>
		<div class="vacancies-card__text"><span class="vacancies-card__span">Address: </span>${vacancy.area.name}</div>
	</div>
	<div class="vacancies-block__right-wrapper vacancies-info">
		<h2  class="vacancies-info__title title">${vacancy.name}</h2>
		<div class="vacancies-info__parent-text">
			<div class="vacancies-info__text">${description}</div>
		</div>
	</div>`;
	addBtn(vacanciesBlock.querySelector(".vacancies-info__text"));
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