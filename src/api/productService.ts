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
          `stores/${id}/products/listing?page=\n${page}&name=${searchQuery}&category=${category}&locale=pt-BR`
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

}

export { ProductService };
