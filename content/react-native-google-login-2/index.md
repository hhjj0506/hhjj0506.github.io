---
emoji: ๐ฑ
title: '[React Native] Firebase๋ฅผ ์ด์ฉํ Android ๊ตฌ๊ธ ๋ก๊ทธ์ธ 2'
date: '2022-06-02 14:00:00'
author: ๊นํ์ง
tags: react-native firebase
categories: ๊ฐ๋ฐ featured
---

์ ๋ฒํธ์์๋ Firebase์ ์ค์ ์ ๋๋ง์ณค๊ณ , ์ด๋ฒํธ์์๋ ์ค์ ๋ก ๊ตฌ๊ธ ๋ก๊ทธ์ธ ๊ธฐ๋ฅ์ ๊ตฌํํ  ์ฐจ๋ก๋ค.

## ํ๋ก์ ํธ ์ค์ 
๋จผ์  ํ์ํ ํจํค์ง๋ค์ ์ค์นํ๋ค.
```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-google-signin/google-signin
```
app ๋ชจ๋์ Firebase์ ๊ธฐ๋ฅ๋ค์ ์ฌ์ฉํ๊ธฐ ์ ์ ๋ฐ๋์ ๊น์์ผ ํ๋ ๋ชจ๋์ด๊ณ , auth ๋ชจ๋์ ๊ณ์  ๊ธฐ๋ฅ์ ์ฌ์ฉํ  ์ ์๊ฒ ํด์ค๋ค. ๊ทธ๋ฆฌ๊ณ  google-signin์ ๋ฌธ์ ๊ทธ๋๋ก React์์ ๊ตฌ๊ธ ๋ก๊ทธ์ธ ๊ธฐ๋ฅ์ ์ฝ๊ฒ ๋ง๋ค์ด์ฃผ๋ ํจํค์ง๋ค.

ํจํค์ง๋ค์ ์ค์นํ ์ดํ์๋ ํ๋ก์ ํธ ์์ฒด์์์ ์ค์ ์ ํด์ค๋ค.
android ํด๋ ์์ ์๋ build.gradle ํ์ผ์ ๋ค์ด๊ฐ google-services ํ๋ฌ๊ทธ์ธ์ ์ถ๊ฐํด์ค๋ค.
```bash
buildscript {
  dependencies {
    // ... other dependencies
    classpath 'com.google.gms:google-services:4.3.10'
    // Add me --- /\
  }
}
```

๋ค์์ผ๋ก๋ android/app ๊ฒฝ๋ก ์์ ์๋ build.gradle ํ์ผ์์ ํ๋ฌ๊ทธ์ธ์ ์ ์ฉํ๋ค. ๊ฒฝ๋ก๊ฐ ๋น์ทํ๋ ํท๊ฐ๋ฆฌ์ง ๋ง์.
```bash
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services' // <- Add this line
```
auth ๋ชจ๋๋ ๊ฐ์ ํ์ผ ์์ ์ถ๊ฐํด์ค๋ค.
```bash
dependencies {
    // ... other dependencies
    implementation 'com.google.firebase:firebase-auth'
}
```

## ๋ก๊ทธ์ธ ๊ธฐ๋ฅ ๊ตฌํ
์ด์   ์ ๋ง๋ก ๊ธฐ๋ฅ ๊ตฌํ์ ํ  ์ฐจ๋ก๋ค. 

### App.js
App.js์ ์๋ ์ฝ๋๋ฅผ ๋ชจ๋ ์ง์ฐ๊ณ  ํ์ํ ํจํค์ง๋ค์ ๋ถ๋ฌ์ค์.
```bash
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
```
๋ค์์ผ๋ก๋ ๊ตฌ๊ธ ๋ก๊ทธ์ธ ๊ธฐ๋ฅ์ ์ด์ฉํ๊ธฐ ์ํ webClientId๋ฅผ google-services.json์์ ๊ฐ์ ธ์์ผ ํ๋ค.
์ด ํ์ผ ์์์ client/oauth_client/client_id๋ฅผ ๊ฐ์ ธ์ค๋ฉด ๋๋๋ฐ, client_type์ด 3์ธ ๊ฒ์ ๊ฐ์ ธ์์ผ ํ๋ค.
```bash
useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        'CLIENT_ID'
    });
}, []);
```
์ด๋ก์จ Google SDK๋ฅผ ์ฌ์ฉํ  ์ ์๊ฒ ๋๋ค.

