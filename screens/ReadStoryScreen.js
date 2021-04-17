import React from 'react'
import{Text,View,TouchableOpacity,StyleSheet, TextInput,Image} from 'react-native'
import * as Permissions from 'expo-permissions'
import {BarCodeScanner} from 'expo-barcode-scanner'
import * as firebase from 'firebase'
import db from '../config'

export default class BookTransactionScreen extends React.Component{
    constructor(){
        super();
        this.state={
            hasCameraPermissions:null,
            scanned:false,
            scannedBookId:'',
            scannedStudentId:'',
            buttonState:'normal'
        }
    }
    getCameraPermission=async()=>{
        const{status}=await Permissions.askAsync(Permissions.CAMERA)
        this.state=({
            hasCameraPermissions:status==="granted",
            buttonState:id,
            scanned:false
        })
    }
    handleBarCodeScanned=async({type,data})=>{
        const {buttonState} = this.state 
        if(buttonState==="BookId"){ 
            this.setState({ scanned: true, scannedBookId: data, buttonState: 'normal' }); } 
            else if(buttonState==="StudentId"){ 
                this.setState({ scanned: true, scannedStudentId: data, buttonState: 'normal' }); }
    }
    render(){
        const hasCameraPermissions=this.state.hasCameraPermissions
        const scanned=this.state.scanned
        const buttonState=this.state.buttonState
        if(buttonState!=="normal"&&hasCameraPermissions){
            return(
                <BarCodeScanner
                onBarCodeScanned={scanned ? undefined:this.handleBarCodeScanned}
                style={
                    StyleSheet.absoluteFillObject
                }
                />
            )
        }
        else if(buttonState==="normal"){
        return(
            <View style={styles.container}>
                <View>
                    <Image
                    source={require('../assets/bookLogo.jpg')}
                    style={{width:200,height:200}}/>
                    <Text styles={{textAllign:'center',fontSize:30}}>Wily</Text>
                </View>
                <View style={styles.inputView}>
                    <TextInput
                    style={styles.inputBox}
                    placeholder = "Book ID"
                value={this.state.scannedBookId}/>
                <TouchableOpacity
                
                style={styles.scanButton}
                    onPress={()=>{
                        this.getCameraPermission("BookId")
                    }}>
                   <Text style={styles.buttonText}>
                    Scan QR Code
                </Text> 
                </TouchableOpacity>

            </View>
            <View style={styles.inputView}>
                    <TextInput
                    style={styles.inputBox}
                    placeholder = "Student ID"
                value={this.state.scannedStudentId}/>
                <TouchableOpacity
                
                style={styles.scanButton}
                     onPress={()=>{
                        this.getCameraPermission("StudentId")
                    }}>
                   <Text style={styles.buttonText}>
                    Scan QR Code
                </Text> 
                </TouchableOpacity>
                </View>
            </View> 
        )
    }
}
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    displayText:{
        fontSize:15,
        textDecorationLine:'underline',
    },
    scanButton:{
        backgroundColor:'red',
        padding:10,
        margin:10,
    },
    buttonText:{
        fontSize:15,
        textAlign:'center',
        marginTop:10
    },
    inputView:{
        flexDirection:'row',
        margin:20
    },
    inputBox:{
        width:200,
        height:40,
        borderWidth:1.5,
        borderRightWidth:0,
        fontSize:20,
    },
    scanButton:{
        backgroundColor:'green',
        width:50,
        borderWidth:1.5,
        borderLeftWidth:0
    }
  });