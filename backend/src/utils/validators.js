
export const isValidEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
};

export const isValidPassword = (password) => {
    return /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}$/.test(password);
};

export const isValidName = (name) => {
    return name.length >= 3 && name.length <= 60;
};

export const isValidAddress = (address) => {
    return address.length <= 400;
};