์ด์ ๋ ๋ก๊ทธ์ธ ๋ฒํผ์ ๋๋ ์ ๋ ์ฌ์ฉ์๋ฅผ ๋ก๊ทธ์ธ ์ํค๋ ๊ธฐ๋ฅ์ ๋ง๋ค์ด๋ณด์.
```bash
async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
}
```
ํ์คํ์ค ์ดํด๋ณด์๋ฉด
์ฒซ๋ฒ์งธ ์ค์ ๊ตฌ๊ธ์ ๋ก๊ทธ์ธํ๋ฉด์ ์ ์ ์ idToken์ ๊ฐ์ ธ์จ๋ค.
๋๋ฒ์งธ ์ค์ ๊ฐ์ ธ์จ ์ ์ ์ idToken์ ์ด์ฉํ์ฌ Google credential์ ์์ฑํ๋ค.
๋ง์ง๋ง ์ค์ ์์ฑ๋ credential์ ์ด์ฉํด ์ฌ์ฉ์๋ฅผ ์ฑ์ผ๋ก ๋ก๊ทธ์ธ ์ํจ๋ค.

๋ค์์ ์ฌ์ฉ์์ ์ ์ ์ ๋ฌด์ ๋ฐ๋ผ์ ๋ค๋ฅธ ํ๋ฉด์ ๋ณด์ฌ์ฃผ๋ ์์์ ํด๋ณด์.
์ฌ์ฉ์๊ฐ ์ ์ ์ค์ผ๋๋ ์ฑ์ ํ ํ๋ฉด์ ๋ณด์ฌ์ฃผ๊ณ  ์ ์ ์ค์ด ์๋๋๋ ๋ก๊ทธ์ธ ํ๋ฉด์ ๋ณด์ฌ์ฃผ๋ ค๋ฉด ํ์ฌ ์ฌ์ฉ์์ ์ํ๋ฅผ ํ๋ณํ๋ state๊ฐ ํ์ํ๋ค.
```bash
const [loggedIn, setLoggedIn] = useState(false);

// ... other codes

auth.onAuthStateChanged((user) => {
    if (user) {
    	setLoggedIn(true);
    } else {
    	setLoggedIn(false);
    }
});
```
Firebase์์ ์ ๊ณตํ๋ onAuthStateChanged function์ ํตํด ์ ์ ์ ์ ์ ์ ๋ฌด๋ฅผ ํ๋ณ ํ  ์ ์๋ค.

```bash
if (loggedIn) {
    return <Home />;
}

return <LoginScreen onGoogleButtonPress={onGoogleButtonPress} />;
```
๋ก๊ทธ์ธ ์ํ์์๋ Home ํ๋ฉด์, ์๋๋๋ LoginScreen ํ๋ฉด์ ๋ณด์ธ๋ค.
onGoogleButtonPress function์ ์ ๋ณด๋ฅผ LoginScreen์ผ๋ก ๋ณด๋ธ๋ค.

์ด์ ๋ ์ ์ ์๊ฒ ๋ณด์ฌ์ง ๋ ํ๋ฉด์ ๋ง๋ค ์ฐจ๋ก๋ค.

### LoginScreen.js
screens ํด๋๋ฅผ ์์ฑํ ๋ค ํด๋ ์์ LoginScreen.js ํ์ผ์ ์์ฑํ๋ค.
```bash
import React from 'react';
import { Text, View } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
```
ํ์ํ ๋ชจ๋๋ค์ ๊ฐ์ ธ์จ๋ค.
๋ค์์ผ๋ก๋ ๊ตฌ๊ธ ๋ก๊ทธ์ธ ๋ฒํผ์ ์ด์ฉํ ๊ฐ๋จํ ํ์ด์ง๋ฅผ ๋ง๋ ๋ค. ์คํ์ผ
```bash
export default function LoginiScreen(props) {
    return (
        <View>
            <Text>Login Page</Text>
            <GoogleSigninButton onPress={props.onGoogleButtonPress} />
        </View>
    );
}
```

