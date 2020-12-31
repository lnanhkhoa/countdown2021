import React, { useCallback, useEffect, useState, memo, useMemo } from "react";
import { StyleSheet, View, Text, Image, LogBox } from "react-native";
import LottieView from "lottie-react-native";
import moment from "moment";
import { sanFranciscoWeights, human } from "react-native-typography";
import { Camera } from "expo-camera";
import CountDown from "react-native-countdown-component";

LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <LottieView
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: 280,
            backgroundColor: "transparent",
          }}
          autoPlay
          loop
          source={require("./assets/lf30_editor_pqpppvx5.json")}
        />
        <View
          style={{
            position: "absolute",
            bottom: 15,
            width: "100%",
            backgroundColor: "transparent",
          }}
        >
          <Signature colorText={"white"} />
        </View>
      </Camera>
    </View>
  );
}

function CountDownScreen({ setFinish = () => {} }) {
  const startTime = moment("2020-12-31T16:59:59.900Z");
  // const startTime = moment().add(4, "s"); // developing
  const duration = startTime.diff(moment(), "s");

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={human.largeTitleObject}>Countdown 2021</Text>
        <CountDown
          until={duration}
          onFinish={() => setFinish(true)}
          size={30}
        />
      </View>
      <Signature />
    </View>
  );
}

function Signature({ colorText = "black" }) {
  return (
    <View style={styles.bottom}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <Text style={[human.callout, { color: colorText }]}>
          {"Coryright by "}
        </Text>
        <View
          style={{
            padding: 4,
            alignItems: "center",
            backgroundColor: "white",
            borderRadius: 4,
          }}
        >
          <Text style={[human.callout, { color: "blue" }]}>lnanhkhoa</Text>
        </View>
      </View>
    </View>
  );
}

function App() {
  const [finish, setFinish] = useState(false);
  return finish ? <CameraScreen /> : <CountDownScreen setFinish={setFinish} />;
}

export default App;

const styles = StyleSheet.create({
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    paddingTop: 20,
  },
  bottom: {
    // backgroundColor: "white",
    paddingBottom: 30,
    alignItems: "center",
  },
});
