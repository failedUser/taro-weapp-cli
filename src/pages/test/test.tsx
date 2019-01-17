import Taro, { Component, Config } from '@tarojs/taro'
import { View, Button, Text } from '@tarojs/components'
import { observer, inject } from '@tarojs/mobx'
import { Flex, SoIcon, SoLabel, SoButton } from '../../components/yo-ui';
import SoColor from '../../components/yo-ui/color';
import './test.less'

type PageStateProps = {
    counterStore: {
        counter: number,
        increment: Function,
        decrement: Function,
        incrementAsync: Function
    }
}

interface test {
    props: PageStateProps;
}



@inject('counterStore')
@observer
class test extends Component {

    /**
     * 指定config的类型声明为: Taro.Config
     *
     * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
     * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
     * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
     */
    config: Config = {
        navigationBarTitleText: 'UI组件测试'
    }
    state = {
        direction: 'row',
        showList: []
    }

    componentWillMount() {
        Taro.showToast({
            title: '加载中',
            image: '/components/yo-ui/images/checkBox.png'
        })
    }
    isShow(type) {
        return this.state.showList.includes(type);
    }

    showSection(_type) {
        let type = _type.currentTarget.dataset.type;
        let _showList = [...this.state.showList] || [];
        if (this.isShow(type)) {
            _showList = _showList.filter(item => item !== type);
        } else {
            _showList.push(type);
        }
         this.setState({
             showList: _showList
         });
    }
    iconList = ['checkBox', 'choose', 'close', 'deleteIcon', 'label', 'location', 'radio', 'rightArrow', 'search', 'triangle'];


