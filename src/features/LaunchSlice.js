import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchLaunches } from '../requests/launch';

const initialState = {
    aLaunches: [],
    bLoading: false,
    oSearchParameter: {
        offset: 0,
        limit: 10,
        order: 'desc',
    },
    bNoDataAvailable: true,
};

export const getLaunchList = createAsyncThunk(
    'launch/getLaunchList',
    async (oParams) => {
        const oResponse = await fetchLaunches(oParams);
        return oResponse.data
    }
);

export const launchSlice = createSlice({
    name: 'launch',
    initialState,
    reducers: {
        setOrderBy: (state, action) => {
            const { value } = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            // getApplicantsList
            .addCase(getLaunchList.pending, (state, action) => {
                state.bLoading = true;
            })
            .addCase(getLaunchList.fulfilled, (state, action) => {
                if ((action.payload).length > 0) {
                    let aTempLaunches = [...state.aLaunches];
                    action.payload?.map((aData)=> {
                        aTempLaunches.push(aData);
                    });
                    state.aLaunches = [...aTempLaunches];
                    state.oSearchParameter.offset += 10;
                } else {
                    state.bNoDataAvailable = false;
                }
                state.bLoading = false;
            })
    }
});

export const {
    setOrderBy,
} = launchSlice.actions;

export const selectLaunchList = (state) => state.launches.aLaunches;
export const selectLoadingState = (state) => state.launches.bLoading;
export const selectLaunchParams = (state) => state.launches.oSearchParameter;
export const selectDataAvailabilityState = (state) => state.launches.bNoDataAvailable;

export default launchSlice.reducer;
