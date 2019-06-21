import login from './login_use';
import admin from './admin_use';
import market from './market_use';
import member from './member_use';
import product from './product_center';

export default {
    ...login,
    ...admin,
    ...market,
    ...member,
    ...product, 
}