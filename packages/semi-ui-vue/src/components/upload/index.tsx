/* eslint-disable max-len */
import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { noop, pick } from 'lodash';
import UploadFoundation from '@douyinfe/semi-foundation/upload/foundation';
import { strings, cssClasses } from '@douyinfe/semi-foundation/upload/constants';
import FileCard from './fileCard';
import {useBaseComponent} from '../_base/baseComponent';
import LocaleConsumer_  from '../locale/localeConsumer';
import { IconUpload } from '@kousum/semi-icons-vue';
import type {
    FileItem,
    RenderFileItemProps,
    UploadListType,
    PromptPositionType,
    BeforeUploadProps,
    AfterUploadProps,
    OnChangeProps,
    customRequestArgs,
    CustomError,
} from './interface';
import { Locale } from '../locale/interface';
import '@douyinfe/semi-foundation/upload/upload.scss';
import {
    VNode,
    CSSProperties,
    defineComponent,
    useSlots,
    h,
    reactive,
    ref,
    watch,
    onMounted,
    Fragment,
    nextTick
} from 'vue'

import type {
    CustomFile,
    UploadAdapter,
    BeforeUploadObjectResult,
    AfterUploadResult,
} from '@douyinfe/semi-foundation/upload/foundation';
import type { ValidateStatus } from '../_base/baseComponent';
import {vuePropsMake} from "../PropTypes";
import {AutoCompleteProps} from "../autoCompleteItems";

const LocaleConsumer = LocaleConsumer_()
const prefixCls = cssClasses.PREFIX;

export {
    FileItem,
    RenderFileItemProps,
    UploadListType,
    PromptPositionType,
    BeforeUploadProps,
    AfterUploadProps,
    OnChangeProps,
    customRequestArgs,
    CustomError,
    BeforeUploadObjectResult,
    AfterUploadResult,
};

export interface UploadProps {
    accept?: string;
    action: string;
    afterUpload?: (object: AfterUploadProps) => AfterUploadResult;
    beforeUpload?: (
        object: BeforeUploadProps
    ) => BeforeUploadObjectResult | Promise<BeforeUploadObjectResult> | boolean;
    beforeClear?: (fileList: Array<FileItem>) => boolean | Promise<boolean>;
    beforeRemove?: (file: FileItem, fileList: Array<FileItem>) => boolean | Promise<boolean>;
    capture?: boolean | 'user' | 'environment' | undefined;
    className?: string;
    customRequest?: (object: customRequestArgs) => void;
    data?: Record<string, any> | ((file: File) => Record<string, unknown>);
    defaultFileList?: Array<FileItem>;
    directory?: boolean;
    disabled?: boolean;
    dragIcon?: VNode | string;
    dragMainText?: VNode | string;
    dragSubText?: VNode | string;
    draggable?: boolean;
    fileList?: Array<FileItem>;
    fileName?: string;
    headers?: Record<string, any> | ((file: File) => Record<string, string>);
    hotSpotLocation?: 'start' | 'end';
    itemStyle?: CSSProperties;
    limit?: number;
    listType?: UploadListType;
    maxSize?: number;
    minSize?: number;
    multiple?: boolean;
    name?: string;
    onAcceptInvalid?: (files: File[]) => void;
    onChange?: (object: OnChangeProps) => void;
    onClear?: () => void;
    onDrop?: (e: Event, files: Array<File>, fileList: Array<FileItem>) => void;
    onError?: (e: CustomError, file: File, fileList: Array<FileItem>, xhr: XMLHttpRequest) => void;
    onExceed?: (fileList: Array<File>) => void;
    onFileChange?: (files: Array<File>) => void;
    onOpenFileDialog?: () => void;
    onPreviewClick?: (fileItem: FileItem) => void;
    onProgress?: (percent: number, file: File, fileList: Array<FileItem>) => void;
    onRemove?: (currentFile: File, fileList: Array<FileItem>, currentFileItem: FileItem) => void;
    onRetry?: (fileItem: FileItem) => void;
    onSizeError?: (file: File, fileList: Array<FileItem>) => void;
    onSuccess?: (responseBody: any, file: File, fileList: Array<FileItem>) => void;
    previewFile?: (renderFileItemProps: RenderFileItemProps) => VNode | string;
    prompt?: VNode | string;
    promptPosition?: PromptPositionType;
    renderFileItem?: (renderFileItemProps: RenderFileItemProps) => VNode | string;
    renderPicInfo?: (renderFileItemProps: RenderFileItemProps) => VNode | string;
    renderThumbnail?: (renderFileItemProps: RenderFileItemProps) => VNode | string;
    renderPicPreviewIcon?: (renderFileItemProps: RenderFileItemProps) => VNode | string;
    renderFileOperation?: (fileItem: RenderFileItemProps) => VNode | string;
    showClear?: boolean;
    showPicInfo?: boolean; // Show pic info in picture wall
    showReplace?: boolean; // Display replacement function
    showRetry?: boolean;
    showUploadList?: boolean;
    style?: CSSProperties;
    timeout?: number;
    transformFile?: (file: File) => FileItem;
    uploadTrigger?: 'auto' | 'custom';
    validateMessage?: VNode | string;
    validateStatus?: ValidateStatus;
    withCredentials?: boolean;
}

