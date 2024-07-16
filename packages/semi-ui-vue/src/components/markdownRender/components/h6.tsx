import Typography from '../../typography';
import { cssClasses } from '@douyinfe/semi-foundation/markdownRender/constants';
import { TitleProps } from '../../typography/title';

const h6 = (props: TitleProps)=>{
    return <Typography.Title heading={6} className={`${cssClasses.PREFIX}-component-header`} {...props}/>;
};

export default h6;
