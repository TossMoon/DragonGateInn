export function getReservationStatusClass(state) {
    switch (state) {
        case 'PENDING':
        case 0:
            return 'pending';
        case 'CONFIRMED':
        case 1:
            return 'active';
        case 'CANCELED':
        case 'CANCELLED':
        case 2:
            return 'inactive';
        default:
            return '';
    }
}

export function getReservationStatusText(state) {
    const stateMap = {
        'pending': '已提交',
        'confirmed': '商家已接单',
        'canceled': '已取消'
    };
    return stateMap[state] || '未知';
}

export function canCancelReservation(state) {
    return state === 'pending' || state === 0;
}