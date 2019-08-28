import _ from 'lodash';

const initState = {
    certificates: {
        data: null,
        loading: false
    },
    certificate: {
        data: null,
        loading: false
    },
};

const CertificateReducer = (state = initState, action) => {
    const newState = _.assign({}, state);
    const newcertificates = _.assign({}, newState.certificates);
    const certificate = _.assign({}, newState.certificate);
    switch (action.type) {
        case 'GETCERTIFICATES':
        case 'GETCERTIFICATES_PENDING':
            newcertificates.data = null;
            newcertificates.loading = true;
            newState.certificates = newcertificates;
            return newState;
        case 'GETCERTIFICATES_FULFILLED':
            newcertificates.data = action.payload;
            newcertificates.loading = false;
            newState.certificates = newcertificates;
            return newState;
        case 'GETCERTIFICATE':
        case 'GETCERTIFICATE_PENDING':
            certificate.data = null;
            certificate.loading = true;
            newState.certificate = certificate;
            return newState;
        case 'GETCERTIFICATE_FULFILLED':
            certificate.data = action.payload;
            certificate.loading = false;
            newState.certificate = certificate;
            return newState;
        default:
            return state;
    }
};

export default CertificateReducer;