export interface UploadState {
    dragAreaStatus: 'default' | 'legal' | 'illegal'; // Status of the drag zone
    fileList: Array<FileItem>;
    inputKey: number;
    localUrls: Array<string>;
    replaceIdx: number;
    replaceInputKey: number;
}


const propTypes = {
    accept: PropTypes.string, // Limit allowed file types
    action: String,
    afterUpload: PropTypes.func,
    beforeClear: PropTypes.func,
    beforeRemove: PropTypes.func,
    beforeUpload: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    customRequest: PropTypes.func,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.func]), // Extra parameters attached when uploading
    defaultFileList: PropTypes.array,
    directory: PropTypes.bool, // Support folder upload
    disabled: PropTypes.bool,
    dragIcon: PropTypes.node,
    dragMainText: PropTypes.node,
    dragSubText: PropTypes.node,
    draggable: PropTypes.bool,
    fileList: PropTypes.array, // files had been uploaded
    fileName: PropTypes.string, // same as name, to avoid props conflict in Form.Upload
    headers: PropTypes.oneOfType([PropTypes.object, PropTypes.func]),
    hotSpotLocation: String,
    itemStyle: PropTypes.object,
    limit: PropTypes.number, // 最大允许上传文件个数
    listType: String,
    maxSize: PropTypes.number, // 文件大小限制，单位kb
    minSize: PropTypes.number, // 文件大小限制，单位kb
    multiple: PropTypes.bool,
    name: PropTypes.string, // file name
    onAcceptInvalid: PropTypes.func,
    onChange: PropTypes.func,
    onClear: PropTypes.func,
    onDrop: PropTypes.func,
    onError: PropTypes.func,
    onExceed: PropTypes.func, // Callback exceeding limit
    onFileChange: PropTypes.func, // Callback when file is selected
    onOpenFileDialog: PropTypes.func,
    onPreviewClick: PropTypes.func,
    onProgress: PropTypes.func,
    onRemove: PropTypes.func,
    onRetry: PropTypes.func,
    onSizeError: PropTypes.func, // Callback with invalid file size
    onSuccess: PropTypes.func,
    previewFile: PropTypes.func, // Custom preview
    prompt: PropTypes.node,
    promptPosition: String,
    renderFileItem: PropTypes.func,
    renderPicPreviewIcon: PropTypes.func,
    renderFileOperation: PropTypes.func,
    renderPicInfo: PropTypes.func,
    renderThumbnail: PropTypes.func,
    showClear: PropTypes.bool,
    showPicInfo: PropTypes.bool,
    showReplace: PropTypes.bool,
    showRetry: PropTypes.bool,
    showUploadList: PropTypes.bool, // whether to show fileList
    style: PropTypes.object,
    timeout: PropTypes.number,
    transformFile: PropTypes.func,
    uploadTrigger: String, // auto、custom
    validateMessage: PropTypes.node,
    validateStatus: String,
    withCredentials: PropTypes.bool,
};
const defaultProps: Partial<UploadProps> = {
    defaultFileList: [],
    disabled: false,
    listType: 'list' as const,
    hotSpotLocation: 'end',
    multiple: false,
    onAcceptInvalid: noop,
    onChange: noop,
    beforeRemove: () => true,
    beforeClear: () => true,
    onClear: noop,
    onDrop: noop,
    onError: noop,
    onExceed: noop,
    onFileChange: noop,
    onOpenFileDialog: noop,
    onProgress: noop,
    onRemove: noop,
    onRetry: noop,
    onSizeError: noop,
    onSuccess: noop,
    promptPosition: 'right' as const,
    showClear: true,
    showPicInfo: false,
    showReplace: false,
    showRetry: true,
    showUploadList: true,
    uploadTrigger: 'auto' as const,
    withCredentials: false,
};
export const vuePropsType = vuePropsMake(propTypes, defaultProps)
const Upload = defineComponent<UploadProps>((props, {}) => {

    const slots = useSlots()

    const state = reactive<UploadState>({
        fileList: props.defaultFileList || [],
        replaceIdx: -1,
        inputKey: Math.random(),
        replaceInputKey: Math.random(),
        // Status of the drag zone
        dragAreaStatus: 'default',
        localUrls: [],
    })
    const inputRef = ref();
    const replaceInputRef = ref();

    const {cache, adapter: adapterInject, log, context} = useBaseComponent<UploadProps>(props, state)
    function adapter_(): UploadAdapter<UploadProps, UploadState> {
        return {
            ...adapterInject<UploadProps, UploadState>(),
            notifyFileSelect: (files): void => props.onFileChange(files),
            notifyError: (error, fileInstance, fileList, xhr): void =>
              props.onError(error, fileInstance, fileList, xhr),
            notifySuccess: (responseBody, file, fileList): void => props.onSuccess(responseBody, file, fileList),
            notifyProgress: (percent, file, fileList): void => props.onProgress(percent, file, fileList),
            notifyRemove: (file, fileList, fileItem): void => props.onRemove(file, fileList, fileItem),
            notifySizeError: (file, fileList): void => props.onSizeError(file, fileList),
            notifyExceed: (fileList): void => props.onExceed(fileList),
            updateFileList: (fileList, cb): void => {
                if (typeof cb === 'function') {
                    state.fileList = fileList
                    nextTick(()=>{
                        cb?.()
                    })
                } else {
                    state.fileList = fileList
                }
            },
            notifyBeforeUpload: ({
                                     file,
                                     fileList,
                                 }): boolean | BeforeUploadObjectResult | Promise<BeforeUploadObjectResult> =>
              props.beforeUpload({ file, fileList }),
            notifyAfterUpload: ({ response, file, fileList }): AfterUploadResult =>
              props.afterUpload({ response, file, fileList }),
            resetInput: (): void => {
                state.inputKey = Math.random()
            },
            resetReplaceInput: (): void => {
                state.replaceInputKey = Math.random()
            },
            updateDragAreaStatus: (dragAreaStatus: string): void =>state.dragAreaStatus = dragAreaStatus as any,
            notifyChange: ({ currentFile, fileList }): void => props.onChange({ currentFile, fileList }),
            updateLocalUrls: (urls): void => {state.localUrls = urls},
            notifyClear: (): void => props.onClear(),
            notifyPreviewClick: (file): void => props.onPreviewClick(file),
            notifyDrop: (e, files, fileList): void => props.onDrop(e, files, fileList),
            notifyAcceptInvalid: (invalidFiles): void => props.onAcceptInvalid(invalidFiles),
            notifyBeforeRemove: (file, fileList): boolean | Promise<boolean> => props.beforeRemove(file, fileList),
            notifyBeforeClear: (fileList): boolean | Promise<boolean> => props.beforeClear(fileList),
        };
    }
    const adapter = adapter_()
    const foundation = new UploadFoundation(adapter);

    /**
     * Notes:
     *   The input parameter and return value here do not declare the type, otherwise tsc may report an error in form/fields.tsx when wrap after withField
     *   `The types of the parameters "props" and "nextProps" are incompatible.
     The attribute "action" is missing in the type "Readonly<any>", but it is required in the type "UploadProps".`
     *   which seems to be a bug, remove props type declare here
     */
    function getDerivedStateFromProps(props) {
        const { fileList } = props;
        if ('fileList' in props) {
            return {
                fileList: fileList || [],
            };
        }
        return null;
    }
    watch(()=>props.fileList, (val)=>{
        if (val){
            state.fileList = val
        }
    })

    onMounted(()=>{
        foundation.destroy();
    })

    const onClick = (): void => {
        const { onOpenFileDialog } = props;
        const isDisabled = Boolean(props.disabled);
        if (isDisabled || !inputRef || !inputRef.value) {
            return;
        }
        inputRef.value.click();
        if (onOpenFileDialog && typeof onOpenFileDialog) {
            onOpenFileDialog();
        }
    };

    const onChange = (e: any): void => {
        const { files } = e.target;
        foundation.handleChange(files);
    };

    const replace = (index: number): void => {
        state.replaceIdx = index
        nextTick(()=>{
            replaceInputRef.value.click();
        })
    };

    const onReplaceChange = (e: any): void => {
        const { files } = e.target;
        foundation.handleReplaceChange(files);
    };

    const clear = (): void => {
        foundation.handleClear();
    };

    const remove = (fileItem: FileItem): void => {
        foundation.handleRemove(fileItem);
    };

    /**
     * ref method
     * insert files at index
     * @param files Array<CustomFile>
     * @param index number
     * @returns
     */
    const insert = (files: Array<CustomFile>, index: number): void => {
        return foundation.insertFileToList(files, index);
    };

    /**
     * ref method
     * manual upload by user
     */
    const upload = (): void => {
        const { fileList } = state;
        foundation.startUpload(fileList);
    };

    const renderFile = (file: FileItem, index: number, locale: Locale['Upload']): VNode | string => {
        const { name, status, validateMessage, _sizeInvalid, uid } = file;
        const {
            previewFile,
            listType,
            itemStyle,
            showPicInfo,
            renderPicInfo,
            renderPicPreviewIcon,
            renderFileOperation,
            renderFileItem,
            renderThumbnail,
            disabled,
            onPreviewClick,
        } = props;
        const onRemove = (): void => remove(file);
        const onRetry = (): void => {
            foundation.retry(file);
        };
        const onReplace = (): void => {
            replace(index);
        };
        const fileCardProps = {
            ...pick(props, ['showRetry', 'showReplace', '']),
            ...file,
            previewFile,
            listType,
            onRemove,
            onRetry,
            index,
            key: uid || `${name}${index}`,
            style: itemStyle,
            disabled,
            showPicInfo,
            renderPicInfo,
            renderPicPreviewIcon,
            renderFileOperation,
            renderThumbnail,
            onReplace,
            onPreviewClick:
              typeof onPreviewClick !== 'undefined'
                ? (): void => foundation.handlePreviewClick(file)
                : undefined,
        };

        if (status === strings.FILE_STATUS_UPLOAD_FAIL && !validateMessage) {
            fileCardProps.validateMessage = locale.fail;
        }

        if (_sizeInvalid && !validateMessage) {
            fileCardProps.validateMessage = locale.illegalSize;
        }

        if (typeof renderFileItem === 'undefined') {
            return <FileCard {...fileCardProps} />;
        } else {
            return renderFileItem(fileCardProps);
        }
    };

    const renderFileList = (): VNode | string => {
        const { listType } = props;
        if (listType === strings.FILE_LIST_PIC) {
            return renderFileListPic();
        }

        if (listType === strings.FILE_LIST_DEFAULT) {
            return renderFileListDefault();
        }

        return null;
    };

    const renderFileListPic = () => {
        const children = slots.default?.()
        const { showUploadList, limit, disabled, draggable, hotSpotLocation } = props;
        const { fileList: stateFileList, dragAreaStatus } = state;
        const fileList = props.fileList || stateFileList;
        const showAddTriggerInList = limit ? limit > fileList.length : true;
        const dragAreaBaseCls = `${prefixCls}-drag-area`;
        const uploadAddCls = cls(`${prefixCls}-add`, {
            [`${prefixCls}-picture-add`]: true,
            [`${prefixCls}-picture-add-disabled`]: disabled,
        });
        const fileListCls = cls(`${prefixCls}-file-list`, {
            [`${prefixCls}-picture-file-list`]: true,
        });
        const dragAreaCls = cls({
            [`${dragAreaBaseCls}-legal`]: dragAreaStatus === strings.DRAG_AREA_LEGAL,
            [`${dragAreaBaseCls}-illegal`]: dragAreaStatus === strings.DRAG_AREA_ILLEGAL,
        });
        const mainCls = `${prefixCls}-file-list-main`;
        const addContentProps = {
            role: 'button',
            className: uploadAddCls,
            onClick: onClick,
        };
        const containerProps = {
            class: fileListCls,
        };
        const draggableProps = {
            onDrop: onDrop,
            onDragover: onDragover,
            onDragleave: onDragleave,
            onDragenter: onDragenter,
        };
        if (draggable) {
            Object.assign(addContentProps, draggableProps, { className: cls(uploadAddCls, dragAreaCls) });
        }
        const addContent = (
          <div {...addContentProps} x-semi-prop="children">
              {children}
          </div>
        );

        if (!showUploadList || !fileList.length) {
            if (showAddTriggerInList) {
                return addContent;
            }
            return null;
        }

        return (
          <LocaleConsumer componentName="Upload">
              {(locale: Locale['Upload']) => (
                <div {...containerProps}>
                    <div class={mainCls} role="list" aria-label="picture list">
                        {showAddTriggerInList && hotSpotLocation === 'start' ? addContent : null}
                        {fileList.map((file, index) => renderFile(file, index, locale))}
                        {showAddTriggerInList && hotSpotLocation === 'end' ? addContent : null}
                    </div>
                </div>
              )}
          </LocaleConsumer>
        );
    };

    const renderFileListDefault = () => {
        const { showUploadList, limit, disabled } = props;
        const { fileList: stateFileList } = state;
        const fileList = props.fileList || stateFileList;
        const fileListCls = cls(`${prefixCls}-file-list`);
        const titleCls = `${prefixCls}-file-list-title`;
        const mainCls = `${prefixCls}-file-list-main`;
        const showTitle = limit !== 1 && fileList.length;
        const showClear = props.showClear && !disabled;
        const containerProps = {
            class: fileListCls,
        };

        if (!showUploadList || !fileList.length) {
            return null;
        }

        return (
          <LocaleConsumer componentName="Upload">
              {(locale: Locale['Upload']) => (
                <div {...containerProps}>
                    {showTitle ? (
                      <div class={titleCls}>
                          <span class={`${titleCls}-choosen`}>{locale.selectedFiles}</span>
                          {showClear ? (
                            <span
                              role="button"
                              tabindex={0}
                              onClick={clear}
                              class={`${titleCls}-clear`}
                            >
                                        {locale.clear}
                                    </span>
                          ) : null}
                      </div>
                    ) : null}

                    <div class={mainCls} role="list" aria-label="file list">
                        {fileList.map((file, index) => renderFile(file, index, locale))}
                    </div>
                </div>
              )}
          </LocaleConsumer>
        );
    };

    const onDrop = (e: DragEvent): void => {
        foundation.handleDrop(e);
    };

    const onDragover = (e: DragEvent): void => {
        // When a drag element moves within the target element
        foundation.handleDragOver(e);
    };

    const onDragleave = (e: DragEvent): void => {
        foundation.handleDragLeave(e);
    };

    const onDragenter = (e: DragEvent): void => {
        foundation.handleDragEnter(e);
    };

    const renderAddContent = () => {
        const children = slots.default?.()
        const { draggable, listType, disabled } = props;
        const uploadAddCls = cls(`${prefixCls}-add`);
        if (listType === strings.FILE_LIST_PIC) {
            return null;
        }
        if (draggable) {
            return renderDragArea();
        }
        return (
          <div role="button" tabindex={0} aria-disabled={disabled} class={uploadAddCls} onClick={onClick}>
              {children}
          </div>
        );
    };

    const renderDragArea = (): VNode | string => {
        const { dragAreaStatus } = state;
        const children = slots.default?.()
        const { dragIcon, dragMainText, dragSubText, disabled } = props;
        const dragAreaBaseCls = `${prefixCls}-drag-area`;
        const dragAreaCls = cls(dragAreaBaseCls, {
            [`${dragAreaBaseCls}-legal`]: dragAreaStatus === strings.DRAG_AREA_LEGAL,
            [`${dragAreaBaseCls}-illegal`]: dragAreaStatus === strings.DRAG_AREA_ILLEGAL,
            [`${dragAreaBaseCls}-custom`]: children,
        });

        return (
          <LocaleConsumer componentName="Upload">
              {(locale: Locale['Upload']): VNode | string => (
                <div
                  role="button"
                  tabindex={0}
                  aria-disabled={disabled}
                  class={dragAreaCls}
                  onDrop={onDrop}
                  onDragover={onDragover}
                  onDragleave={onDragleave}
                  onDragenter={onDragenter}
                  onClick={onClick}
                >
                    {children ? (
                      children
                    ) : (
                      <>
                          <div class={`${dragAreaBaseCls}-icon`} x-semi-prop="dragIcon">
                              {dragIcon || <IconUpload size="extra-large" />}
                          </div>
                          <div class={`${dragAreaBaseCls}-text`}>
                              <div class={`${dragAreaBaseCls}-main-text`} x-semi-prop="dragMainText">
                                  {dragMainText || locale.mainText}
                              </div>
                              <div class={`${dragAreaBaseCls}-sub-text`} x-semi-prop="dragSubText">
                                  {dragSubText}
                              </div>
                              <div class={`${dragAreaBaseCls}-tips`}>
                                  {dragAreaStatus === strings.DRAG_AREA_LEGAL && (
                                    <span class={`${dragAreaBaseCls}-tips-legal`}>{locale.legalTips}</span>
                                  )}
                                  {dragAreaStatus === strings.DRAG_AREA_ILLEGAL && (
                                    <span class={`${dragAreaBaseCls}-tips-illegal`}>
                                                {locale.illegalTips}
                                            </span>
                                  )}
                              </div>
                          </div>
                      </>
                    )}
                </div>
              )}
          </LocaleConsumer>
        );
    };


    return () => {
        const {
            style,
            className,
            multiple,
            accept,
            disabled,
            capture,
            listType,
            prompt,
            promptPosition,
            draggable,
            validateMessage,
            validateStatus,
            directory,
        } = props;
        const uploadCls = cls(
          prefixCls,
          {
              [`${prefixCls}-picture`]: listType === strings.FILE_LIST_PIC,
              [`${prefixCls}-disabled`]: disabled,
              [`${prefixCls}-default`]: validateStatus === 'default',
              [`${prefixCls}-error`]: validateStatus === 'error',
              [`${prefixCls}-warning`]: validateStatus === 'warning',
              [`${prefixCls}-success`]: validateStatus === 'success',
          },
          className
        );
        const inputCls = cls(`${prefixCls}-hidden-input`);
        const inputReplaceCls = cls(`${prefixCls}-hidden-input-replace`);
        const promptCls = cls(`${prefixCls}-prompt`);
        const validateMsgCls = cls(`${prefixCls}-validate-message`);

        const dirProps = directory ? { directory: 'directory', webkitdirectory: 'webkitdirectory' } : {};

        return (
          <div class={uploadCls} style={style} x-prompt-pos={promptPosition}>
              <input
                key={state.inputKey}
                capture={capture}
                multiple={multiple}
                accept={accept}
                onChange={onChange}
                type="file"
                autocomplete="off"
                tabindex={-1}
                class={inputCls}
                ref={inputRef}
                {...dirProps}
              />
              <input
                key={state.replaceInputKey}
                multiple={false}
                accept={accept}
                onChange={onReplaceChange}
                type="file"
                autocomplete="off"
                tabindex={-1}
                class={inputReplaceCls}
                ref={replaceInputRef}
              />
              {renderAddContent()}
              {prompt ? (
                <div class={promptCls} x-semi-prop="prompt">
                    {prompt}
                </div>
              ) : null}

              {validateMessage ? (
                <div class={validateMsgCls} x-semi-prop="validateMessage">
                    {validateMessage}
                </div>
              ) : null}
              {renderFileList()}
          </div>
        );
    }
})

Upload.props = vuePropsType
Upload.name = 'Upload'

export default Upload


