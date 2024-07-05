export function truncateWithEllipsis(str:string, maxLength:number = 30) {
    if (str.length <= maxLength) {
        return str;
    }
    return str.substring(0, maxLength) + '...';
}