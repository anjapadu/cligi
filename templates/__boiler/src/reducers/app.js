import { SET_IS_LOADING } from '../constants';

const INITIAL_STATE = {
    isLoading: true
}

export default (state = INITIAL_STATE, { type, payload }) => {
    switch (type) {
        case SET_IS_LOADING:
            return {
                ...state,
                isLoading: payload
            }
        default:
            return state
    }
}