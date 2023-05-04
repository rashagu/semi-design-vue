import {
  require_isString
} from "./chunk-NQE5YR5Y.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import {
  __toESM
} from "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/utils/getHighlight.js
var import_isString = __toESM(require_isString());
var escapeRegExpFn = (string) => string.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
var findChunks = (_ref) => {
  let {
    autoEscape,
    caseSensitive,
    searchWords,
    sourceString
  } = _ref;
  return searchWords.filter((searchWord) => searchWord).reduce((chunks, searchWord) => {
    if (autoEscape) {
      searchWord = escapeRegExpFn(searchWord);
    }
    const regex = new RegExp(searchWord, caseSensitive ? "g" : "gi");
    let match;
    while (match = regex.exec(sourceString)) {
      const start = match.index;
      const end = regex.lastIndex;
      if (end > start) {
        chunks.push({
          highlight: false,
          start,
          end
        });
      }
      if (match.index === regex.lastIndex) {
        regex.lastIndex++;
      }
    }
    return chunks;
  }, []);
};
var combineChunks = (_ref2) => {
  let {
    chunks
  } = _ref2;
  chunks = chunks.sort((first, second) => first.start - second.start).reduce((processedChunks, nextChunk) => {
    if (processedChunks.length === 0) {
      return [nextChunk];
    } else {
      const prevChunk = processedChunks.pop();
      if (nextChunk.start <= prevChunk.end) {
        const endIndex = Math.max(prevChunk.end, nextChunk.end);
        processedChunks.push({
          highlight: false,
          start: prevChunk.start,
          end: endIndex
        });
      } else {
        processedChunks.push(prevChunk, nextChunk);
      }
      return processedChunks;
    }
  }, []);
  return chunks;
};
var fillInChunks = (_ref3) => {
  let {
    chunksToHighlight,
    totalLength
  } = _ref3;
  const allChunks = [];
  const append = (start, end, highlight) => {
    if (end - start > 0) {
      allChunks.push({
        start,
        end,
        highlight
      });
    }
  };
  if (chunksToHighlight.length === 0) {
    append(0, totalLength, false);
  } else {
    let lastIndex = 0;
    chunksToHighlight.forEach((chunk) => {
      append(lastIndex, chunk.start, false);
      append(chunk.start, chunk.end, true);
      lastIndex = chunk.end;
    });
    append(lastIndex, totalLength, false);
  }
  return allChunks;
};
var findAll = (_ref4) => {
  let {
    autoEscape = true,
    caseSensitive = false,
    searchWords,
    sourceString
  } = _ref4;
  if ((0, import_isString.default)(searchWords)) {
    searchWords = [searchWords];
  }
  const chunks = findChunks({
    autoEscape,
    caseSensitive,
    searchWords,
    sourceString
  });
  const chunksToHighlight = combineChunks({
    chunks
  });
  const result = fillInChunks({
    chunksToHighlight,
    totalLength: sourceString ? sourceString.length : 0
  });
  return result;
};
export {
  findAll
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_utils_getHighlight.js.map
