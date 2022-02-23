function state() {
    return {
        editing: null,
    }
}

const mutations = {
    setEditing(state, title) {
        state.editing = title
    }
}


export default {
    state,
    mutations,
}