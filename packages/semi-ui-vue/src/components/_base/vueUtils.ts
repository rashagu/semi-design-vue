

function autoStyleUnit(obj: any ) {
  if (typeof obj !== 'object'){
    return obj
  }
  const newObj = {}
  for (const objKey in obj) {



    if (obj.hasOwnProperty(objKey) && typeof obj[objKey] === 'number'){
      newObj[objKey] = obj[objKey] + 'px'
    }

  }

}