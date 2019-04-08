import appReducer from '../app';
import * as constants from '../../constants';

describe('app reducer', () => {
    it('should return the initial state', () => {
        expect(appReducer(undefined, {})).toEqual({
            isLoading: true
        })
    })
    it('should handle SET_IS_LOADING', () => {
        expect(
            appReducer({}, {
                type: constants.SET_IS_LOADING,
                payload: false
            })
        ).toEqual({
            isLoading: false
        })
        expect(
            appReducer(
                {
                    isLoading: false
                },
                {
                    type: constants.SET_IS_LOADING,
                    payload: true
                }
            )
        ).toEqual({
            isLoading: true
        })
    })
})