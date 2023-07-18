import cls from 'classnames';
import * as PropTypes from '../PropTypes';
import { cssClasses, strings } from '@douyinfe/semi-foundation/upload/constants';
import { getFileSize } from '@douyinfe/semi-foundation/upload/utils';
import { IconAlertCircle, IconClose, IconClear, IconFile, IconRefresh, IconEyeOpened } from '@kousum/semi-icons-vue';
import LocaleConsumer from '../locale/localeConsumer';
import { Locale } from '../locale/interface';

import Button from '../button/index';
import Progress from '../progress/index';
import Tooltip from '../tooltip/index';
import Spin from '../spin/index';
import { isElement } from '../_base/reactUtils';
import {RenderFileItemProps, UploadListType} from './interface';
import {defineComponent, h, useSlots, Fragment, ComponentObjectPropsOptions, PropType} from 'vue'
import type {CSSProperties, FunctionalComponent, VNode} from 'vue'
import {vuePropsMake} from "../PropTypes";

const prefixCls = cssClasses.PREFIX;

const ErrorSvg: FunctionalComponent<any> = (props = {}) => (
// @ts-ignore
    <svg focusable={false} aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="7.99992" cy="7.99992" r="6.66667" fill="white" />
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M15.3332 8.00008C15.3332 12.0502 12.0499 15.3334 7.99984 15.3334C3.94975 15.3334 0.666504 12.0502 0.666504 8.00008C0.666504 3.94999 3.94975 0.666748 7.99984 0.666748C12.0499 0.666748 15.3332 3.94999 15.3332 8.00008ZM8.99984 11.6667C8.99984 11.1145 8.55212 10.6667 7.99984 10.6667C7.44755 10.6667 6.99984 11.1145 6.99984 11.6667C6.99984 12.219 7.44755 12.6667 7.99984 12.6667C8.55212 12.6667 8.99984 12.219 8.99984 11.6667ZM7.99984 3.33341C7.27573 3.33341 6.7003 3.94171 6.74046 4.66469L6.94437 8.33495C6.97549 8.89513 7.4388 9.33341 7.99984 9.33341C8.56087 9.33341 9.02419 8.89513 9.05531 8.33495L9.25921 4.66469C9.29938 3.94171 8.72394 3.33341 7.99984 3.33341Z" fill="#F93920"
        />
    </svg>
);

const ReplaceSvg: FunctionalComponent<any>  = (props = {}) => (
// @ts-ignore
    <svg focusable={false} aria-hidden width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <circle cx="14" cy="14" r="14" fill="#16161A" fill-opacity="0.6" />
        <path d="M9 10.25V18.25L10.25 13.25H17.875V11.75C17.875 11.4739 17.6511 11.25 17.375 11.25H14L12.75 9.75H9.5C9.22386 9.75 9 9.97386 9 10.25Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M18 18.25L19 13.25H10.2031L9 18.25H18Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

const DirectorySvg: FunctionalComponent<any>  = (props = {}) => (
// @ts-ignore
    <svg focusable={false} aria-hidden width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M6 17V7.58824C6 7.26336 6.26863 7 6.6 7H10.5L12 8.76471H16.05C16.3814 8.76471 16.65 9.02806 16.65 9.35294V11.1176H7.5L6 17ZM6 17L7.44375 11.1176H18L16.8 17L6 17Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>

);

export interface FileCardProps extends RenderFileItemProps {
    className?: string;
    style?: CSSProperties;
}


const propTypes:ComponentObjectPropsOptions<FileCardProps> = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    listType: PropTypes.string as PropType<FileCardProps['listType']>,
    name: PropTypes.string,
    onPreviewClick: PropTypes.func as PropType<FileCardProps['onPreviewClick']>,
    onRemove: PropTypes.func as PropType<FileCardProps['onRemove']>,
    onReplace: PropTypes.func as PropType<FileCardProps['onReplace']>,
    onRetry: PropTypes.func as PropType<FileCardProps['onRetry']>,
    percent: PropTypes.number,
    preview: PropTypes.bool,
    previewFile: PropTypes.func as PropType<FileCardProps['previewFile']>,
    showReplace: PropTypes.bool,
    showRetry: PropTypes.bool,
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    status: PropTypes.string as PropType<FileCardProps['status']>,
    style: PropTypes.object,
    url: PropTypes.string,
    validateMessage: PropTypes.node as PropType<FileCardProps['validateMessage']>,
    index: PropTypes.number,
    key: String,
    showPicInfo: Boolean,
    renderPicInfo: Function as PropType<FileCardProps['renderPicInfo']>,
    renderPicPreviewIcon: Function as PropType<FileCardProps['renderPicPreviewIcon']>,
    renderFileOperation: Function as PropType<FileCardProps['renderFileOperation']>,
    uid: String,
    fileInstance: Object,
    renderThumbnail:Function,
    response: Object,
    event: Object
};

