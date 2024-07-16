
import Typography from '../../typography';
import { cssClasses } from '@douyinfe/semi-foundation/markdownRender/constants';
import { TitleProps } from '../../typography/title';

const h1 = (props: TitleProps)=>{
    console.log(props);
    return <Typography.Title heading={1} className={`${cssClasses.PREFIX}-component-header`} {...props}/>;
};

export default h1;
