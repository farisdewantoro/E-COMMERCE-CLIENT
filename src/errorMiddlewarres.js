import { REMOVE_ERRORS} from './app/actions/types';
import IsEmpty from './validation/is-empty';
let currentPage = ''

export const removeError = store => next => action => {
   
    if (action.type === '@@router/LOCATION_CHANGE') {
        const nextPage = `${action.payload.location.pathname}${action.payload.location.search}`;
        const errors = store.getState().errors;
    
        if (currentPage !== nextPage && !IsEmpty(errors)) {
            store.dispatch({
                type: REMOVE_ERRORS
            });
        }
     
    }
 

    return next(action)
}