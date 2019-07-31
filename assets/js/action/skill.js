import Fetch from '../util/fetch';

export function GetSkill(id) {
    return {
        type: 'GETSKILL',
        payload: Fetch(`{
            Skill(id: ${id}){
              id
              title
              level
              projects{
                title
                body
                start_date
                end_date
              }
            }
          }
        `).then(response => (response.data))
    };
}

export function GetSkills() {
  return {
      type: 'GETSKILLS',
      payload: Fetch(`{
          Skills{
            id
            title
            level
            projects{
              title
              start_date
              end_date
            }
          }
        }
      `).then(response => (response.data))
  };
}
