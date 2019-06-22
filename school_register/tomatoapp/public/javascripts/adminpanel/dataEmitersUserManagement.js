// Users object

adminElements.userClassList = [];

adminElements.userClassList = [].slice.call(document.querySelectorAll('div.user-display-list > div'));

function userElementsChecking() {
    let list = adminElements.userClassList;

    //giving a class to first element
    for (let i = 0; i < list.length; i++) {
        list[i].classList.remove('user-result-clicked');
    }

    list[0].classList.add('user-result-clicked');
}

function userElementsLoading() {
    let list = adminElements.userClassList;
    list.map(x => x.addEventListener('click', function(evt) {
        evt.preventDefault();
        
        for(let i = 0; i < list.length; i++) {
            if(list[i] == x) {
                list.splice(i, 1)
                list.unshift(x);
            }
        }

        userElementsChecking();
        let login = x.getAttribute('data-login');
        socket.emit('loadUserData', login);
    }));

}

userElementsLoading();

// loading user's data by group

function usersElementsByGroup() {
    let selector = document.querySelector('#userGroups');
    selector.addEventListener('change', function(evt) {
        evt.preventDefault();
        
        let group = selector.value;
        socket.emit('loadGroupElements', group);
    });
} 

usersElementsByGroup();

socket.on('loadGroupElements', function(data) {
    let list = adminElements.userClassList;
    list.map(x => x.remove());
    
    adminElements.userClassList = [];

    for(let i = 0; i < data.userLogin.length; i++) {
        let userlist = document.querySelector('.user-display-list');
        let newUserDiv = document.createElement('div');
        let list = adminElements.userClassList;
        
        newUserDiv.dataset = 'login';
        newUserDiv.dataset.login = data.userLogin[i];

        newUserDiv.dataset = 'number';
        newUserDiv.dataset.number = data.userNumber[i];
        
        if (newUserDiv.classList)
            newUserDiv.classList.add('user-result');
        else
            newUserDiv.className += ' ' + user-result;
        
        newUserDiv.id = 'user' + i;

        newUserDiv.innerHTML = '' + data.userNumber[i] + ': ' + data.userName[i] + ' ' + data.userSurname[i];

        list.push(newUserDiv);

        newUserDiv.addEventListener('click', function(evt) {
            evt.preventDefault();
            
            for(let i = 0; i < list.length; i++) {
                if(list[i] == newUserDiv) {
                    list.splice(i, 1)
                    list.unshift(newUserDiv);
                }
            }
    
            userElementsChecking();
    
            let login = newUserDiv.getAttribute('data-login');
            socket.emit('loadUserData', login);
    
        });

        userlist.appendChild(newUserDiv);
    }

});
// loading user's data to edit section

socket.on('loadUserData', function(data) {
    let login, name, surname, group, password, status, number;
    login = document.querySelector('#editUser').querySelector('.login');
    login.value = data.userLogin;

    name = document.querySelector('#editUser').querySelector('.name');
    name.value = data.userName;

    surname = document.querySelector('#editUser').querySelector('.surname');
    surname.value = data.userSurname;

    group = document.querySelector('#editUser').querySelector('.group');
    group.value = data.userGroup;

    password = document.querySelector('#editUser').querySelector('.password');
    password.value = data.userPassword;

    status = document.querySelector('#editUser').querySelector('.status');
    status.value = data.userStatus;

    number = document.querySelector('#editUser').querySelector('.number');
    number.value = data.userNumber;
});

// ADD USER
document.querySelector('#addUser').addEventListener('submit', function(evt) {
    evt.preventDefault();
    let userAddData = inputValuesReciever(['name', 'surname', 'group', 'password', 'status', 'number'], 'addUser');
    socket.emit('addUserData', userAddData);
});

socket.on('addUserData', function(data) {
    let userlist = document.querySelector('.user-display-list');
    let newUserDiv = document.createElement('div');
    let list = adminElements.userClassList;
    let selector = document.querySelector('#userGroups');

    newUserDiv.dataset = 'login';
    newUserDiv.dataset.login = data.login;

    if (newUserDiv.classList)
        newUserDiv.classList.add('user-result');
    else
        newUserDiv.className += ' ' + user-result;

    newUserDiv.id = 'user' + (userlist.childElementCount - 1);

    newUserDiv.innerHTML = '' + (userlist.childElementCount - 1) + ': ' + data.name + ' ' + data.surname;

    list.push(newUserDiv);

    newUserDiv.addEventListener('click', function(evt) {
        evt.preventDefault();
        
        for(let i = 0; i < list.length; i++) {
            if(list[i] == newUserDiv) {
                list.splice(i, 1)
                list.unshift(newUserDiv);
            }
        }

        userElementsChecking();

        let login = newUserDiv.getAttribute('data-login');
        socket.emit('loadUserData', data.login);
    });

    userlist.appendChild(newUserDiv);

});

//UPDATE USER
document.querySelector('#editUser').addEventListener('submit', function(evt) {
    evt.preventDefault();
    let userEditData = inputValuesReciever(['login', 'name', 'surname', 'group', 'password', 'status'], 'editUser');
    console.log(userEditData);
    socket.emit('editUserData', userEditData);
});

socket.on('editUserData', function(data) {
    console.log(data);
    let userDiv = document.querySelector('div[data-login=' + data.login + ']');
    userDiv.innerHTML = '0' + ': ' + data.name + ' ' + data.surname;
    console.log(userlist)
});

// DELETE USER

document.querySelector('.deleteUser').addEventListener('click', function(evt) {
    evt.preventDefault();
    let userDeleteData = inputValuesReciever(['login'], 'editUser');
    let userDiv = document.querySelector('div[data-login=' + userDeleteData.login + ']');
    let userlist = document.querySelector('.user-display-list');

    userlist.removeChild(userDiv);
    socket.emit('deleteUserData', userDeleteData);
});