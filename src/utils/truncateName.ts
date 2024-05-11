export const truncateName = (fullName) => {
    const words = fullName.split(' ');
    const truncatedName = words.slice(0, 2).join(' ');
    return truncatedName;
}