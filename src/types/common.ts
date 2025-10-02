import { Dispatch, SetStateAction } from 'react';

export type State<TState> = [TState, Dispatch<SetStateAction<TState>>];

// export type AppDispatchType = ThunkDispatch<StateType, void, AnyAction>;
// export type StateType = ReturnType<typeof store.getState>;
