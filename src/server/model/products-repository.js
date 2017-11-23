import randomstring from 'randomstring';

export default class ProductsRepository {

    getTotal() {
        return 23;
    }

    fetch(start, end) {
        let products = (new Array(end - start)).fill(0);
        products.forEach((e, i) => {
            products[i] = {
                name: `${randomstring.generate(10)}_${i}`
            }
        });

        return products;
    }
}
