// buttenpremissions    权限
const buttenpremissions = 'buttenpremissions'
export const setPremissions = (data)=>sessionStorage.setItem(buttenpremissions, data);
export const getPremissions = ()=>sessionStorage.getItem(buttenpremissions);
export const removePremissions = ()=>sessionStorage.removeItem(buttenpremissions);