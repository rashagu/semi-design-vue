// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/arrayMove.js
function arrayMove(array, from, to) {
  const newArray = array.slice();
  newArray.splice(to < 0 ? newArray.length + to : to, 0, newArray.splice(from, 1)[0]);
  return newArray;
}

export {
  arrayMove
};
//# sourceMappingURL=chunk-E433P6Y7.js.map
