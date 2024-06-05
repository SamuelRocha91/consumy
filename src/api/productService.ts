import { BaseService } from './abstractService';
import { type dataProductsRequest } from '@/types/productTypes';

class ProductService extends BaseService{

  constructor() {
    super();
  }
  
  async getProducts(
    id: number,  
    onSuccess: (data: dataProductsRequest) => void,
    onFailure: (data? :any) => void,
    page: number,
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
        .getAll
        (
          `stores/${id}/products?page=\n${page}&name=${searchQuery}&category=${category}&locale=pt-BR`
        );
    } else {
      response = await this
        .getAllWithinToken
        (
          `products/listing${id}/products?page=\n${page}&name=${searchQuery}&category=${category}&locale=pt-BR`
        );
    }
    
    if (response.ok) {
      this.success(response, onSuccess);
    } else if (response.status === 401) {
      await this.refreshToken();
      const newResponse = await this
        .getAll
        (
          `stores/${id}/products?page=\n${page}&name=${searchQuery}&category=${category}&locale=pt-BR`
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
  
  success(
    response: Response,
    onSuccess: (data: dataProductsRequest) => void,
  ) {
    response.json().then((json) => {
      onSuccess(json);
    });
  }
  
  failure(response: Response, onFailure: (data: any) => void) {
    response.json().then((json) => onFailure(json));
  }  

  private async refreshToken() {
    const refresh_token = this.storage.get('refresh_token') || '[]';
    const parseRefresh = refresh_token;
    await this.auth.refreshTokens(parseRefresh);
  }
}

export { ProductService };
