import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Alert
} from 'react-native';
import MyStatusBar from './helper/MyStatusBar';
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
import { api } from '../utils/api';
import GDrive from "react-native-google-drive-api-wrapper";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        token: null
    }
    this.signIn = this.signIn.bind(this);
    this.getFile = this.getFile.bind(this);
  }
  async componentDidMount() {
    this._configureGoogleSignIn();
  }
  _configureGoogleSignIn() {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file','https://www.googleapis.com/auth/drive.appdata' , 'https://www.googleapis.com/auth/drive.metadata'],
      webClientId: '30070897701-bu6v9iqdnp370kd40f2uj00qbcvjivl6.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }
  getFile = async () => {
    api.setApiToken(this.state.token)
    api.getFile()
    .then((res) => {
      console.log(res);
    })
  }
  signIn = async () => {
    const { navigation } = this.props;
    try {
        await GoogleSignin.hasPlayServices();
        const userInfo = await GoogleSignin.signIn();
        
        const drive = await GoogleSignin.configure({
          scopes: ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.appdata', 'https://www.googleapis.com/auth/drive.metadata'],
          shouldFetchBasicProfile: true,
          webClientId: '30070897701-bu6v9iqdnp370kd40f2uj00qbcvjivl6.apps.googleusercontent.com',
          offlineAccess: true
        });
        const isSignedIn = await GoogleSignin.getTokens();
        console.log(isSignedIn);
        if(isSignedIn) {
            GDrive.setAccessToken(isSignedIn);
            GDrive.init();
            if(GDrive.isInitialized()) {
                this.setState({
                    token: isSignedIn.accessToken
                })
            }
        }
         // navigation.navigate("DriveDetails");
      } catch (error) {
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          // sign in was cancelled
          Alert.alert('cancelled');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          // operation in progress already
          Alert.alert('in progress');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          Alert.alert('play services not available or outdated');
        } else {
          Alert.alert('Something went wrong', error.toString());
        }
      }
    // navigation.navigate('DriveDetails');
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <React.Fragment>
          <MyStatusBar />
          <View style={styles.container}>
            <View style={styles.welcomeContainer}>
              <Text style={styles.welcomeText}>WELCOME TO DRIVE</Text>
            </View>
            <TouchableHighlight
              onPress={this.signIn}
              style={styles.driveButton}
              underlayColor={"#00aeef"}
            >
              <Text style={styles.driveButtonText}>Check Drive Content</Text>
            </TouchableHighlight>
            <TouchableHighlight
              onPress={this.getFile}
              style={styles.driveButton}
              underlayColor={"#00aeef"}
            >
              <Text style={styles.driveButtonText}>Check Drive Content</Text>
            </TouchableHighlight>
          </View>
      </React.Fragment>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  welcomeContainer: {
    marginBottom: 50
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  driveButton: {
    borderRadius: 10,
    width: 200,
    height: 50,
    backgroundColor: "#00aeef",
    justifyContent: 'center'
  },
  driveButtonText: {
    textAlign: 'center',
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold'
  }
});


