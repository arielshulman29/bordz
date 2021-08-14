import axios from 'axios';

const url = 'http://localhost:5000/boards';

export const fetchAllBoards = () => {
    return new Promise((resolve) => {
        axios.get(url)
            .then(function ({ data }) {
                resolve(data);
            })
            .catch(function (error) {
                resolve();
            });
    });
}

export const createBoard = (newBoard) => {
    return new Promise((resolve) => {
        axios({
            method: 'POST',
            url,
            data: newBoard,
            headers: { 'content-type': 'multipart/form-data' }
        }).then(function ({ data }) {
            resolve(data);
        })
            .catch(function (error) {
                resolve();
            });
    });
}
//   export const likeBoard = (id) => axios.patch(`${url}/${id}/likeBoard`);
export const updateBoard = (id, updatedBoard) => {
    return new Promise((resolve) => {
        axios.patch(`${url}/${id}`, updatedBoard)
            .then(function ({ data }) {
                resolve(data);
            })
            .catch(function (error) {
                resolve();
            });
    });
}
export const deleteBoard = (id) => {
    return new Promise((resolve) => {
        axios.delete(`${url}/${id}`)
            .then(function ({ data }) {
                resolve(data);
            })
            .catch(function (error) {
                resolve();
            });
    });
}