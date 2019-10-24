import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Modal } from 'react-native';
import MyStatusBar from './helper/MyStatusBar';

export default class DriveDetails extends Component {
    constructor(props) {
      super(props);
      this.state = {
        isVisible: false
      }
    }
    renderDropDown() {
      const { isVisible } = this.state;
      const buttonArray = [
        {
            name: 'chicken',
            value: '5000'
        },
        {
            name: 'egg',
            value: '3000'
        }
    ];
      return (
          <View style={styles.DropDown}>
            <Modal visible={true} transparent={true} onRequestClose={() => console.log('close')}>
              <View style={styles.DropDownListContainer}>
                <Text style={styles.SelectText}>Please Select From DropDown</Text>
                {
                  buttonArray && buttonArray.map(item => (
                    <TouchableHighlight style={styles.SelectOption} key={item.name}>
                      <Text style={styles.Select}>{item.name}</Text>
                    </TouchableHighlight>
                  ))
                }
                <TouchableHighlight style={styles.CancelButton} >
                    <Text>Cancel</Text>
                </TouchableHighlight>
              </View>
            </Modal>
          </View>
      )
    }
    render() {
      const { isVisible } = this.state;
        return (  
            <React.Fragment>
              <MyStatusBar />
              <View style={styles.container}> 
                <TouchableHighlight 
                  style={styles.appFolder}
                  underlayColor={"lightgray"}
                  onPress={(prevState) => {this.setState({ isVisible: !prevState.isVisible})}}
                >
                  <Text style={styles.navigationText}>ReactNavigationAPP</Text>
                </TouchableHighlight>
                <View>
                {isVisible && isVisible ? 
                  this.renderDropDown() :
                  <Text>''</Text>
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
      fontSize: 12,
      color: 'black'
    },
    SelectOption: {
      paddingTop: 4,
      paddingBottom: 4,
      alignItems: 'center'
    },
    Select: {

    },
    CancelButton: {

    },
    Cancel: {
      fontSize: 13,
      color: 'lightgray'
    }
})