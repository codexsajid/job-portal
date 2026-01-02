import { createSlice } from '@reduxjs/toolkit'

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        appliedJobs: [],
        singleJob: null,
        searchQuery: ""
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload

        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload
        },
        setAppliedJobs: (state, action) => {
            state.appliedJobs = action.payload
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        }
    }
});
export const { setAllJobs, setSingleJob, setAllAdminJobs, setAppliedJobs, setSearchQuery } = jobSlice.actions;
export default jobSlice.reducer;


