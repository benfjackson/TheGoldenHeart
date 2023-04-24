
import { Button, View, Text, Image } from 'react-native';

import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

export default function MainMenu() {
    //Image with buttons to navigate to other screens
    //First screen is Forest

    //image to use as button
    const navigation = useNavigation();
    const playButton = require('../images/UI/PlayButton.png');
    return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
        {/* <ImageBackground source={img} style={{width: '100%', height: '100%'}}> */}
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'black', width: '100%' }}>
                
                <TouchableOpacity onPress={() => navigation.navigate('PlayScreen')}>
                    <Image source={playButton} style={{width: 300, height: 200}}/>
                </TouchableOpacity>
                <Button title="Forest" onPress={() => navigation.navigate('Forest')} />
                <Button title="Devil" onPress={() => navigation.navigate('Devil')} />
                <Button title="VampireGirl" onPress={() => navigation.navigate('VampireGirl')} />
                {/* <Button title="Forest" onPress={() => navigation.navigate('Forest')} />
                <Button title="Mountain" onPress={() => navigation.navigate('Mountain')} />
                <Button title="MountainCastle" onPress={() => navigation.navigate('MountainCastle')} />
                <Button title="CloudCastle" onPress={() => navigation.navigate('CloudCastle')} />
                <Button title="Plains" onPress={() => navigation.navigate('Plains')} /> */}

            </View>

    </View>
    
  );
}