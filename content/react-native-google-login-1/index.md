---
emoji: 📱
title: '[React Native] Firebase를 이용한 Android 구글 로그인 1'
date: '2022-06-02 14:00:00'
author: 김형진
tags: react-native firebase
categories: 개발 featured
---

![유일하게 디자인을 못했던 로그인 페이지다](https://images.velog.io/images/hhjj0506/post/56073794-314a-451a-a667-5d0595643061/google.png)

구글 로그인은 프로젝트를 시작할 때 내가 가장 처음으로 구현한 기능이다. 프로젝트 시작 전에는 개발에 재미를 붙이지 못했던 내가 이 로그인 기능 구현을 처음으로 성공하고 재미를 붙이게 해준 아주 고마운 기능이 됐다. 구글 로그인말고도 React에서의 계정 기능은 어렵지 않게 구현할 수 있기 때문에 처음 시작하는 사람들이 시도해보면서 재미를 붙이면 좋을 것 같다.

## 주의!!
이 포스트는 react-native-cli를 이용하여 생성한 프로젝트가 있다는 가정하에 진행됩니다. 만약 expo-cli를 사용하고 있다면 새롭게 프로젝트를 만들어 주시길 바랍니다. (react-native-cli 설정 방법은 [여기](https://reactnative.dev/docs/environment-setup)에서 찾아볼 수 있다.)

## Firebase 설정

먼저 [Firebase](https://firebase.google.com/)의 계정을 만드는 것부터 시작한다. 계정을 만들었다면 Firebase 홈페이지 우측 상단에 있는 '콘솔로 이동' 버튼을 누르거나 [console.firebase.com](https://console.firebase.google.com/) 으로 직접 이동한다. 

콘솔에 들어가게 되면 이런 화면이 보일것이다.![](https://images.velog.io/images/hhjj0506/post/b4478f6c-8c67-4864-a3f8-1a5e8532eb5f/image.png)

작성자는 이미 만들어놓은 프로젝트들이 많아서 꽉 차있지만 처음 계정을 만든 후에는 아무것도 없을것이다. 여기서는 Add project를 눌러서 새 프로젝트를 만들어준다.

![](https://images.velog.io/images/hhjj0506/post/5dc6e266-68a8-4246-b62e-21c5ba218087/image.png)

이름을 설정한 후에는 계속 continue를 누르면 된다. 중간에 구글에서 제공하는 앱 측정 솔루션을 사용할것인지에 대해 물어보는데 써도 안써도 상관은 없다.

프로젝트가 생성된 후에는 이런 창이 나오게 된다.
![](https://images.velog.io/images/hhjj0506/post/41188d88-578d-49a8-b16f-55e38a9c7ba1/image.png)
우리는 안드로이드 앱을 만들것이기 때문에 빨간색 원이 그려진 안드로이드 버튼을 누른다. 

![](https://images.velog.io/images/hhjj0506/post/383b7e9b-31e2-443d-9343-e4c931939b84/image.png)
버튼을 누르면 이렇게 안드로이드 앱 생성 페이지가 나오게 된다.
우리가 입력해야 할 것들은 Android package name과 SHA-1인데, 일단 package name을 어떻게 입력해야 하는지부터 알아보자.

package name은 내가 만든 프로젝트에서 찾아 볼 수 있다. 프로젝트에서 android/app/src/main 경로로 들어가면 AndroidManifest.xml이라는 파일을 발견할 수 있는데, 이 파일 상단에 보이는 
```bash
package="com.프로젝트 이름"
```
이 이름을 그대로 복사 붙여넣기 하면된다. 내 경우에는 test_project라는 이름으로 프로젝트를 생성했기 때문에 package name은 com.test_project가 된다.

다음으로 SHA-1은 페이지에는 optional이라고 써있기는 하지만 구글 로그인 기능을 이용하기 위해서는 필수이다. SHA-1을 얻는 방법은 간단하다.
```bash
cd android && gradlew signingReport
```
이 명령어를 콘솔에 입력하면 많은 양의 비슷해 보이는 문단들이 나올텐데, 그 중에서 경로가 프로젝트/android/app/debug.keystore인 문단에서의 SHA-1을 입력하면 된다.
```bash
Variant: debugUnitTest
Config: debug
Store: C:\react\test_project\android\app\debug.keystore
Alias: androiddebugkey
MD5: -------------------------------
SHA1: // 여기에 나오는 것을 복붙
SHA-256: ----------------------------
Valid until: 2052 5 1
```

이렇게 package name과 SHA-1을 입력하고 Register app 버튼을 누르면 무언가를 다운로드 하라는 버튼이 보인다.
![](https://images.velog.io/images/hhjj0506/post/526d5b8b-cbd8-4e25-84dd-538852e079b4/image.png)
버튼을 누르고 다운받은 google-services.json 파일을 보이는것과 같이 android/app 경로에 넣어준다. 이 파일은 이후에 구글 로그인에 필요한 web client id를 가져올 때 쓰인다.

google-services.json 파일을 다운받아 맞는 경로에 넣기까지 했으면 Firebase에서의 설정은 거의 끝이 났다.
마지막으로는 Firebase에서 제공하는 Authentication 기능을 활성화 해야한다.
![](https://images.velog.io/images/hhjj0506/post/11e24afa-5496-4808-b101-58e00737d359/image.png)
페이지 왼쪽에 있는 Authentication 섹션으로 넘어가 Get Started 버튼을 누른다.
![](https://images.velog.io/images/hhjj0506/post/03994bd9-d994-4797-af5e-7821d8e03dd3/image.png)
페이지가 넘어가면 이런 화면이 나올텐데, 살펴보면 여러 방법의 로그인 기능들이 있는것을 볼 수 있다.
물론 우리는 구글 로그인을 사용할 것이기 때문에 구글만 활성화시키면 된다.
![](https://images.velog.io/images/hhjj0506/post/448cfd86-0f19-40a7-adb1-bb3edfca377d/image.png)
구글을 눌러 활성화를 시키면 끝이다. Project support email은 현재 자신이 로그인 되어있는 이메일을 넣으면 된다.

다음편에서는 실제 앱에서 구글 로그인 기능을 구현해보겠다.

```toc

```