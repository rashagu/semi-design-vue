


export const any = [Array, Object, String, Number, Boolean];
export const array = Array;
export const bool = Boolean;
export const func = Function;
export const number = Number;
export const object = Object
export const string = String;
export const node = [Array, Object, String, Number];
export const element = [Array, Object, String, Number];
export const symbol = Object;

export function oneOfType(arr:any[]) {
  return [...arr]
}


export function vuePropsMake(typeObj:{[key:string]: any}, defaultProps:{[key:string]: any}) {
  const obj = {}
  for (const typeKey in typeObj) {
    // console.log()
    // if (typeKey === 'included'){
    //   console.log('included', (typeObj[typeKey].hasOwnProperty('default') && typeObj[typeKey].default !== undefined) || !defaultProps.hasOwnProperty(typeKey))
    // }
    if (typeObj[typeKey].hasOwnProperty('default') || !defaultProps.hasOwnProperty(typeKey)) {
      if (typeObj[typeKey].default === undefined){
        obj[typeKey] = {
          type: typeObj[typeKey].type,
          default: defaultProps[typeKey],
        }
      }else{
        obj[typeKey] = typeObj[typeKey]
      }
    } else {
      let defaultValue = typeof defaultProps[typeKey] === 'object' || typeof defaultProps[typeKey] === 'function' ? () => defaultProps[typeKey] : defaultProps[typeKey]
      obj[typeKey] = {
        type: typeObj[typeKey],
        default: defaultValue,
      }
      // if (obj[typeKey].type.type){
      //   console.log(obj,typeObj,typeObj.hasOwnProperty('default'))
      //   debugger
      // }
    }
  }
  // console.log(obj)
  return obj
}
