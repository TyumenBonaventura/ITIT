const initialStateRole = {
    role: [],
    loading: false,
    errors: {},
    forceReload: false
}

const initialStateRole = {
    role: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestRole: () => async (dispatch, getState) => {

        const url = 'api/Role/Role';
        const response = await fetch(url);
        const role = await response.json();
        dispatch({ type: 'FETCH_ROLE', role });
    },
    saveRole: role => async (dispatch, getState) => {

        const url = 'api/Role/SaveRole';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(role)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_ROLE', role });
    },
    deleteRole: roleId => async (dispatch, getState) => {
        const url = 'api/Role/DeleteRole/' + roleId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_ROLE', roleId });
    },
    requestRole: () => async (dispatch, getState) => {

        const url = 'api/Role/Role';
        const response = await fetch(url);
        const role = await response.json();
        dispatch({ type: 'FETCH_ROLE', role });
    }
};

export const reducer = (state, action) => {
    state = state || initialStateRole || initialStateRole;

    switch (action.type) {
        case 'FETCH_ROLE': {
            return {
                ...state,
                role: action.role,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_ROLE': {
            return {
                ...state,
                role: Object.assign({}, action.role),
                forceReload: true
            }
        }
        case 'DELETE_ROLE': {
            return {
                ...state,
                roleId: action.roleId,
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
