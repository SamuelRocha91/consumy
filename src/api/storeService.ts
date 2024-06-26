import { BaseService } from './abstractService';
import { type dataStoreRequest } from '@/types/storeTypes';


class StoreService extends BaseService{
  constructor() {
    super();
  }

  async getStores(
    page: number,
    onSuccess: (data: dataStoreRequest) => void,
    onFailure: (data: any) => void,
    searchQuery = '',
    category = '',
    auth = true,
  ) {
    let response: Response;

    if (searchQuery == "Todos") {
      searchQuery = '';
    }
    if (auth) {
      response = await this
        .getAll(
          `stores?page=${page}&name=${searchQuery}&category=${category}`
        );
    } else {
      console.log('corretossss');
      response = await this
        .getAllWithinToken(
          `stores/listing?page=${page}&name=${searchQuery}&category=${category}`
        );
    }
    
    if (response.ok) {
      console.log('aqui2');

      this.success(response, onSuccess);
    } else if (response.status === 401) {
      await this.refreshToken();
      const newResponse = await this
        .getAll
        (
          `stores?page=${page}&name=${searchQuery}&category=${category}`
        );
      if (newResponse.ok) {
        this.success(newResponse, onSuccess);
      } else {
        this.auth.signOut();
      }
    } else {
      this.failure(response, onFailure);
    }
  }
  
}

export { StoreService };

