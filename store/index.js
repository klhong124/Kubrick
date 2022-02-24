function state() {
    return {
        dark_mode:false,
        editing: null,
    }
}

const mutations = {
    setDarkMode(state, bool){
        state.dark_mode = bool
    },
    setEditing(state, title) {
        state.editing = title
    }
}


export default {
    state,
    mutations,
}