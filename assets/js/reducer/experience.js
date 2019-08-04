import _ from 'lodash';

const initState = {
    experiences: {
        data: null,
        loading: false
    },
    experience: {
        data: null,
        loading: false
    },
};

const ExperienceReducer = (state = initState, action) => {
    const newState = _.assign({}, state);
    const newExperiences = _.assign({}, newState.experiences);
    const Experience = _.assign({}, newState.experience);
    switch (action.type) {
        case 'GETEXPERIENCES':
        case 'GETEXPERIENCES_PENDING':
            newExperiences.data = null;
            newExperiences.loading = true;
            newState.experiences = newExperiences;
            return newState;
        case 'GETEXPERIENCES_FULFILLED':
            newExperiences.data = action.payload;
            newExperiences.loading = false;
            newState.experiences = newExperiences;
            return newState;
        case 'GETEXPERIENCE':
        case 'GETEXPERIENCE_PENDING':
            Experience.data = null;
            Experience.loading = true;
            newState.experience = Experience;
            return newState;
        case 'GETEXPERIENCE_FULFILLED':
            Experience.data = action.payload;
            Experience.loading = false;
            newState.experience = Experience;
            return newState;
        default:
            return state;
    }
};

export default ExperienceReducer;
