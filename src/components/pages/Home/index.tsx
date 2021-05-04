import React from "react";
import {Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View} from "react-native";
import {State} from "../../molecules/Wish";
import {useNavigation} from "@react-navigation/native";
import {Avatar} from "../../atoms";
import {WishList} from "../../organisms";
import {DETAIL, INPUT} from "../../../constants/path";
import {IconButton} from "../../molecules";
import {ArrayState} from "../../organisms/WishList";
import {UserContext} from "../../../contexts";

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

const avatar = require('../../../../assets/person.png');

export interface Props {
    wishList:ArrayState;
}

export default function Home(props:Props) {
    const {userState} = React.useContext(UserContext);
    const {wishList} = props;

    const {navigate} = useNavigation();
    const onPress = React.useCallback(() => {
        navigate(INPUT)
    },[navigate]);
    const gotoDetail = React.useCallback((state:State) => {
        navigate(DETAIL,state);
    },[navigate]);

    if(!userState){
        return null;
    }

    const source = userState.photoUrl == null ? require("../../../../assets/person.png") : userState.photoUrl;

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.imageIconContainer}>
                <Avatar source={source}/>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>sample</Text>
                </View>
            </View>
            <IconButton name="plus-circle" fill="#8F9BB3" style={styles.icon} onPress={onPress}/>
            <ScrollView style={{flex:1}}>
                <WishList wishList={wishList} gotoDetail={gotoDetail}/>
            </ScrollView>
        </SafeAreaView>
    )
}
