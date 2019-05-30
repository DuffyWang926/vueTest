/* 对象对比操作START */
function _isBase(obj) {
    //检测是否非null，undefined，object，array等影响typeof表现形式的类型
    return obj != null && typeof (obj) !== 'undefined' && typeof (obj) !== 'object' && !(Object.prototype.toString.call(obj) === '[object Function]');
  }
  
export function objectCompare(objA, objB) {
    //判断两个对象内容是否相等
    if(typeof objA == 'string' || typeof objB == 'string'){
      return objA==objB
    }
    if (objA === objB) {
      return true;
    }
    if (_isBase(objA) && _isBase(objA)) {
      if (objA !== objB) {
        return false
      }
    }
    let keysA = Object.keys(objA);
    let keysB = Object.keys(objB);
    if (keysA.length == keysB.length) {
      for (let i = 0; i < keysA.length; i++) {
        let item = keysA[i];
        if (objB.hasOwnProperty(item)) {
          if (!objectCompare(objA[item], objB[item])) {
            return false;
          }
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
    return true;
  }

