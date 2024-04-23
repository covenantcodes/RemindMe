import { Pressable, StyleSheet, Text, View } from 'react-native'
import { OnboardingData } from '../data/data'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { Colors } from 'react-native/Libraries/NewAppScreen';

type Props = {
    data: OnboardingData[];
    screenWidth: number;
}

const RADIUS = 100

const iconColor: string =  '#fcb7d7'

const Button = ({data, screenWidth}:Props) => {
  return (
    <Pressable style={styles.button}  onPress={() => {
      console.log('Pressed')
    }}>  
      <FontAwesomeIcon icon={faChevronRight as IconProp} color={iconColor}/>
    </Pressable>
  )
}


const styles = StyleSheet.create({
    button: {
        position: 'absolute',
        backgroundColor: 'white',
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