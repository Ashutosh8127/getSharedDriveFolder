import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator,TouchableHighlight, TouchableOpacity, Modal , FlatList} from 'react-native';
import MyStatusBar from './helper/MyStatusBar';
import { api } from '../utils/api';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { inject, observer } from "mobx-react";

@inject('DriveStore')
@observer
export default class DriveDetails extends Component {
    constructor(props) {
      super(props);
      
    }
    componentDidMount() {
      const { DriveStore } = this.props;
       // for start the activityindicatr
      DriveStore.isRenderLoading(true);
      const token = GoogleSignin.getTokens()
      .then((res) => {
        //api token set for api call
        api.setApiToken(res.accessToken)
        api.getFile("1QHiLM0oX9c4vW-DpAeJ2tEaW9q7FPDvp")
        .then((res) => {
          DriveStore.addFile({name: res.name, id: res.id})
           // for stop the activityindicatr
          DriveStore.isRenderLoading(false);
        })
      })
    }
    
    getDropDownList() {
      const { DriveStore } = this.props;
       // for rendering the activityindicatr
      DriveStore.isRenderLoading(true);
      const token = GoogleSignin.getTokens()
      .then((res) => {
        api.setApiToken(res.accessToken)
        api.getChildFolder(DriveStore.file.id)
        .then((res) => {
          res.map(res => {
            api.getFile(res.id)
            .then((res) => {
              DriveStore.addDropDownList({name: res.name, id: res.id})
              // for stop the activityindicatr
              DriveStore.isRenderLoading(false);
            })
          })
        })
      })
      DriveStore.isVisible();
    }
    //child component child list 
    getContentList(id) {
      const { DriveStore } = this.props;
      // for rendering the activityindicatr
      DriveStore.isRenderLoading(true);
      DriveStore.DropDownContent.clear();
      const token = GoogleSignin.getTokens()
      .then((res) => {
        //api token set for api call
        api.setApiToken(res.accessToken)
        //drive api call
        api.getChildFolder(id)
        .then((res) => {
          res.map(res => {
            //get drive folder name by id
            api.getFile(res.id)
            .then((res) => {
              //set the data
              DriveStore.addDropDownContent({name: res.name, id: res.id})
              // for stop the activityindicatr
              DriveStore.isRenderLoading(false);
            })
          })
        })
      })
    }
    //loading children folder name
    renderDropDown() {
      const { DriveStore } = this.props
      const DropDown = DriveStore.DropDown;
      return (
          <View style={styles.DropDown}>
            <Modal visible={true} transparent={true} onRequestClose={() => console.log('close')}>
              <View style={styles.DropDownListContainer}>
                <Text style={styles.SelectText}>Please Select Folder</Text>
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
              </View>
            </Modal>
          </View>
      )
    }
    backOnHome() {
      const { navigation } = this.props;
      navigation.navigate("Home");
    }
    render() {
      const { DriveStore } = this.props
      const file = DriveStore.file;
      const isVisibleDropdown = DriveStore.isVisibleDropdown;
      const isVisibleContent = DriveStore.DropDownContent.length > 0 ? true : false;
      var showLoading = (
        DriveStore.isLoading ?
        (
        <ActivityIndicator
          animating={DriveStore.isLoading}
          size={'large'}
          color='#00aeef'
        />
        ) :
        null
      );
        return (  
            <React.Fragment>
              <MyStatusBar />
              <View style={{ height: 30, backgroundColor: '#00aeef', paddingLeft: 20}}>
                <TouchableHighlight 
                  onPress={this.backOnHome.bind(this)}
                  style={{width: 100}}
                >
                  <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'white'}}>Back</Text>
                </TouchableHighlight>
              </View>
              
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
                {isVisibleDropdown ? 
                  this.renderDropDown() :
                  null
                }
                </View>
                <View style={{justifyContent: 'center'}}> 
                  {showLoading}
                </View>
                {isVisibleContent ?
                  <View style={styles.ContentDropDownListContainer}>
                    <Text style={styles.SelectText} >Available Child Content</Text>
                    <FlatList
                      data={DriveStore.DropDownContent}
                      renderItem={({item, index}) => (
                          <View style={{margin: 5,height: 35, borderBottomWidth: 1, width: 200, justifyContent: 'center'}} key={index}>
                            <Text style={styles.ContentSelect} >{item.name}</Text>
                          </View>
                        )
                      }
                      keyExtractor={item => item.id}
                    />
                  </View>
                  :
                  null
                }
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
      top: 150,
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
      paddingTop: 300,
      alignItems: 'center',
    },
    ContentSelect: {
      textAlign: 'center'
    },
    ContentCancelButton: {

    }
})