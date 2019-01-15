import Taro, { Component, Config, PureComponent } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './icon.less'
import Images from '../images';

@observer
class SoIcon extends PureComponent {


    static defaultProps = {
        width: 30,
        height: 30,
        color: '#ccc'
    }

    componentWillMount() {

    }

    getBaseStyle() {
        let {
            height,
            width
        } = this.props;
        return {
            height: `${height}px`,
            width: `${width}px`
        }
    }

    getImage() {
        // return `../images/${this.props.type}.png`;
        return Images[this.props.type];
    }

    getColorProps() {
        let { color, width } = this.props;
        return {
            position: 'relative',
            filter: `drop-shadow(${width}px 0  ${color})`,
            transform: `translateX(-${width}px)`,
            'border-right': `${width}px solid transparent`,
            // left: `-${width - 1}px`,
            overflow: 'hidden'
        }
    }
    /**
     * @params 常用的属性
     * @params 缩写
     * @params styles 
     * 三者都是影响css属性的，优先级为 styles > 缩写 > 常用
     */
    render() {
        let sizeProps = this.getBaseStyle();
        let colorProps = this.getColorProps();
        return (
            <View style={{
                display: 'inline-block',
                overflow: 'hidden',
                ...sizeProps
            }}>
                <Image style={{
                    ...sizeProps,
                    ...colorProps
                }} src={this.getImage()}></Image>
            </View>
        )
    }
}

export default SoIcon