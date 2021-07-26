import axios from 'axios';
//mock API
let API_URL = 'http://localhost:9999/BookStore';
   export default function callApi(endpoint, method = 'GET', body, headers) {
       return axios({
           method,
           url: `${API_URL}/${endpoint}`,
           data: body,
           headers: headers
       }).catch(err => {
           console.log(err);
       });
}
