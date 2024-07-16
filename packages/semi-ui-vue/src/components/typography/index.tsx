import BaseTypography from './typography';
import Text from './text';
import Title from './title';
import Paragraph from './paragraph';
import Numeral from './numeral';

export type TypographyType = typeof BaseTypography & {
    Text: typeof Text;
    Title: typeof Title;
    Paragraph: typeof Paragraph;
    Numeral: typeof Numeral
};

const Typography = BaseTypography as TypographyType;
Typography.Text = Text
Typography.Title = Title
Typography.Paragraph = Paragraph
Typography.Numeral = Numeral



// export { BaseTypographyProps } from './Base';
// export { CopyableProps } from './Copyable';
// export { TitleProps } from './Title';
// export { TextProps } from './Text';
// export { ParagraphProps } from './Paragraph';
export * from './interface';
export default Typography
export {
    Typography,
    Text as TypographyText,
    Title,
    Text,
    Paragraph,
    Numeral,
};
