import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { element } = this.props;
        return (
            <div className="element">
                <div className="title">
                    <h4>{element.title}</h4>
                </div>
                <div className="image">
                    <img src={element.image} />
                </div>
                <div className="description">
                    <p>{element.description}</p>
                </div>
                <div className="price">
                    $ {element.price}
                </div>
            </div>
        );
    }
}
