// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/upload/utils.js
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
var byteKB = 1024;
var byteMB = 1048576;
function getFileSize(number) {
  if (number < byteKB) {
    return `${(number / byteKB).toFixed(2)}KB`;
  } else if (number >= byteKB && number < byteMB) {
    return `${(number / byteKB).toFixed(1)}KB`;
  } else if (number >= byteMB) {
    return `${(number / byteMB).toFixed(1)}MB`;
  }
  return void 0;
}
function endsWith(str, suffix) {
  return str.indexOf(suffix, str.length - suffix.length) !== -1;
}
function loopFiles(item) {
  return __awaiter(this, void 0, void 0, function* () {
    return new Promise((res, rej) => {
      const dirReader = item.createReader();
      let fileList = [];
      function sequence() {
        dirReader.readEntries((entries) => {
          const entryList = Array.prototype.slice.apply(entries);
          fileList = fileList.concat(entryList);
          const isFinished = !entryList.length;
          if (isFinished) {
            res(fileList);
          } else {
            sequence();
          }
        }, rej);
      }
      sequence();
    });
  });
}
function mapFileTree(items) {
  return __awaiter(this, void 0, void 0, function* () {
    const promises = [];
    const _traverseFileTree = (item, path) => __awaiter(this, void 0, void 0, function* () {
      path = path || "";
      item.path = path;
      if (item.isFile) {
        promises.push(new Promise((res, rej) => {
          item.file((file) => {
            if (item.fullPath && !file.webkitRelativePath) {
              Object.defineProperties(file, {
                webkitRelativePath: {
                  writable: true
                }
              });
              file.webkitRelativePath = item.fullPath.replace(/^\//, "");
              Object.defineProperties(file, {
                webkitRelativePath: {
                  writable: false
                }
              });
            }
            res(file);
          }, rej);
        }));
      } else if (item.isDirectory) {
        const entries = yield loopFiles(item);
        for (let index = 0; index < entries.length; index++) {
          const entry = entries[index];
          yield _traverseFileTree(entry, `${path}${item.name}/`);
        }
      }
    });
    try {
      const batches = items.map((i) => _traverseFileTree(i.webkitGetAsEntry()));
      yield Promise.all(batches);
      const result = yield Promise.all(promises);
      return result;
    } catch (error) {
      console.warn("Captured error while loop directory.");
      console.error(error);
      return [];
    }
  });
}

export {
  byteKB,
  byteMB,
  getFileSize,
  endsWith,
  loopFiles,
  mapFileTree
};
//# sourceMappingURL=chunk-PDJEYM2Y.js.map
