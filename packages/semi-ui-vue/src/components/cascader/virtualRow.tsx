import type { FunctionalComponent } from 'vue';
import { type CSSProperties } from 'vue';

export interface virtualRowProps {
  index: number;
  data: Record<string, any>;
  style?: CSSProperties;
}

const VirtualRow:FunctionalComponent<virtualRowProps> = ({ index, data, style }) => {
  const { visibleOptions, renderOption } = data;
  const option = visibleOptions[index];
  return renderOption(option, index, style);
};

export default VirtualRow;

