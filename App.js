import React, {useState, useEffect} from 'react'

import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import Torch from 'react-native-torch';
import RNShake from 'react-native-shake';

import imageon from './assets/icons/eco-light.png';
import imageoff from './assets/icons/eco-light-off.png';
import imageDioWhite from './assets/icons/logo-dio-white.png';
import imageDio from './assets/icons/logo-dio.png';

const App = () => {
  const [toggle, setToggle] = useState(false); //false
  const handleChangeToggle = () => setToggle(oldToggle => !oldToggle);

  useEffect(() =>{
    // liga flash do celular
    Torch.switchState(toggle);
  }, [toggle]);

  useEffect(() =>{
    /**
     * Quando o celular for balançado, mudaremos o toggle
     */
    const subscription = RNShake.addListener(() => {
      setToggle(oldToggle => !oldToggle);
    });
    // Essa função será chamada quando o componente
    // For ser desmontado
    return ()=> subscription.remove();
  }, []);

  return <View style= {toggle ? style.containerLight : style.container}>
   <TouchableOpacity onPress= {handleChangeToggle}>

    <Image style={toggle ? style.lightingOn : style.lightingOff}
    source={
      toggle ? imageon : imageoff}
      />
        <Image style={style.dioLogo}
    source={
      toggle ? imageDio : imageDioWhite}
      />
      </TouchableOpacity>
    </View>;
}

export default App;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems:'center',
    justifyContent: 'center',
  },

  containerLight: {
    flex: 1,
    backgroundColor: 'white',
    alignItems:'center',
    justifyContent: 'center',
  },

  lightingOn:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 150,
    height: 150,
  },

  lightingOff:{
    resizeMode: 'contain',
    alignSelf: 'center',
    tintColor: 'white',
    width: 150,
    height: 150,
  },
  
  dioLogo:{
    resizeMode: 'contain',
    alignSelf: 'center',
    width: 250,
    height: 250,
  },

});