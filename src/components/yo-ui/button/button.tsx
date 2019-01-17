import Taro, { Component, Config, PureComponent } from '@tarojs/taro'
import { View, Button, Text, Image } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import Color from '../color';
import SoIcon from '../icon/icon';
import './button.less'

@observer
class SoButton extends PureComponent {

    typeMap = ['primary', 'default', 'plain', 'auto'];
    sizeMap = ['sm', 'md', 'lg'];
    static defaultProps = {
        type: 'primary', //['primary', '']
        border: true,
        icon: null,
        disabled: false,
        size:'sm',
        color: Color.main,
        buttonTextStyle: {},
        borderRadius: 8,
        buttonStyle: {} //自定义属性
    }
    constructor(props) {
        super();
    }
    componentWillMount() {

    }
    
    iconSize = {
        height: {
            sm: 16,
            md: 17,
            lg: 20
        },
        width: {
            sm: 16,
            md: 17,
            lg: 20
        }
    }
    classesView() {
        let { size, type, color, disabled, border } = this.props;
        let classNames = ['so-button'];
        size && classNames.push(`so-button-${size}`);
        if (disabled) {
            classNames.push('so-button-disabled');
        } else {
            type && classNames.push(`so-button-${type}`)
            border && classNames.push(`so-button-border`)
        }
        return classNames.join(' ');
    }

    classesText() {
        let { disabled } = this.props;
        let classNames = ['so-button-text'];
        if (disabled) {
            classNames.push('so-button-text-disabled');
        }
        return classNames.join(' ');
    }

    compuedButtonStyle() {
        let { disabled, type, color  } = this.props;
        let style = {};
        if (disabled) {
            return style;
        }
        switch(type) {
            case 'primary': style['background'] = Color.main;break;
            case 'border': 
                style['background'] = '#fff';
                style['color'] = color;
                style['border-color'] = color;
                break;
            case 'plain': style['border'] = 'none'; break;
        }
        return style;
    }

    render() {
        let {
            buttonStyle = {},
            buttonTextStyle = {},
            icon = '',
            size,
            borderRadius
        } =  this.props;
        return (
            <View 
                style={{
                    'border-radius': borderRadius + 'rpx'
                    ...this.compuedButtonStyle.call(this) 
                    ...buttonStyle}} 
                className={this.classesView.call(this)}
            >
                <Text 
                    style={{ 
                        ...buttonTextStyle }} 
                    className={this.classesText.call(this)} 
                >{this.props.children}</Text>
                {
                    icon ? <SoIcon height={this.iconSize.height[size]} width={this.iconSize.width[size]}  type={icon}></SoIcon> : null
                }
            </View>
        )
    }
}

export default SoButton