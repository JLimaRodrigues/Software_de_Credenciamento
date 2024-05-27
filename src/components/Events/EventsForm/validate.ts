export const isValidName = (name: string): boolean => {
    return name.trim() !== '';
};

export const isValidCompany = (company: string): boolean => {
    return company.trim() !== '';
};

export const isValidAddress = (address: string): boolean => {
    return address.trim() !== '';
};

export const isValidEventType = (eventType: string): boolean => {
    return eventType.trim() !== '';
};

export const isValidParticipants = (participants: number | string): boolean => {
    const num = Number(participants);
    return !isNaN(num) && num > 0;
};
