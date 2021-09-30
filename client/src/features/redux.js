import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSpecifiedPlace = createAsyncThunk(
    'data/fetchByCity',
    async (city) => {
        try {
            const response = await fetch(`//api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_APIKEY}`)
            if (!response.ok) return rejectWithValue('prob wrong city name')
            const dataBack = await response.json()
            return dataBack
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const fetchAllData = createAsyncThunk(
    'data/fetchDataByLatLon',
    async ({lat, lon}) => {
        try {
            const response = await fetch(`//api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current&appid=${process.env.REACT_APP_APIKEY}`)
            if (!response.ok) return rejectWithValue('wrong lat or lon')
            const dataBack = await response.json()
            return dataBack
        } catch (err) {
            return rejectWithValue(err.response.data)
        }
    }
)

export const weatherAppRedux = createSlice({
    name: 'weatherApp',
    initialState: {
        loading: false,
        data: null,
        fullData: null
    },
    reducers: {
        
    },
    extraReducers: {
        [fetchSpecifiedPlace.pending]: (state, action) => {
            state.loading = true
        },
        [fetchSpecifiedPlace.fulfilled]: (state, action) => {
            state.data = action.payload
            state.loading = false
        },
        [fetchSpecifiedPlace.rejected]: (state, action) => {
            state.loading = 'error'
        },

        [fetchAllData.pending]: (state, action) => {
            state.loading = true
        },
        [fetchAllData.fulfilled]: (state, action) => {
            state.fullData = action.payload
            state.loading = false
        },
        [fetchAllData.rejected]: (state, action) => {
            state.loading = 'error'
        }
    }
})

//destructuring 
export const { SET_C_W } = weatherAppRedux.actions

//acces state
export const status = state => state.weatherAppRedux.loading
export const data = state => state.weatherAppRedux.data 
export const fullData = state => state.weatherAppRedux.fullData

//object.type
export default weatherAppRedux.reducer
