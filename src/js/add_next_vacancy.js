/*jshint esversion: 8 */
/* добавление дополнительно +5 вакансий при нажатии кнопки */
import * as get_functions from "./get_vacancy.js";

async function addNextVacancies() {
	const parent = document.querySelector(".btn-more-vacancies");
	const btnShowMore = document.createElement("button");
	btnShowMore.className = "btn";
	const text = document.createTextNode("Show more");
	btnShowMore.appendChild(text);
	parent.append(btnShowMore);
	let count = 0;
	
	btnShowMore.addEventListener("click", async () =>{
		count += 1 ;
		console.log(count);
		let response = await get_functions.getResponse(count);
		await get_functions.showVacancies(response); 
		if (count === 3) {
			btnShowMore.style = "display: none";
		} 
	});
}

export {addNextVacancies};

	