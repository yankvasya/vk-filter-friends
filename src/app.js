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
(async () => {
    try {
        await auth();
        const [me] = await callAPI('users.get', { name_case: 'gen'});
        // const headerInfo = document.querySelector('#headerInfo');

        // headerInfo.textContent = `Друзья на странице ${me.last_name} ${me.first_name}`;

        const friends = await callAPI('friends.get', { fields: 'photo_100' });
        const template = document.querySelector('#friendTemplate').textContent;
        // console.log(friends)
        const render = Handlebars.compile(template);
        const html = render(friends);
        const results = document.querySelector('#allFriends');

        results.innerHTML = html;
    } catch (e) {
        console.error(e.message);
    }
})();

document.addEventListener('mousedown', (e) => {
    const allFriends = document.querySelector('#allFriends');
    const isAllFriendsParent = e.target.parentNode === allFriends;
    const isAllFriendsGranddad = e.target.parentNode.parentNode === allFriends;

    isAllFriendsParent && (e.target.draggable = true) ||
    isAllFriendsGranddad && (e.target.parentElement.draggable = true);
});

document.addEventListener('dragenter', (e) => {
    e.target.classList.contains('friends__list') && e.target.classList.add('drop');
});

document.addEventListener('dragleave', (e) => {
    e.target.classList.contains('drop') && e.target.classList.remove('drop');
});

document.addEventListener('dragstart', (e) => {
    e.target.classList.contains('friend') && e.dataTransfer.setData("text/plain", e.target.dataset.id);
});

let elemBelow = "";

document.addEventListener('dragover', (e) => {
    e.preventDefault();
    elemBelow = e.target;
});

document.addEventListener('drop', (e) => {
    const element = document.querySelector(
        `[data-id="${e.dataTransfer.getData("text/plain")}"]`
    );

    // Тута немножко багует
    if (elemBelow === element) {
        console.log('Жопа?');
        return;
    }

    if(e.target.classList.contains('friend')) {
        const center = elemBelow.getBoundingClientRect().y + elemBelow.getBoundingClientRect().height / 2;


        if (e.clientY > center) {
            if (elemBelow.nextElementSibling !== null) {
                console.log(elemBelow.nextElementSibling)
                elemBelow = elemBelow.nextElementSibling;
            } else {
                return;
            }
        }

        elemBelow.parentElement.insertBefore(element, elemBelow);
        element.className = elemBelow.className;
    }

    if(e.target.classList.contains('friends__list')) {
        e.target.append(element)

        if (e.target.classList.contains("drop")) {
            e.target.classList.remove("drop");
        }
    }
})
