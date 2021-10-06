require('./index.html');

// 1) регистрация приложения -> получение api id
// 2) авторизация на сайте
//    - открыть окно с запросом прав
//    - разрешить выполнять действия от нашего имени

VK.init({
    apiId: 7968262
});

function auth() {
    return new Promise((resolve, reject) => {
        VK.Auth.login(data => {
            if (data.session) {
                resolve();
            } else {
                reject(new Error('Не удалось авторизоваться'));
            }
        }, 2);
    });
}

function callAPI(method, params) {
    params.v = '5.131';

    return new Promise((resolve, reject) => {
        VK.api(method, params, (data) => {
            if (data.error) {
                reject(data.error);
            } else {
                resolve(data.response);
            }
        });
    })
}
//
// (async () => {
//     try {
//         await auth();
//         const [me] = await callAPI('users.get', { name_case: 'gen'});
//         const headerInfo = document.querySelector('#headerInfo');
//
//         headerInfo.textContent = `Друзья на странице ${me.last_name} ${me.first_name}`;
//
//         const friends = await callAPI('friends.get', { fields: 'city, county, photo_100' });
//         const template = document.querySelector('#user-template').textContent;
//         console.log(friends)
//         const render = Handlebars.compile(template);
//         const html = render(friends);
//         const results = document.querySelector('#results');
//
//         results.innerHTML = html;
//     } catch (e) {
//         console.error(e.message);
//     }
// })();
