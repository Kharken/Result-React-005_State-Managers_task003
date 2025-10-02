import { Dispatch, SetStateAction } from 'react';
import { store } from 'src/store/store';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export type State<TState> = [TState, Dispatch<SetStateAction<TState>>];

export type AppDispatchType = ThunkDispatch<StateType, void, AnyAction>;
export type StateType = ReturnType<typeof store.getState>;
