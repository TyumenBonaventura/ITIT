const initialState = {
    user: [],
    role: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestUser: () => async (dispatch, getState) => {

        const url = 'api/User/User';
        const response = await fetch(url);
        const user = await response.json();
        dispatch({ type: 'FETCH_USER', user });
    },
    saveUser: user => async (dispatch, getState) => {

        const url = 'api/User/SaveUser';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(user)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_USER', user });
    },
    deleteUser: userId => async (dispatch, getState) => {
        const url = 'api/User/DeleteUser/' + userId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_USER', userId });
    },
    requestRole: () => async (dispatch, getState) => {

        const url = 'api/User/Role';
        const response = await fetch(url);
        const role = await response.json();
        dispatch({ type: 'FETCH_ROLE', role });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_USER': {
            return {
                ...state,
                user: action.user,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_USER': {
            return {
                ...state,
                user: Object.assign({}, action.user),
                forceReload: true
            }
        }
        case 'DELETE_USER': {
            return {
                ...state,
                userId: action.userId,
                forceReload: true
            }
        }
        case 'FETCH_ROLE': {
            return {
                ...state,
                role: action.role,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        default:
            return state;
    }
};
