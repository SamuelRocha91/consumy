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
    const response = await this.getAll(`stores/${id}/products?page=${page}&name=${searchQuery}&category=${category}&locale=pt-BR`);
    if (response.ok) {
      this.success(response, onSuccess, id);
    } else {
      this.failure(response, onFailure);
    }
  }
  

  success(
    response: Response,
    onSuccess: (data?: any) => void,
    id: number,
    type = "generate"
  ) {
    if (type == "generate") {
      response.json().then((json) => {
        onSuccess(json);
      });
    } else {
      onSuccess();
    }
  }
  
  failure(response: Response, onFailure: () => void) {
    response.json().then((json) => console.log(json));
    onFailure();
  }  


  private formData(dataProduct: any) {
    const formData = new FormData();
    formData.append('product[title]', dataProduct.name);
    formData.append('product[category]', dataProduct.category);
    formData.append('product[price]', dataProduct.price);
    formData.append('product[description]', dataProduct.description);
    return formData;
  }

  private generateObjectSeller(json: any) {
    return {
      id: json.id,
      src: `${this.apiUrl}${json.image_url}`,
      name: json.title,
      price: json.price,
      description: json.description,
      category: json.category,
      active: true
    };
  }

  private generateStorage(json: any, id: number) {
    const storage = this.storage.get('stores') || '';
    const productSaved = this.generateObjectSeller(json);
    if (storage != '') {
      const store = JSON.parse(storage);
      const index = store
        .findIndex((field: any) => Number(field.id) === Number(id));
      store[index].products.push(productSaved);
      this.storage.store('stores', JSON.stringify(store));
    } 
  }

  private updateStorage(json: any, id: number) {
    const storage = this.storage.get('stores') || '';
    const productSaved = this.generateObjectSeller(json);
    if (storage != '') {
      const stores = JSON.parse(storage);
      const store = stores
        .find((field: any) => Number(field.id) === Number(id));
      if (store) {
        const productIndex = store.products
          .findIndex((product: any) => Number(product.id) === Number(json.id));
        store.products[productIndex] = productSaved;
        this.storage.store('stores', JSON.stringify(stores));
      }
    }
  }
}

export { ProductService };
