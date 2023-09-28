"use strict";
const getUsername = document.querySelector('#user');
const formSubmit = document.querySelector('#form');
const main_conatiner = document.querySelector('.main-conatiner');
async function myCustomFetch(url, option) {
    const reponse = await fetch(url, option);
    if (!Response) {
        throw new Error(`networl issue ${reponse.status}`);
    }
    const data = reponse.json();
    console.log(data);
    return data;
}
const showResultUI = (singleUser) => {
    const { avatar_url, login, url, location } = singleUser;
    main_conatiner.insertAdjacentHTML('beforeend', `<div class='card'>
    <img src=${avatar_url} alt=${login} />
    <hr/>
    <div class='card-footer'>
    <img src=${avatar_url} alt=${login} />
    <a href='${url}'> Github </a>
    </div>
    </div>
    `);
};
function fetchData(url) {
    myCustomFetch(url, {}).then((userInfo) => {
        for (const singleUser of userInfo) {
            showResultUI(singleUser);
        }
    });
}
fetchData('http://api.github.com/users');
formSubmit.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = getUsername.value.toLowerCase();
    try {
        const url = 'https://api.github.com/users';
        const allUser = await myCustomFetch(url, {});
        const matchUsers = allUser.filter((user) => {
            return user.login.toLowerCase().includes(searchTerm);
        });
        main_conatiner.innerHTML = '';
        if (matchUsers.length === 0) {
            main_conatiner?.insertAdjacentHTML('beforeend', `<p> class='empty-msg'> No matching users found.</p>`);
        }
        else {
            for (const singleUser of matchUsers) {
                showResultUI(singleUser);
            }
        }
    }
    catch (error) {
        console.log(error);
    }
});
