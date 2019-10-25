import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, TouchableOpacity,Modal } from 'react-native';
import MyStatusBar from './helper/MyStatusBar';
import { api } from '../utils/api';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';

export default class DriveDetails extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isVisible: false,
        file: null,
        DropDown: [],
        isVisibleContent: false,
        DropDownContent: []
      }
    }
    componentDidMount() {
      const { navigation } = this.props;
      const token = GoogleSignin.getTokens()
      .then((res) => {
        api.setApiToken(res.accessToken)
        api.getFile("1QHiLM0oX9c4vW-DpAeJ2tEaW9q7FPDvp")
        .then((res) => {
          this.setState({
            file: {name: res.name, id: res.id}
          })
        })
      })
    }
    getDropDownList() {
      const token = GoogleSignin.getTokens()
      .then((res) => {
        api.setApiToken(res.accessToken)
        api.getChildFolder(this.state.file.id)
        .then((res) => {
          res.map(res => {
            api.getFile(res.id)
            .then((res) => {
              this.setState({
                DropDown: [...this.state.DropDown,{name: res.name, id: res.id}],
              })
            })
          })
          this.setState({
            isVisible: true
          })
        })
      })
    }
    truncatetable() {
      this.setState({DropDownContent: [] })
    }
    getContentList(id) {
      console.log('hii')
      const token = GoogleSignin.getTokens()
      .then((res) => {
        api.setApiToken(res.accessToken)
        api.getChildFolder(id)
        .then((res) => {
          res.map(res => {
            api.getFile(res.id)
            .then((res) => {
              this.setState({
                DropDownContent: [...this.state.DropDownContent,{name: res.name, id: res.id}],
              })
            })
          })
        })
      })
    }
    renderDropDown() {
      const { isVisible, DropDown } = this.state;
      return (
          <View style={styles.DropDown}>
            <Modal visible={true} transparent={true} onRequestClose={() => console.log('close')}>
              <View style={styles.DropDownListContainer}>
                <Text style={styles.SelectText}>Please Select From DropDown</Text>
                {
                  DropDown && DropDown.map(item => (
                    <TouchableOpacity 
                    style={styles.SelectOption} 
                    key={item.id}
                    onPress={this.getContentList.bind(this, item.id)}
                    >
                      <Text style={styles.Select}>{item.name}</Text>
                    </TouchableOpacity>
                  ))
                }
                <TouchableHighlight style={styles.CancelButton} onPress={this.truncatetable.bind(this)} >
                    <Text>Cancel</Text>
                </TouchableHighlight>
              </View>
            </Modal>
          </View>
      )
    }
    renderContent() {
      const { isVisibleContent, DropDownContent } = this.state;
      return (
          <View style={styles.ContentDropDown}>
            <Modal visible={true} transparent={true} onRequestClose={() => console.log('close')}>
              <View style={styles.ContentDropDownListContainer}>
                {
                  DropDownContent && DropDownContent.map(item => (
                      <Text style={styles.ContentSelect} key={item.id}>{item.name}</Text>
                  ))
                }
              </View>
            </Modal>
          </View>
      )
    }
    render() {
      const { isVisible , file, isVisibleContent, DropDownContent} = this.state;
        return (  
            <React.Fragment>
              <MyStatusBar />
              <View style={styles.container}> 
                {file != null ? 
                  <TouchableHighlight 
                    style={styles.appFolder}
                    underlayColor={"lightgray"}
                    onPress={this.getDropDownList.bind(this)}
                  >
                    <Text style={styles.navigationText}>{file.name}</Text>
                  </TouchableHighlight> : null
                }
                <View>
                {isVisible && isVisible ? 
                  this.renderDropDown() :
                  null
                }
                </View>
                <View>
                {DropDownContent && DropDownContent.length > 0 ? 
                  this.renderContent() :
                  null
                }
                </View>
              </View>
            </React.Fragment>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    appFolder: {
      marginTop: 20,
      borderWidth: 1,
      width: 200,
      height: 40,
      justifyContent: 'center'
    },
    navigationText: {
      fontSize: 15,
      textAlign: 'center'
    },
    DropDown: {
      marginTop: 10
    },
    DropDownModal: {

    },
    DropDownListContainer: {
      position: 'absolute',
      top: 200,
      right: 20,
      left: 20,
      alignItems: 'center',
      marginBottom: 20
    },
    SelectText: {
      fontSize: 16,
      color: 'lightgray'
    },
    SelectOption: {
      marginTop: 5,
      paddingTop: 4,
      paddingBottom: 4,
      alignItems: 'center',
      height: 35,
      width: 200,
      borderWidth: 1,
    },
    Select: {

    },
    CancelButton: {

    },
    Cancel: {
      fontSize: 13,
      color: 'lightgray'
    },
    ContentDropDown: {
      marginBottom: 20,
    },
    ContentDropDownListContainer: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      left: 20,
      alignItems: 'center',
      marginBottom: 20
    },
    ContentSelect: {

    },
    ContentCancelButton: {

    }
})