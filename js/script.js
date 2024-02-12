class Convertor {
	constructor() {
		this.$convertorBox = document.querySelector('.converter__box')
		this.$data = document.getElementById('js-textarea')
		this.$input = document.getElementById('js-file')
		this.$changeDate = document.querySelector('.converter__btn_changedate')
		this.$btnRemoveHour = document.querySelector('.converter__btn_remove')
		this.$btnAddHour = document.querySelector('.converter__btn_add')
		this.$btnChangeTrackMinus = document.querySelector('.converter__btn_changetrack-minus')
		this.$btnChangeTrackPlus = document.querySelector('.converter__btn_changetrack-plus')
		this.$btnSave = document.getElementById('save')
		this.$btnClear = document.getElementById('clear')

		// placeholder-date
		setInterval(() => {
			this.$data.placeholder = this.getDate()
		}, 0)

		// Загружаем файл
		this.$input.addEventListener('change', (e) => {
			this.uploadFile()
		})

		// Меняем дату
		this.$changeDate.addEventListener('click', () => {

			this.$convertorBox.classList.add('move')

			setTimeout(() => {
				this.$convertorBox.classList.remove('move')
			}, 3000)

			// Создаем актуальную дату
			const date = new Date(); // Создаем обьект Date
			const year = date.getFullYear() // получаем год
			const month = date.getMonth() + 1 // месяц
			const day = date.getDate() // день
			const months = { 1: "Янв", 2: "Февр", 3: "Март", 4: "Апр", 5: "Май", 6: "Июн", 7: "Июл", 8: "Авг", 9: "Сент", 10: "Окт", 11: "Нояб", 12: "Янв" }

			// Конвертируем
			this.$data.value = this.$data.value
				.replace(/\d{4}-\d{2}-\d{2}/gms, `${year}-${`${month}`.padStart(2, 0)}-${`${day}`.padStart(2, 0)}`)
				.replace(/\d{1,2}\s?[а-я]{3,}\.?\s?\d{4}/gims, `${day} ${months[month]} ${year}`)
				.replace(/\(\d+\s?[а-я]?\.?\)/gims, `(${year.toString().slice(-2)}г.)`)
		});

		// Убавляем час
		this.$btnRemoveHour.addEventListener('click', () => {
			this.$data.value = this.$data.value
				.replace(/\d{1,}:\d{2}:\d{2}/gms, el => {
					const arr = el.split(':')
					const hour = +arr[0] > 0 ? +arr[0] - 1 : +arr[0] - 0;
					return [hour.toString().padStart(2, 0), ...arr.slice(1)].join(':')
				})
		})

		// Добавляем час
		this.$btnAddHour.addEventListener('click', () => {
			this.$data.value = this.$data.value
				.replace(/\d{1,}:\d{2}:\d{2}/gms, el => {
					const arr = el.split(':')
					const hour = +arr[0] < 23 ? +arr[0] + 1 : +arr[0] + 0;
					return [hour.toString().padStart(2, 0), ...arr.slice(1)].join(':')
				})
		})

		// Изменить трек минус
		this.$btnChangeTrackMinus.addEventListener('click', () => {
			this.$data.value = this.$data.value
				.replace(/\d{2}\.\d{5,}/gms, el => {
					const arr = el.split('')
					const tail = arr.slice(-2)
					const alpha = +tail[0] > 0 ? +tail[0] - 1 : +tail[0] - 0
					const beta = +tail[1] > 0 ? +tail[1] - 1 : +tail[1] - 0
					const head = arr.slice(0, 7)
					return [...head, alpha, beta].join('')
				})
		});

		// Изменить трек плюс
		this.$btnChangeTrackPlus.addEventListener('click', () => {
			this.$data.value = this.$data.value
				.replace(/\d{2}\.\d{5,}/gms, el => {
					const arr = el.split('')
					const tail = arr.slice(-2)
					let alpha = +tail[0] < 9 ? +tail[0] + 1 : +tail[0] + 0
					let beta = +tail[1] < 9 ? +tail[1] + 1 : +tail[1] + 0
					let head = arr.slice(0, 7)
					return [...head, alpha, beta].join('')
				})
		})

		// Сохранить файл
		this.$btnSave.addEventListener('click', () => {
			const fileName = (this.$data.value.match(/(?<=(<name>))[^a-z]+(?=(<\/name>))/gims) || [])[0]
			this.saveFile(this.$data.value, `${fileName}.gpx`)
		});

		// Очистить файл
		this.$btnClear.addEventListener('click', () => {
			this.clearFile()
		});
	}

	// Загрузить файл
	uploadFile() {
		const reader = new FileReader()
		reader.onload = function (e) {
			document.getElementById('js-textarea').value = e.target.result
		};
		reader.readAsText(document.getElementById('js-file').files[0], 'UTF-8')
	}

	// Сохранить файл
	saveFile(text, name) {
		const b = new Blob([text], { type: 'text/plain' })
		const url = window.URL.createObjectURL(b)
		const a = document.createElement('a')
		a.href = url
		a.download = name || 'file.gpx'
		a.type = 'text/plain'
		a.addEventListener('click', () => {
			setTimeout(() => window.URL.revokeObjectURL(url), 10000)
		});
		a.click()
	}

	// Очистить файл
	clearFile() {
		this.$data.value = ''
	}

	// date
	getDate() {
		// Создаем актуальную дату
		const date = new Date() // Создаем обьект Date
		const year = date.getFullYear() // получаем год
		const month = date.getMonth() + 1 // месяц
		const day = date.getDate() // день
		const hours = date.getHours() // Часы
		const min = date.getMinutes() // Минуты
		const sec = date.getSeconds() // Секунды
		return `${year}-${`${month}`.padStart(2, 0)}-${`${day}`.padStart(2, 0)} ${`${hours}`.padStart(2, 0)}:${`${min}`.padStart(2, 0)}:${`${sec}`.padStart(2, 0)}`
	}
}
const convertor = new Convertor()
