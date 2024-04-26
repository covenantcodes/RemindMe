import {AnimationObject} from 'lottie-react-native';

export interface OnboardingData {
  id: number;
  animation: AnimationObject;
  text: string;
  textColor: string;
  backgroundColor: string;
  animationBg: string;
}

const data: OnboardingData[] = [
  {
    id: 1,
    animation: require('../../assets/animations/Animation1.json'),
    text: 'Give Procastination a Blow \n Use RemindMe to Stay on Track',
    textColor: '#ffffff',
    backgroundColor: '#B95F89',
    animationBg: '#ffffff',
  },
  {
    id: 2,
    animation: require('../../assets//animations/Animation2.json'),
    text: 'Stay Organized with RemindMe',
    textColor: '#000000',
    backgroundColor: '#fcb7d7',
    animationBg: '#67AAF9',
  },
  {
    id: 3,
    animation: require('../../assets//animations/Animation3.json'),
    text: 'Set Up your Schedule and Get the Free Time you deserve',
    textColor: '#ffffff',
    backgroundColor: '#003cc9',
    animationBg: '#fcb7d7',
  },
];

export default data;