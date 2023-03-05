document.addEventListener('DOMContentLoaded', () => {

	document.querySelector('.converter__btn').addEventListener('click', () => {

		document.querySelector('.converter__box').classList.add('move');

		setTimeout(() => {
			document.querySelector('.converter__box').classList.remove('move');
		}, 3000);

		// Получаем контент
		let data = document.querySelector('.converter__textarea');
		let dataContent = document.querySelector('.converter__textarea').value;

		// Создаем актуальную дату
		let date = new Date(); // Создаем обьект Date
		const year = date.getFullYear(); // получаем год
		const month = date.getMonth() + 1; // месяц
		const day = date.getDate(); // день
		const months = { 1: "Янв", 2: "Февр", 3: "Март", 4: "Апр", 5: "Май", 6: "Июн", 7: "Июл", 8: "Авг", 9: "Сент", 10: "Окт", 11: "Нояб", 12: "Янв" };

		// Конвертируем
		data.value = dataContent
			//	.replace(/(\d)(\d)(\.)(\d)(\d)(\d)(\d)(\d)(\d)/gms, `$1$2$3$4$5$6$7$9$8`)
			// .replace(/lat="(\d)(\d)(\.)(\d)(\d)(\d)(\d)(\d)(\d)"/gms, `lat="$1$2$3$4$5$6$7$8${Math.floor(Math.random() * 10)}"`)
			//	.replace(/lon="(\d)(\d)(\.)(\d)(\d)(\d)(\d)(\d)(\d)"/gms, `lon="$1$2$3$4$5$6$7$8${Math.floor(Math.random() * 10)}"`)

			.replace(/(\d{4})-(\d{2})-(\d{2})/gms, `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`)
			.replace(/(\d{1,2})\s?([а-яА-Я]{3,})\.?\s?(\d{4})/gms, `${day} ${months[month]} ${year}`)
			.replace(/\(\d+\s?[а-яА-Я*]?\.?\)/gms, `(${year.toString().slice(-2)}г.)`);
	});

	// Убавляем час
	document.querySelector('.converter__btn_remove').addEventListener('click', () => {
		// Получаем контент
		let data = document.querySelector('.converter__textarea');
		let dataContent = document.querySelector('.converter__textarea').value;

		data.value = dataContent.replace(/(\d{1,}):(\d{2}):(\d{2})/gms, (e) => {
			let a = e.split`:`;
			let b = +a[0] > 0 ? +a[0] - 1 : +a[0] - 0;
			let c = b < 10 ? '0' + b : b;
			let d = a.slice(1);
			return [c, ...d].join`:`.trim();
		});
	});

	// Добавляем час
	document.querySelector('.converter__btn_add').addEventListener('click', () => {
		// Получаем контент
		let data = document.querySelector('.converter__textarea');
		let dataContent = document.querySelector('.converter__textarea').value;

		data.value = dataContent.replace(/(\d{1,}):(\d{2}):(\d{2})/gms, (e) => {
			let a = e.split`:`;
			let b = +a[0] < 23 ? +a[0] + 1 : +a[0] + 0;
			let c = b < 10 ? '0' + b : b;
			let d = a.slice(1);
			return [c, ...d].join`:`.trim();
		});
	});

	// Изменить трек минус
	document.querySelector('.converter__btn_changetrack-minus').addEventListener('click', () => {
		// Получаем контент
		let data = document.querySelector('.converter__textarea');
		let dataContent = document.querySelector('.converter__textarea').value;

		data.value = dataContent
			.replace(/\d{2}\.\d{5,}/gms, (e) => {
				let a = e.split``;
				let b = a.slice(-2);
				let c = +b[0] > 0 ? +b[0] - 1 : +b[0] - 0;
				let d = +b[1] > 0 ? +b[1] - 1 : +b[1] - 0;
				let f = a.slice(0, 7);
				return [...f, c, d].join``;
			})
	});

	// Изменить трек плюс
	document.querySelector('.converter__btn_changetrack-plus').addEventListener('click', () => {
		// Получаем контент
		let data = document.querySelector('.converter__textarea');
		let dataContent = document.querySelector('.converter__textarea').value;

		data.value = dataContent
			.replace(/\d{2}\.\d{5,}/gms, (e) => {
				let a = e.split``;
				let b = a.slice(-2);
				let c = +b[0] < 9 ? +b[0] + 1 : +b[0] + 0;
				let d = +b[1] < 9 ? +b[1] + 1 : +b[1] + 0;
				let f = a.slice(0, 7);
				return [...f, c, d].join``;
			})
	});

	// Открыть файл
	$("#js-file").change(function () {
		var reader = new FileReader();
		reader.onload = function (e) {
			$("#js-textarea").val(e.target.result);
		};
		reader.readAsText($("#js-file")[0].files[0], "UTF-8");
	});

	// Сохранить файл
	function textToFile(text, name) {
		const b = new Blob([text], { type: 'gpx' });
		const url = window.URL.createObjectURL(b);

		const a = document.createElement('a');
		a.href = url;
		a.download = name || 'file.gpx';
		a.type = 'gpx';
		a.addEventListener('click', () => {
			setTimeout(() => window.URL.revokeObjectURL(url), 10000);
		});
		a.click();
	}

	document.getElementById('sv').addEventListener('click', () => {
		let dataContent = document.querySelector('.converter__textarea').value;
		let = fileName = dataContent.match(/(?<=(<name>))[^a-z]+(?=(<\/name>))/gims)[0];
		textToFile(document.getElementById('js-textarea').value, `${fileName}.gpx`);
	});
});