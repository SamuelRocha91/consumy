import { BaseService } from './abstractService';

class ProductService extends BaseService{
  constructor() {
    super();
  }
  
  async getProducts(
    id: number,  
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const response = await this.getAll(`stores/${id}/products`);
    if (response.ok) {
      this.success(response, onSuccess, id);
    } else {
      this.failure(response, onFailure);
    }
  }
  
  async createProduct(
    id: number,
    dataProduct: any,
    onSuccess: () => void,
    onFailure: () => void
  ) {
    const formData = this.formData(dataProduct);
    if (dataProduct.src) {
      formData.append('product[image]', dataProduct.src);
    }
    const response = await this.create(`stores/${id}/products`, formData);
    if (response.ok) {
      this.success(response, onSuccess, id);
    } else {
      this.failure(response, onFailure);
    }
  }

  async updateProduct(
    id: number,
    idProduct: number,
    dataProduct: any,
    image: File | string | null,
    onSuccess: () => void,
    onFailure: () => void,
  ) {
    const formData = this.formData(dataProduct);
    if (image !== null) {
      formData.append('product[image]', image);
    }
    const response = await this.update(
      idProduct,
      `stores/${id}/products`,
      formData
    );
    if (response.ok) {
      this.success(response, onSuccess, id, "update");
    } else {
      this.failure(response, onFailure);
    }
  }

  async deleteProduct(
    id: number,
    idProduct: number,
    onSuccess: () => void,
    onFailure: () => void) {
    const response = await this.delete(idProduct, `stores/${id}/products`);
    if (response.ok) {
      onSuccess();
    } else {
      this.failure(response, onFailure);
    }
  }

  success(
    response: Response,
    onSuccess: () => void,
    id: number,
    type = "generate"
  ) {
    if (type == "generate") {
      response.json().then((json) => {
        this.generateStorage(json, id);
        onSuccess();
      });
    } else if (type == "update") {
      response.json().then(async (json) => {
        this.updateStorage(json, id);
        onSuccess();
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
