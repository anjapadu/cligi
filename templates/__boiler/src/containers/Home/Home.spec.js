import React from "react";
import { create } from "react-test-renderer";
import configureStore from 'redux-mock-store'

import Home from './index';
import { Provider } from 'react-redux';
const initialState = {

};
const mockStore = configureStore();

let store;


describe("Home component", () => {
    beforeEach(() => {
        store = mockStore(initialState)
    });

    test("It renders and shows correct text", () => {
        const component = create(<Provider
            store={store}
        ><Home /></Provider>);

        const rootInstance = component.root;
        const h2 = rootInstance.findByType("h2");
        expect(h2.props.children).toBe("HOME")
    });
})



