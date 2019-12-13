import login from './login_use';
import admin from './admin_use';
import market from './market_use';
import member from './member_use';
import product from './product_center';
import set_center from './set_center';
import sandbox from './sandbox';

export default {
    ...login,
    ...admin,
    ...market,
    ...member,
    ...product,
    ...set_center,
    ...sandbox
}