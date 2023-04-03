import { configureStore } from '@reduxjs/toolkit';
import LaunchSlice from './features/LaunchSlice';


export const store = configureStore({
    reducer: {
        launches: LaunchSlice,
    },
});
