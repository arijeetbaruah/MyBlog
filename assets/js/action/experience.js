import Fetch from '../util/fetch';

export function GetExperience(id) {
    return {
        type: 'GETEXPERIENCE',
        payload: Fetch(`{
            Experience(id:${id}) {
                id
                title
                body
                Projects{
                    id
                    title
                }
                start_date
                end_date
            }
        }
        `).then(response => (response.data))
    };
}

export function GetExperiences() {
    return {
        type: 'GETEXPERIENCES',
        payload: Fetch(`{
            Experiences {
                id
                title
                body
                start_date
                end_date
            }
        }
        `).then(response => (response.data))
    };
}
