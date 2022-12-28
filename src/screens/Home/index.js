import React, { Component }  from 'react';
import {View, StyleSheet, Text, TouchableOpacity, Image} from 'react-native';

class Home extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            isVisible: true,
            nama :'',
            alamat :'',
            listData :[],
            idEdit :null,
            showView: true,
        };
        this.url="http://10.0.2.2/api/api.php";
    }
    
    Hide_Splash_Screen = () => {
        this.setState({
            isVisible: false
        });
    }

    componentDidMount() {
        var that = this;
        setTimeout(function () {
            that.Hide_Splash_Screen();
        }, 2500);
        this.props.navigation.addListener('focus', () => {
            this.ambilListdata();
        });
    }

    async ambilListdata() {
        await fetch(this.url)
        .then((response) => response.json())
        .then((json)=>{
            if(JSON.stringify(json.data.result) == 'null') {
                console.log('data kosong');
                this.setState({showView: false});
            }else{
                console.log('data : '+JSON.stringify(json.data.result));
                this.setState({showView: true});
                this.setState({listData:json.data.result});
            }
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    async klikEdit(id){
        this.props.navigation.navigate('Edit Data', {id: id})
    }

    async klikDelete(id) {
        await fetch(this.url+"?op=delete&id="+id)
        .then((response)=>response.json())
        .then((json)=>{
            alert('Data berhasil di delete');
            this.ambilListdata();
        })
        .catch((error)=>{
            console.log(error);
        });
    }

    render() {
        let Splash_Screen = (
            <View style={style.SplashScreen_RootView}>
                <View style={style.SplashScreen_ChildView}>
                    <Image source={require('../logo.png')}
                    style={{
                        width: '80%',
                        height: '80%',
                        resizeMode: 'contain'
                    }} />
                </View>
            </View>   
        )
        
        return (
            <View style={style.viewWrapper}>
                <View style={style.viewHeader}>
                    <TouchableOpacity
                        onPress={()=>this.props.navigation.navigate('Tambah Data')}
                        style={style.btnTambah}>
                        <Text style={{color: 'white'}}>Tambah Data</Text>
                    </TouchableOpacity>
                </View>
                <View style={style.viewData}>
                    <Text style={{fontSize: 20, marginTop: 20, marginBottom: 15}}>Master Pegawai</Text>
                    {this.state.showView && (
                        this.state.listData.map((val,index)=>(
                        <View style={style.viewList} key={index}>
                            <Text style={style.textListNama}>{val.nama}</Text>
                            <Text style={style.textListNama}>{val.alamat}</Text>
                            <TouchableOpacity onPress={()=> this.klikEdit(val.id)} style={style.btnEdit}>
                                <Text style={{color: 'black'}}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.klikDelete(val.id)} style={style.btnHapus}>
                                <Text style={{color: 'white'}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                        ))
                    )}
                </View>
                {
                    (this.state.isVisible === true) ? Splash_Screen : null
                }
            </View>
        )
    }
}

const style = StyleSheet.create({
    SplashScreen_RootView: {
        justifyContent: 'center', flex: 1,
        position: 'absolute', width: '100%',
        height: '100%',
    },
    SplashScreen_ChildView: {
        ustifyContent: 'center', alignItems: 'center',
        flex: 1,
        backgroundColor: 'white'
    },    
    viewWrapper:{
        flex:1,
    },
    viewData:{
        padding:10
    },
    viewList:{
        flexDirection:'row',
        padding:5, 
        borderBottomWidth:1,
        borderBottomColor:'#dedede'
    },
    textListNama:{
        flex:3,
        fontSize:20,
        fontWeight:'bold'
    },
    btnEdit:{
        marginRight:10,
        padding: 10,
        backgroundColor: 'yellow',
        paddingVertical: 10,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    btnHapus:{
        padding: 10,
        backgroundColor: 'red',
        paddingVertical: 10,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
    btnTambah:{
        margin: 10,
        backgroundColor: '#0f97ff',
        paddingVertical: 10,
        width: 150,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'flex-end'
    },
});

export default Home;
