import { appSelector } from '../app';

describe('app selector', () => {
    it('it should select correct fields', () => {
        expect(appSelector({ app: { isLoading: true } })).toEqual({ isLoading: true })
    })

})