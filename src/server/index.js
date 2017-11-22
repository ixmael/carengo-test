import path from 'path';
import config from 'config';
import express from 'express';
import atpl from 'atpl';

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

const productsUrl = '/productos';
app.get(productsUrl, function(request, response) {
    const page = request.query.page;
    response.json({
        currentPage: 1,
        nextPage: 2,
        products: [
            {
                name: 'nombre1'
            },
            {
                name: 'nombre2'
            },
            {
                name: 'nombre3'
            }
        ]
    });
});

app.get('/', function(request, response) {
    response.render("index", { productsUrl: productsUrl});
});

// Fire it up!
const port = config.get('port');
app.listen(port);
console.log(`Listening on port ${port}`);
