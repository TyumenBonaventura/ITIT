const initialState = {
    equipmenttype: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestEquipmentType: () => async (dispatch, getState) => {

        const url = 'api/EquipmentType/EquipmentType';
        const response = await fetch(url);
        const equipmenttype = await response.json();
        dispatch({ type: 'FETCH_EQUIPMENTTYPE', equipmenttype });
    },
    saveEquipmentType: equipmenttype => async (dispatch, getState) => {

        const url = 'api/EquipmentType/SaveEquipmentType';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(equipmenttype)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_EQUIPMENTTYPE', equipmenttype });
    },
    deleteEquipmentType: equipmentTypeId => async (dispatch, getState) => {
        const url = 'api/EquipmentType/DeleteEquipmentType/' + equipmentTypeId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_EQUIPMENTTYPE', equipmentTypeId });
    }
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_EQUIPMENTTYPE': {
            return {
                ...state,
                equipmenttype: action.equipmenttype,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_EQUIPMENTTYPE': {
            return {
                ...state,
                equipmenttype: Object.assign({}, action.equipmenttype),
                forceReload: true
            }
        }
        case 'DELETE_EQUIPMENTTYPE': {
            return {
                ...state,
                equipmentTypeId: action.equipmentTypeId,
                forceReload: true
            }
        }
        default:
            return state;
    }
};
