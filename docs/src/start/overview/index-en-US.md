---
category: Getting Started
title: Overview
subTitle: Overview
icon: doc-overview
localeCode: en-US
order: 11
brief: Based on Semi design language, React UI desktop component library that can be debugged online, helps developers build applications efficiently.
---

<script setup>
import { useData } from 'vitepress';
import DesignToken from '../../../DesignToken.vue';



const { site, theme, page, frontmatter } = useData()
</script>

# {{page.title}}

{{page.frontmatter.brief}}
## Basic

```overview
Divider,
Grid,
Icon,
Layout,
Typography
```

## Input

```overview
AutoComplete,
Cascader,
Button,
Checkbox,
DatePicker,
Form,
Input,
InputNumber,
Radio,
Rating,
Select,
Slider,
Switch,
TimePicker,
Transfer,
TreeSelect,
Upload
```

## Navigation

```overview
Anchor,
BackTop,
Breadcrumb,
Navigation,
Pagination,
Steps,
Tabs,
Tree
```

### Show

```overview
Avatar,
Badge,
Calendar,
Card,
Carousel,
Collapse,
Collapsible,
Descriptions,
Dropdown,
Empty,
Image,
List,
Modal,
OverflowList,
Popover,
ScrollList,
SideSheet,
Table,
Tag,
Timeline,
Tooltip,
Highlight
```

## Feedback

```overview
Banner,
Notification,
Popconfirm,
Progress,
Skeleton,
Spin,
Toast
```

## Others

```overview
ConfigProvider,
LocaleProvider
```