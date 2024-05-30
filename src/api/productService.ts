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
  ) {
    const response = await this
      .getAll
      (
        `stores/${id}/products?page=
        ${page}&name=${searchQuery}&category=${category}&locale=pt-BR`
      );
    if (response.ok) {
      this.success(response, onSuccess);
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
}

export { ProductService };
