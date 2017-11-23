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

const productsUrl = '/productos';
app.get(productsUrl, function(request, response) {
    const page = parseInt(request.query.page);

    const productsRepository = new ProductsRepository();
    const total = productsRepository.getTotal();
    const totalPages = Math.ceil(total / api.elementsPerPage);

    let currentPage = 1;
    let nextPage = 2;
    if(page) {
        if(totalPages <= page) {
            currentPage = totalPages;
            nextPage = null;
        }
        else {
            currentPage = page;
            nextPage = page + 1;
        }
    }

    const start = (currentPage - 1) * api.elementsPerPage;
    
    let products = productsRepository.fetch(start, start + api.elementsPerPage);
    
    response.json({
        currentPage: currentPage,
        nextPage: nextPage,
        totalProducts: total,
        products: products
    });
});

app.get('/', function(request, response) {
    response.render("index", { productsUrl: productsUrl});
});

// Fire it up!
const port = config.get('port');
app.listen(port);
console.log(`Listening on port ${port}`);
