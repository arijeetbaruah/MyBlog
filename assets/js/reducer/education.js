import _ from 'lodash';

const initState = {
    educations: {
        data: null,
        loading: false
    },
    education: {
        data: null,
        loading: false
    },
};

const EducationReducer = (state = initState, action) => {
    const newState = _.assign({}, state);
    const newEducations = _.assign({}, newState.educations);
    const newEducation = _.assign({}, newState.education);
    switch (action.type) {
        case 'GETEDUCATIONS':
        case 'GETEDUCATIONS_PENDING':
            newEducations.data = null;
            newEducations.loading = true;
            newState.educations = newEducations;
            return newState;
        case 'GETEDUCATIONS_FULFILLED':
            newEducations.data = action.payload;
            newEducations.loading = false;
            newState.educations = newEducations;
            return newState;
        case 'GETEDUCATION':
        case 'GETEDUCATION_PENDING':
            newEducation.data = null;
            newEducation.loading = true;
            newState.education = newEducation;
            return newState;
        case 'GETEDUCATION_FULFILLED':
            newEducation.data = action.payload;
            newEducation.loading = false;
            newState.education = newEducation;
            return newState;
        default:
            return state;
    }
};

export default EducationReducer;
