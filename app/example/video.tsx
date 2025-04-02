import { useEvent } from 'expo';
import { useVideoPlayer, VideoView } from 'expo-video';
import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from '@rneui/themed';
import { Stack } from 'expo-router';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoScreen() {
  const player = useVideoPlayer(videoSource, (player) => {
    player.loop = true;
    player.play();
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player.playing });
  const { t } = useTranslation();

  return (
    <>
      {/* <Header></Header> */}
      <Stack.Screen
        options={{
          title: t('example.imagePickerExample'),
          headerStyle: { backgroundColor: '#fff' },
          headerTintColor: '#1c1c1c',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
      <View style={styles.contentContainer}>
        <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
        <View style={styles.controlsContainer}>
          <Button
            title={isPlaying ? t('video.pause') : t('video.play')}
            onPress={() => {
              if (isPlaying) {
                player.pause();
              } else {
                player.play();
              }
            }}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 50,
  },
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
});
