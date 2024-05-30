import { BaseService } from './abstractService';

class StoreService extends BaseService{
  constructor() {
    super();
  }

  async getStores(
    page: number,
    onSuccess: (data: any) => void,
    onFailure: (data: any) => void,
    searchQuery = '',
    category = '',
  ) {
    const response = await this
      .getAll(
        `stores?page=${page}&name=${searchQuery}&category=${category}`
      );
    if (response.ok) {
      this.success(response, onSuccess);
    } else {
      this.failure(response, onFailure);
    }
  }

  failure(response: Response, onFailure: (data: any) => void) {
    response.json().then((erro: any) => onFailure(erro));
  }

  success(
    response: Response,
    onSuccess: (data?: any) => void,
  ) {
    response.json().then((json) => {
      onSuccess(json);
    });
  }

}

export { StoreService };

