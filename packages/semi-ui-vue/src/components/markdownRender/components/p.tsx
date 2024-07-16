
import Typography from '../../typography';
import { cssClasses } from '@douyinfe/semi-foundation/markdownRender/constants';
import { TitleProps } from '../../typography/title';
import { FunctionalComponent } from 'vue';

const p:FunctionalComponent = (props: TitleProps)=>{
    return <Typography.Paragraph className={`${cssClasses.PREFIX}-component-p`} {...props}>
    </Typography.Paragraph>;
};

export default p;
