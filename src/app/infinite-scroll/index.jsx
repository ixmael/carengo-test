import React from 'react';
import axios from 'axios';
import ElementView from './element';
import Spinner from 'react-spinkit';

export default class extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 1,
            products: [],
            totalProducts: 0,
            isAllLoaded: false,
            fetching: false
        };

        this.loadNext = this.loadNext.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        this.loadNext();
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleScroll);
    }

    loadNext() {
        const self = this;
        const { page, isAllLoaded, products } = this.state;

        if(!isAllLoaded) {
            this.setState({
                ...this.state,
                fetching: true
            });

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
                        isAllLoaded: all,
                        fetching: false
                    });
                })
                .catch(err => {
                    console.log(err);
                    this.setState({
                        ...this.state,
                        fetching: true
                    });
                });
        }
    }

    render() {
        const { products, totalProducts, currentPage, fetching } = this.state;

        let productsView = (<div></div>);
        if(0 < products.length) {
            productsView = products.map((p, i) => (<ElementView key={i} element={p}></ElementView>));
        }

        let buttonLoad = (<button onClick={this.loadNext}>Cargar más</button>);

        let status = (<div>Cargando productos...</div>);
        if(0 != totalProducts) {
            status = (<div>{products.length} de {totalProducts}</div>);
        }

        let fetchingDisplay = (<div></div>);
        if(fetching) {
            fetchingDisplay = (<Spinner className="status" fadeIn="none" name="wave" color="purple"/>);
        }

        return (
            <div id="infinite-scroll-component">
                <div>
                    <h1>Lista de productos</h1>
                    {status}
                </div>
                {productsView}
                {fetchingDisplay}
            </div>
        );
    }

    handleScroll() {
        const windowHeight = "innerHeight" in window ? window.innerHeight : document.documentElement.offsetHeight;
        const body = document.body;
        const html = document.documentElement;
        const docHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
        const windowBottom = windowHeight + window.pageYOffset;
        if (windowBottom >= docHeight) {
            this.loadNext();
        }
    }
}
