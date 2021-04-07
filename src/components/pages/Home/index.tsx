import React from "react";
import {Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {Avatar} from "../../atoms";
import {WishList} from "../../organisms";
import Icon from "react-native-vector-icons/FontAwesome";
import {INPUT} from "../../../constants/path";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageIconContainer: {
        justifyContent: 'flex-start',
        flexDirection:'row',
        marginTop: 20,
        marginBottom: 40,
    },
    nameContainer:{
        justifyContent: 'center',
        marginLeft:30,
    },
    nameText: {
        color: 'black',
        fontSize: 20,
    },
});

const state = {
    list:[0,1,2,3,4,5,6,7,8,9]
};

const avatar = require('../../../../assets/person.png');

export default function Home() {
    const {navigate} = useNavigation();
    const onPress = React.useCallback(() => {
        navigate(INPUT)
    },[navigate]);

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.imageIconContainer}>
                <Avatar source={avatar}/>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>sample</Text>
                </View>
            </View>
            <ScrollView>
                <WishList list={state.list}/>
            </ScrollView>
            <Pressable onPress={onPress}>
                <Icon color="BLACK" size={24} name="plus"/>
            </Pressable>
        </SafeAreaView>
    )
}
