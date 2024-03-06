<script setup>
import {useData, useRouter} from 'vitepress';
import {Layout, LayoutContent, LayoutHeader, LayoutSider, Nav} from '@kousum/semi-ui-vue';

import {h, onMounted, provide, watch, computed} from 'vue';
import {Icon, IconGithubLogo} from '@kousum/semi-icons-vue';
import VPContent from 'vitepress/dist/client/theme-default/components/VPContent.vue';
import InlineSvg from './InlineSvg.vue';
import {GetNavData} from "./navLink";

const modules = import.meta.glob('../../../images/docIcons/*.svg', { as: 'raw', eager: true })

function getIcon(icon) {
  return modules['../../../images/docIcons/doc-' + icon + '.svg']
}
const navItem = [
  {
    itemKey: 'start',
    text: '开始',
    textUs: 'Start',
    items: [
      {
        itemKey: '/start/introduction/',
        text: 'Introduction 介绍',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('intro')})),
      },
      {
        itemKey: '/start/getting-started/',
        text: 'Getting Started 快速开始',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('gettingstarted')})),
      },
      {
        itemKey: '/start/customize-theme/',
        text: 'Customized Themes 定制主题',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('theme')})),
      },
      {
        itemKey: '/start/design-to-code/',
        text: 'Design to Code 设计稿转代码',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('code')})),
      },
      {
        itemKey: '/start/dark-mode/',
        text: 'Dark Mode 暗色模式',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('darkmode')})),
      },
      {
        itemKey: '/start/accessibility/',
        text: 'Accessibility 无障碍',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('a11y')})),
      },
      {
        itemKey: '/start/content-guidelines/',
        text: 'Content Guidelines 文案规范',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('contentguidelines')})),
      },
      {
        itemKey: '/start/changelog/',
        text: 'Change Log 更新日志',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('changelog')})),
      },
      {
        itemKey: '/start/faq/',
        text: 'FAQ 常见问题',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('faq')})),
      },
      {
        itemKey: '/start/overview/',
        text: 'Overview 组件总览',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('overview')})),
      },
    ],
  },
  {
    itemKey: 'basic',
    text: '基础',
    textUs: 'Basic',
    items: [
      {
        itemKey: '/basic/divider/',
        text: 'Divider 分割线',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('divider')})),
      },
      {
        itemKey: '/basic/grid/',
        text: 'Grid 栅格',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('grid')})),
      },
      {
        itemKey: '/basic/icon/',
        text: 'Icon 图标',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('icons')})),
      },
      {
        itemKey: '/basic/layout/',
        text: 'Layout 布局',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('layout')})),
      },
      // {
      //   itemKey: '/basic/tokens/',
      //   text: 'Tokens 设计变量',
      //   icon: h(Icon, { svg: h(Gettingstarted) }),
      // },
      {
        itemKey: '/basic/space/',
        text: 'Space 间距',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('space')})),
      },
      {
        itemKey: '/basic/typography/',
        text: 'Typography 版式',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('typography')})),
      },
    ],
  },
  {
    itemKey: 'input',
    text: '输入类',
    textUs: 'Input',

    items: [
      {
        itemKey: '/input/autocomplete/',
        text: 'AutoComplete 自动完成',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('autocomplete')})),
      },
      {
        itemKey: '/input/button/',
        text: 'Button 按钮',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('button')})),
      },
      {
        itemKey: '/input/cascader/',
        text: 'Cascader 级联选择',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('cascader')})),
      },
      {
        itemKey: '/input/checkbox/',
        text: 'Checkbox 复选框',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('checkbox')})),
      },
      {
        itemKey: '/input/datepicker/',
        text: 'DatePicker 日期选择器',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('datepicker')})),
      },
      {
        itemKey: '/input/form/',
        text: 'Form 表单',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('form')})),
      },
      {
        itemKey: '/input/input/',
        text: 'Input 输入框',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('input')})),
      },
      {
        itemKey: '/input/inputnumber/',
        text: 'InputNumber 数字输入框',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('inputnumber')})),
      },
      {
        itemKey: '/input/radio/',
        text: 'Radio 单选框',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('radio')})),
      },
      {
        itemKey: '/input/rating/',
        text: 'Rating 评分',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('rating')})),
      },
      {
        itemKey: '/input/select/',
        text: 'Select 选择器',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('select')})),
      },
      {
        itemKey: '/input/slider/',
        text: 'Slider 滑动选择器',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('slider')})),
      },
      {
        itemKey: '/input/switch/',
        text: 'Switch 开关',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('switch')})),
      },
      {
        itemKey: '/input/taginput/',
        text: 'TagInput 标签输入框',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('tagInput')})),
      },
      {
        itemKey: '/input/timepicker/',
        text: 'TimePicker 时间选择器',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('timepicker')})),
      },
      {
        itemKey: '/input/transfer/',
        text: 'Transfer 穿梭框',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('transfer')})),
      },
      {
        itemKey: '/input/treeselect/',
        text: 'TreeSelect 树选择器',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('treeselect')})),
      },
      {
        itemKey: '/input/upload/',
        text: 'Upload 上传',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('upload')})),
      },
    ],
  },
  {
    itemKey: 'navigation',
    text: '导航类',
    textUs: 'Navigation',
    items: [
      {
        itemKey: '/navigation/anchor/',
        text: 'Anchor 锚点',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('anchor')})),
      },
      {
        itemKey: '/navigation/backtop/',
        text: 'BackTop 回到顶部',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('backtop')})),
      },
      {
        itemKey: '/navigation/breadcrumb/',
        text: 'Breadcrumb 面包屑',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('breadcrumb')})),
      },
      {
        itemKey: '/navigation/navigation/',
        text: 'Navigation 导航',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('navigation')})),
      },
      {
        itemKey: '/navigation/pagination/',
        text: 'Pagination 翻页器',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('pagination')})),
      },
      {
        itemKey: '/navigation/steps/',
        text: 'Steps 步骤',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('steps')})),
      },
      {
        itemKey: '/navigation/tabs/',
        text: 'Tabs 标签栏',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('tabs')})),
      },
      {
        itemKey: '/navigation/tree/',
        text: 'Tree 树形控件',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('tree')})),
      },
    ],
  },
  {
    itemKey: 'show',
    text: '展示类',
    textUs: 'show',
    items: [
      {
        itemKey: '/show/avatar/',
        text: 'Avatar 头像',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('avatar')})),
      },
      {
        itemKey: '/show/badge/',
        text: 'Badge 徽章',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('badge')})),
      },
      {
        itemKey: '/show/calendar/',
        text: 'Calendar 日历',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('calendar')})),
      },
      {
        itemKey: '/show/card/',
        text: 'Card 卡片',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('card')})),
      },
      {
        itemKey: '/show/carousel/',
        text: 'Carousel 轮播图',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('carousel')})),
      },
      {
        itemKey: '/show/collapse/',
        text: 'Collapse 折叠面板',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('accordion')})),
      },
      {
        itemKey: '/show/collapsible/',
        text: 'Collapsible 折叠',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('collapsible')})),
      },
      {
        itemKey: '/show/descriptions/',
        text: 'Descriptions 描述列表',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('descriptions')})),
      },
      {
        itemKey: '/show/dropdown/',
        text: 'Dropdown 下拉框',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('dropdown')})),
      },
      {
        itemKey: '/show/empty/',
        text: 'Empty 空状态',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('empty')})),
      },
      {
        itemKey: '/show/highlight/',
        text: 'Highlight 高亮文本',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('highlight')})),
      },
      {
        itemKey: '/show/image/',
        text: 'Image 图片',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('image')})),
      },
      {
        itemKey: '/show/list/',
        text: 'List 列表',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('list')})),
      },
      {
        itemKey: '/show/modal/',
        text: 'Modal 模态对话框',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('modal')})),
      },
      {
        itemKey: '/show/overflowlist/',
        text: 'OverflowList 折叠列表',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('overflowList')})),
      },
      {
        itemKey: '/show/popover/',
        text: 'Popover 气泡卡片',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('popover')})),
      },
      {
        itemKey: '/show/scrolllist/',
        text: 'ScrollList 滚动列表',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('scrolllist')})),
      },
      {
        itemKey: '/show/sidesheet/',
        text: 'SideSheet 滑动侧边栏',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('sidesheet')})),
      },
      {
        itemKey: '/show/table/',
        text: 'Table 表格',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('table')})),
      },
      {
        itemKey: '/show/tag/',
        text: 'Tag 标签',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('tag')})),
      },
      {
        itemKey: '/show/timeline/',
        text: 'Timeline 时间轴',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('timeline')})),
      },
      {
        itemKey: '/show/tooltip/',
        text: 'Tooltip 工具提示',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('tooltip')})),
      },
    ],
  },
  {
    itemKey: 'feedback',
    text: '反馈类',
    textUs: 'Feedback',
    items: [
      {
        itemKey: '/feedback/banner/',
        text: 'Banner 通知横幅',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('banner')})),
      },
      {
        itemKey: '/feedback/notification/',
        text: 'Notification 通知',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('notification')})),
      },
      {
        itemKey: '/feedback/popconfirm/',
        text: 'Popconfirm 气泡确认框',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('popconfirm')})),
      },
      {
        itemKey: '/feedback/progress/',
        text: 'Progress 进度条',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('progress')})),
      },
      {
        itemKey: '/feedback/skeleton/',
        text: 'Skeleton 骨架屏',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('skeleton')})),
      },
      {
        itemKey: '/feedback/spin/',
        text: 'Spin 加载器',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('spin')})),
      },
      {
        itemKey: '/feedback/toast/',
        text: 'Toast 提示',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('toast')})),
      },
    ],
  },
  {
    itemKey: 'other',
    text: '其他',
    textUs: 'Other',
    items: [
      {
        itemKey: '/other/configprovider/',
        text: 'ConfigProvider 全局配置',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('configprovider')})),
      },
      {
        itemKey: '/other/locale/',
        text: 'LocaleProvider 多语言',
        icon: h(Icon, {}, ()=>h(InlineSvg, {svg: getIcon('i18n')})),
      },
    ],
  },
];

