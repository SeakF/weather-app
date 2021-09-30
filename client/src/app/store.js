import { configureStore } from '@reduxjs/toolkit'
import weatherAppRedux from '../features/redux'

export default configureStore({
    reducer: {
        weatherAppRedux
    },
    devTools: true
})