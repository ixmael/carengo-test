import config from 'config';
import data from './data'

export default class ProductsRepository {
    getTotal() {
        return data.length;
    }

    fetch(start, end) {
        if(data.length < end) {
            return {
                products: data.slice(start),
                all: true
            }
        }
        else {
            return {
                products: data.slice(start, end)
            }
        }
    }
}
