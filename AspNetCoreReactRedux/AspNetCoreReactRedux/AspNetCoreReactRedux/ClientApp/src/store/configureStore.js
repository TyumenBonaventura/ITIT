import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import * as DocType from './DocType';
import * as User from './User';
import * as EquipmentType from './EquipmentType';
import * as AgeCategory from './AgeCategory';
import * as Gender from './Gender';
import * as Role from './Role';
import * as ReservationStatus from './ReservationStatus';

export default function configureStore (history, initialState) {
  const reducers = {
      doctype: DocType.reducer,
      user: User.reducer,
      equipmenttype: EquipmentType.reducer,
      agecategory: AgeCategory.reducer,
      gender: Gender.reducer,
      role: Role.reducer,
      reservationstatus: ReservationStatus.reducer,
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  // In development, use the browser's Redux dev tools extension if installed
  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    routing: routerReducer
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}
