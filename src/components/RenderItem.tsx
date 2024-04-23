import { StyleSheet, View, Text } from 'react-native'
import React from 'react'
import { OnboardingData } from '../data/data'
import LottieView from 'lottie-react-native';

type Props = {
    item: OnboardingData;
    index: number;
}

const RenderItem = ({item, index}: Props) => {
  return (
    <View style={[styles.itemContainer, {backgroundColor:item.backgroundColor}]}>
      <View style={[styles.animationContainer, {backgroundColor: item.animationBg}]}>
        <LottieView
          source={item.animation}
          autoPlay
          loop
          renderMode='HARDWARE'
          style={styles.animation}
        />
      </View>
      <Text style={[styles.itemText, {color: item.textColor}]}>{item.text}</Text>
    </View>
  )
}

export default RenderItem

const styles = StyleSheet.create({
    itemContainer:{
        flex: 1,
        alignItems: 'center',
        paddingTop: 150
    },

    itemText:{
        textAlign: 'center',
        fontSize: 44,
        fontWeight: 'bold',
        marginTop: 40,
        marginBottom: 10,
        marginHorizontal: 20
    },

    animationContainer:{
        borderRadius: 40,
        overflow: 'hidden', 
    },

    animation:{
        width: 200,
        height: 200
    }
})