/*jshint esversion: 8 */

import {addNextVacancies} from "./add_next_vacancy.js";
import * as get_functions from "./get_vacancy.js";


document.addEventListener("DOMContentLoaded", () => {

	
	/* вызов функций */
	async function loadPage() {
			let response = await get_functions.getResponse();
			await get_functions.showVacancies(response); 
			addNextVacancies();
	}

	loadPage();
 });

