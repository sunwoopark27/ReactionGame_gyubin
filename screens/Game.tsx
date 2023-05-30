import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import styled, { keyframes } from 'styled-components/native';
import { useNavigation } from "@react-navigation/native";
const Container = styled.View`
  flex: 1;
`
const UpView = styled.TouchableOpacity`
  flex: 1;
  height: 100px;
  align-items: center;
  justify-content: center;
  transform: rotate(180deg);
`

const UpBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`
const UpBtnText = styled.Text`
  font-size: 30px;
`

const BtnText = styled.Text`
  font-size: 40px;
`

const BotBtnText = styled.Text`
  font-size: 30px;
`

const CtnArea = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  height: 100px;
`
const CtnText = styled.Text`
  font-size: 40px;
`
const DnView = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
`

const DnBtn = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;;
`

const RecTime = styled.Text`
  padding-left: 20px
`

const ScoreArea = styled.View`
  height: 60px;
  justify-content: center;
  padding: 10px;
  background-color: lightgrey;
`
const EnemyArea= styled.View`
  display: flex;
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: black;
  justify-content: space-between;
`
const MyArea = styled.View`
  display: flex;
  flex-direction: row;
   justify-content: space-between;
`

const ScoreText = styled.Text`
  text-align: center;
  width: 50px;
`;

const UserImage = styled.Image`
  width: 200px;
  height: 150px;
`;

const WinImage = styled.Image`
  width: 300px;
  height: 200px;
`
const WinText = styled.Text`
  font-size: 30px
`
const ReStartBtn  = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`
const RestartText = styled.Text`
  font-size: 20px;
  color: white;
  padding: 5px 30px;
   background-color: black;
   border-radius: 10px;
