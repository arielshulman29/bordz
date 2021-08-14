import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchUserGoogle } from './userApi';
import { useDispatch } from 'react-redux'

const initialState = {
  status: 'no user'
};

export const getUserGoogleThunk = createAsyncThunk(
  'user/login/google',
  async (response) => {
    const user = await fetchUserGoogle(response);
    return user;
  }
);


export const userSlice = createSlice({
  name: 'users',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    logout: (state) => {
      state.status = 'no user';
      state.user = undefined;
    },
    userSavedToLocalStorage: (state) => {
      state.status = 'user logged and saved to local storage';
    }
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder    
    .addCase(getUserGoogleThunk.pending, (state) => {
      state.status = 'loading user';
    })
      .addCase(getUserGoogleThunk.fulfilled, (state, action) => {
        state.status = 'user logged in';
        state.user = action.payload;
      })
      .addCase(getUserGoogleThunk.rejected, (state, action) => {
        state.status = 'no user';
        console.log(action.payload);
      })
  },
});

export const { logout, userSavedToLocalStorage } = userSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.board.value)`
// export const selectBoards = state => state.boards;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//   const currentValue = selectBoard(getState());
//   if (currentValue % 2 === 1) {
//     dispatch(incrementByAmount(amount));
//   }
// };

export default userSlice.reducer;