const router = useRouter();

function gotoGithub() {
  window.open(theme.value.socialLinks[0].link);
}

const {page, site, theme, isDark} = useData();

function navSelect(v) {
  // router.go((import.meta.env.BASE_URL + v.itemKey).replace('//', '/'));
}


function setThemeMode() {
  const body = window.document.body;
  if (isDark.value) {
    body.setAttribute('theme-mode', 'dark');
  } else {
    body.removeAttribute('theme-mode');
  }
}

watch(isDark, () => {
  setThemeMode()
}, {})

onMounted(()=>{
  setThemeMode()
})
const headerStyle = computed(()=>{
  return isDark?{backgroundColor: 'var(--semi-color-bg-0)', borderBottom: 'var(--semi-color-nav-bg) solid 1px'}:{}
})

provide('hero-image-slot-exists', null)



</script>

<template>
  <Layout className="components-layout-demo">
    <LayoutHeader className="layout_header">
      <div class="header"
           :style="headerStyle">
        <div>
          <svg width="97" height="36" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0 13.389c0 7.394 5.994 13.388 13.389 13.388V0C5.994 0 0 5.994 0 13.389zm31.24 8.925c0-7.394-5.994-13.388-13.389-13.388v26.777c7.395 0 13.389-5.995 13.389-13.389zM77.35 2.168c0 .787-.695 1.424-1.553 1.424-.859 0-1.554-.637-1.554-1.424 0-.787.695-1.424 1.554-1.424.858 0 1.553.637 1.553 1.424zM45.174 7.743c-.307-2.194-2.337-3.28-4.715-3.28-2.296 0-4.387 1.127-4.387 3.382 0 1.558.902 2.583 2.357 2.994.555.16 1.184.331 1.877.52h.001l.87.238c.799.226 1.25.513 1.25 1.087 0 .717-.697 1.066-1.579 1.066-1.189 0-2.07-.574-2.296-1.66l-2.85.43c.431 2.521 2.297 3.628 5.085 3.628 2.522 0 4.49-1.291 4.49-3.587 0-1.886-1.128-2.747-3.486-3.342-.8-.205-1.332-.349-1.886-.513-.676-.205-1.066-.45-1.066-1.004s.759-.882 1.702-.84c1.004.04 1.68.614 1.783 1.393l2.85-.512zm3.836 3.342h7.77c.307-3.855-1.559-6.622-5.187-6.622-3.362 0-5.597 2.398-5.597 5.986 0 3.3 2.296 5.7 5.76 5.7 2.071 0 4.879-2.121 4.921-3.998h-2.788c-.43.922-1.271 1.394-2.296 1.394-1.497 0-2.378-.923-2.583-2.46zm2.583-4.203c1.578 0 2.173.738 2.357 2.05h-4.858c.266-1.23 1.004-2.05 2.5-2.05zM69.62 4.556c.922 0 1.813.235 2.51.973.964 1.004 1.066 2.152 1.066 3.567v6.745h-2.829V9.3c0-.8-.143-1.292-.533-1.722-.349-.39-.604-.543-1.137-.543s-.826.174-1.174.563c-.43.492-.513.984-.513 1.538v6.704h-2.829V9.3c0-.8-.143-1.292-.533-1.722-.348-.39-.633-.543-1.166-.543-.533 0-.796.174-1.145.563-.43.492-.513.984-.513 1.538v6.704h-2.808V4.77h2.46v1.188c.779-.922 1.699-1.403 2.929-1.403.922 0 1.842.235 2.54.973.204.225.389.45.512.676.779-1.066 1.81-1.65 3.163-1.65zm4.623.279V15.84h2.788V4.835h-2.788zM44.488 20.119v-3.755h2.808V30.82h-2.46v-1.036c-.348.777-1.763 1.343-2.993 1.343-3.054 0-5.105-2.521-5.105-5.842 0-3.383 2.071-5.843 5.249-5.843.984 0 1.804.246 2.5.676zm-4.797 5.167c0 1.865.8 3.362 2.603 3.362 1.866 0 2.542-1.353 2.542-3.362 0-2.01-.697-3.362-2.44-3.362-1.865 0-2.705 1.517-2.705 3.362zm11.451.779h7.77c.307-3.854-1.558-6.622-5.187-6.622-3.362 0-5.597 2.399-5.597 5.986 0 3.3 2.297 5.7 5.761 5.7 2.07 0 4.818-1.603 4.92-3.998h-2.788c-.43.922-1.27 1.394-2.296 1.394-1.496 0-2.378-.923-2.583-2.46zm2.583-4.203c1.579 0 2.173.738 2.358 2.05h-4.859c.267-1.23 1.005-2.05 2.501-2.05zm10.721-2.419c2.379 0 4.408 1.086 4.716 3.28l-2.85.513c-.102-.78-.779-1.353-1.784-1.394-.943-.041-1.701.287-1.701.84 0 .554.39.8 1.066 1.005.553.164 1.087.307 1.886.512 2.358.595 3.485 1.456 3.485 3.342 0 2.296-1.968 3.587-4.49 3.587-2.788 0-4.653-1.107-5.084-3.628l2.85-.43c.225 1.086 1.107 1.66 2.296 1.66.882 0 1.579-.349 1.579-1.066 0-.574-.452-.861-1.251-1.087l-.87-.237c-.694-.19-1.322-.36-1.877-.521-1.456-.41-2.358-1.435-2.358-2.993 0-2.256 2.091-3.383 4.388-3.383zm5.84.307v11.07h2.788V19.75h-2.788zm12.068.882v-.882h2.44v11.83c0 .553-.041 1.025-.164 1.496C84.097 35.106 81.8 36 79.36 36c-1.886 0-3.895-.94-4.736-2.375l2.584-1.25c.348.656 1.394 1 2.173 1 1.25 0 2.665-.606 2.624-1.837v-1.107c-.718.451-1.6.697-2.645.697-3.055 0-5.105-2.521-5.105-5.842 0-3.383 2.071-5.843 5.249-5.843 1.148 0 2.395.502 2.85 1.189zm-5.145 4.654c0 1.865.799 3.362 2.603 3.362 1.866 0 2.542-1.353 2.542-3.362 0-2.01-.697-3.362-2.44-3.362-1.865 0-2.706 1.517-2.706 3.362zm17.864-4.654c-1.066-1.046-2.398-1.271-3.71-1.189-1.005.061-2.132.43-2.85 1.291a1.172 1.172 0 01-.143.164V19.75h-2.46v11.07h2.808v-4.817c0-.758.02-1.62.123-2.111.123-.615.41-1.107.82-1.415.37-.266.8-.41 1.312-.43.759-.02 1.353.205 1.743.635.574.615.738 1.763.738 2.911v5.228h2.829v-5.35c0-1.723 0-3.65-1.21-4.839z"
            ></path>
          </svg>
        </div>
        <a :href="theme?.socialLinks[0].link">
          <IconGithubLogo style="cursor: pointer" :size="'extra-large'"/>
        </a>
      </div>
    </LayoutHeader>
    <Layout className="in_body">
      <LayoutSider className="layout_sider">
        <div class="layout_nav" style="height: calc(100vh - 60px); background-color: white">
          <Nav :defaultOpenKeys="navItem.map(item=>item.itemKey)" style="height: calc(100%);width: 280px;" @select="navSelect">
            <GetNavData :navItem="navItem" />
          </Nav>
        </div>
      </LayoutSider>
      <LayoutContent className="in_content VPDoc">
        <div style="max-width: calc(1160px + 256px); margin: 0 auto;padding-top: 60px">
          <div v-if="page.isNotFound">Custom 404 page!</div>
          <VPContent v-else/>
        </div>
      </LayoutContent>
    </Layout>
  </Layout>
