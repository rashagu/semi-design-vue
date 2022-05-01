import BaseTypography from './Typography';
import Text from './Text';
import Title from './Title';
import Paragraph from './Paragraph';

export type TypographyType = typeof BaseTypography & {
    Text: typeof Text;
    Title: typeof Title;
    Paragraph: typeof Paragraph;
};

const Typography = BaseTypography as TypographyType;




// export { BaseTypographyProps } from './Base';
// export { CopyableProps } from './Copyable';
// export { TitleProps } from './Title';
// export { TextProps } from './Text';
// export { ParagraphProps } from './Paragraph';
export * from './interface';
export {
    Typography,
    Text,
    Title,
    Paragraph,
};
