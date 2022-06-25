


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



export function vuePropsMake(typeObj:{[key:string]: any}, defaultProps:{[key:string]: any}) {
  const obj = {}
  for (const typeKey in typeObj) {
    if (typeObj[typeKey].hasOwnProperty('default') || !defaultProps.hasOwnProperty(typeKey)) {
        obj[typeKey] = typeObj[typeKey]
    } else {
      obj[typeKey] = {
        type: typeObj[typeKey],
        default: typeof defaultProps[typeKey] === 'object' ? () => defaultProps[typeKey] : defaultProps[typeKey],
      }
      // if (obj[typeKey].type.type){
      //   console.log(obj,typeObj,typeObj.hasOwnProperty('default'))
      //   debugger
      // }
    }
  }
  return obj
}
