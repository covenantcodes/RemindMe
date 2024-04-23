import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { OnboardingData } from '../data/data'
import Arrow from '../assets/icon/Arrow.svg'

type Props = {
    data: OnboardingData[];
     screenWidth: number;
}

const RADIUS = 100

const Button = ({data, screenWidth}:Props) => {
  return (
    <View style={styles.button}>  
      <Text>Button</Text>
    </View>
  )
}


const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        backgroundColor: 'orange',
        width: RADIUS,
        height: RADIUS,
        bottom: 100,
        alignSelf: "center",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RADIUS,
    }
})

export default Button