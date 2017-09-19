export function formatPrice(money) {
    return `￥${(money / 100).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

export function getStoreName() {
    const storeName = ['Eminem', 'Kendrick-Lamar', 'Nas', 'DrDre'];

    return `${storeName[Math.floor(Math.random() * storeName.length)]}`;
}