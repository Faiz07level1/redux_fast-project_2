import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useHttp } from "../../hooks/http.hook";
const initialState = {
    filters: [],
    filtersLoadingStatus: "idle",
    activeFilter: "all",
}


export const fetchFilters = createAsyncThunk(
    "filters/fetchFilters",
    async () => {
         const {request} = useHttp()
        return await request(`http://localhost:3001/filters`)
    }
)
const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        heroesFilter: (state, action) => {state.activeFilter = action.payload}, 
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.fulfilled, (state, action) => {state.filters = action.payload})
    }
})

const {actions, reducer} = filtersSlice;

export default reducer;

export const {heroesFilter} = actions


