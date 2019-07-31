import _ from 'lodash';

const initState = {
    skill: {
        data: null,
        loading: false
    },
    skills: {
        data: null,
        loading: false
    }
};

const SkillReducer = (state = initState, action) => {
    const newState = _.assign({}, state);
    const newSkill = _.assign({}, newState.skill);
    const newSkills = _.assign({}, newState.skills);
    switch (action.type) {
        case 'GETSKILL_PENDING':
            newSkill.data = null;
            newSkill.loading = true;
            newState.skill = newSkill;
            return newState;
        case 'GETSKILL_FULFILLED':
            newSkill.data = action.payload;
            newSkill.loading = false;
            newState.skill = newSkill;
            return newState;
        case 'GETSKILLS_PENDING':
            newSkills.data = null;
            newSkills.loading = true;
            newState.skills = newSkills;
            return newState;
        case 'GETSKILLS_FULFILLED':
            newSkills.data = action.payload;
            newSkills.loading = false;
            newState.skills = newSkills;
            return newState;
    }
    return state;
}

export default SkillReducer;
