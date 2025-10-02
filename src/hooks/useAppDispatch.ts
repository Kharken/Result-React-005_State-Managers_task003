import { useDispatch } from 'react-redux';

import { AppDispatchType } from 'src/types/common';

export const useAppDispatch = () => useDispatch<AppDispatchType>();
