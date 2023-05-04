import {
  byteKB,
  endsWith,
  getFileSize,
  mapFileTree
} from "./chunk-PDJEYM2Y.js";
import {
  isPromise
} from "./chunk-OUTPQAWN.js";
import {
  numbers,
  strings
} from "./chunk-JEPGBPDP.js";
import {
  getUuidv4
} from "./chunk-SDDOY6LY.js";
import {
  foundation_default
} from "./chunk-VMJJZ6RG.js";
import "./chunk-ALAR6DE5.js";
import "./chunk-2EMWRCT4.js";
import "./chunk-HGGG6L4M.js";
import "./chunk-ZZORV55O.js";
import "./chunk-JVA7ONT2.js";
import "./chunk-TY6AJI44.js";
import "./chunk-X27LVEKC.js";
import "./chunk-XEJAP4RW.js";
import "./chunk-7BHJLEWS.js";
import "./chunk-XKOYYM3K.js";
import "./chunk-WCAXN4E7.js";
import "./chunk-4EOJPDL2.js";

// node_modules/.pnpm/@douyinfe+semi-foundation@2.34.0/node_modules/@douyinfe/semi-foundation/lib/es/upload/foundation.js
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
var {
  FILE_STATUS_UPLOADING,
  FILE_STATUS_SUCCESS,
  FILE_STATUS_UPLOAD_FAIL,
  FILE_STATUS_VALID_FAIL,
  FILE_STATUS_WAIT_UPLOAD,
  DRAG_AREA_DEFAULT,
  DRAG_AREA_LEGAL,
  TRIGGER_AUTO
} = strings;
var UploadFoundation = class extends foundation_default {
  constructor(adapter) {
    super(Object.assign({}, adapter));
  }
  destroy() {
    this.releaseMemory();
  }
  getError(_ref) {
    let {
      action,
      xhr,
      message,
      fileName
    } = _ref;
    const status = xhr ? xhr.status : 0;
    const msg = message || `cannot post ${fileName} to ${action}, xhr status: ${status}'`;
    const err = new Error(msg);
    err.status = status;
    err.method = "post";
    err.url = action;
    return err;
  }
  getBody(xhr) {
    if (!xhr) {
      return;
    }
    const text = xhr.responseText || xhr.response;
    if (!text) {
      return text;
    }
    try {
      return JSON.parse(text);
    } catch (error) {
      return text;
    }
  }
  checkFileSize(file) {
    const {
      size
    } = file;
    const {
      maxSize,
      minSize
    } = this.getProps();
    let isIllegal = false;
    if (size > maxSize * byteKB || size < minSize * byteKB) {
      isIllegal = true;
    }
    return isIllegal;
  }
  /**
   * 1. 选择文件
   * 2. transform转换. 添加uid
   * 3. 检查文件个数是否超出
   *   若超出，不添加到list中，触发onExceed，中止流程
   *   若未超出，执行以下流程
   * 4. 检查文件尺寸，添加尺寸是否合法的标识
   * 5. 检查uploadTrigger是否为'auto'，若是执行步骤6-8
   * 6. 遍历文件列表触发上传
   *    - 对尺寸不合适的不需要触发上传
   * 7. beforeUpload
   *    - 对beforeUpload中设为不合法的不需要触发上传
   * 8. TODO: check
   * 9. afterUpload
   *
   * 1. Select file
   * 2. transform, add uid
   * 3. Check whether the number of files exceeds
   *   If it exceeds, it is not added to the list, trigger onExceed, and abort the process
   *   If it is not exceeded, execute the following process
   * 4. check the file size, add the size is legal logo
   * 5. Check whether the uploadTrigger is'auto ', if so, perform steps 6-8
   * 6. Traversing the file list triggers upload
   *    - No need to trigger uploads for inappropriate sizes
   * 7. beforeUpload
   *    - no need to trigger upload if beforeUpload is not set to be valid
   * 8. TODO: check
   * 9. afterUpload
   */
  handleChange(currentFileList) {
    const invalidFiles = [];
    const {
      limit,
      transformFile,
      accept
    } = this.getProps();
    const {
      fileList
    } = this.getStates();
    let files = Array.from(currentFileList);
    if (typeof accept !== "undefined") {
      files = files.filter((item) => {
        const isValid = this.checkFileFormat(accept, item);
        if (!isValid) {
          invalidFiles.push(item);
        }
        return isValid;
      });
      if (invalidFiles.length !== 0) {
        this._adapter.notifyAcceptInvalid(invalidFiles);
      }
      if (files.length === 0) {
        return;
      }
    }
    files = files.map((file) => {
      if (transformFile) {
        file = transformFile(file);
      }
      if (!file.uid) {
        file.uid = getUuidv4();
      }
      if (this.checkFileSize(file)) {
        file._sizeInvalid = true;
        file.status = FILE_STATUS_VALID_FAIL;
        this._adapter.notifySizeError(file, fileList);
      }
      return file;
    });
    const total = fileList.length + files.length;
    if (typeof limit !== "undefined") {
      if (total > limit) {
        this._adapter.notifyExceed(files);
        if (limit === 1) {
          files = files.slice(-1);
          this._adapter.notifyFileSelect(files);
          this._adapter.resetInput();
          this.replaceFileList(files);
          return;
        }
        const restNum = limit - fileList.length;
        files = files.slice(0, restNum);
      }
    }
    this._adapter.notifyFileSelect(files);
    this._adapter.resetInput();
    this.addFilesToList(files);
  }
  // Triggered when replacing a single file
  handleReplaceChange(currentFileList) {
    if (currentFileList.length === 0) {
      return;
    }
    const {
      transformFile,
      uploadTrigger,
      accept
    } = this.getProps();
    const {
      replaceIdx,
      fileList
    } = this.getStates();
    let newFile = Array.from(currentFileList).pop();
    if (typeof accept !== "undefined") {
      if (!this.checkFileFormat(accept, newFile)) {
        this._adapter.notifyAcceptInvalid([newFile]);
        return;
      }
    }
    if (transformFile) {
      newFile = transformFile(newFile);
    }
    if (!newFile.uid) {
      newFile.uid = getUuidv4();
    }
    if (this.checkFileSize(newFile)) {
      newFile._sizeInvalid = true;
      newFile.status = FILE_STATUS_VALID_FAIL;
      this._adapter.notifySizeError(newFile, fileList);
    }
    this._adapter.notifyFileSelect([newFile]);
    const newFileItem = this.buildFileItem(newFile, uploadTrigger);
    const newFileList = [...fileList];
    newFileList.splice(replaceIdx, 1, newFileItem);
    this._adapter.notifyChange({
      currentFile: newFileItem,
      fileList: newFileList
    });
    this._adapter.updateFileList(newFileList, () => {
      this._adapter.resetReplaceInput();
      this.upload(newFileItem);
    });
  }
  buildFileItem(fileInstance, uploadTrigger) {
    const {
      _sizeInvalid,
      status
    } = fileInstance;
    try {
      delete fileInstance._sizeInvalid;
      delete fileInstance.status;
    } catch (error) {
    }
    const _file = {
      status: status ? status : uploadTrigger === TRIGGER_AUTO ? FILE_STATUS_UPLOADING : FILE_STATUS_WAIT_UPLOAD,
      name: fileInstance.name,
      size: getFileSize(fileInstance.size),
      uid: fileInstance.uid,
      percent: 0,
      fileInstance,
      url: this._createURL(fileInstance)
    };
    if (_sizeInvalid) {
      _file._sizeInvalid = true;
    }
    if (this.isImage(fileInstance)) {
      _file.preview = true;
    }
    return _file;
  }
  replaceFileList(files) {
    const {
      uploadTrigger
    } = this.getProps();
    const currentFiles = files.map((item) => this.buildFileItem(item, uploadTrigger));
    this._adapter.notifyChange({
      fileList: currentFiles,
      currentFile: currentFiles[0]
    });
    this._adapter.updateFileList(currentFiles, () => {
      if (uploadTrigger === TRIGGER_AUTO) {
        this.startUpload(currentFiles);
      }
    });
  }
  addFilesToList(files) {
    const fileList = this.getState("fileList").slice();
    const {
      uploadTrigger
    } = this.getProps();
    const currentFiles = files.map((item) => this.buildFileItem(item, uploadTrigger));
    currentFiles.forEach((file) => {
      const index = fileList.findIndex((item) => item.uid === file.uid);
      if (index !== -1) {
        fileList[index] = file;
      } else {
        fileList.push(file);
        this._adapter.notifyChange({
          fileList,
          currentFile: file
        });
      }
    });
    this._adapter.updateFileList(fileList, () => {
      if (uploadTrigger === TRIGGER_AUTO) {
        this.startUpload(currentFiles);
      }
    });
  }
  // 插入多个文件到指定位置
  // Insert files to the specified location
  insertFileToList(files, index) {
    const {
      limit,
      transformFile,
      accept,
      uploadTrigger
    } = this.getProps();
    const {
      fileList
    } = this.getStates();
    const unAcceptFileList = [];
    let currentFileList = Array.from(files);
    if (typeof accept !== "undefined") {
      currentFileList = currentFileList.filter((item) => {
        const isValid = this.checkFileFormat(accept, item);
        if (!isValid) {
          unAcceptFileList.push(item);
        }
        return isValid;
      });
      if (unAcceptFileList.length !== 0) {
        this._adapter.notifyAcceptInvalid(unAcceptFileList);
      }
      if (currentFileList.length === 0) {
        return;
      }
    }
    currentFileList = currentFileList.map((file) => {
      if (!file.uid) {
        file.uid = getUuidv4();
      }
      if (this.checkFileSize(file)) {
        file._sizeInvalid = true;
        file.status = FILE_STATUS_VALID_FAIL;
        this._adapter.notifySizeError(file, fileList);
      }
      if (transformFile) {
        file = transformFile(file);
      }
      return file;
    });
    const total = fileList.length + currentFileList.length;
    if (typeof limit !== "undefined") {
      if (total > limit) {
        if (limit === 1) {
          currentFileList = currentFileList.slice(-1);
          this._adapter.notifyFileSelect(currentFileList);
          this._adapter.resetInput();
          this.replaceFileList(currentFileList);
          return;
        }
        const restNum = limit - fileList.length;
        currentFileList = currentFileList.slice(0, restNum);
        this._adapter.notifyExceed(currentFileList);
      }
    }
    const fileItemList = currentFileList.map((file) => this.buildFileItem(file, uploadTrigger));
    const newFileList = fileList.slice();
    if (typeof index !== "undefined") {
      newFileList.splice(index, 0, ...fileItemList);
    } else {
      newFileList.push(...fileItemList);
    }
    this._adapter.notifyFileSelect(currentFileList);
    this._adapter.notifyChange({
      fileList: newFileList,
      currentFile: null
    });
    this._adapter.updateFileList(newFileList, () => {
      if (uploadTrigger === TRIGGER_AUTO) {
        this.startUpload(fileItemList);
      }
    });
  }
  /* istanbul ignore next */
  manualUpload() {
    const waitToUploadFileList = this.getState("fileList").filter((item) => item.status === FILE_STATUS_WAIT_UPLOAD);
    this.startUpload(waitToUploadFileList);
  }
  startUpload(fileList) {
    fileList.forEach((file) => {
      if (!file._sizeInvalid) {
        this.upload(file);
      }
    });
  }
  upload(file) {
    const {
      beforeUpload
    } = this.getProps();
    if (typeof beforeUpload === "undefined") {
      this.post(file);
      return;
    }
    if (typeof beforeUpload === "function") {
      const {
        fileList
      } = this.getStates();
      const buResult = this._adapter.notifyBeforeUpload({
        file,
        fileList
      });
      switch (true) {
        case buResult === true: {
          this.post(file);
          break;
        }
        case buResult === false: {
          const newResult = {
            shouldUpload: false,
            status: strings.FILE_STATUS_VALID_FAIL
          };
          this.handleBeforeUploadResultInObject(newResult, file);
          break;
        }
        case (buResult && isPromise(buResult)): {
          Promise.resolve(buResult).then((resolveData) => {
            let newResult = {
              shouldUpload: true
            };
            const typeOfResolveData = Object.prototype.toString.call(resolveData).slice(8, -1);
            if (typeOfResolveData === "Object") {
              newResult = Object.assign(Object.assign({}, newResult), resolveData);
            }
            this.handleBeforeUploadResultInObject(newResult, file);
          }, (rejectVal) => {
            let newResult = {
              shouldUpload: false,
              status: strings.FILE_STATUS_VALID_FAIL
            };
            const typeOfRejectData = Object.prototype.toString.call(rejectVal).slice(8, -1);
            if (typeOfRejectData === "Object") {
              newResult = Object.assign(Object.assign({}, newResult), rejectVal);
            }
            this.handleBeforeUploadResultInObject(newResult, file);
          });
          break;
        }
        case typeof buResult === "object":
          this.handleBeforeUploadResultInObject(buResult, file);
          break;
        default:
          break;
      }
    }
  }
  // handle beforeUpload result when it's an object
  handleBeforeUploadResultInObject(buResult, file) {
    const {
      shouldUpload,
      status,
      autoRemove,
      validateMessage,
      fileInstance
    } = buResult;
    let newFileList = this.getState("fileList").slice();
    if (autoRemove) {
      newFileList = newFileList.filter((item) => item.uid !== file.uid);
    } else {
      const index = this._getFileIndex(file, newFileList);
      if (index < 0) {
        return;
      }
      status ? newFileList[index].status = status : null;
      validateMessage ? newFileList[index].validateMessage = validateMessage : null;
      if (fileInstance) {
        fileInstance.uid = file.uid;
        newFileList[index].fileInstance = fileInstance;
        newFileList[index].size = getFileSize(fileInstance.size);
        newFileList[index].name = fileInstance.name;
      }
      newFileList[index].shouldUpload = shouldUpload;
    }
    this._adapter.updateFileList(newFileList);
    this._adapter.notifyChange({
      fileList: newFileList,
      currentFile: file
    });
    if (shouldUpload) {
      this.post(file);
    }
  }
  post(file) {
    const {
      fileInstance
    } = file;
    const option = this.getProps();
    if (typeof XMLHttpRequest === "undefined") {
      return;
    }
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    const {
      action
    } = option;
    let {
      data
    } = option;
    if (data) {
      if (typeof data === "function") {
        data = data(fileInstance);
      }
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    const fileName = option.name || option.fileName || fileInstance.name;
    if (option.customRequest) {
      return option.customRequest({
        fileName,
        data,
        file,
        fileInstance,
        onProgress: (e) => this.handleProgress({
          e,
          fileInstance
        }),
        onError: (userXhr, e) => this.handleError({
          e,
          xhr: userXhr,
          fileInstance
        }),
        onSuccess: (response, e) => this.handleSuccess({
          response,
          fileInstance,
          e,
          isCustomRequest: true
        }),
        withCredentials: option.withCredentials,
        action: option.action
      });
    }
    formData.append(fileName, fileInstance);
    xhr.open("post", action, true);
    if (option.withCredentials && "withCredentials" in xhr) {
      xhr.withCredentials = true;
    }
    if (xhr.upload) {
      xhr.upload.onprogress = (e) => this.handleProgress({
        e,
        fileInstance
      });
    }
    xhr.onload = (e) => this.handleOnLoad({
      e,
      xhr,
      fileInstance
    });
    xhr.onerror = (e) => this.handleError({
      e,
      xhr,
      fileInstance
    });
    let headers = option.headers || {};
    if (typeof headers === "function") {
      headers = headers(fileInstance);
    }
    for (const item in headers) {
      if (Object.prototype.hasOwnProperty.call(headers, item) && headers[item] !== null) {
        xhr.setRequestHeader(item, headers[item]);
      }
    }
    xhr.send(formData);
  }
  handleProgress(_ref2) {
    let {
      e,
      fileInstance
    } = _ref2;
    const {
      fileList
    } = this.getStates();
    const newFileList = fileList.slice();
    let percent = 0;
    if (e.total > 0) {
      percent = Number((e.loaded / e.total * 100 * numbers.PROGRESS_COEFFICIENT).toFixed(0)) || 0;
    }
    const index = this._getFileIndex(fileInstance, newFileList);
    if (index < 0) {
      return;
    }
    newFileList[index].percent = percent;
    newFileList[index].status = FILE_STATUS_UPLOADING;
    this._adapter.notifyProgress(percent, fileInstance, newFileList);
    this._adapter.updateFileList(newFileList);
    this._adapter.notifyChange({
      fileList: newFileList,
      currentFile: newFileList[index]
    });
  }
  handleOnLoad(_ref3) {
    let {
      e,
      xhr,
      fileInstance
    } = _ref3;
    const {
      fileList
    } = this.getStates();
    const index = this._getFileIndex(fileInstance, fileList);
    if (index < 0) {
      return;
    }
    if (xhr.status < 200 || xhr.status >= 300) {
      this.handleError({
        e,
        xhr,
        fileInstance
      });
    } else {
      this.handleSuccess({
        e,
        xhr,
        fileInstance,
        index
      });
    }
  }
  handleSuccess(_ref4) {
    let {
      e,
      fileInstance,
      isCustomRequest = false,
      xhr,
      response
    } = _ref4;
    const {
      fileList
    } = this.getStates();
    let body = null;
    const index = this._getFileIndex(fileInstance, fileList);
    if (index < 0) {
      return;
    }
    if (isCustomRequest) {
      body = response;
    } else {
      body = this.getBody(xhr);
    }
    const newFileList = fileList.slice();
    const {
      afterUpload
    } = this.getProps();
    newFileList[index].status = FILE_STATUS_SUCCESS;
    newFileList[index].percent = 100;
    this._adapter.notifyProgress(100, fileInstance, newFileList);
    newFileList[index].response = body;
    e ? newFileList[index].event = e : null;
    if (afterUpload && typeof afterUpload === "function") {
      const {
        autoRemove,
        status,
        validateMessage,
        name
      } = this._adapter.notifyAfterUpload({
        response: body,
        file: newFileList[index],
        fileList: newFileList
      }) || {};
      status ? newFileList[index].status = status : null;
      validateMessage ? newFileList[index].validateMessage = validateMessage : null;
      name ? newFileList[index].name = name : null;
      autoRemove ? newFileList.splice(index, 1) : null;
    }
    this._adapter.notifySuccess(body, fileInstance, newFileList);
    this._adapter.notifyChange({
      fileList: newFileList,
      currentFile: newFileList[index]
    });
    this._adapter.updateFileList(newFileList);
  }
  _getFileIndex(file, fileList) {
    return fileList.findIndex((item) => item.uid === file.uid);
  }
  handleRemove(file) {
    const {
      disabled
    } = this.getProps();
    if (disabled) {
      return;
    }
    const {
      fileList
    } = this.getStates();
    Promise.resolve(this._adapter.notifyBeforeRemove(file, fileList)).then((res) => {
      if (res === false) {
        return;
      }
      const newFileList = fileList.slice();
      const index = this._getFileIndex(file, fileList);
      if (index < 0) {
        return;
      }
      newFileList.splice(index, 1);
      this._adapter.notifyRemove(file.fileInstance, newFileList, file);
      this._adapter.updateFileList(newFileList);
      this._adapter.notifyChange({
        fileList: newFileList,
        currentFile: file
      });
    });
  }
  handleError(_ref5) {
    let {
      e,
      xhr,
      fileInstance
    } = _ref5;
    const {
      fileList
    } = this.getStates();
    const index = this._getFileIndex(fileInstance, fileList);
    if (index < 0) {
      return;
    }
    const {
      action
    } = this.getProps();
    const newFileList = fileList.slice();
    const error = this.getError({
      action,
      xhr,
      fileName: fileInstance.name
    });
    newFileList[index].status = FILE_STATUS_UPLOAD_FAIL;
    newFileList[index].response = error;
    newFileList[index].event = e;
    this._adapter.notifyError(error, fileInstance, newFileList, xhr);
    this._adapter.updateFileList(newFileList);
    this._adapter.notifyChange({
      currentFile: newFileList[index],
      fileList: newFileList
    });
  }
  handleClear() {
    const {
      disabled
    } = this.getProps();
    const {
      fileList
    } = this.getStates();
    if (disabled) {
      return;
    }
    Promise.resolve(this._adapter.notifyBeforeClear(fileList)).then((res) => {
      if (res === false) {
        return;
      }
      this._adapter.updateFileList([]);
      this._adapter.notifyClear();
      this._adapter.notifyChange({
        fileList: []
      });
    }).catch((error) => {
    });
  }
  _createURL(fileInstance) {
    const url = URL.createObjectURL(fileInstance);
    const {
      localUrls
    } = this.getStates();
    const newUrls = localUrls.slice();
    newUrls.push(url);
    this._adapter.updateLocalUrls(newUrls);
    return url;
  }
  // 释放预览文件所占用的内存
  // Release memory used by preview files
  releaseMemory() {
    const {
      localUrls
    } = this.getStates();
    localUrls.forEach((url) => {
      this._releaseBlob(url);
    });
  }
  _releaseBlob(url) {
    try {
      URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error);
    }
  }
  isImage(file) {
    return /(webp|svg|png|gif|jpg|jpeg|bmp|dpg)$/i.test(file.type);
  }
  /* istanbul ignore next */
  isMultiple() {
    return Boolean(this.getProp("multiple"));
  }
  handleDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    this._dragEnterTarget = e.currentTarget;
    const {
      disabled
    } = this.getProps();
    if (!disabled) {
      this._adapter.updateDragAreaStatus(DRAG_AREA_LEGAL);
    }
  }
  handleDirectoryDrop(e) {
    return __awaiter(this, void 0, void 0, function* () {
      const fileList = this.getState("fileList").slice();
      const items = [].slice.call(e.dataTransfer.items);
      const files = yield mapFileTree(items);
      this.handleChange(files);
      this._adapter.updateDragAreaStatus(DRAG_AREA_DEFAULT);
      this._adapter.notifyDrop(e, files, fileList);
    });
  }
  handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const {
      disabled,
      directory
    } = this.getProps();
    const fileList = this.getState("fileList").slice();
    if (!disabled) {
      if (directory) {
        this.handleDirectoryDrop(e);
        return;
      }
      const files = Array.from(e.dataTransfer.files);
      this.handleChange(files);
      this._adapter.updateDragAreaStatus(DRAG_AREA_DEFAULT);
      this._adapter.notifyDrop(e, files, fileList);
    }
  }
  handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this._dragEnterTarget === e.target) {
      this._adapter.updateDragAreaStatus(DRAG_AREA_DEFAULT);
    }
  }
  // 拖拽上传时，需要对文件的格式进行校验
  // When dragging and uploading, you need to verify the file format
  checkFileFormat(accept, file) {
    const acceptTypes = accept.split(",").map((type) => type.trim()).filter((type) => type);
    const mimeType = file.type || "";
    const baseMimeType = mimeType.replace(/\/.*$/, "");
    return acceptTypes.some((type) => {
      if (type.charAt(0) === ".") {
        const fileName = file.name || "";
        const acceptExtension = type.split(".").pop().toLowerCase();
        return endsWith(fileName.toLowerCase(), acceptExtension);
      }
      if (/\/\*$/.test(type)) {
        const acceptBaseMimeType = type.replace(/\/.*$/, "");
        return baseMimeType === acceptBaseMimeType;
      }
      if (/^[^\/]+\/[^\/]+$/.test(type)) {
        return mimeType === type;
      }
      return false;
    });
  }
  retry(fileItem) {
    const {
      onRetry
    } = this.getProps();
    if (onRetry && typeof onRetry === "function") {
      onRetry(fileItem);
    }
    this.post(fileItem);
  }
  handlePreviewClick(fileItem) {
    this._adapter.notifyPreviewClick(fileItem);
  }
};
var foundation_default2 = UploadFoundation;
export {
  foundation_default2 as default
};
//# sourceMappingURL=@douyinfe_semi-foundation_lib_es_upload_foundation.js.map
