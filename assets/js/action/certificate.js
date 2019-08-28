import Fetch from '../util/fetch';

export function GetCertifiate(id) {
    return {
        type: 'GETCERTIFICATE',
        payload: Fetch(`{
            Certificate(id: ${id}){
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

export function GetCertifiates() {
    return {
        type: 'GETCERTIFICATES',
        payload: Fetch(`{
            Certificates{
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
