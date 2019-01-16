import Taro, { Component, Config, PureComponent } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './label.less'
import Color from '../color';

@observer
class soLabel extends PureComponent {


    static defaultProps = {
        text: '',
        color: Color.main,
        onClick: function() { }
    }

    componentWillMount() {

    }

    
    /**
     * @params 常用的属性
     * @params 缩写
     * @params styles 
     * 三者都是影响css属性的，优先级为 styles > 缩写 > 常用
     */
    render() {
        let {
            color,
            text,
            styles,
            onClick
        } = this.props;
        return text ? (
            <Text 
                className='so-label'
                style={{
                    background: color,
                    ...styles
                }}
                onClick={onClick}
            >
                {text}
            </Text> 
        ) : null
    }
}

export default soLabel