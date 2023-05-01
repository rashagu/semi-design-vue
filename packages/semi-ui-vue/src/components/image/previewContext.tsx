
import {VueJsxNode} from "../interface";
import Provider from "./previewContext/Provider";
import Consumer from "./previewContext/Consumer";
export interface PreviewContextProps {
    isGroup: boolean,
    lazyLoad: boolean,
    previewSrc: string[],
    titles: VueJsxNode[],
    currentIndex: number;
    visible: boolean;
    previewObserver: IntersectionObserver;
    setCurrentIndex: (current: number) => void;
    handleVisibleChange: (visible: boolean, preVisible?: boolean) => void;
}

export const PreviewContext = {
    Provider,
    Consumer
};




