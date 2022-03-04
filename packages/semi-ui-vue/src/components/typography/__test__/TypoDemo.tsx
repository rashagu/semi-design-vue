import {defineComponent, ref, h, Fragment} from 'vue'
import Title from '../Title'
import Text from '../Text'
import Paragraph from '../Paragraph'
import {IconLink} from "@kousum/semi-icons-vue";
interface ExampleProps {
  name?: string
}

export const vuePropsType = {
  name: String
}
const TypoDemo = defineComponent<ExampleProps>((props, {slots}) => {




  return () => (
    <div>
      <div>
        <Title  style={{margin: '8px 0'}} >h1. Semi Design</Title>
        <Title heading={2} style={{margin: '8px 0'}} >h2. Semi Design</Title>
        <Title heading={3} style={{margin: '8px 0'}} >h3. Semi Design</Title>
        <Title heading={4} style={{margin: '8px 0'}} >h4. Semi Design</Title>
        <Title heading={5} style={{margin: '8px 0'}} >h5. Semi Design</Title>
        <Title heading={6} style={{margin: '8px 0'}} >h6. Semi Design</Title>
      </div>
      <div>
        <Text>Text</Text>
        <br />
        <Text type="secondary">Secondary</Text>
        <br />
        <Text type="tertiary">{`Tertiary v>=1.2.0`}</Text>
        <br />
        <Text type="quaternary">{`Quaternary v>=1.2.0`}</Text>
        <br />
        <Text type="warning">Warning</Text>
        <br />
        <Text type="danger">Danger</Text>
        <br />
        <Text type="success">{`Success v>=1.7.0`}</Text>
        <br />
        <Text disabled>Disabled</Text>
        <br />
        <Text mark>Default Mark</Text>
        <br />
        <Text code>Example Code</Text>
        <br />
        <Text underline>Underline</Text>
        <br />
        <Text delete>Deleted</Text>
        <br />
        <Text strong>Strong</Text>
      </div>
      <div>
        <Text link={{ href: 'https://semi.design/' }}>链接文本</Text>
        <br />
        <Text link={{ href: 'https://semi.design/' }}>打开网站</Text>
        <br />
        <Text link icon={<IconLink />} underline>带下划线的网页链接</Text>
      </div>

      <div>
        <div>
          <Title heading={5}>默认行距</Title>
          <Paragraph>
            Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的 Web 应用。
          </Paragraph>
          <br />
          <Title heading={5}>宽松行距</Title>
          <Paragraph spacing="extended">
            Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的 Web 应用。
          </Paragraph>
        </div>
      </div>
      <div>
        <Text>正常文本</Text>
        <Paragraph spacing="extended">
          Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的 Web 应用。
        </Paragraph>
        <br />
        <Text size='small'>小文本</Text>
        <Paragraph size='small'>
          Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的 Web 应用。
        </Paragraph>
      </div>
      <div>
        <Paragraph copyable>点击右边的图标复制文本。</Paragraph>
        <Paragraph copyable={{ content: 'Hello, Semi Design!' }}>点击复制文本。</Paragraph>
        <Paragraph copyable={{ onCopy: () => {} }}>点击右边的图标复制文本。</Paragraph>
        <br/>
        <Text type="secondary">粘贴区域：</Text>
        <br/>
        {/*<TextArea autosize style={{width: 320, marginTop: 4}} rows={3} />*/}
      </div>

      <div>
        <Title heading={5} ellipsis={{ showTooltip: true }} style={{ width: 250 }}>
          是一个很长很长很长很长5号标题
        </Title>
        <br />
        <Text
          ellipsis={{
            showTooltip:{
              opts: { content: <span>'这是自定义要展示的内容'</span> }
            }
          }}
          style={{ width: '150px' }}
        >
          可以自定义浮层里的展示内容试试看吧
        </Text>
        <br/>
        {/* link还可以传入object，如link={{ href: 'https://semi.design/zh-CN/basic/typography', target: '_blank' }} */}
        <Text link ellipsis={{ showTooltip: true, pos: 'middle' }} style={{ width: '150px' }}>
          是一个很长很长很长很长的链接
        </Text>
        <br/>
        <Paragraph ellipsis={{ suffix: '小尾巴' }} style={{ width: 300 }}>
          有后缀的情况：Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统。
        </Paragraph>
        <br/>
        <Paragraph ellipsis={{ rows: 3 }} style={{ width: 300 }}>
          这是一个多行截断的例子：Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的 Web 应用。
        </Paragraph>
        <br/>
        <Paragraph ellipsis={{ rows: 3, showTooltip: {type: 'popover', opts: {style: {width: 300}}} }} style={{ width: 300 }}>
          多行截断，展示 Popover：Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的 Web 应用。
        </Paragraph>
        <br/>
        <Paragraph ellipsis={{ rows: 3, expandable: true, collapsible: true, collapseText: '折叠我吧', onExpand: (bool, e) => console.log(bool, e) }} style={{ width: 300 }}>
          支持展开和折叠：Semi Design 是由互娱社区前端团队与 UED 团队共同设计开发并维护的设计系统。设计系统包含设计语言以及一整套可复用的前端组件，帮助设计师与开发者更容易地打造高质量的、用户体验一致的、符合设计规范的 Web 应用。
        </Paragraph>
      </div>

      <div>
        <Text
          ellipsis={{
            showTooltip:{
              opts: { content: '架构|Data-inf|bytegraph.cheetah.user_relation' }
            }
          }}
          style={{ width: '150px' }}
        >
          有问题的超长文本发生截断时可按需进行自定义配置
        </Text>
        <br />
        <Text
          ellipsis={{
            showTooltip:{
              opts: { content: '架构|Data-inf|bytegraph.cheetah.user_relation', className: 'components-typography-demo' }
            }
          }}
          style={{ width: '150px' }}
        >
          覆盖类名超长文本发生截断时可使用类名覆盖进行自定义配置
        </Text>
        <br />
        <Text
          ellipsis={{
            showTooltip:{
              opts: { content: '架构|Data-inf|bytegraph.cheetah.user_relation', style: { wordBreak: 'break-all' } }
            }
          }}
          style={{ width: '150px' }}
        >
          覆盖style超长文本发生截断时可使用style进行自定义配置
        </Text>
      </div>
    </div>
  )
})

TypoDemo.props = vuePropsType

export default TypoDemo

