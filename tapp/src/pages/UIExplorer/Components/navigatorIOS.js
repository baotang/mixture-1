
import React,{Component} from 'react';
import {
  AlertIOS,
  NavigatorIOS,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import  {DetailSection,DeatilLayout} from '../detailLayout';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  customWrapperStyle: {
    backgroundColor: '#bbdddd',
  },
  emptyPage: {
    flex: 1,
    paddingTop: 64,
  },
  emptyPageText: {
    margin: 10,
  },
  list: {
    backgroundColor: '#eeeeee',
    marginTop: 10,
  },
  group: {
    backgroundColor: 'white',
  },
  groupSpace: {
    height: 15,
  },
  line: {
    backgroundColor: '#bbbbbb',
    height: StyleSheet.hairlineWidth,
  },
  row: {
    backgroundColor: 'white',
    justifyContent: 'center',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#bbbbbb',
    marginLeft: 15,
  },
  rowNote: {
    fontSize: 17,
  },
  rowText: {
    fontSize: 17,
    fontWeight: '500',
  },
});
class EmptyPage extends Component{
    render(){
        return(
            <View style = {styles.emptyPage}>
                <Text style={styles.emptyPage}>
                    {this.props.text}
                </Text>
            </View>
        );
    }
}

class NavigatorIOSExamplePage extends React.Component {
  render() {
    var recurseTitle = 'Recurse Navigation';
    if (!this.props.depth || this.props.depth === 1) {
      recurseTitle += ' - more examples here';
    }
    return (
      <ScrollView style={styles.list}>
        <View style={styles.line}/>
        <View style={styles.group}>
          {this._renderRow(recurseTitle, () => {
            this.props.navigator.push({
              title: NavigatorIOSExample.title,
              component: NavigatorIOSExamplePage,
              backButtonTitle: 'Custom Back',
              passProps: {depth: this.props.depth ? this.props.depth + 1 : 1},
            });
          })}
          {this._renderRow('Push View Example', () => {
            this.props.navigator.push({
              title: 'Very Long Custom View Example Title',
              component: createExamplePage(null, ViewExample),
            });
          })}
          {this._renderRow('Custom title image Example', () => {
            this.props.navigator.push({
              title: 'Custom title image Example',
              titleImage: require('../img/relay.png'),
              component: createExamplePage(null, ViewExample),
            });
          })}
          {this._renderRow('Custom Right Button', () => {
            this.props.navigator.push({
              title: NavigatorIOSExample.title,
              component: EmptyPage,
              rightButtonTitle: 'Cancel',
              onRightButtonPress: () => this.props.navigator.pop(),
              passProps: {
                text: 'This page has a right button in the nav bar',
              }
            });
          })}
          {this._renderRow('Custom Left & Right Icons', () => {
            this.props.navigator.push({
              title: NavigatorIOSExample.title,
              component: EmptyPage,
              leftButtonTitle: 'Custom Left',
              onLeftButtonPress: () => this.props.navigator.pop(),
              rightButtonIcon: require('image!NavBarButtonPlus'),
              onRightButtonPress: () => {
                AlertIOS.alert(
                  'Bar Button Action',
                  'Recognized a tap on the bar button icon',
                  [
                    {
                      text: 'OK',
                      onPress: () => console.log('Tapped OK'),
                    },
                  ]
                );
              },
              passProps: {
                text: 'This page has an icon for the right button in the nav bar',
              }
            });
          })}
          {this._renderRow('Pop', () => {
            this.props.navigator.pop();
          })}
          {this._renderRow('Pop to top', () => {
            this.props.navigator.popToTop();
          })}
          {this._renderReplace()}
          {this._renderReplacePrevious()}
          {this._renderReplacePreviousAndPop()}
          {this._renderRow('Exit NavigatorIOS Example', this.props.onExampleExit)}
        </View>
        <View style={styles.line}/>
      </ScrollView>
    );
  }

  _renderReplace = () => {
    if (!this.props.depth) {
      // this is to avoid replacing the top of the stack
      return null;
    }
    return this._renderRow('Replace here', () => {
      var prevRoute = this.props.route;
      this.props.navigator.replace({
        title: 'New Navigation',
        component: EmptyPage,
        rightButtonTitle: 'Undo',
        onRightButtonPress: () => this.props.navigator.replace(prevRoute),
        passProps: {
          text: 'The component is replaced, but there is currently no ' +
            'way to change the right button or title of the current route',
        }
      });
    });
  };

  _renderReplacePrevious = () => {
    if (!this.props.depth || this.props.depth < 2) {
      // this is to avoid replacing the top of the stack
      return null;
    }
    return this._renderRow('Replace previous', () => {
      this.props.navigator.replacePrevious({
        title: 'Replaced',
        component: EmptyPage,
        passProps: {
          text: 'This is a replaced "previous" page',
        },
        wrapperStyle: styles.customWrapperStyle,
      });
    });
  };

  _renderReplacePreviousAndPop = () => {
    if (!this.props.depth || this.props.depth < 2) {
      // this is to avoid replacing the top of the stack
      return null;
    }
    return this._renderRow('Replace previous and pop', () => {
      this.props.navigator.replacePreviousAndPop({
        title: 'Replaced and Popped',
        component: EmptyPage,
        passProps: {
          text: 'This is a replaced "previous" page',
        },
        wrapperStyle: styles.customWrapperStyle,
      });
    });
  };

  _renderRow = (title: string, onPress: Function) => {
    return (
      <View>
        <TouchableHighlight onPress={onPress}>
          <View style={styles.row}>
            <Text style={styles.rowText}>
              {title}
            </Text>
          </View>
        </TouchableHighlight>
        <View style={styles.separator} />
      </View>
    );
  };
}

class NavigatorIOSExample extends React.Component {
  static title = '<NavigatorIOS>';
  static description = 'iOS navigation capabilities';
  static external = true;

  render() {
    const {onExampleExit} = this.props;
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: NavigatorIOSExample.title,
          component: NavigatorIOSExamplePage,
          passProps: {onExampleExit},
        }}
        tintColor="#008888"
      />
    );
  }
}
let examples = [
    {
        title:'<NavigatorIOS>',
        description:'iOS navigation capabilities',
        render:(navigator)=><NavigatorIOSExamplePage navigator={navigator} />
    }
];
class NavigatorIOSExplorer extends Component{
    constructor(props){
         super(props);
     }
     static propTypes = {
         title:React.PropTypes.string,
         navigator: React.PropTypes.object
     };
     
    render(){
        
        return(
            <DeatilLayout {...this.props}>
                {examples.map((obj,index)=>{
                    return (
                        <DetailSection key={index} {...obj} navigator={this.props.navigator}/>                       
                        );
                })}
            </DeatilLayout>
        );
    }
}
export {NavigatorIOSExplorer as NavigatorIOS};