import {
    setIsLoading
} from '../index';
import {
    SET_IS_LOADING
} from '../../constants';

describe('actions app', () => {
    it('should create an action to change isLoading', () => {
        const payload = false
        const expectedAction = {
            type: SET_IS_LOADING,
            payload
        }
        expect(setIsLoading(false)).toEqual(expectedAction)
    })
})