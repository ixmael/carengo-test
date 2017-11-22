import React from 'react';
import axios from 'axios';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentPage: 1,
            nextPage: null,
            products: []
        };

        this.loadNext = this.loadNext.bind(this);
    }

    componentDidMount() {
        this.loadNext();
    }

    loadNext() {
        const self = this;
        const { products } = this.state;

        axios.get(this.props.feedApi)
            .then(response => {
                const data = response.data;
                self.setState({
                    ...self.state,
                    currentPage: data.currentPage,
                    nextPage: data.nextPage,
                    products: products.concat(data.products)
                });
            })
            .catch(err => console.log(err));
    }

    render() {
        const { products } = this.state;

        let productsView = (<div>No hay productos</div>);
        if(0 < products.length) {
            productsView = products.map((p, i) => (<div key={i}>{p.name}</div>));
        }

        return (
            <div>
                <div>Lista de productos</div>
                {productsView}
                <div>Estatus</div>
                <button onClick={this.loadNext}>Cargar más</button>
            </div>
        );
    }
}
