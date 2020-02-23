import React from 'react';
import FourOhFour from '../pages/FourOhFour';
export default class Boundary extends React.Component {
    constructor() {
        super(...arguments);
        this.state = { hasError: false };
    }
    componentDidCatch(error, info) {
        this.setState({ hasError: true });
    }
    render() {
        let { hasError } = this.state;
        if (hasError) {
            return <FourOhFour />;
        }
        return this.props.children;
    }
}