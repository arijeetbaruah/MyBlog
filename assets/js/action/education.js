import Fetch from '../util/fetch';

export function GetEducation(id) {
    return {
        type: 'GETEDUCATION',
        payload: Fetch(`{
            Education(id: ${id}){
                id
                institute
                body
                degree
                start_date
                end_date
            }
        }
        `).then(response => (response.data))
    };
}

export function GetEducations() {
    return {
        type: 'GETEDUCATIONS',
        payload: Fetch(`{
            Educations{
                id
                institute
                body
                degree
                start_date
                end_date
            }
        }
        `).then(response => (response.data))
    };
}
