
import CodeHighlight from "../../codeHighlight";
import { nth } from 'lodash';
import { cssClasses } from "@douyinfe/semi-foundation/markdownRender/constants";
import { FunctionalComponent } from 'vue';

const pre = (props: { className: string,children: any }) => {
    const language = nth(props.className?.split("-"), -1);
    if (language) {
        return <CodeHighlight code={props.children as string}
            language={language} lineNumber={true}/>;
    } else {
        return <span class={`${cssClasses.PREFIX}-simple-code`}>
            {props.children}
        </span>;
    }

};

export default pre;
