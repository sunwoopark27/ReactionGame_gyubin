import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, Animated} from "react-native";
import { useNavigation } from "@react-navigation/native";
import styled from "styled-components/native";
import Game from "./Game";

const Container = styled.View`
  flex: 1;
`

const HeaderArea = styled.View`
  height: 200px;
  justify-content: center;
  align-items: center;
`
const HeaderText = styled.Text`
  margin-top: 20px;
  font-size: 45px;
`

const GameStart = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`
const GameText = styled.Text`
  background-color: black;
  color: white;
  padding: 10px 60px;
  border-radius: 10px;
  font-size: 30px;
`
const HomeImageArea = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`

const HomeImage = styled.Image`
  position: absolute;
  width: 300px;
  height: 300px;
  bottom: 60px;
  z-index: 1;
  opacity: 0.5;
`
const BackImage = styled.ImageBackground`
  width: 300px;
  height: 300px;
  z-index: 0;
 
`
const AnimatedHomeImage = Animated.createAnimatedComponent(HomeImage);
const Home = () => {

    const animatedValue = new Animated.Value(0);

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 1,
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: -1,
                    duration: 2000,
                    useNativeDriver: true,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, [animatedValue]);

    const translateX = animatedValue.interpolate({
        inputRange: [-1, 1],
        outputRange: [-100, 100],
    });

    const navigation = useNavigation();

    const GoGame = () => {
        navigation.navigate("AllStack",{screen: 'Game'})
    }
    return (
        <Container>
            <HeaderArea>
                <HeaderText>Ready Steady Bang</HeaderText>
            </HeaderArea>

            <GameStart onPress={GoGame}>
                  <GameText>게임 시작</GameText>
            </GameStart>

           <HomeImageArea>
               <BackImage source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1729/1729809.png' }}/>
               <AnimatedHomeImage source={{ uri: 'https://cdn.pixabay.com/photo/2013/07/13/01/18/sniper-155485_960_720.png' }}
                                  style={{ transform: [{ translateX }] }} />
           </HomeImageArea>
        </Container>

    );
}

export default Home;
