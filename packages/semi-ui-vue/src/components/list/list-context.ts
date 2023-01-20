
import type { RowProps } from '../grid';
import type { ColProps } from '../grid';
import Provider from "./context/Provider";
import Consumer from "./context/Consumer";

export interface Grid extends RowProps, ColProps {}

export interface ListContextValue {
    onRightClick?: (e: MouseEvent)=>void;
    onClick?: (e: MouseEvent)=>void;
    grid?: Grid
}

const ListContext = {
    Provider,
    Consumer
}

export default ListContext;
