import Flex from './flex/flex';
import SoIcon from './icon/icon';
import SoLabel from './label/label';
import SoButton from './button/button';

/**
 * 这个文件夹中的color和image不能对外抛出是因为
 * Flex， SoIcon是组件而他们只是普通的js
 * 在taro编译后再dist文件里面使用的时候会发生错误， 因为这个文件yo-ui/index.js会被遗弃掉导致访问不了
 * 所以在component 里面非小程序组件的文件要么在内部使用，要么直接引用，不要和组件混用出现错误
 */
export {
    Flex,
    SoIcon,
    SoLabel,
    SoButton
}
