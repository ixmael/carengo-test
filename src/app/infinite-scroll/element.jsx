import React from 'react';

export default class extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { element } = this.props;
        return (
            <div className="element">
                <img src={element.image} />
                <h4>{element.title}</h4>
                <p>{element.price}</p>
                <p>{element.description}</p>
            </div>
        );
    }
}
