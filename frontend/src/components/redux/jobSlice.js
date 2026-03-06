import { createSlice } from '@reduxjs/toolkit'

const jobSlice = createSlice({
    name: "job",
    initialState: {
        allJobs: [],
        allAdminJobs: [],
        appliedJobs: [],
        savedJobs: [],
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
        setSavedJobs: (state, action) => {
            state.savedJobs = action.payload
        },
        addSavedJob: (state, action) => {
            const job = action.payload
            const exists = state.savedJobs.some((saved) => saved._id === job._id)
            if (!exists) {
                state.savedJobs.push(job)
            }
        },
        removeSavedJob: (state, action) => {
            const jobId = action.payload
            state.savedJobs = state.savedJobs.filter((saved) => saved._id !== jobId)
        },
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload
        }
    }
});
export const {
    setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setAppliedJobs,
    setSavedJobs,
    addSavedJob,
    removeSavedJob,
    setSearchQuery,
} = jobSlice.actions;
export default jobSlice.reducer;


