/*jshint esversion: 8 */

document.addEventListener('DOMContentLoaded', () => {
	/* Получение описания вакансий */
	async function getDescription(id) {
		let response = await fetch(`https://api.hh.ru/vacancies/${id}?host=hh.ru`, {
							method: 'GET',
							headers: {
									"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Mobile Safari/537.36"
							}
						});
		
		let content = await response.json();
		return content.description;
	}
	
	async function loadPage() {
			let response = await getResponse();
			showVacancies(response);
	}

	async function showVacancies(content) {
		const vacanciesSection = document.querySelector('.vacancies-section');
		const img = 'img/no_logo.png';
		content.forEach(async (vacancy) => {
			let description = await getDescription(vacancy.id);
			const vacanciesBlock = document.createElement('div');
			vacanciesBlock.className = "vacancies__block";
			vacanciesBlock.innerHTML += `
			<div class="vacancies__block__left-wrapper left-wrapper">
				<img class="left-wrapper__label" src="${(vacancy.employer.logo_urls === null) ? img : (vacancy.employer.logo_urls.original) }" >
				<p class="left-wrapper__text text"><span class="text__span">Form: </span>${vacancy.schedule.name}</p>
				<p class="left-wrapper__text text"><span class="text__span">Company: </span>${vacancy.employer.name}</p>
				<p class="left-wrapper__text text"><span class="text__span">Web: </span><a href="${(vacancy.alternate_url) ? (vacancy.alternate_url) : '#'}">${(vacancy.alternate_url) ? (vacancy.alternate_url) : '-'}</a></p>
				<p class="left-wrapper__text text"><span class="text__span">Address: </span>${vacancy.area.name}</p>
			</div>
			<div class="vacancies__block__right-wrapper right-wrapper">
				<h2  class="right-wrapper__title title">${vacancy.name}</h2>
				${description}
			</div>
			`;
			vacanciesSection.append(vacanciesBlock);
		});
	}
	/* Получание 5 вакансий */
	async function getResponse(i = 0) {
		let response = await fetch('https://api.hh.ru/vacancies/', {
							method: 'GET',
							headers: {
									"user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Mobile Safari/537.36"
							}
						});
		let content = await response.json();
		content = content.items.splice(i,i+5);

		return content;
	} 

	loadPage();
});

