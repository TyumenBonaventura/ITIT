const initialState = {
    equipment: [],
    agecategory: [],
    equipmenttype: [],
    gender: [],
//    reservationequipment: [],
    loading: false,
    errors: {},
    forceReload: false
}

export const actionCreators = {
    requestEquipment: () => async (dispatch, getState) => {

        const url = 'api/Equipment/Equipment';
        const response = await fetch(url);
        const equipment = await response.json();
        dispatch({ type: 'FETCH_EQUIPMENT', equipment });
    },
    saveEquipment: equipment => async (dispatch, getState) => {

        const url = 'api/Equipment/SaveEquipment';
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        const requestOptions = {
            method: 'POST',
            headers,
            body: JSON.stringify(equipment)
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'SAVE_EQUIPMENT', equipment });
    },
    deleteEquipment: equipmentId => async (dispatch, getState) => {
        const url = 'api/Equipment/DeleteEquipment/' + equipmentId;
        const requestOptions = {
            method: 'DELETE',
        };
        const request = new Request(url, requestOptions);
        await fetch(request);
        dispatch({ type: 'DELETE_EQUIPMENT', equipmentId });
    },
    requestAgeCategory: () => async (dispatch, getState) => {

        const url = 'api/Equipment/AgeCategory';
        const response = await fetch(url);
        const agecategory = await response.json();
        dispatch({ type: 'FETCH_AGECATEGORY', agecategory });
    },
    requestEquipmentType: () => async (dispatch, getState) => {

        const url = 'api/Equipment/EquipmentType';
        const response = await fetch(url);
        const equipmenttype = await response.json();
        dispatch({ type: 'FETCH_EQUIPMENTTYPE', equipmenttype });
    },
    requestGender: () => async (dispatch, getState) => {

        const url = 'api/Equipment/Gender';
        const response = await fetch(url);
        const gender = await response.json();
        dispatch({ type: 'FETCH_GENDER', gender });
    },
/*    requestReservationEquipment: () => async (dispatch, getState) => {

        const url = 'api/Equipment/ReservationEquipment';
        const response = await fetch(url);
        const reservationequipment = await response.json();
        dispatch({ type: 'FETCH_RESERVATIONEQUIPMENT', reservationequipment });
    },*/
};

export const reducer = (state, action) => {
    state = state || initialState;

    switch (action.type) {
        case 'FETCH_EQUIPMENT': {
            return {
                ...state,
                equipment: action.equipment,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'SAVE_EQUIPMENT': {
            return {
                ...state,
                equipment: Object.assign({}, action.equipment),
                forceReload: true
            }
        }
        case 'DELETE_EQUIPMENT': {
            return {
                ...state,
                equipmentId: action.equipmentId,
                forceReload: true
            }
        }
        case 'FETCH_AGECATEGORY': {
            return {
                ...state,
                agecategory: action.agecategory,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'FETCH_EQUIPMENTTYPE': {
            return {
                ...state,
                equipmenttype: action.equipmenttype,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
        case 'FETCH_GENDER': {
            return {
                ...state,
                gender: action.gender,
                loading: false,
                errors: {},
                forceReload: false
            }
        }
     /*   case 'FETCH_RESERVATIONEQUIPMENT': {
            return {
                ...state,
                reservationequipment: action.reservationequipment,
                loading: false,
                errors: {},
                forceReload: false
            }
        }*/
        default:
            return state;
    }
};
