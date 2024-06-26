import { createStorage, type SimpleStorage } from '../utils/storage';
import { Auth } from '@/utils/auth';

abstract class BaseService {
  protected apiUrl: string;
  storage: SimpleStorage;
  static X_API_KEY = import.meta.env.VITE_X_API_KEY;
  protected auth: Auth;

  constructor() {
    this.apiUrl = import.meta.env.VITE_BASE_URL;
    const persistent: boolean = this.whatIsMyStorage();
    this.storage = createStorage(persistent);
    this.auth = new Auth(persistent);
  }

  getFallback(key: string): string | null {
    return this.storage.get(key);
  }

  protected async getAll(path: string): Promise<Response> {
    const token = this.getFallback('token');
    const response = await fetch(`${this.apiUrl}/${path}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-API-KEY': BaseService.X_API_KEY
        }
      }
    );
    return response;
  }

  protected async getAllWithinToken(path: string): Promise<Response> {
    const response = await fetch(`${this.apiUrl}/${path}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }
      }
    );
    return response;
  }

  protected async post(path: string, body: any): Promise<Response> {
    const token = this.getFallback('token');
    const response = await fetch(`${this.apiUrl}/${path}`,
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-API-KEY': BaseService.X_API_KEY
        },
        body: JSON.stringify(body)
      }
    );
    return response;
  }

  protected async put(path: string, body: any): Promise<Response> {
    const token = this.getFallback('token');
    const response = await fetch(`${this.apiUrl}/${path}`,
      {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-API-KEY': BaseService.X_API_KEY
        },
        body: JSON.stringify(body)
      }
    );
    return response;
  }

  protected patch(path: string) {
    const token = this.getFallback('token');
    const response = fetch(`${this.apiUrl}/${path}`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'X-API-KEY': BaseService.X_API_KEY
      }
    });
    return response;
  }


  protected async getEntity(path: string): Promise<Response> {
    const token = this.getFallback('token');
    const response = await fetch(`${this.apiUrl}/${path}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
          'X-API-KEY': BaseService.X_API_KEY

        }
      }
    );
    return response;
  }

  protected success(
    response: Response,
    onSuccess: (data: any) => void,
  ) {
    response.json().then((json) => {
      console.log(json);
      onSuccess(json);
    });
  }

  protected failure(response: Response, onFailure: (data: any) => void) {
    response.json().then((json) => onFailure(json));
  }  

  protected async refreshToken() {
    const refresh_token = this.storage.get('refresh_token') || '[]';
    const parseRefresh = refresh_token;
    await this.auth.refreshTokens(parseRefresh);
  }

  private whatIsMyStorage() {
    const transient = createStorage(false);
    if (transient.get('token') != undefined) {
      return false;
    } else {
      return true;
    }
  }
}

export { BaseService };
