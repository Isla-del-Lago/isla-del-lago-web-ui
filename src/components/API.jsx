const url = {
    urlApi: document.location.origin
}
if (url.urlApi === 'http://localhost:9002'){
    url.urlApi = 'http://localhost:9001'
}
// http://localhost:9001
// https://isla-del-lago-water-mngr-qa.herokuapp.com/
// https://isla-del-lago-water-mngr-stg.herokuapp.com/

export default url