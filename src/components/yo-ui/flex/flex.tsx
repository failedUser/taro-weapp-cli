import Taro, { Component, Config, PureComponent } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'

import './flex.less'

@observer
class Flex extends PureComponent {

    config: Config = {
        navigationBarTitleText: 'UI组件测试'
    }
    
    static defaultProps = {
        direction: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        shrink: '1',
        wrap: 'wrap',
        flow: '',
        alignContent: 'center'
    }

    abbrMap = {
        'fd': 'direction',
        'jc': 'justifyContent',
        'ai': 'alignItems',
        'ac': 'alignContent',
        'fw': 'wrap',
        'fs': 'shrink'
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
            direction,
            justifyContent,
            alignItems,
            shrink,
            wrap,
            flow,
            alignContent,
            fd,
            jc,
            ai,
            ac,
            fw,
            fs,
            styles
        } = this.props;
        return (
            <View 
                className='flex-container'
                style={{
                    'flex-direction': fd || direction,
                    'justify-content': jc || justifyContent,
                    'align-items': ai || alignItems,
                    'flex-shrink': fs || shrink,
                    'flex-wrap': fw || wrap,
                    'flex-flow': flow,
                    'align-items': ac || alignContent,
                    ...styles
                }}
            >
                {this.props.children}
            </View>
        )
    }
}

export default Flex