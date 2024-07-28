import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    theme:'light'
}

const themeslice = createSlice({
    name: 'theme',
    initialState,
    reducers:{
        changeTheme(state){
            state.theme = state.theme === 'light' ? 'dark' : 'light'
        }
    }
})


export const {changeTheme} = themeslice.actions
export default themeslice.reducer;
