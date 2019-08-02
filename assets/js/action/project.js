import Fetch from '../util/fetch';

export function GetProject(id) {
    return {
        type: 'GETPROJECT',
        payload: Fetch(`{
            Project(id:${id}) {
                id
                title
                body
                start_date
                end_date
                code_snippet_id{
                    id
                    name
                    code
                }
                skills{
                    id
                    title
                    level
                }
            }
        }
        `).then(response => (response.data))
    };
}

export function GetProjects() {
    return {
        type: 'GETPROJECTS',
        payload: Fetch(`{
            Projects {
                id
                title
                body
                start_date
                end_date
                skills{
                    id
                    title
                }
            }
        }
        `).then(response => (response.data))
    };
}
