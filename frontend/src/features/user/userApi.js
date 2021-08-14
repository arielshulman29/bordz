import axios from 'axios';

const url ='http://localhost:5000/auth/googlelogin';


export const fetchUserGoogle = (response) => {
    return new Promise((resolve) => {
        axios({
            method: 'POST',
            url,
            data: { tokenId: response.tokenId}
        })
        .then(function ({ data }) {
            console.log('data:',data);
            resolve(data);
        })
        .catch(function (error) {
            console.log('error',error);
            resolve(error);
        });
    });
}