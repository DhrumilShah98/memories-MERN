export default (state = [], action) => {
    switch (action.type) {
        case 'FETCH_POSTS':
            return action.payload;
        case 'CREATE_POST':
            return [...state, action.payload];
        default:
            return state;
    }
}