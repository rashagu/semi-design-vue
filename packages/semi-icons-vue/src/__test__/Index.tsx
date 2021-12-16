import {defineComponent, ref, h} from 'vue';
import styles from './index.module.scss';
import logo from '../assets/logo.png';

interface ExampleProps {
    name?: string
}

const MainCate = defineComponent<ExampleProps>(props => {

    return () => (
        <div id={'a'} class={styles.aa}>
            <img src={logo} alt={''}/>
            12323
        </div>
    );
});

MainCate.props = {
    name: String
};

export default MainCate;
