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
        buttonStyle: {}, //自定义属性
        onClick: function() {}
    }
    constructor(props) {
        super();
    }
    state = {
        activeStyle: {}
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
    touchStart(e) {
        let { type, disabled, color } = this.props;
        if(disabled) return false;
        let { activeStyle } = this.state;
        switch(type) {
            case 'primary': activeStyle['opacity'] = 0.8; break;
            case 'default': 
            case 'border': 
                activeStyle['background'] = color;
                activeStyle['color'] = '#fff';
                break;
        }
        this.setState({
            activeStyle: {...activeStyle}
        });
    }
    touchEnd() {
        setTimeout(() => {
            this.setState({
                activeStyle: {...{}}
            });
        }, 100)
    }

    render() {
        let {
            buttonStyle,
            buttonTextStyle,
            icon = '',
            size,
            borderRadius,
            onClick
        } =  this.props;
        return (
            <View 
                style={{
                    'border-radius': borderRadius + 'rpx',
                    ...this.compuedButtonStyle.call(this) ,
                    ...buttonStyle,
                    ...this.state.activeStyle
                }} 
                className={this.classesView.call(this)}
                onTouchStart={this.touchStart.bind(this)}
                onTouchEnd={this.touchEnd.bind(this)}
                onClick={onClick}
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