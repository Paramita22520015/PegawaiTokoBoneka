import React, { Component } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { style } from './Style';


class Depan extends Component {
    constructor(props){
        super(props);
        this.state ={
            nama :'',
            alamat :'',
            listData :[],
            idEdit :null,
        };
        this.url="http://10.0.2.2/api/api.php";
    }

    componentDidMount() {
        this.ambilListdata()
    }

    async ambilListdata() {
        await fetch(this.url)
        .then((response) => response.json())
        .then((json)=>{
            console.log('Hasil yang didapat: '+JSON.stringify(+json.data.result));
            this.setState({listData:json.data.result});
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    kliksimpan() {
        console.log('Loading Simpan Data....');
        if(this.state.nama == '' || this.state.alamat =='') {
            alert('Silahkan masukkan nama dan alamat');
        }else{
            console.log("nama : " +this.state.nama);
            console.log("alamat : " +this.state.alamat);

            if(this.state.idEdit){
                var urlAksi = this.url+"?op=update&id="+this.state.idEdit;
            }else{
                var urlAksi = this.url+"?op=create";
            }

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
                this.ambilListdata();
            })
            .catch((error)=>{
                console.log(error);
            })
        }
    }
    
    async klikEdit(id){
        await fetch (this.url+"?op=detail&id="+id)
        .then((response)=>response.json())
        .then((json)=>{
            this.setState({nama:json.data.result[0].nama});
            this.setState({alamat:json.data.result[0].alamat});
            this.setState({idEdit:id});
        }
        ) ;
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
        })
    }
    
    render (){
        return (
            <View style={style.viewWrapper}>
                <View style={style.viewData}>
                    {
                        this.state.listData.map((val,index)=>(
                            <View style={style.viewList} key={index}>
                               <Text style={style.textListNama}>{val.nama}</Text>
                                <Text style={style.textListNama}>{val.alamat}</Text>
                                <Text style={style.textListEdit} onPress={()=> this.klikEdit(val.id)}>Edit </Text>
                                <Text style={style.testListDelete} onPress={()=>this.klikDelete(val.id)}>Delete</Text>
                            </View>
                        ))
                    }
                    </View>
                <View style={style.viewForm}>
                    <TextInput 
                        style={style.TextInput}
                        placeholder="Masukkan nama" 
                        value={this.state.nama} 
                        onChangeText={(text)=>this.setState({nama:text})}></TextInput>
                    <TextInput 
                        style={style.TextInput}
                        placeholder="Masukkan alamat"
                        value={this.state.alamat} 
                        onChangeText={(text)=>this.setState({alamat:text})}></TextInput>
                    <Button title = "Masukkan Data" onPress={()=>this.kliksimpan()}></Button>
                </View>
            </View>
        );
    }

}

export default Depan;