import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FilterSliceType = {
  value: string;
};

const initialState: FilterSliceType = { value: '' };

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setFilter } = filterSlice.actions;
export default filterSlice.reducer;