`

const GoHome = styled.TouchableOpacity`
  top: 30px;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`

const App = () => {
    const [timer, setTimer] = useState<any>();
    const [countdownLetters, setCountdownLetters] = useState(['Bang', 'Steady', 'Ready']);

    const [upPressed, setUpPressed] = useState(false);
    const [downPressed, setDownPressed] = useState(false);
    const [upReactionTime, setUpReactionTime] = useState<any>(9999);
    const [downReactionTime, setDownReactionTime] = useState<any>(9999);
    const [start, setStart] = useState(false)
    const [upScore, setUpScore] = useState(0);
    const [dnScore, setDnScore] = useState(0);

    const [fastClick, setFastClick] = useState(false)

    const [upWin, setUpWin] = useState(false)
    const [downWin, setDownWin] = useState(false)

    const navigation = useNavigation();

    const goHome = () => {
        navigation.navigate("AllStack",{screen: 'Home'})
        setUpScore(0);
        setDnScore(0);
        setUpPressed(false);
        setDownPressed(false);
        setUpReactionTime(null);
        setDownReactionTime(null);
        setStart(false)
        setUpWin(false)
        setDownWin(false)
        setFastClick(false)
    }

    //게임초기화
    const StartGame = () => {
        setTimer(3);
        setUpPressed(false);
        setDownPressed(false);
        setUpReactionTime(null);
        setDownReactionTime(null);
        setStart(true)
        setUpWin(false)
        setDownWin(false)
        setFastClick(false)
    };

    const handlePress = (direction: any) => {
        if (timer === 0) {
            setStart(false);
            // @ts-ignore
            const reactionTimeMs = new Date() - startTime;
            if (direction === 'up') {
                setUpReactionTime(reactionTimeMs);
                setUpPressed(true);
                if (!downPressed) {
                    setUpScore((prev) => prev + 1);
                }
            } else if (direction === 'down') {
                setDownReactionTime(reactionTimeMs);
                setDownPressed(true);
                if (!upPressed) {
                    setDnScore((prev) => prev + 1);
                }
            }
        }

        if (timer > 0) {
            if (direction === 'up') {
                setUpPressed(true);
                setUpReactionTime(9999)
                setDownWin(true);
                setDnScore(dnScore+1);
                setFastClick(true);
                setStart(false);
            } else if (direction === 'down') {
                setDownPressed(true);
                setDownReactionTime(9999)
                setUpWin(true);
                setUpScore(upScore+1)
                setFastClick(true)
                setStart(false);
            }
        }
    };

  /*  useEffect(() => {
        let intervalId: any;
        if (timer > 0) {
            const intervalTime = Math.floor(Math.random() * 1000) + 500;
            intervalId = setInterval(() => {
                setTimer(timer - 1);
            }, intervalTime);
        } else {
            // @ts-ignore
            startTime = new Date();
        }
        return () => clearInterval(intervalId);
    }, [timer]);*/
useEffect(() => {
  let timeoutId;

  const updateTimer = () => {
    const randomInterval = Math.floor(Math.random() * 1000) + 500; // Random interval between 500ms and 2500ms
    const randomTime = Math.floor(Math.random() * 3); // Random time value between 0 and 9
    setTimer(randomTime);
    timeoutId = setTimeout(updateTimer, randomInterval);
  };

  updateTimer();

  return () => clearTimeout(timeoutId);
}, []);
    return (
        <>
            {upScore === 5 || dnScore === 5 ?
                <Container style={{flex: 1,alignItems: 'center',justifyContent: 'center'}}>
                    <WinImage source={{ uri: 'https://dotown.maeda-design-room.net/wp-content/uploads/2022/08/hanabi08.png' }}/>
                    <WinText>{upScore === 5? <Text>상대</Text>:<Text>나</Text>} Winner</WinText>

                    <GoHome onPress={goHome}>
                        <RestartText>홈</RestartText>
                    </GoHome>
                </Container>:
                (
                    <Container>
                        <UpView disabled={upPressed || fastClick} onPress={() => handlePress('up')}>
                            {upPressed === true || upWin === true? (upReactionTime<downReactionTime? <BtnText>승리!</BtnText>:<BtnText>패배!</BtnText>) : null }
                            {upPressed === true ? null :
                                <View><UserImage source={{ uri: 'https://as2.ftcdn.net/v2/jpg/05/79/47/23/1000_F_579472398_Sbkgc4DjVtyoyaxFFA90mvSktGN7gCsJ.jpg' }}/></View>
                            }
                        </UpView>

                        <CtnArea onPress={StartGame}>
                            {start === false ? <BtnText>시작</BtnText> : <BtnText>{countdownLetters[timer - 1]}</BtnText>}
                        </CtnArea>

                        <DnView disabled={downPressed || fastClick} onPress={() => handlePress('down')}>
                            {downPressed === true || downWin === true? (upReactionTime>downReactionTime? <BtnText>승리!</BtnText>:<BtnText>패배!</BtnText>) : null}
                            {downPressed === true ? null :
                                <View><UserImage source={{ uri: 'https://as2.ftcdn.net/v2/jpg/05/79/47/23/1000_F_579472398_Sbkgc4DjVtyoyaxFFA90mvSktGN7gCsJ.jpg' }}/></View>
                            }
                        </DnView>

                        <ReStartBtn onPress={goHome}>
                            <RestartText>홈</RestartText>
                        </ReStartBtn>

                        <ScoreArea>
                            <EnemyArea>
                                <ScoreText>상대:</ScoreText>
                                <Text>{upScore}/5</Text>
                                {upPressed === false? ( <RecTime>0.00</RecTime>):( <RecTime>0.{upReactionTime}</RecTime>)}
                            </EnemyArea>
                            <MyArea>
                                <ScoreText>나:</ScoreText>
                                <Text>{dnScore}/5</Text>
                                {downPressed === false? ( <RecTime>0.00</RecTime>):( <RecTime>0.{downReactionTime}</RecTime>)}
                            </MyArea>
                        </ScoreArea>
                    </Container>
                )}
        </>
    );
}

export default App;
