import React, {useState} from "react";
import {FlatList, Image, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {Avatar} from "../../atoms";
import Wish from "../../molecules/Wish";

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    imageIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 40,
    },
    nameText: {
        color: 'black',
        fontSize: 20,
        marginTop: 5,
    },
});

const state = {
    list:[0,1,2,3,4,5,6,7,8,9]
};

const avatar = require('../../../../assets/person.png');

export default function Home() {

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.imageIconContainer}>
                <Avatar source={avatar}/>
                <Text style={styles.nameText}>sample</Text>
            </View>
            <ScrollView>
                <FlatList
                    data={state.list}
                    numColumns={2}
                    renderItem={ ({ item, index }) => (<Wish index={index} uri="https://source.unsplash.com/random'" />
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    )
}
