/*Autor: Charlotte Fehlhauer*/

import { createContext } from '@lit/context';

export const httpClientContext = createContext<HttpClient>('http-client');

interface Entry {
  date: string;
  title: string;
  text: string;
  mood: 'happy' | 'neutral' | 'sad' | undefined;
}

interface Habit {
  name: string;
  description: string;
  startDate: string;
  status: 'open' | 'in-progress' | 'done';
  rhythm: 'daily' | 'weekly' | 'monthly';
}

interface SignInData {
  email: string;
  password: string;
}

interface SignUpData {
  name: string;
  email: string;
  password: string;
  passwordCheck: string;
}

export class HttpClient {
  private baseURL!: string;

  /**
   *
   * @param baseURL cinst port = location.poriotocl == 'https:' ? 3000 : 3001;
   */

  init(baseURL: string) {
    this.baseURL = baseURL;
  }

  async get(collection: string) {
    const query: string = `${this.baseURL}/${collection}`;
    const response = await fetch(query, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include'
    });
    return this.result(response);
  }

  async isUserLoggedIn() {
    try {
      const response = await fetch(`${this.baseURL}/users/sign-in`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
      return response.ok;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
  /*
  async getUsername() {
    try {
      const response = await fetch(`${this.baseURL}users/sign-in`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });
    } catch (e) {
      return false;
    }
  }
*/
  async getEntryByDate(date: string) {
    const query: string = `${this.baseURL}/journal/${date}`;
    return this.result(await fetch(query));
  }

  async postEntry(entry: Entry) {
    const query: string = `${this.baseURL}/journal`;
    const response = await fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-Token': '32' //res.locals.csrfToken
      },
      body: JSON.stringify(entry),
      credentials: 'include'
    });
    return this.result(response);
  }

  async deleteEntry(id: string) {
    const query: string = `${this.baseURL}/journal`;
    await fetch(query, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-Token': '32' //res.locals.csrfToken
      },
      body: JSON.stringify({ id }),
      credentials: 'include'
    });
  }

  async editEntry(entry: Entry) {
    const query: string = `${this.baseURL}/journal`;
    const response = await fetch(query, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-Token': '32' //res.locals.csrfToken
      },
      body: JSON.stringify(entry),
      credentials: 'include'
    });
    return this.result(response);
  }

  async postSignIn(signInData: SignInData) {
    const query: string = `${this.baseURL}/users/sign-in`;
    const response = await fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-Token': '32' //res.locals.csrfToken
      },
      body: JSON.stringify({ signInData }),
      credentials: 'include'
    });
    return this.result(response);
  }

  async postSignUp(signUpData: SignUpData) {
    const query: string = `${this.baseURL}/users`;
    const response = await fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-Token': '32' //res.locals.csrfToken
      },
      body: JSON.stringify({ signUpData }),
      credentials: 'include'
    });
    return this.result(response);
  }

  async deleteSignOut() {
    const query: string = `${this.baseURL}/users/sign-out`;
    const response = await fetch(query, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-Token': '32' //res.locals.csrfToken
      },
      credentials: 'include'
    });
    return this.result(response);
  }

  /*Autor: Lea Koops */

  async postHabit(habit: Habit) {
    const query: string = `${this.baseURL}/habits`;
    const response = await fetch(query, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-Token': '32' //res.locals.csrfToken
      },
      body: JSON.stringify(habit),
      credentials: 'include'
    });
    return this.result(response);
  }

  async deleteHabit(name: string) {
    const query: string = `${this.baseURL}/habits`;
    const response = await fetch(query, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-Token': '32' //res.locals.csrfToken
      },
      body: JSON.stringify({ name }),
      credentials: 'include'
    });
    return this.result(response);
  }

  async editHabit(habit: Habit) {
    const query: string = `${this.baseURL}/habits`;
    const response = await fetch(query, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'X-CSRF-Token': '32' //res.locals.csrfToken
      },
      body: JSON.stringify(habit),
      credentials: 'include'
    });
    return this.result(response);
  }

  /*Ende Autor: Lea Koops */

  private async result(response: Response) {
    if (response.ok) {
      return response;
    } else {
      let message = await response.text();
      try {
        message = JSON.parse(message).message;
      } catch (e) {
        message = (e as Error).message;
      }
      message = message || response.statusText;
      return Promise.reject({ message, statusCode: response.status });
    }
  }
}
