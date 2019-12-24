const initialState = {
    agecategory: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestAgeCategory: () => async (dispatch, getState) => {

        const url = 'api/AgeCategory/AgeCategory';
        const response = await fetch(url);
        const agecategory = await response.json();
        dispatch({ type: 'FETCH_AGECATEGORY', agecategory });
    },
    saveAgeCategory: agecategory => async (dispatch, getState) => {

        const url = 'api/AgeCategory/SaveAgeCategory';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(agecategory)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_AGECATEGORY', agecategory });
    },
    deleteAgeCategory: ageCategoryId => async (dispatch, getState) => {
        const url = 'api/AgeCategory/DeleteAgeCategory/' + ageCategoryId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_AGECATEGORY', ageCategoryId });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_AGECATEGORY': {
            return {
                ...state,
                agecategory: action.agecategory,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_AGECATEGORY': {
            return {
                ...state,
                agecategory: Object.assign({}, action.agecategory),
                forceReload: true
            }
        }
        case 'DELETE_AGECATEGORY': {
            return {
                ...state,
                ageCategoryId: action.ageCategoryId,
                forceReload: true
            }
        }
        default:
            return state;
    }
};