const defaultProps = {
    listType: strings.FILE_LIST_DEFAULT,
    name: '',
    onRemove: (): void => undefined,
    onRetry: (): void => undefined,
    preview: false,
    size: '',
};

export const vuePropsType = vuePropsMake<FileCardProps>(propTypes, defaultProps)
const FileCard = defineComponent<FileCardProps>((props, {}) => {

    const slots = useSlots()

    function transSize(size: string | number): string {
        if (typeof size === 'number') {
            return getFileSize(size);
        }
        return size;
    }

    function renderValidateMessage(): VNode | string {
        const { status, validateMessage } = props;
        let content = null;
        switch (true) {
            case typeof validateMessage === 'string' && status === strings.FILE_STATUS_VALIDATING:
                content = (<><Spin size="small" wrapperClassName={`${prefixCls}-file-card-icon-loading`} />{validateMessage}</>);
                break;
            case typeof validateMessage === 'string':
                content = (<><IconAlertCircle class={`${prefixCls}-file-card-icon-error`} />{validateMessage}</>);
                break;
            case isElement(validateMessage):
                content = validateMessage;
                break;
            default:
                break;
        }
        return content;
    }

    function renderPicValidateMsg(): VNode | string {
        const { status, validateMessage } = props;
        let icon = null;
        switch (true) {
            case validateMessage && status === strings.FILE_STATUS_VALIDATING:
                icon = (<Spin size="small" wrapperClassName={`${prefixCls}-picture-file-card-icon-loading`} />);
                break;
            case validateMessage && (status === strings.FILE_STATUS_VALID_FAIL || status === strings.FILE_STATUS_UPLOAD_FAIL):
                icon = (<div class={`${prefixCls}-picture-file-card-icon-error`}><ErrorSvg /></div>);
                break;
            default:
                break;
        }
        return icon ? <Tooltip content={validateMessage} trigger="hover" position="bottom">{icon}</Tooltip> : null;
    }

    function renderPic(locale: Locale['Upload']): VNode | string {
        const { url, percent, status, disabled, style, onPreviewClick, showPicInfo, renderPicInfo, renderPicPreviewIcon, renderThumbnail, name, index } = props;
        const showProgress = status === strings.FILE_STATUS_UPLOADING && percent !== 100;
        const showRetry = status === strings.FILE_STATUS_UPLOAD_FAIL && props.showRetry;
        const showReplace = status === strings.FILE_STATUS_SUCCESS && props.showReplace;
        const showPreview = status === strings.FILE_STATUS_SUCCESS && !props.showReplace;
        const filePicCardCls = cls({
            [`${prefixCls}-picture-file-card`]: true,
            [`${prefixCls}-picture-file-card-disabled`]: disabled,
            [`${prefixCls}-picture-file-card-show-pointer`]: typeof onPreviewClick !== 'undefined',
            [`${prefixCls}-picture-file-card-error`]: status === strings.FILE_STATUS_UPLOAD_FAIL,
            [`${prefixCls}-picture-file-card-uploading`]: showProgress
        });
        const retry = (
          <div role="button" tab-index={0} class={`${prefixCls}-picture-file-card-retry`} onClick={e => onRetry(e)}>
              <IconRefresh class={`${prefixCls}-picture-file-card-icon-retry`} />
          </div>
        );
        const replace = (
          <Tooltip trigger="hover" position="top" content={locale.replace} showArrow={false} spacing={4}>
              <div role="button" tab-index={0} class={`${prefixCls}-picture-file-card-replace`} onClick={(e): void => onReplace(e)}>
                  <ReplaceSvg class={`${prefixCls}-picture-file-card-icon-replace`} />
              </div>
          </Tooltip>
        );
        const preview = (
          <div class={`${prefixCls}-picture-file-card-preview`}>
              {typeof renderPicPreviewIcon === 'function'? renderPicPreviewIcon(props): null}
          </div>
        );
        const close = (
          <div role="button" tab-index={0} class={`${prefixCls}-picture-file-card-close`} onClick={e => onRemove(e)}>
              <IconClear class={`${prefixCls}-picture-file-card-icon-close`} />
          </div>
        );

        const picInfo = typeof renderPicInfo === 'function' ? renderPicInfo(props) : (
          <div class={`${prefixCls }-picture-file-card-pic-info`}>{index + 1}</div>
        );

        const thumbnail = typeof renderThumbnail === 'function' ? renderThumbnail(props) : <img src={url} alt={name} />;

        return (
          <div role="listitem" class={filePicCardCls} style={style} onClick={onPreviewClick}>
              {thumbnail}
              {showProgress ? <Progress percent={percent} type="circle" size="small" orbitStroke={'#FFF'} aria-label="uploading file progress" /> : null}
              {showRetry ? retry : null}
              {showReplace && replace}
              {showPreview && preview}
              {showPicInfo && picInfo}
              {!disabled && close}
              {renderPicValidateMsg()}
          </div>
        );
    }

    function renderFile(locale: Locale["Upload"]) {
        const { name, size, percent, url, showRetry: propsShowRetry, showReplace: propsShowReplace, preview, previewFile, status, style, onPreviewClick, renderFileOperation } = props;
        const fileCardCls = cls({
            [`${prefixCls}-file-card`]: true,
            [`${prefixCls}-file-card-fail`]: status === strings.FILE_STATUS_VALID_FAIL || status === strings.FILE_STATUS_UPLOAD_FAIL,
            [`${prefixCls}-file-card-show-pointer`]: typeof onPreviewClick !== 'undefined',
        });
        const previewCls = cls({
            [`${prefixCls}-file-card-preview`]: true,
            [`${prefixCls}-file-card-preview-placeholder`]: !preview || previewFile
        });
        const infoCls = `${prefixCls}-file-card-info`;
        const closeCls = `${prefixCls}-file-card-close`;
        const replaceCls = `${prefixCls}-file-card-replace`;
        const showProgress = !(percent === 100 || typeof percent === 'undefined') && status === strings.FILE_STATUS_UPLOADING;
        // only show retry when upload fail & showRetry is true, no need to show during validate fail
        const showRetry = status === strings.FILE_STATUS_UPLOAD_FAIL && propsShowRetry;
        const showReplace = status === strings.FILE_STATUS_SUCCESS && propsShowReplace;
        const fileSize = transSize(size);
        let previewContent: VNode | string = preview ? (<img src={url} alt={name} />) : (<IconFile size="large" />);
        if (previewFile) {
            previewContent = previewFile(props);
        }
        const operation = typeof renderFileOperation === 'function'? renderFileOperation(props) : <Button onClick={e => onRemove(e)} type="tertiary" icon={<IconClose />} theme="borderless" size="small" class={closeCls} />;
        return (
          <div role="listitem" class={fileCardCls} style={style} onClick={onPreviewClick}>
              <div class={previewCls}>
                  {previewContent}
              </div>
              <div class={`${infoCls}-main`}>
                  <div class={`${infoCls}-main-text`}>
                        <span class={`${infoCls}-name`}>
                            {name}
                        </span>
                      <span>
                            <span class={`${infoCls}-size`}>{fileSize}</span>
                          {showReplace && (
                            <Tooltip trigger="hover" position="top" showArrow={false} content={locale.replace}>
                                <Button
                                  onClick={e => onReplace(e)}
                                  type="tertiary"
                                  theme="borderless"
                                  size="small"
                                  icon={<DirectorySvg />}
                                  className={replaceCls}
                                />
                            </Tooltip>
                          )}

                        </span>

                  </div>
                  {showProgress ? (<Progress percent={percent} style={{ width: '100%' }} aria-label="uploading file progress" />) : null}
                  <div class={`${infoCls}-main-control`}>
                        <span class={`${infoCls}-validate-message`}>
                            {renderValidateMessage()}
                        </span>
                      {showRetry ? <span role="button" tab-index={0} class={`${infoCls}-retry`} onClick={e => onRetry(e)}>{locale.retry}</span> : null}
                  </div>
              </div>
              {operation}
          </div>
        );
    }

    function onRemove(e: MouseEvent): void {
        e.stopPropagation();
        props.onRemove();
    }

    function onReplace(e: MouseEvent): void {
        e.stopPropagation();
        props.onReplace();
    }

    function onRetry(e: MouseEvent): void {
        e.stopPropagation();
        props.onRetry();
    }

    return () => {
        const { listType } = props;
        if (listType === strings.FILE_LIST_PIC) {
            return (
              <LocaleConsumer componentName="Upload">
                  {(locale: Locale["Upload"]) => (renderPic(locale))}
              </LocaleConsumer>
            );
        }

        if (listType === strings.FILE_LIST_DEFAULT) {
            return (
              <LocaleConsumer componentName="Upload">
                  {(locale: Locale["Upload"]) => (renderFile(locale))}
              </LocaleConsumer>
            );
        }

        return null;
    }
},{
    props: vuePropsType,
    name: 'FileCard'
})

export default FileCard
