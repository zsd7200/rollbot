export const randomFloat = (min: number, max: number) => {
    return (Math.random() * (max - min)) + min;
};

export const randomInt = (min: number, max: number) => {
    const minCeil = Math.ceil(min);
    const maxFloor = Math.floor(max);
    return Math.floor(Math.random() * (maxFloor - minCeil) + minCeil);
};
