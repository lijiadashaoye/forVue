import {
    linkTypeArr,
    notifyType,
    sendTargetType,
    sendTargetArr,
    messageType,
    sendType,
    pushType,
    changeLocationType,
    terminalType,
    bannerStatus,
    bannerTypeList,
    sysTypeList,
    regionalTypeList,
    imageTypeList
} from '@/constant.js'

/**
 * 
 * @param {转换参数} value 
 * @param {转换类型} type 
 * @param {目标参数} param 
 */
export function defaultChange(value, type, arrName) {
    let forArr = [];
    switch (arrName) {
        case 'sendTargetType':
            forArr = sendTargetType;
            break;
        case 'sendTargetArr':
            forArr = sendTargetArr;
            break;
        case 'sendType':
            forArr = sendType;
            break;
        case 'linkTypeArr':
            forArr = linkTypeArr;
            break;
        case 'notifyType':
            forArr = notifyType
            break;
        case 'pushType':
            forArr = pushType;
            break;
        case 'messageType':
            forArr = messageType;
            break;
        case 'changeLocationType':
            forArr = changeLocationType;
            break;
        case 'terminalType':
            forArr = terminalType;
            break;
        case 'bannerStatus':
            forArr = bannerStatus;
            break;
        case 'bannerTypeList':
            forArr = bannerTypeList;
            break;
        case 'sysTypeList':
            forArr = sysTypeList;
            break;
        case 'regionalTypeList':
            forArr = regionalTypeList;
            break;
        case "imageTypeList":
            forArr = imageTypeList;
            break;
    }
    for (let item of forArr) {
        if (type) {
            if (value == item.value) {
                return item.name
            }
        } else {
            if (value == item.name) {
                return item.value
            }
        }
    }
    return '--'

}