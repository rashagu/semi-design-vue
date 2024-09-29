import { MDXProps } from 'mdx/types';
import type { FileItem, UploadProps } from '../upload';
import { Message } from '@douyinfe/semi-foundation/chat/foundation';
import type { TooltipProps } from '../tooltip';
import { CSSProperties, VNode } from 'vue';
import { ToastFuncType } from '../toast/useToast';

export { Message };
export interface CommonChatsProps {
  role?: any
  align?: 'leftRight' | 'leftAlign';
  mode?: 'bubble' | 'noBubble' | 'userBubble';
  chats?: Message[];
  roleConfig?: RoleConfig;
  onMessageDelete?: (message?: Message) => void;
  onChatsChange?: (chats?: Message[]) => void;
  onMessageBadFeedback?: (message?: Message) => void;
  onMessageGoodFeedback?: (message?: Message) => void;
  onMessageReset?: (message?: Message) => void;
  onMessageCopy?: (message?: Message) => void;
  chatBoxRenderConfig?: ChatBoxRenderConfig;
  customMarkDownComponents?: MDXProps['components'];
  renderDivider?: (message?: Message) => VNode;
}

export interface ChatProps extends CommonChatsProps {
  style?: CSSProperties;
  className?: string;
  hints?: string[];
  renderHintBox?: (props: {content: string; index: number;onHintClick: () => void}) => VNode;
  onHintClick?: (hint: string) => void;
  onChatsChange?: (chats?: Message[]) => void;
  onStopGenerator?: (e?: MouseEvent) => void;
  customMarkDownComponents?: MDXProps['components'];
  onClear?: () => void;
  onInputChange?: (props: { value?: string; attachment?: FileItem[] }) => void;
  onMessageSend?: (content: string, attachment: FileItem[]) => void;
  inputBoxStyle?: CSSProperties;
  inputBoxCls?: string;
  renderInputArea?: (props?: RenderInputAreaProps) => VNode;
  placeholder?: string;
  topSlot?: VNode | VNode[];
  bottomSlot?: VNode | VNode[];
  showStopGenerate?: boolean;
  hintStyle?: CSSProperties;
  hintCls?: string;
  uploadProps?: UploadProps;
  uploadTipProps?: TooltipProps;
  showClearContext?: boolean;
  sendHotKey?: 'enter' | 'shift+enter'

  inputContentConvert?: (...arg: any[])=>void
  InputBoxStyle?: CSSProperties
  renderFullInputBox?: (...arg: any[])=>void
}

export interface RenderInputAreaProps {
  defaultNode?: VNode;
  onSend?: (content?: string, attachment?: FileItem[]) => void;
  onClear?: (e?: any) => void
}

export interface ChatBoxRenderConfig {
  renderChatBoxTitle?: (props: {role?: Metadata; defaultTitle?: VNode}) => VNode;
  renderChatBoxAvatar?: (props: { role?: Metadata; defaultAvatar?: VNode}) => VNode;
  renderChatBoxContent?: (props: {message?: Message; role?: Metadata; defaultContent?: VNode | VNode[]; className?: string}) => VNode;
  renderChatBoxAction?: (props: {message?: Message; defaultActions?: VNode | VNode[]; className: string}) => VNode;
  renderFullChatBox?: (props: {message?: Message; role?: Metadata; defaultNodes?: FullChatBoxNodes; className: string}) => VNode
}

export interface FullChatBoxNodes {
  avatar?: VNode;
  title?: VNode;
  content?: VNode;
  action?: VNode
}

export interface RoleConfig {
  user?: Metadata;
  assistant?: Metadata;
  system?: Metadata;
  [x: string]: Metadata
}

export interface Metadata {
  name?: string;
  avatar?: string;
  color?: string;
  [x: string]: any
}

export interface ChatState {
  chats?: Message[];
  isLoading?: boolean;
  backBottomVisible?: boolean;
  scrollVisible?: boolean;
  wheelScroll?: boolean;
  cacheHints?: string[];
  uploadAreaVisible?: boolean
}

export interface ChatBoxProps extends Omit<CommonChatsProps, "chats"> {
  toast?: ToastFuncType;
  style?: CSSProperties;
  className?: string;
  previousMessage?: Message;
  message?: Message;
  lastChat?: boolean;
  customMarkDownComponents?: MDXProps['components']
}

export interface InputBoxProps {
  showClearContext?: boolean;
  sendHotKey?: 'enter' | 'shift+enter';
  placeholder: string;
  className?: string;
  style?: CSSProperties;
  disableSend?: boolean;
  uploadRef?: any;
  uploadTipProps?: TooltipProps;
  uploadProps?: UploadProps;
  manualUpload?: (file: File[]) => void;
  renderInputArea?: (props: RenderInputAreaProps) => VNode;
  onSend?: (content: string, attachment: FileItem[]) => void;
  onClearContext?: (e: any) => void;
  onInputChange?: (props: {inputValue: string; attachment: FileItem[]}) => void
}

export interface InputBoxState {
  content: string;
  attachment: FileItem[]
}
