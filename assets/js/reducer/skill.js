import _ from 'lodash';

const initState = {};

const SkillReducer = (state = initState, action) => {
    const newState = _.assign({}, state);
    switch (action.type) {
        case 'GETSKILL':
            return newState;
    }
    return state;
}

export default SkillReducer;