</template>
<style lang="scss">

html,
body {
  height: 100vh;
  line-height: 20px;
  color: var(--semi-color-text-0);
  font-size: 14px;
  padding: 0;
  margin: 0;
  background: var(--semi-color-bg-0);

  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-corner {
    background-color: rgba(0, 0, 0, 0);
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 6px;
    background: var(--semi-color-fill-2);
  }

  &::-webkit-scrollbar-thumb:hover {
    background: var(--semi-color-fill-1);
  }

  i#sdk-fb-icon {
    width: 40px;
    height: 40px;
  }
}
.layout_nav {
  .semi-navigation-list-wrapper{
    height: 100%;
    padding-left: 8px;
  }
  .semi-navigation{
    padding: 0;
  }
  .semi-navigation-list-wrapper {

    .semi-navigation-list {
      padding-bottom: 30px;
    }

    &::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(0, 0, 0, 0);
    }

    &::-webkit-scrollbar-corner {
      background-color: rgba(0, 0, 0, 0);
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 6px;
      background: transparent;
      transition: all 1s;
    }

    &:hover::-webkit-scrollbar-thumb {
      background: var(--semi-color-fill-2);
    }

    &::-webkit-scrollbar-thumb:hover {
      background: var(--semi-color-fill-1);
    }
  }


}


table {
  display: table !important;
  width: 100%
}

.layout_header {
  position: fixed;
  z-index: 2;
  background-color: white;
  top: 0;
  width: 100%;
}

.layout_sider {
  position: fixed;
  top: 60px;
}

.in_content {
  padding-left: 300px;
  height: 100%;
  overflow: auto;
}

.VPContent {
  padding: 0 !important;
}

img {
  max-width: 100%;
}

.container {
  max-width: 100% !important;

  .content {
    max-width: 1160px !important;

    .content-container {
      max-width: 100% !important;
    }
  }
}
</style>
<style lang="scss" scoped>
.header {
  padding: 0 30px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: #eee solid 1px;
}



.layout_nav{
  //:deep(.semi-navigation-list-wrapper){
  //  height: 100%!important;
  //}
}
</style>
