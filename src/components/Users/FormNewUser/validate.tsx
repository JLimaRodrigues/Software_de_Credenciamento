export const isValidCPF = (cpf: string): boolean => {
    const regex = /^\d{11}$/;
    return regex.test(cpf);
};

export const isValidPassword = (password: string): boolean => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
};

export const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const isNotEmpty = (value: string): boolean => value.trim() !== '';