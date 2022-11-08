/*jshint esversion: 8 */


// реализация выпадающего меню

/* показать/скрыть выпадающее меню */
function showMenu(){
	const divVacancy = document.querySelector("#vacancyList");
	const navMenubtn = document.querySelector(".drop-down-menu__img");
	navMenubtn.addEventListener("click", () =>{
		divVacancy.classList.toggle("click");
		navMenubtn.classList.toggle("rotate");
	});
}

/* Добавление в выпадающее меню уникальных вакансий */
function createMenu(arrVacancy) {
	const newArrVacancy = unique(arrVacancy);
	const divVacancy = document.querySelector("#vacancyList");
	for (let i = 0; i < newArrVacancy.length; i++){
		const elemNavMenu = document.createElement("p");
		elemNavMenu.innerHTML += `${newArrVacancy[i]}`;
		divVacancy.append(elemNavMenu);
	}
}

/* Проверка на уникальность элементов для выпадающего меню*/
function unique(arr) {
	let result = [];
	for (let str of arr) {
		if (!result.includes(str)) {
			result.push(str);
		}
	}
	return result;
} 

export {createMenu, showMenu};