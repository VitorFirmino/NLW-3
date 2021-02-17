import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { View, Text, StyleSheet } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'


export type HeaderProps = {
    showCancel?: boolean
    title: React.ReactText
}

const Header: React.FC<HeaderProps> = ({ title, showCancel = true }) => {
    const navigation = useNavigation()

    const handleGoBackToHomePage = () => navigation.navigate('OrphanagesMap')

    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack}>
                <Feather name='arrow-left' size={24} color='#15B6D6' />
            </BorderlessButton>

            <Text style={styles.title}>{title}</Text>

            { showCancel ? (
                <BorderlessButton onPress={handleGoBackToHomePage}>
                    <Feather name='x' size={24} color='#FF669D' />
                </BorderlessButton>
            ) : <View style={{ height: 24, width: 24 }} /> }
        </View>
    )
}

const styles = StyleSheet.create({
container: {
    padding: 24,
    paddingTop: 44,

    borderBottomWidth: 1,
    backgroundColor: '#f9fafc',
    borderColor: '#dde3f0',
    

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
},
title: {
    fontSize: 16,
    color: '#8fa7b3',
    fontFamily: 'nunito600'
},
});

export default Header;
