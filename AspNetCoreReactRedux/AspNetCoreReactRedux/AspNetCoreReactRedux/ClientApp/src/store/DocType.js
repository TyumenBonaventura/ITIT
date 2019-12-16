const initialState = {
    doctype: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestDocType: () => async (dispatch, getState) => {

        const url = 'api/DocType/DocType';
        const response = await fetch(url);
        const doctype = await response.json();
        dispatch({ type: 'FETCH_DOCTYPE', doctype });
    },
    saveDocType: doctype => async (dispatch, getState) => {

        const url = 'api/DocType/SaveDocType';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(doctype)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_DOCTYPE', doctype });
    },
    deleteDocType: docTypeId => async (dispatch, getState) => {
        const url = 'api/DocType/DeleteDocType/' + docTypeId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_DOCTYPE', docTypeId });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_DOCTYPE': {
            return {
                ...state,
                doctype: action.doctype,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_DOCTYPE': {
            return {
                ...state,
                doctype: Object.assign({}, action.doctype),
                forceReload: true
            }
        }
        case 'DELETE_DOCTYPE': {
            return {
                ...state,
                docTypeId: action.docTypeId,
                forceReload: true
            }
        }
        default:
            return state;
    }
};
