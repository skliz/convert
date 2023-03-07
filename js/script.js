class Convertor {
	constructor() {
		this.$convertorBox = document.querySelector('.converter__box');
		this.$data = document.getElementById('js-textarea');
		this.$input = document.getElementById('js-file');
		this.$changeDate = document.querySelector('.converter__btn_changedate');
		this.$btnRemoveHour = document.querySelector('.converter__btn_remove');
		this.$btnAddHour = document.querySelector('.converter__btn_add');
		this.$btnChangeTrackMinus = document.querySelector('.converter__btn_changetrack-minus');
		this.$btnChangeTrackPlus = document.querySelector('.converter__btn_changetrack-plus');
		this.$btnSave = document.getElementById('save');
		this.$btnClear = document.getElementById('clear');

		// Загружаем файл
		this.$input.addEventListener('change', (e) => {
			this.uploadFile();
		});

		// Меняем дату
		this.$changeDate.addEventListener('click', () => {

			this.$convertorBox.classList.add('move');

			setTimeout(() => {
				this.$convertorBox.classList.remove('move');
			}, 3000);

			// Создаем актуальную дату
			const date = new Date(); // Создаем обьект Date
			const year = date.getFullYear(); // получаем год
			const month = date.getMonth() + 1; // месяц
			const day = date.getDate(); // день
			const months = { 1: "Янв", 2: "Февр", 3: "Март", 4: "Апр", 5: "Май", 6: "Июн", 7: "Июл", 8: "Авг", 9: "Сент", 10: "Окт", 11: "Нояб", 12: "Янв" };

			// Конвертируем
			this.$data.value = this.$data.value
				//	.replace(/(\d)(\d)(\.)(\d)(\d)(\d)(\d)(\d)(\d)/gms, `$1$2$3$4$5$6$7$9$8`)
				// .replace(/lat="(\d)(\d)(\.)(\d)(\d)(\d)(\d)(\d)(\d)"/gms, `lat="$1$2$3$4$5$6$7$8${Math.floor(Math.random() * 10)}"`)
				//	.replace(/lon="(\d)(\d)(\.)(\d)(\d)(\d)(\d)(\d)(\d)"/gms, `lon="$1$2$3$4$5$6$7$8${Math.floor(Math.random() * 10)}"`)

				.replace(/(\d{4})-(\d{2})-(\d{2})/gms, `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`)
				.replace(/(\d{1,2})\s?([а-яА-Я]{3,})\.?\s?(\d{4})/gms, `${day} ${months[month]} ${year}`)
				.replace(/\(\d+\s?[а-яА-Я*]?\.?\)/gms, `(${year.toString().slice(-2)}г.)`);
		});

		// Убавляем час
		this.$btnRemoveHour.addEventListener('click', () => {
			this.$data.value = this.$data.value
				.replace(/(\d{1,}):(\d{2}):(\d{2})/gms, (e) => {
					let a = e.split`:`;
					let b = +a[0] > 0 ? +a[0] - 1 : +a[0] - 0;
					let c = b < 10 ? '0' + b : b;
					let d = a.slice(1);
					return [c, ...d].join`:`;
				});
		});

		// Добавляем час
		this.$btnAddHour.addEventListener('click', () => {
			this.$data.value = this.$data.value
				.replace(/(\d{1,}):(\d{2}):(\d{2})/gms, (e) => {
					let a = e.split`:`;
					let b = +a[0] < 23 ? +a[0] + 1 : +a[0] + 0;
					let c = b < 10 ? '0' + b : b;
					let d = a.slice(1);
					return [c, ...d].join`:`;
				});
		});

		// Изменить трек минус
		this.$btnChangeTrackMinus.addEventListener('click', () => {
			this.$data.value = this.$data.value
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
		this.$btnChangeTrackPlus.addEventListener('click', () => {
			this.$data.value = this.$data.value
				.replace(/\d{2}\.\d{5,}/gms, (e) => {
					let a = e.split``;
					let b = a.slice(-2);
					let c = +b[0] < 9 ? +b[0] + 1 : +b[0] + 0;
					let d = +b[1] < 9 ? +b[1] + 1 : +b[1] + 0;
					let f = a.slice(0, 7);
					return [...f, c, d].join``;
				})
		});

		// Сохранить файл
		this.$btnSave.addEventListener('click', () => {
			const fileName = (this.$data.value.match(/(?<=(<name>))[^a-z]+(?=(<\/name>))/gims) || [])[0];
			this.saveFile(this.$data.value, `${fileName}.gpx`);
		});

		// Очистить файл
		this.$btnClear.addEventListener('click', () => {
			this.clearFile();
		});
	}

	// Загрузить файл
	uploadFile() {
		const reader = new FileReader();
		reader.onload = function (e) {
			document.getElementById('js-textarea').value = e.target.result;
		};
		reader.readAsText(document.getElementById('js-file').files[0], 'UTF-8');
	}

	// Сохранить файл
	saveFile(text, name) {
		const b = new Blob([text], { type: 'text/plain' });
		const url = window.URL.createObjectURL(b);
		const a = document.createElement('a');
		a.href = url;
		a.download = name || 'file.gpx';
		a.type = 'text/plain';
		a.addEventListener('click', () => {
			setTimeout(() => window.URL.revokeObjectURL(url), 10000);
		});
		a.click();
	}

	// Очистить файл
	clearFile() {
		this.$data.value = '';
	}
}

const convertor = new Convertor();