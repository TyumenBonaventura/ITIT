const initialState = {
    gender: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestGender: () => async (dispatch, getState) => {

        const url = 'api/Gender/Gender';
        const response = await fetch(url);
        const gender = await response.json();
        dispatch({ type: 'FETCH_GENDER', gender });
    },
    saveGender: gender => async (dispatch, getState) => {

        const url = 'api/Gender/SaveGender';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(gender)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_GENDER', gender });
    },
    deleteGender: genderId => async (dispatch, getState) => {
        const url = 'api/Gender/DeleteGender/' + genderId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_GENDER', genderId });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_GENDER': {
            return {
                ...state,
                gender: action.gender,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_GENDER': {
            return {
                ...state,
                gender: Object.assign({}, action.gender),
                forceReload: true
            }
        }
        case 'DELETE_GENDER': {
            return {
                ...state,
                genderId: action.genderId,
                forceReload: true
            }
        }
        default:
            return state;
    }
};
