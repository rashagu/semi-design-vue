import {HTMLAttributes, VNode} from "vue";
import {ComponentPublicInstance, VNodeRef} from "vue";

export type VueJsxNodeSingle = VNode | string | boolean | number
export type VueJsxNode = VNode | string | boolean | number | JSX.Element | Element | VueJsxNode[]
export type VueHTMLAttributes = HTMLAttributes & {
  key?: string | number | symbol
  ref?: VNodeRef
  ref_for?: boolean
  ref_key?: string
} & {
  checked?: boolean
  disabled?: boolean
  type?: string
}

export type RefElement = Element | ComponentPublicInstance | null

// 去除 [x: string]: any; ，vue 的props不支持这种
export type RemoveIndexSignature<T> = {
  [K in keyof T as K extends `${infer _}` ? K : never]: T[K];
};
