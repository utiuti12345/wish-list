import React from "react";
import {Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {State} from "../../molecules/Wish";
import {useNavigation} from "@react-navigation/native";
import {Avatar} from "../../atoms";
import {WishList} from "../../organisms";
import {INPUT} from "../../../constants/path";
import {IconButton} from "../../molecules";

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
    icon: {
        width: 32,
        height: 32,
    },
});

const state = {
    list:[0,1,2,3,4,5,6,7,8,9]
};

const avatar = require('../../../../assets/person.png');

export interface Props {
    wishList:[];
}

const data:Array<State> = [
    {
        id:"12345",
        title:"トレーニングウエア ソックス",
        imageUrl:"https://images-na.ssl-images-amazon.com/images/P/B01BM6FQQS.09.MZZZZZZZ",
    },
    {
        id:"12345",
        title:"トレーニングウエア ソックス",
        imageUrl:"https://images-na.ssl-images-amazon.com/images/P/B01BM6FQQS.09.MZZZZZZZ",
    },
]

export default function Home() {
    //const {wishList} = props;

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
            <IconButton name="plus-circle" fill="#8F9BB3" style={styles.icon} onPress={onPress}/>
            <ScrollView style={{flex:1}}>
                <WishList wishList={data}/>
            </ScrollView>
        </SafeAreaView>
    )
}
