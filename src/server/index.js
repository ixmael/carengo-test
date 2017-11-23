import path from 'path';
import config from 'config';
import express from 'express';
import atpl from 'atpl';
import ProductsRepository from './model/products-repository.js';

const staticPath = path.join(process.env.NODE_PATH, 'static');
const templatesPath = path.join(process.env.NODE_PATH, 'templates');

const app = express();

// Log the requests
//app.use(logger('dev'));

// Serve static files
app.use(express.static(staticPath));

app.engine('html', atpl.__express)
app.set('view engine', 'html');
app.set('views', path.join(templatesPath));

const api = config.get('api');

app.get('/productos', function(request, response) {
    const page = parseInt(request.query.page);

    const productsRepository = new ProductsRepository();
    const totalProducts = productsRepository.getTotal();
    const totalPages = Math.ceil(totalProducts / api.elementsPerPage);
    
    let data = {
        totalProducts
    };
    if(page <= totalPages) {
        let start = (page - 1) * api.elementsPerPage;
        let end   = start + api.elementsPerPage;
        let products = productsRepository.fetch(start, end);
        data.products = products.products;
        if('all' in products) {
            data.all = products.all;
        }
    }

    response.json(data);
});

app.get('/', function(request, response) {
    response.render("index", { productsUrl: '/productos'});
});

// Fire it up!
const port = config.get('port');
app.listen(port);
console.log(`Listening on port ${port}`);
