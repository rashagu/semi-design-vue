import Typography from '../../typography';
import { cssClasses } from '@douyinfe/semi-foundation/markdownRender/constants';
import { TitleProps } from '../../typography/title';

const h2 = (props: TitleProps)=>{
    return <Typography.Title heading={2} className={`${cssClasses.PREFIX}-component-header`} {...props}/>;
};

export default h2;
