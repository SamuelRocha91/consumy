import { BaseService } from './abstractService';

class ProductService extends BaseService{

  constructor() {
    super();
  }
  
  async getProducts(
    id: number,  
    onSuccess: (data?: any) => void,
    onFailure: () => void,
    page: number,
    searchQuery = '',
    category = '',
  ) {
    const response = await this
      .getAll(`stores/${id}/products?page=${page}&name=${searchQuery}&category=${category}&locale=pt-BR`);
    if (response.ok) {
      this.success(response, onSuccess);
    } else {
      this.failure(response, onFailure);
    }
  }
  

  success(
    response: Response,
    onSuccess: (data?: any) => void,
  ) {
      response.json().then((json) => {
        onSuccess(json);
      });
  }
  
  failure(response: Response, onFailure: () => void) {
    response.json().then((json) => console.log(json));
    onFailure();
  }  
}

export { ProductService };
