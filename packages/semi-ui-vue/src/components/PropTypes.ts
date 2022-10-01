


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
  Object.keys(typeObj).forEach(typeKey=>{
    if (defaultProps.hasOwnProperty(typeKey)){
      if (typeObj[typeKey].hasOwnProperty('type')) {
        obj[typeKey] = {
          type: typeObj[typeKey].type,
          default: defaultProps[typeKey],
        }
      }else{
        let defaultValue = typeof defaultProps[typeKey] === 'object' ? () => defaultProps[typeKey] : defaultProps[typeKey]
        obj[typeKey] = {
          type: typeObj[typeKey],
          default: defaultValue,
        }
        if (typeKey === 'getPopupContainer'){
          console.log('getPopupContainer')
        }
      }
    }else{
      obj[typeKey] = typeObj[typeKey]
    }




  })
  return obj
}