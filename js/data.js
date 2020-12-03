const getData = {
  // ссылка на файл с вопросами
  url: "db/quizes.json",
  async getData(url) {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Ошибка по адресу ${url}, статус ошибки ${response}`);
    }
    return await response.json();
  },
  // обращаемся к бд, преобразовуем в json и передаем в callback
  get(callback) {
    this.getData(this.url)
      .then(callback)
      .catch(console.error);
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