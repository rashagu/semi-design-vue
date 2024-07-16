
import Image, { ImageProps } from '../../image';
import { IconUploadError } from "@kousum/semi-icons-vue";
import { omit } from 'lodash';
import { cssClasses } from '@douyinfe/semi-foundation/markdownRender/constants';


const img = (props: ImageProps)=>{

    return <div class={`${cssClasses.PREFIX}-component-image`}>

        <Image fallback={<IconUploadError />} width={"100%"} {...omit(props, 'children')}/>
        <div class={`${cssClasses.PREFIX}-component-image-alt`}>{props.alt}</div>
    </div>;
};

export default img;
