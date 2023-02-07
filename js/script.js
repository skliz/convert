document.addEventListener('DOMContentLoaded', () => {

	document.querySelector('.converter__btn').addEventListener('click', () => {

		document.querySelector('.converter__box').classList.toggle('move');

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
			.replace(/lat="(\d)(\d)(.)(\d)(\d)(\d)(\d)(\d)(\d)"/gms, `lat="$1$2$3$4$5$6$7$8${Math.floor(Math.random() * 10)}"`)
			.replace(/lon="(\d)(\d)(.)(\d)(\d)(\d)(\d)(\d)(\d)"/gms, `lon="$1$2$3$4$5$6$7$8${Math.floor(Math.random() * 10)}"`)
			.replace(/(\d{4})-(\d{2})-(\d{2})/gms, `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`)
			.replace(/(\d{1,2})\s?([а-яА-Я]{3,})\.?\s?(\d{4})/gms, `${day} ${months[month]} ${year}`)
			.replace(/\(\d+[а-яА-Я*]?\.?\)/gms, `(${year.toString().slice(-2)})`);
	});

	$("#js-file").change(function () {
		var reader = new FileReader();
		reader.onload = function (e) {
			$("#js-textarea").val(e.target.result);
		};
		reader.readAsText($("#js-file")[0].files[0], "UTF-8");
	});
});
