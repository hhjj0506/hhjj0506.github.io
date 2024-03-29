---
emoji: 🏋️‍♂️
title: 22 개인 프로젝트 개발
date: '2022-07-01 23:00:00'
author: 김형진
tags: react firebase 헬스 3대운동 3대 벤치 데드 스쿼트
categories: 개발 featured
---
## 개발하게 된 계기
작년에 들었던 수업에서 개인 프로젝트로 3대운동에 도움이 되는 계산기들과 영상들을 볼 수 있는 웹사이트를 만든 후부터 내가 좋아하는 운동과 관련된 서비스를 만들고 싶었다. 이후 학기와 방학 중 다른 것들을 하느라 따로 짬이 나지 않았는데 이번 여름에는 각을 잡고 만들어보려고 한다.

## 어떻게 쓰일 것인가
학생들이 자신의 운동 영상을 제출하면 해당 영상으로 운동을 얼마나 많이 or 무겁게 들었는지를 평가한다. 무게, 횟수 등의 랭킹은 학부, 학번, 성별, 소속 RC 등의 카테고리로 나뉘어져 자신이 어느 그룹에서 어느 정도의 순위인지 가늠할 수 있다. 자신의 운동능력등에 따라 업적과 그로 인해 얻을 수 있는 뱃지 등이 있고, 이는 자신의 프로필이나 게시판에 글이나 댓글을 쓸때 나타낼 수도 있다 (Ex. 3대 500 뱃지, XX학부 스쿼트 랭킹 1위 등). 자신의 프로필을 꾸며 본인의 운동 경력을 보일 수 있다.

## 이 기술을 쓰려고 한 이유
처음 시작할 때 예정은 저번 학기 들었던 DB 수업에서 배웠던 SQL 쿼리들을 좀더 다뤄보고 싶어서 MySQL+Express+Node+React로 기술 스택을 잡았지만, 서비스를 학교 인원들만 사용할 수 있게 제한하고, 일정을 급하게 만들다보니 그나마 익숙한 Firebase를 사용하게 됐다. React는 이전에 React Native를 사용한적이 있어 어느 정도 익숙한 편이고, 많이 쓰이는 JS 라이브러리이다 보니까 더욱 배워보고 싶었다.

## 생각해보아야 할것들
유저들의 운동능력을 평가하는 방법이 너무 비효율적이고 귀찮다. 웹사이트에 공유하여 유저들이 자체적으로 평가하는 방법도 생각해봤지만 몇몇 트롤 유저들의 영향을 많이 받을 것 같고, 내가 일일히 확인하자니 유저들이 영상을 제출하는것도 귀찮고 내가 확인하는 것도 귀찮다.

## 앞으로의 계획
이미 기본적인 큰 틀은 잡혀있고, 로그인 기능이나 각 필요한 페이지들을 만들고 Router로 연결하는 등의 작업들도 마쳤다. 앞으로는 각 페이지에서 쓰일 CRUD 기능들을 먼저 만들고 세부적인 조정에 들어간 후 마지막으로 디자인을 할 예정이다. 아마 늦어도 방학이 끝나기 전에는 완성이 될것이다.

```toc

```