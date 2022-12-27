import React, { Component }  from 'react';
import {View, StyleSheet, Text, TouchableOpacity, TextInput, Pressable, Alert} from 'react-native';

class Input extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            isVisible: true,
            nama :'',
            alamat :'',
            listData :[],
            idEdit :null,
        };
        this.url="http://10.0.2.2/api/api.php";
    }

    kliksimpan() {
        console.log('Loading Simpan Data....');
        if(this.state.nama == '' || this.state.alamat =='') {
            alert('Silahkan masukkan nama dan alamat');
        }else{
            console.log("nama : " +this.state.nama);
            console.log("alamat : " +this.state.alamat);
        
            var urlAksi = this.url+"?op=create";
    
            fetch(urlAksi,{
                method:'post',
                headers:{
                'Content-Type':'application/x-www-form-urlencoded'
                },
                body:"nama="+this.state.nama+"&alamat="+this.state.alamat
            })
            .then((response)=>response.json())
            .then((json)=>{
                this.setState({nama:''});
                this.setState({alamat:''});
                this.props.navigation.navigate('Halaman Utama')
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }

    render() {
        return (
            <View style={style.viewWrapper}>
                <View style={style.viewForm}>
                    <TextInput 
                        style={style.textInput}
                        placeholder="Masukkan nama" 
                        value={this.state.nama} 
                        onChangeText={(text)=>this.setState({nama:text})}></TextInput>
                    <TextInput 
                        style={style.textInput}
                        placeholder="Masukkan alamat"
                        value={this.state.alamat} 
                        onChangeText={(text)=>this.setState({alamat:text})}></TextInput>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={style.btnBatal} onPress={()=>this.props.navigation.navigate('Halaman Utama')}>
                            <Text style={style.text}>Batal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={style.btnSimpan} onPress={()=>this.kliksimpan()}>
                            <Text style={style.text}>Simpan Data</Text>
                        </TouchableOpacity>
                    </View>
                </View>
          </View>
        )
    }
}

const style = StyleSheet.create({
    viewWrapper:{
        flex:1,
    },
    viewForm:{
        padding:10
    },
    textInput:{
        padding:10,
        fontSize:15,
        borderRadius:15, 
        borderWidth:1,
        borderColor:'#CCCCCC',
        marginBottom:10,
        backgroundColor:'#dedede'
    },
    btnSimpan: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: '#0f97ff',
    },
    btnBatal: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        backgroundColor: 'lightcoral',
        marginRight: 10
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});

export default Input;