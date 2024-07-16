import Typography from '../../typography';
import { cssClasses } from '@douyinfe/semi-foundation/markdownRender/constants';
import { TitleProps } from '../../typography/title';

const h3 = (props: TitleProps)=>{
    return <Typography.Title heading={3} className={`${cssClasses.PREFIX}-component-header`} {...props}/>;
};

export default h3;
