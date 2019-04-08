import {
    createSelector
} from 'reselect';

const getIsLoading = state => state.app.isLoading

const appSelector = createSelector(
    [getIsLoading],
    (isLoading) => ({
        isLoading
    })
)

export {
    appSelector
}