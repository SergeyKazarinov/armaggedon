class Api {
  #options
  #APODUrl //Astronomy Picture of the Day
  #headers
  #api_key
  constructor(options) {
    this.#options = options;
    this.#APODUrl = this.#options.APODUrl;
    this.#headers = this.#options.headers;
    this.#api_key = this.#options.api_key;
  }
  
  #checkAnswer(res) {
    if(res.ok) {
      return res.json();
    }else {
      return Promise.reject(`Ошибка ${res.status}: ${res.statusText}`);
    }
  }

  getApodImage() {
    return fetch(`${this.#APODUrl}?api_key=${this.#api_key}`, {
      headers: this.#headers
    })
    .then((res) => {
      return this.#checkAnswer(res);
    })
  }
}

const api = new Api ({
  APODUrl: 'https://api.nasa.gov/planetary/apod',
  headers: {
    'Content-Type': 'application/json'
  }, 
  api_key: 'r6G8CKnPzzOQbhFRHSaaa9WKHSJb3m6NF9wnJn4t'
});

export default api;