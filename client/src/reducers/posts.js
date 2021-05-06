export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload;
        case 'CREATE_POST':
            return state;
        default:
            return state;
    }
}