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
import {COLOR} from "../../../constants/theme";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLOR.WHITE,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileContainer: {
        alignSelf: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 40,
        marginBottom: 40,
    },
    wishListHeaderContainer: {
        alignSelf: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        marginTop: 20,
        marginLeft: 40,
        marginBottom: 40,
        marginRight:40,
    },
    nameContainer:{
        justifyContent: 'center',
        marginLeft:50,
    },
    nameText: {
        color: COLOR.BLACK,
        fontSize: 20,
    },
    icon: {
        width: 32,
        height: 32,
    },
});

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

    const source = userState.photoImage == null ? require("../../../../assets/person.png") : userState.photoImage;

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.profileContainer}>
                <Avatar source={source}/>
                <View style={styles.nameContainer}>
                    <Text style={styles.nameText}>{userState.mailAddress}</Text>
                </View>
            </View>
            <View style={styles.wishListHeaderContainer}>
                <Text style={{color:COLOR.BLACK}}>Wishlist</Text>
                <View style={{ flex: 1 }} />
                <IconButton name="plus-circle" fill="#8F9BB3" style={styles.icon} onPress={onPress}/>
            </View>
            <ScrollView style={{flex:1}}>
            </ScrollView>
        </SafeAreaView>
    )
}