    labelClickHandle() {
        console.log('点击了label', this.state);
    }
    render() {
        return (
            <View className='index'>
                <View onClick={this.showSection.bind(this)} data-type = 'flex' className='section'>Flex组件</View>
                {
                    this.isShow('flex') ? 
                    (
                            <View className='transitionAll'>
                            <View className='sub-title' >默认样式</View>
                            <Flex direction={this.state.direction} >
                                <Text className='testText'></Text>
                                <Text className='testText'></Text>
                                <Text className='testText'></Text>
                            </Flex>
                            <View className='sub-title' >space-between</View>
                            <Flex justifyContent='space-between'>
                                <Text className='testText'></Text>
                                <Text className='testText'></Text>
                                <Text className='testText'></Text>
                            </Flex>
                            <View className='sub-title' >缩写space-between</View>
                            <Flex jc='space-between'>
                                <Text className='testText'></Text>
                                <Text className='testText'></Text>
                                <Text className='testText'></Text>
                            </Flex>
                            <View className='sub-title' >缩写flex-start</View>
                            <Flex jc='flex-start'>
                                <Text className='testText'></Text>
                                <Text className='testText'></Text>
                                <Text className='testText'></Text>
                            </Flex>
                            <View className='sub-title' >style</View>
                            <Flex styles={{'flex-direction': 'column'}} jc='flex-start'>
                                <Text className='testText'></Text>
                                <Text className='testText'></Text>
                                <Text className='testText'></Text>
                            </Flex>
                        </View>
                    ) : null
                }
                <View onClick={this.showSection.bind(this)} data-type='icon' className='section'>Icon组件</View>
                <Flex>
                    {
                        this.isShow('icon') ? this.iconList.map(el => {
                            return (
                                <View className='transitionAll' key={el}>
                                    <Flex jc='flex-start'  fd='column' styles={{
                                        width: '125px'
                                    }}>
                                        <SoIcon type={el}></SoIcon>
                                        <Text style={{ color: SoColor.gray2, 'font-size': '11px' }}>{el}</Text>
                                    </Flex>
                                    <Flex jc='flex-start' key={el} fd='column' styles={{
                                        width: '125px'
                                    }}>
                                        <SoIcon type={el} color={SoColor.main}></SoIcon>
                                        <Text style={{ color: SoColor.main, 'font-size': '11px'}}>main-color</Text>
                                    </Flex>
                                </View>
                            )
                        }):null
                    }
                </Flex>
                <View onClick={this.showSection.bind(this)} data-type='color' className='section'>Color组件</View>
                {
                    this.isShow('color') ? Object.keys(SoColor).map(el => {
                        return el.indexOf('Desc') < 0 ? (
                            <View key={el} 
                                className='transitionAll'
                            style={{
                                height: '40px',
                                background: SoColor[el],
                                color: 'white',
                                lineHeight: '40px'
                            }}>
                                <Flex jc="space-between" styles={{
                                    'padding-left': '20px',
                                    'padding-right': '20px'
                                }}>
                                    <Text style={{ 'font-size': '12px' }}>{el}--{SoColor[el]}</Text>
                                    <Text style={{'font-size': '12px'}}>{SoColor[`${el}Desc`]}</Text>
                                </Flex>
                            </View>
                        ) : null
                    }) : null
                }
                <View onClick={this.showSection.bind(this)} data-type='label' className='section'>Label组件</View>
                {
                    this.isShow('label') ? ['red', 'blue'].map(el => {
                        return (
                            <SoLabel key={el} text='Label' color={el} onClick={this.labelClickHandle.bind(this)} styles={{
                                'margin-right': '12px'
                            }}></SoLabel>
                        )
                    }) : null
                }
                <View onClick={this.showSection.bind(this)} data-type='button' className='section'>Button组件</View>
                {
                    this.isShow('button') ? 
                        <View class="test-buttons transitionAll">
                            <SoButton buttonStyle={{'margin-right': '10px', 'margin-bottom': '10px'}} type='primary' >primary</SoButton>
                            <SoButton buttonStyle={{ 'margin-right': '10px', 'margin-bottom': '10px' }} type='default '>default</SoButton>
                            <SoButton buttonStyle={{ 'margin-right': '10px', 'margin-bottom': '10px' }} size='md' type='primary' >primary</SoButton>
                            <SoButton buttonStyle={{ 'margin-right': '10px', 'margin-bottom': '10px' }} type='default' size='md'>default</SoButton>
                            <SoButton buttonStyle={{ 'margin-right': '10px', 'margin-bottom': '10px' }} size='lg' type='primary' >primary</SoButton>
                            <SoButton buttonStyle={{ 'margin-right': '10px', 'margin-bottom': '10px' }} type='default ' size='lg' >default</SoButton>
                            <SoButton buttonStyle={{ 'margin-right': '10px', 'margin-bottom': '10px' }} size='lg' type='border' >primary</SoButton>
                            <SoButton buttonStyle={{ 'margin-right': '10px', 'margin-bottom': '10px' }} type='border' size='sm' >default</SoButton>
                            <SoButton buttonStyle={{ 'margin-right': '10px', 'margin-bottom': '10px' }} size='lg' type='plain' >幽灵按钮</SoButton>
                            <SoButton buttonStyle={{ 'margin-right': '10px', 'margin-bottom': '10px' }} type='plain' size='sm' >幽灵按钮</SoButton>
                            <SoButton buttonStyle={{ 'margin-right': '10px', 'margin-bottom': '10px' }} disabled={true} type='primary' >disabled</SoButton>
                            <SoButton buttonStyle={{ 'margin-right': '10px', 'margin-bottom': '10px' }} disabled={true} type='default '>disabled</SoButton>
                            <SoButton buttonStyle={{ 'margin-right': '10px', 'margin-bottom': '10px' }} type='plain' size='lg' icon="rightArrow" >幽灵按钮</SoButton>
                            <SoButton buttonStyle={{'margin-right': '10px', 'margin-bottom': '10px'}} type='primary' siez='lg' icon="rightArrow" >primary</SoButton>
                        </View>
                        
                    : null
                }
            </View>

        )
    }
}

export default test
