import React,{Component} from 'react';
import {StyleSheet,Text,View,TextInput, Button,TouchableOpacity, AsyncStorage} from 'react-native';
// import { Appbar } from 'react-native-paper';
import { createStackNavigator, createAppContainer } from 'react-navigation';  
import {Card ,ListItem} from 'react-native-elements';


export default class todo extends Component{

    arr=[]
    id=0
    state={
        
        text:'',
        item:[
            {id:1,data:'loading'}
        ]
        
    }
    storedata = async () =>{
        this.arr.push({id:this.id,data:this.state.text})
        this.id++;
        await AsyncStorage.setItem('mylist',JSON.stringify(this.arr))
        this.setState({
            item:JSON.parse( await AsyncStorage.getItem('mylist'))
        })
        
        console.log(this.state)
    }
    
     
    render(){
        if(this.state.item.length > 0){
            renderList = this.state.item.map(item => {
                return (
                    <Card key={item.id}>
                        <Text style={{width:200}}>{item.data}</Text>
                        {/* <ListItem
                            title={item.data}
                        /> */}
                        {/* <Text key={item.id}>{id,item.data}</Text> */}
                    </Card>
                )
            })
        }else{
            renderList =  <Text>No item</Text>
        }
        
        return(
            <View style={styles.container}>
            <View style={styles.main_container}>
            <TextInput
                style={styles.textInput}
                placeholder="enter your todo here"
                autoCapitalize='none'
                onChangeText={text=> this.setState({text})}
                value={this.state.text}

            />
        
            <TouchableOpacity 
            onPress={this.storedata}
            style={styles.addButton}>
                <Text style={{textAlign:'center'}}>ADD</Text>
            </TouchableOpacity>

            </View>
                
                {/* <Text>==> {this.state.item.data}</Text> */}
                <View>
                    {renderList}  
                </View>
                            
            </View>
        )
    }
}
const styles = StyleSheet.create({
    main_container:{
        marginBottom:50
    },
    container:{
        // flex:1,
        justifyContent:'center',
        alignItems:'center'

    },
    textInput:{
        width:300,
        height:50,
        // borderBottomColor:'blue',
        borderRadius:25,
        borderColor:'black',
        borderWidth:0.5,
        padding:10,
        // marginTop:20
        marginBottom:20
        
    },
    addButton:{
        position:'absolute',
        zIndex:11,
        right:-20,
        bottom:-60,
        backgroundColor:'#E91E63',
        width:70,
        height:70,
        borderRadius:50,
        alignItems:'center',
        justifyContent:'center',
        elevation:8,
    }
   
})
