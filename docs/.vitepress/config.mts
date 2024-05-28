import { defineConfig } from 'vitepress';
import Jsx from "@vitejs/plugin-vue-jsx";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base:'/',
  title: 'semi-design-vue',
  description: 'Vue3 UI components based on semi-design and Vue',
  srcDir: 'src',
  outDir:'./.vitepress/out/semi-design-vue',
  vite:{
    plugins: [Jsx()],
    // optimizeDeps: {
    //   disabled: true,
    // },
    ssr: {
      noExternal: ['@douyinfe\\semi-foundation', 'lodash', '@kousum\\semi-icons-vue', '@kousum\\semi-ui-vue'],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@douyinfe/semi-theme-default/scss/global.scss";
          @import "@douyinfe/semi-theme-default/scss/index.scss";
        `,
        }
      }
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '快速开始', link: '/start/getting-started/' },
    ],

    sidebar: [
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' },
      //   ],
      // },
      {
        text: '开始',
        items: [
          { text: 'Introduction 介绍', link: '/start/introduction/' },
          { text: 'Getting Started 快速开始', link: '/start/getting-started/' },
        ],
      },
      {
        link: 'start',
        text: '开始',
        items: [
          {
            link: '/start/introduction/',
            text: 'Introduction 介绍',
          },
          {
            link: '/start/getting-started/',
            text: 'Getting Started 快速开始',
          },
          {
            link: '/start/customize-theme/',
            text: 'Customized Themes 定制主题',
          },
          // {
          //   link: '/start/design-to-code/',
          //   text: 'Design to Code 设计稿转代码',
          // },
          {
            link: '/start/dark-mode/',
            text: 'Dark Mode 暗色模式',
          },
          {
            link: '/start/accessibility/',
            text: 'Accessibility 无障碍',
          },
          {
            link: '/start/content-guidelines/',
            text: 'Content Guidelines 文案规范',
          },
          {
            link: '/start/changelog/',
            text: 'Change Log 更新日志',
          },
          {
            link: '/start/faq/',
            text: 'FAQ 常见问题',
          },
          {
            link: '/start/overview/',
            text: 'Overview 组件总览',
          },
        ],
      },
      {
        link: 'basic',
        text: '基础',
        items: [
          {
            link: '/basic/divider/',
            text: 'Divider 分割线',
          },
          {
            link: '/basic/grid/',
            text: 'Grid 栅格',
          },
          // {
          //   link: '/basic/icon/',
          //   text: 'Icon 图标',
          // },
          {
            link: '/basic/layout/',
            text: 'Layout 布局',
          },
          // {
          //   link: '/basic/tokens/',
          //   text: 'Tokens 设计变量',
          //
          // },
          // {
          //   link: '/basic/space/',
          //   text: 'Space 间距',
          // },
          // {
          //   link: '/basic/typography/',
          //   text: 'Typography 版式',
          // },
        ],
      },
      {
        link: 'input',
        text: '输入类',

        items: [
          // {
          //   link: '/input/autocomplete/',
          //   text: 'AutoComplete 自动完成',
          // },
          {
            link: '/input/button/',
            text: 'Button 按钮',
          },
          // {
          //   link: '/input/cascader/',
          //   text: 'Cascader 级联选择',
          // },
          // {
          //   link: '/input/checkbox/',
          //   text: 'Checkbox 复选框',
          // },
          // {
          //   link: '/input/datepicker/',
          //   text: 'DatePicker 日期选择器',
          // },
          // {
          //   link: '/input/form/',
          //   text: 'Form 表单',
          // },
          // {
          //   link: '/input/input/',
          //   text: 'Input 输入框',
          // },
          // {
          //   link: '/input/inputnumber/',
          //   text: 'InputNumber 数字输入框',
          // },
          // {
          //   link: '/input/radio/',
          //   text: 'Radio 单选框',
          // },
          // {
          //   link: '/input/rating/',
          //   text: 'Rating 评分',
          // },
          // {
          //   link: '/input/select/',
          //   text: 'Select 选择器',
          // },
          // {
          //   link: '/input/slider/',
          //   text: 'Slider 滑动选择器',
          // },
          // {
          //   link: '/input/switch/',
          //   text: 'Switch 开关',
          // },
          // {
          //   link: '/input/taginput/',
          //   text: 'TagInput 标签输入框',
          // },
          // {
          //   link: '/input/timepicker/',
          //   text: 'TimePicker 时间选择器',
          // },
          // {
          //   link: '/input/transfer/',
          //   text: 'Transfer 穿梭框',
          // },
          // {
          //   link: '/input/treeselect/',
          //   text: 'TreeSelect 树选择器',
          // },
          // {
          //   link: '/input/upload/',
          //   text: 'Upload 上传',
          // },
        ],
      },
      // {
      //   link: 'navigation',
      //   text: '导航类',
      //   items: [
      //     {
      //       link: '/navigation/anchor/',
      //       text: 'Anchor 锚点',
      //     },
      //     {
      //       link: '/navigation/backtop/',
      //       text: 'BackTop 回到顶部',
      //     },
      //     {
      //       link: '/navigation/breadcrumb/',
      //       text: 'Breadcrumb 面包屑',
      //     },
      //     {
      //       link: '/navigation/navigation/',
      //       text: 'Navigation 导航',
      //     },
      //     {
      //       link: '/navigation/pagination/',
      //       text: 'Pagination 翻页器',
      //     },
      //     {
      //       link: '/navigation/steps/',
      //       text: 'Steps 步骤',
      //     },
      //     {
      //       link: '/navigation/tabs/',
      //       text: 'Tabs 标签栏',
      //     },
      //     {
      //       link: '/navigation/tree/',
      //       text: 'Tree 树形控件',
      //     },
      //   ],
      // },
      // {
      //   link: 'show',
      //   text: '展示类',
      //
      //   items: [
      //     {
      //       link: '/show/avatar/',
      //       text: 'Avatar 头像',
      //     },
      //     {
      //       link: '/show/badge/',
      //       text: 'Badge 徽章',
      //     },
      //     {
      //       link: '/show/calendar/',
      //       text: 'Calendar 日历',
      //     },
      //     {
      //       link: '/show/card/',
      //       text: 'Card 卡片',
      //     },
      //     {
      //       link: '/show/carousel/',
      //       text: 'Carousel 轮播图',
      //     },
      //     {
      //       link: '/show/collapse/',
      //       text: 'Collapse 折叠面板',
      //     },
      //     {
      //       link: '/show/collapsible/',
      //       text: 'Collapsible 折叠',
      //     },
      //     {
      //       link: '/show/descriptions/',
      //       text: 'Descriptions 描述列表',
      //     },
      //     {
      //       link: '/show/dropdown/',
      //       text: 'Dropdown 下拉框',
      //     },
      //     {
      //       link: '/show/empty/',
      //       text: 'Empty 空状态',
      //     },
      //     {
      //       link: '/show/highlight/',
      //       text: 'Highlight 高亮文本',
      //     },
      //     {
      //       link: '/show/image/',
      //       text: 'Image 图片',
      //     },
      //     {
      //       link: '/show/list/',
      //       text: 'List 列表',
      //     },
      //     {
      //       link: '/show/modal/',
      //       text: 'Modal 模态对话框',
      //     },
      //     {
      //       link: '/show/overflowlist/',
      //       text: 'OverflowList 折叠列表',
      //     },
      //     {
      //       link: '/show/popover/',
      //       text: 'Popover 气泡卡片',
      //     },
      //     {
      //       link: '/show/scrolllist/',
      //       text: 'ScrollList 滚动列表',
      //     },
      //     {
      //       link: '/show/sidesheet/',
      //       text: 'SideSheet 滑动侧边栏',
      //     },
      //     {
      //       link: '/show/table/',
      //       text: 'Table 表格',
      //     },
      //     {
      //       link: '/show/tag/',
      //       text: 'Tag 标签',
      //     },
      //     {
      //       link: '/show/timeline/',
      //       text: 'Timeline 时间轴',
      //     },
      //     {
      //       link: '/show/tooltip/',
      //       text: 'Tooltip 工具提示',
      //     },
      //   ],
      // },
      // {
      //   link: 'feedback',
      //   text: '反馈类',
      //
      //   items: [
      //     {
      //       link: '/feedback/banner/',
      //       text: 'Banner 通知横幅',
      //     },
      //     {
      //       link: '/feedback/notification/',
      //       text: 'Notification 通知',
      //     },
      //     {
      //       link: '/feedback/popconfirm/',
      //       text: 'Popconfirm 气泡确认框',
      //     },
      //     {
      //       link: '/feedback/progress/',
      //       text: 'Progress 进度条',
      //     },
      //     {
      //       link: '/feedback/skeleton/',
      //       text: 'Skeleton 骨架屏',
      //     },
      //     {
      //       link: '/feedback/spin/',
      //       text: 'Spin 加载器',
      //     },
      //     {
      //       link: '/feedback/toast/',
      //       text: 'Toast 提示',
      //     },
      //   ],
      // },
      // {
      //   link: 'other',
      //   text: '其他',
      //
      //   items: [
      //     {
      //       link: '/other/configprovider/',
      //       text: 'ConfigProvider 全局配置',
      //     },
      //     {
      //       link: '/other/locale/',
      //       text: 'LocaleProvider 多语言',
      //     },
      //   ],
      // },
    ],

    outline:{level: [1,4]},
    socialLinks: [{ icon: 'github', link: 'https://github.com/rashagu/semi-design-vue' }],
  },
});
