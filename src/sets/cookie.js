// buttenpremissions    权限
const buttenpremissions = 'buttenpremissions'
export const setPremissions = (data)=>sessionStorage.setItem(buttenpremissions, data);
export const getPremissions = ()=>sessionStorage.getItem(buttenpremissions);
export const removePremissions = ()=>sessionStorage.removeItem(buttenpremissions);

//advertisement 单挑广告位置信息
const advertisementDetail = 'advertisementDetail'
export const setAdvertisement = (data)=>sessionStorage.setItem(advertisementDetail, data);
export const getAdvertisement = ()=>sessionStorage.getItem(advertisementDetail);
export const removeAdvertisement = ()=>sessionStorage.removeItem(advertisementDetail);