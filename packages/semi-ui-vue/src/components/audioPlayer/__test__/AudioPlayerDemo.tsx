import { defineComponent, ref, h, Fragment, useSlots } from 'vue';
import { CombineProps } from '../../interface';
import AudioPlayer from '../index';

interface AudioPlayerDemoProps {
  name?: string;
}

export const vuePropsType: CombineProps<AudioPlayerDemoProps> = {
  name: String,
};
const AudioPlayerDemo = defineComponent({
  props: { ...vuePropsType },
  name: 'AudioPlayerDemo',
  setup(props, { attrs }) {
    const slots = useSlots();
    const audioUrl = 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/components/audio2.mp3';
    const audioUrlArr = [
      'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/components/audio1.mp3',
      'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/components/audio2.mp3',
    ];
    const audioUrlObj = {
      src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/components/audio1.mp3',
      title: '音频标题',
      cover: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg',
    };
    const audioUrlArrObj = [
      {
        src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/components/audio1.mp3',
        title: '音频标题1',
        cover: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg',
      },
      {
        src: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/components/audio2.mp3',
        title: '音频标题2',
        cover: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/ptlz_zlp/ljhwZthlaukjlkulzlp/root-web-sites/abstract.jpg',
      },
    ];

    return () => (
      <div>
        <div style={{ width: '100%' }}>
          <div style={{ marginTop: '10px' }}>
            <AudioPlayer
              autoPlay={false}
              audioUrl={audioUrl}
              theme="light"
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <AudioPlayer
              autoPlay={false}
              audioUrl={audioUrlObj}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <AudioPlayer
              autoPlay={false}
              audioUrl={audioUrlArr}
            />
          </div>
          <div style={{ marginTop: '10px' }}>
            <AudioPlayer
              autoPlay={false}
              audioUrl={audioUrlArrObj}
            />
          </div>
        </div>
      </div>
    );
  },
});


export default AudioPlayerDemo;

