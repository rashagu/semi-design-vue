import {CSSProperties} from "vue";
export interface VirtualRowProps{
  index: number;
  data: Record<string, any>;
  style?: CSSProperties;
}
const VirtualRow = ({ index, data, style }: VirtualRowProps) => {
  const { visibleOptions } = data;
  const option = visibleOptions[index];
  return data.renderOption(option, index, style);
};

export default VirtualRow;
