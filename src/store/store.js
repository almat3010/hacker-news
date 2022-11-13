import { configureStore } from '@reduxjs/toolkit';
import news from '../slices/newsSlice'

const store = configureStore({
    reducer: {news},
    devTools: true
});

export default store