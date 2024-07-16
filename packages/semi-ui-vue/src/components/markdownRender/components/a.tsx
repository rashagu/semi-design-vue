
import Typography from "../../typography";
import { omit } from 'lodash';

const a = (props: any)=>{
    return <Typography.Text link={{ ...(omit(props, 'children')) }}>
        {props.children}
    </Typography.Text>;
};

export default a;
