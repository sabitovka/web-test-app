const getData = {
  // ссылка на файл с вопросами
  url: "db/quizes.json",
  // обращаемся к бд, преобразовуем в json и передаем в callback
  get(callback) {
    fetch(this.url)
      .then(response => response.json())
      .then(callback)
  },
  quizesList(callback) {
    this.get(data => {
      callback(data);
    });
  },
  quiz(id, callback) {
    this.get(data => {
      const result = data.find(item => item.id === id);
      callback(result);
    })
  }
}

export default getData;