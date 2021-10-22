const webUrls = {
    urlLocal: 'http://localhost:3000',
    urlQa: 'https://isla-del-lago-web-ui-qa.herokuapp.com/',
    urlStg: 'https://isla-del-lago-web-ui-stg.herokuapp.com/'
    // urlMaster: 'https://isla-del-lago-web-ui-master.herokuapp.com/'
}

const LOCAL_URLS = {
    waterManager: 'http://localhost:9001'
}
const QA_URLS = {
    waterManager: 'https://isla-del-lago-water-mngr-qa.herokuapp.com/'
}
const STG_URLS = {
    waterManager: 'https://isla-del-lago-water-mngr-stg.herokuapp.com/'
}
// const MASTER_URLS = {
//     waterManager: ''
// }

const url = document.location.origin

const calcUrls = () => {
    switch (url) {
        case webUrls.urlLocal:
            return LOCAL_URLS;
        case webUrls.urlQa:
            return QA_URLS;
        case webUrls.urlStg:
            return STG_URLS;
        // case webUrls.urlMaster:
        //     return MASTER_URLS;
        default:
            console.log(url);
            break;
    }
}
export default calcUrls