import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import {
// 	ConnectedRouter,
// } from 'react-router-redux';
import {
	Provider
} from 'react-redux';
import {
	PersistGate
} from 'redux-persist/integration/react'
import './styles.scss';
import configureStore from './store';
import { ConnectedRouter } from 'connected-react-router'
const {
	store,
	persistor,
	sagaMiddleware,
	history
} = configureStore();
import watcherSaga from './sagas'
import RouterApp from './router';
import './utils'
import { hot } from 'react-hot-loader/root'

class App extends Component {
	constructor(props) {
		super(props);
		sagaMiddleware.run(watcherSaga);
	}
	render() {
		return (<Provider store={store}>
			<PersistGate
				persistor={persistor}
				// onBeforeLift={__ASYNC_FUNCTION_BEFORE_REHYDRATE__}
				loading={<div>LOADING...</div>}
			>
				<ConnectedRouter history={history}>
					<RouterApp />
				</ConnectedRouter>
			</PersistGate>
		</Provider >
		)
	}
}

export default /* istanbul ignore next */ IS_DEV ? hot(App) : App;
