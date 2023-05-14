---
localeCode: en-US
order: 55
category: Show
title: Highlight 
icon: doc-highlight
dir: column
noInline: true
brief: highlight specific content
---

<script setup>
import { useData } from 'vitepress';
import DesignToken from '../../../DesignToken.vue';



const { site, theme, page, frontmatter } = useData()
</script>

# {{page.title}}

{{page.frontmatter.brief}}
## code demo

### How to import

Semi support `Highlight` component since v2.24.0

```jsx import
import { Highlight } from '@kousum/semi-ui-vue';
```


### Basic usage

You can specify keywords to be highlighted with `searchWords` and source text with `sourceString`


```jsx live=true dir="column"
import { h } from 'vue';
import { Highlight } from '@kousum/semi-ui-vue';

() => {
    const sourceString = 'From Semi Design，To Any Design. Quickly define your design system and apply it to design drafts and code';
    const searchWords = ['Any Design', 'Semi Design'];
    
    return (<h2>
        <Highlight sourceString={sourceString} searchWords={searchWords} />
    </h2>);
};
```

### Specify highlight style

By default, the highlighted text will have its own text style, the text color is black, and the background color is `--semi-yellow-4`.  
In dark mode, the text color is white, and the background color is `--semi-yellow-2`.  
When you need to customize different highlight styles, you can specify them through `highlightClassName`, `highlightStyle`

```jsx live=true dir="column"
import { h } from 'vue';
import { Highlight } from '@kousum/semi-ui-vue';

() => {
    const sourceString = 'From Semi Design，To Any Design. Quickly define your design system and apply it to design drafts and code';
    const searchWords = ['Any Design', 'Semi Design'];
    
    return (<h2>
        <Highlight
            sourceString={sourceString}
            searchWords={searchWords}
            highlightStyle={{
                borderRadius: 6,
                marginLeft: 4,
                marginRight: 4,
                paddingLeft: 4,
                paddingRight: 4,
                backgroundColor: 'rgba(var(--semi-teal-5), 1)',
                color: 'rgba(var(--semi-white), 1)'
            }}
        />
    </h2>);
};
```


### Specify the highlight tag

Semi will wrap the text matching searchWords in sourceString with mark tag by default, you can also re-specify the tag through `component`

```jsx live=true dir="column"
import { h } from 'vue';
import { Highlight } from '@kousum/semi-ui-vue';

() => {
    const sourceString = 'From Semi Design，To Any Design. Quickly define your design system and apply it to design drafts and code';
    const searchWords = ['Any Design', 'Semi Design'];
    
    return (<h2>
        <Highlight
            sourceString={sourceString}
            searchWords={searchWords}
            component='strong'
        />
    </h2>);
};
```

## API Reference

### Highlight

| property | description | type | default value |
| ------------ | ------------------------------------ -------------------- | ----------------------------- --- | ---------- |
| searchWords | expected highlighted text | string[] | '' |
| sourceString | source text | string | |
| component | Highlight label | string | `mark` |
| highlightClassName | The style class name of the highlight tag | ReactNode | - |
| highlightStyle | Inline style for highlight tags | ReactNode | - |
| caseSensitive | Is case sensitive | false | - |
| autoEscape | Whether to automatically escape | true | - |