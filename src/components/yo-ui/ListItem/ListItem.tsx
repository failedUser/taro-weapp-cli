import Taro, { Component, Config, PureComponent } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import './ListItem.less'
import Color from '../color';
import Flex from '../flex/flex';
import SoIcon from '../icon/icon';

@observer
class ListItem extends PureComponent {


    static defaultProps = {
        icon: null,
        iconColor: Color.main,
        arrow: null,
        arrowColor: Color.gray3,
        arrowSize: 26,
        unit: null,
        title: null,
        text: null,
        arrowDirection: 'right',
        borderBottom: false
    }

    componentWillMount() {

    }

    render() {
        let {
            icon,
            arrowSize
        } = this.props;
        return (
            <View>
                <Flex jc='space-between'>
                    {icon ? <SoIcon height={arrowSize} width={arrowSize} type={icon}></SoIcon> : null}
                </Flex>
            </View>
        )
    }
}

export default ListItem