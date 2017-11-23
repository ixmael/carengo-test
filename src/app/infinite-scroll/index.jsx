import React from 'react';
import axios from 'axios';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            products: [],
            totalProducts: 0,
            isAllLoaded: false
        };

        this.loadNext = this.loadNext.bind(this);
    }

    componentDidMount() {
        this.loadNext();
    }

    loadNext() {
        const self = this;
        const { page, isAllLoaded, products } = this.state;

        if(!isAllLoaded) {
            axios.get(this.props.feedApi, { params: { page: page }})
                .then(response => {
                    const data = response.data;

                    const remoteProducts = data.products;
                    let all = false;
                    if('all' in data) {
                        all = data.all;
                    }
                    self.setState({
                        ...self.state,
                        page: page + 1,
                        products: products.concat(remoteProducts),
                        totalProducts: data.totalProducts,
                        isAllLoaded: all
                    });
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        const { products, totalProducts, currentPage } = this.state;

        let productsView = (<div></div>);
        if(0 < products.length) {
            productsView = products.map((p, i) => (<div key={i} className="element">{p.title}</div>));
        }

        let buttonLoad = (<button onClick={this.loadNext}>Cargar más</button>);
        //if(products.length == totalProducts)

        let status = (<div>Cargando productos...</div>);
        if(0 != totalProducts) {
            status = (<div>{products.length} de {totalProducts}</div>);
        }

        return (
            <div id="infinite-scroll-component">
                <div>
                    <h1>Lista de productos</h1>
                    {status}
                </div>
                {productsView}
                {buttonLoad}
            </div>
        );
    }
}
