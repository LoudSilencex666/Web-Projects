const passwordGenerator = (length, type) => {
    const charSource = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const charLoginSource = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"; // data-attributes can not have numerical first char
    

    length = length || 8;
    type = type || 'password';

    let password = '';
    let roulette = 0;
    
    if (type === 'password') {
        for(let i = 0; i < length; i++) {
            roulette = Math.floor(Math.random() * charSource.length);
            password += charSource.charAt(roulette);
        }

        return password;
    } else if (type === 'login') {
        roulette = Math.floor(Math.random() * charLoginSource.length);
        password += charLoginSource.charAt(roulette);

        for(let i = 0; i < length - 1; i++) {
            roulette = Math.floor(Math.random() * charSource.length);
            password += charSource.charAt(roulette);
        }

        return password;
    } else {
        throw "Type is incorrect, there are only two types: password and login!"; 
    }
}

module.exports = passwordGenerator;

