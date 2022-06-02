---
emoji: 📱
title: '[React Native] Firebase를 이용한 Android 구글 로그인 2'
date: '2022-06-02 14:00:00'
author: 김형진
tags: react-native firebase
categories: 개발 featured
---

저번편에서는 Firebase의 설정을 끝마쳤고, 이번편에서는 실제로 구글 로그인 기능을 구현할 차례다.

## 프로젝트 설정
먼저 필요한 패키지들을 설치한다.
```bash
npm install @react-native-firebase/app @react-native-firebase/auth @react-native-google-signin/google-signin
```
app 모듈은 Firebase의 기능들을 사용하기 전에 반드시 깔아야 하는 모듈이고, auth 모듈은 계정 기능을 사용할 수 있게 해준다. 그리고 google-signin은 문자 그대로 React에서 구글 로그인 기능을 쉽게 만들어주는 패키지다.

패키지들을 설치한 이후에는 프로젝트 자체에서의 설정을 해준다.
android 폴더 안에 있는 build.gradle 파일에 들어가 google-services 플러그인을 추가해준다.
```bash
buildscript {
  dependencies {
    // ... other dependencies
    classpath 'com.google.gms:google-services:4.3.10'
    // Add me --- /\
  }
}
```

다음으로는 android/app 경로 안에 있는 build.gradle 파일에서 플러그인을 적용한다. 경로가 비슷하니 헷갈리지 말자.
```bash
apply plugin: 'com.android.application'
apply plugin: 'com.google.gms.google-services' // <- Add this line
```
auth 모듈도 같은 파일 안에 추가해준다.
```bash
dependencies {
    // ... other dependencies
    implementation 'com.google.firebase:firebase-auth'
}
```

## 로그인 기능 구현
이젠 정말로 기능 구현을 할 차례다. 

### App.js
App.js에 있는 코드를 모두 지우고 필요한 패키지들을 불러오자.
```bash
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
```
다음으로는 구글 로그인 기능을 이용하기 위한 webClientId를 google-services.json에서 가져와야 한다.
이 파일 안에서 client/oauth_client/client_id를 가져오면 되는데, client_type이 3인 것을 가져와야 한다.
```bash
useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        'CLIENT_ID'
    });
}, []);
```
이로써 Google SDK를 사용할 수 있게 됐다.

이제는 로그인 버튼을 눌렀을 때 사용자를 로그인 시키는 기능을 만들어보자.
```bash
async function onGoogleButtonPress() {
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
}
```
한줄한줄 살펴보자면
첫번째 줄은 구글에 로그인하면서 유저의 idToken을 가져온다.
두번째 줄은 가져온 유저의 idToken을 이용하여 Google credential을 생성한다.
마지막 줄은 생성된 credential을 이용해 사용자를 앱으로 로그인 시킨다.

다음은 사용자의 접속 유무에 따라서 다른 화면을 보여주는 작업을 해보자.
사용자가 접속 중일때는 앱의 홈 화면을 보여주고 접속 중이 아닐때는 로그인 화면을 보여주려면 현재 사용자의 상태를 판별하는 state가 필요하다.
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
Firebase에서 제공하는 onAuthStateChanged function을 통해 유저의 접속 유무를 판별 할 수 있다.

```bash
if (loggedIn) {
    return <Home />;
}

return <LoginScreen onGoogleButtonPress={onGoogleButtonPress} />;
```
로그인 상태에서는 Home 화면을, 아닐때는 LoginScreen 화면을 보인다.
onGoogleButtonPress function의 정보를 LoginScreen으로 보낸다.

이제는 유저에게 보여질 두 화면을 만들 차례다.

### LoginScreen.js
screens 폴더를 생성한 뒤 폴더 안에 LoginScreen.js 파일을 생성한다.
```bash
import React from 'react';
import { Text, View } from 'react-native';
import { GoogleSigninButton } from '@react-native-google-signin/google-signin'
```
필요한 모듈들을 가져온다.
다음으로는 구글 로그인 버튼을 이용한 간단한 페이지를 만든다. 스타일
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
screens 폴더 안에 Home.js 파일을 만들고 필요한 모듈들을 불러온다.
```bash
import React from 'react';
import { Text, View, Image, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
```
다음은 로그인이 성공했는지를 확인 하기 위해 로그인한 유저의 정보를 불러와 유저의 프로필 사진, 이름, 이메일을 보인다.
signOut()을 사용한 로그아웃 버튼도 만들어 준다.
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
auth.currentUser function을 사용하면 현재 유저의 정보를 불러 올 수 있다. 
Ex) user?.photoURL -> 현재 유저의 구글 계정 프로필 사진

## 결과

LoginScreen
![](https://images.velog.io/images/hhjj0506/post/ff9fc80d-fff9-4763-a678-bde9d504b177/image.png)
Home
![](https://images.velog.io/images/hhjj0506/post/d4549fe6-a69a-4f90-b71f-d63ae47b236f/image.png)
가시성이 너무 떨어지고, 이미지를 보여주기 위해 간단히 디자인을 따로 했다.

## 마치며
그동안 포스트를 안하다가 갑자기 삘을 받아서 준비도 안된 상태에서 포스트를 하다 보니까 시간도 굉장히 오래걸리고 글도 난잡하게 써졌던 것 같습니다. 글 읽는데 불편한 점이 계셨다면 정말 죄송합니다...

아마 앞으로는 간단한 리뷰 기능과 찜 기능, 그리고 이 둘과 계정을 이용하여 내가 쓴 리뷰와 찜한 식당 불러오기에 대해서 다뤄볼 것 같습니다.
채팅 기능도 언젠가는 포스트를 하겠지만 아직은 제가 글로 풀어낼 실력이 안되는 것 같아서 다음으로 미루고요.

아무튼 긴 글 읽어주셔서 감사합니다! 

```toc

```