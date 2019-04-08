import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';
import { connect } from 'react-redux';
import {
    withRouter
} from 'react-router-dom';
import { } from '../actions';
import { push } from 'connected-react-router';
import {
    Home,
} from './asyncRoutes';
import { appSelector } from '../selectors';

class RouterApp extends React.Component {
    render() {
        return (<Layout
            {...this.props}
        >
            <Switch>
                <Route
                    path={"/"}

                    component={() => <Home />}
                    exact
                />
            </Switch>
        </Layout >)
    }
}

export const Layout = withRouter((props) => {
    return (<div>
        {props.children}
    </div >)
})

const mapStateToProps = (state) => {
    const {

    } = appSelector(state);
    return {

    }
}

export default (connect(mapStateToProps, {
    push
})(RouterApp))