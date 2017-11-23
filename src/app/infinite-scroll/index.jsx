import React from 'react';
import axios from 'axios';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            totalProducts: 0,
            products: []
        };

        this.loadNext = this.loadNext.bind(this);
    }

    componentDidMount() {
        this.loadNext();
    }

    loadNext() {
        const self = this;
        const { products, currentPage } = this.state;

        axios.get(this.props.feedApi, { params: { page: currentPage + 1 }})
            .then(response => {
                const data = response.data;
                self.setState({
                    ...self.state,
                    currentPage: data.currentPage,
                    totalProducts: totalProducts,
                    products: products.concat(data.products)
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { products, totalProducts } = this.state;

        let productsView = (<div>No hay productos</div>);
        if(0 < products.length) {
            productsView = products.map((p, i) => (<div key={i} className="element">{p.name}</div>));
        }

        let buttonLoad = (<button onClick={this.loadNext}>Cargar más</button>);
        if(products.length == totalProducts)

        return (
            <div id="infinite-scroll-component">
                <div>Lista de productos</div>
                {productsView}
                <div>Estatus</div>
                {buttonLoad}
            </div>
        );
    }
}
