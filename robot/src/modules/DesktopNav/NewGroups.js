import React from 'react';
import PropTypes from 'prop-types';
import { Route, matchPath } from 'react-router-dom';
import { AkContainerNavigationNested as NestedNav } from '@atlaskit/navigation';
import DefaultNav from './navigations/Default';
export default class Groups extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            parentRoute: null,
            stack: [[]],
        };
    }
    UNSAFE_componentWillMount() {
        this.resolveRoutes(this.context.router.route.location.pathname);
    }
    UNSAFE_componentWillReceiveProps(nextProps, nextContext) {
        this.resolveRoutes(nextContext.router.route.location.pathname);
    }
    resolveRoutes(pathname) {
        //const { docs, packages, patterns } = this.props;
        const menus = [
            <Route path="/">
        <DefaultNav pathname={pathname}/>
      </Route>,
        ];
        const stack = menus
            .filter(menu => matchPath(pathname, menu.props))
            .map(menu => [React.cloneElement(menu, { key: menu.props.path })]);
        const parentRoute = stack.length > 1 ? stack[stack.length - 2][0].props.path : null;
        this.setState({ parentRoute, stack });
    }
    render() {
        const { stack } = this.state;
        return <NestedNav stack={stack}/>;
    }
}
Groups.contextTypes = {
    router: PropTypes.object,
};