import Axios from 'axios';

const Fetch = (query) => (
    Axios({
        url: '/graphql/',
        method: 'post',
        headers: {
            "Content-Type": 'application/json',
            Accept: 'application/json',
        },
        data: {
            query
        }
    })
);

export default Fetch;
