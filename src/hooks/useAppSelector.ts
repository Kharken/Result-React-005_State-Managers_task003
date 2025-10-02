import { TypedUseSelectorHook, useSelector } from 'react-redux';

import { StateType } from 'src/types/common';

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector;
