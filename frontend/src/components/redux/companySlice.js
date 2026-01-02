import { createSlice } from "@reduxjs/toolkit"

const companySlice = createSlice({
    name: "company",
    initialState: {
        singleCompany: null,
        allCompany: [],
    },
    reducers: {
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload
        },
        setAllCompany: (state, action) => {
            state.allCompany = action.payload
        }
    }
})

export const { setSingleCompany, setAllCompany } = companySlice.actions
export default companySlice.reducer