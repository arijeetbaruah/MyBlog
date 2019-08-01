import _ from 'lodash';

const initState = {
    projects: {
        data: null,
        loading: false
    },
    project: {
        data: null,
        loading: false
    },
};

const ProjectReducer = (state = initState, action) => {
    const newState = _.assign({}, state);
    const newProjects = _.assign({}, newState.projects);
    const newProject = _.assign({}, newState.project);
    switch (action.type) {
        case 'GETPROJECTS':
        case 'GETPROJECTS_PENDING':
            newProjects.data = null;
            newProjects.loading = true;
            newState.projects = newProjects;
            return newState;
        case 'GETPROJECTS_FULFILLED':
            newProjects.data = action.payload;
            newProjects.loading = false;
            newState.projects = newProjects;
            return newState;
        case 'GETPROJECT':
        case 'GETPROJECT_PENDING':
            newProject.data = null;
            newProject.loading = true;
            newState.project = newProject;
            return newState;
        case 'GETPROJECT_FULFILLED':
            newProject.data = action.payload;
            newProject.loading = false;
            newState.project = newProject;
            return newState;
        default:
            return state;
    }
};

export default ProjectReducer;