### Home.js
screens ํด๋ ์์ Home.js ํ์ผ์ ๋ง๋ค๊ณ  ํ์ํ ๋ชจ๋๋ค์ ๋ถ๋ฌ์จ๋ค.
```bash
import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
```
๋ค์์ ๋ก๊ทธ์ธ์ด ์ฑ๊ณตํ๋์ง๋ฅผ ํ์ธ ํ๊ธฐ ์ํด ๋ก๊ทธ์ธํ ์ ์ ์ ์ ๋ณด๋ฅผ ๋ถ๋ฌ์ ์ ์ ์ ํ๋กํ ์ฌ์ง, ์ด๋ฆ, ์ด๋ฉ์ผ์ ๋ณด์ธ๋ค.
signOut()์ ์ฌ์ฉํ ๋ก๊ทธ์์ ๋ฒํผ๋ ๋ง๋ค์ด ์ค๋ค.
```bash
export default function Home() {
  const user = auth().currentUser;
  return (
    <View>
      <Text>{user?.displayName}</Text>
      <Text>{user?.email}</Text>
      <Image source={{ uri: user?.photoURL }} />
      <View>
        <Button title="Logout" onPress={() => auth().signOut()} />
      </View>
    </View>
  );
}
```
auth.currentUser function์ ์ฌ์ฉํ๋ฉด ํ์ฌ ์ ์ ์ ์ ๋ณด๋ฅผ ๋ถ๋ฌ ์ฌ ์ ์๋ค. 
Ex) user?.photoURL -> ํ์ฌ ์ ์ ์ ๊ตฌ๊ธ ๊ณ์  ํ๋กํ ์ฌ์ง

## ๊ฒฐ๊ณผ

LoginScreen
![](https://images.velog.io/images/hhjj0506/post/ff9fc80d-fff9-4763-a678-bde9d504b177/image.png)
Home
![](https://images.velog.io/images/hhjj0506/post/d4549fe6-a69a-4f90-b71f-d63ae47b236f/image.png)
๊ฐ์์ฑ์ด ๋๋ฌด ๋จ์ด์ง๊ณ , ์ด๋ฏธ์ง๋ฅผ ๋ณด์ฌ์ฃผ๊ธฐ ์ํด ๊ฐ๋จํ ๋์์ธ์ ๋ฐ๋ก ํ๋ค.

## ๋ง์น๋ฉฐ
๊ทธ๋์ ํฌ์คํธ๋ฅผ ์ํ๋ค๊ฐ ๊ฐ์๊ธฐ ์์ ๋ฐ์์ ์ค๋น๋ ์๋ ์ํ์์ ํฌ์คํธ๋ฅผ ํ๋ค ๋ณด๋๊น ์๊ฐ๋ ๊ต์ฅํ ์ค๋๊ฑธ๋ฆฌ๊ณ  ๊ธ๋ ๋์กํ๊ฒ ์จ์ก๋ ๊ฒ ๊ฐ์ต๋๋ค. ๊ธ ์ฝ๋๋ฐ ๋ถํธํ ์ ์ด ๊ณ์จ๋ค๋ฉด ์ ๋ง ์ฃ์กํฉ๋๋ค...

์๋ง ์์ผ๋ก๋ ๊ฐ๋จํ ๋ฆฌ๋ทฐ ๊ธฐ๋ฅ๊ณผ ์ฐ ๊ธฐ๋ฅ, ๊ทธ๋ฆฌ๊ณ  ์ด ๋๊ณผ ๊ณ์ ์ ์ด์ฉํ์ฌ ๋ด๊ฐ ์ด ๋ฆฌ๋ทฐ์ ์ฐํ ์๋น ๋ถ๋ฌ์ค๊ธฐ์ ๋ํด์ ๋ค๋ค๋ณผ ๊ฒ ๊ฐ์ต๋๋ค.
์ฑํ ๊ธฐ๋ฅ๋ ์ธ์  ๊ฐ๋ ํฌ์คํธ๋ฅผ ํ๊ฒ ์ง๋ง ์์ง์ ์ ๊ฐ ๊ธ๋ก ํ์ด๋ผ ์ค๋ ฅ์ด ์๋๋ ๊ฒ ๊ฐ์์ ๋ค์์ผ๋ก ๋ฏธ๋ฃจ๊ณ ์.

์๋ฌดํผ ๊ธด ๊ธ ์ฝ์ด์ฃผ์์ ๊ฐ์ฌํฉ๋๋ค! 

```toc

```