import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Alert, TextInput, TouchableOpacity, AsyncStorage, Text } from 'react-native';
import api from '../services/api';

export default function Book({ navigation }){

    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spot/${id}/bookings`, {

            date
        },{
            headers: { user_id }
        })

        Alert.alert('Solicitação de reserva enviada.');

        navigation.navigate('List');
    }

    function handleCancel(){
        navigation.navigate('List');
    }
    
    return (
    
    <SafeAreaView style={styles.container}>
        <Text style={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput 
                style={styles.input}
                placeholder="Qual data você quer reservar?"
                placeholderTextColor="#999"
                autoCapitalize="words"
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
        
        <TouchableOpacity onPress={handleSubmit} style={styles.button}>
            <Text style={styles.buttontext}>Solicitar reserva</Text>   
        </TouchableOpacity>

        <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
            <Text style={styles.buttontext}>Cancelar</Text>   
        </TouchableOpacity>
    </SafeAreaView>

    );
}

const styles = StyleSheet.create({

    container:{
        marginTop: 300,
        margin: 30
    },

    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
    },

    input: {
        borderWidth: 1,
        borderColor:'#ddd',
        paddingHorizontal: 30,
        fontSize: 16,
        color: '#444',
        height: 44,
        marginBottom: 15,
        borderRadius: 2
    },

    button: {
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 60,
        borderRadius: 2,
        marginBottom: 5
    },

    cancelButton: {
        backgroundColor: '#ccc'
    },

    buttontext: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16,
    },
});