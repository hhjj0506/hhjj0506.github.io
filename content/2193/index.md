---
emoji: 🎇
title: '[백준] 2193 - 이친수'
date: '2022-08-04 14:30:00'
author: 김형진
tags: 백준 2193 dp dynamic programming ps
categories: 알고리즘
---

## 문제
0과 1로만 이루어진 수를 이진수라 한다. 이러한 이진수 중 특별한 성질을 갖는 것들이 있는데, 이들을 이친수(pinary number)라 한다. 이친수는 다음의 성질을 만족한다.

이친수는 0으로 시작하지 않는다.
이친수에서는 1이 두 번 연속으로 나타나지 않는다. 즉, 11을 부분 문자열로 갖지 않는다.
예를 들면 1, 10, 100, 101, 1000, 1001 등이 이친수가 된다. 하지만 0010101이나 101101은 각각 1, 2번 규칙에 위배되므로 이친수가 아니다.

N(1 ≤ N ≤ 90)이 주어졌을 때, N자리 이친수의 개수를 구하는 프로그램을 작성하시오.

## 풀이
먼저 N의 숫자에 따른 가능한 모든 이친수를 직접 찾아보며 시작했다. N = 1일때 이친수의 숫자는 1, N = 2일 때 동일, N = 3일 때 2, N = 4일 때 3 ...

여기까지 찾았다면 백준에서 문제를 어느정도 풀어본 사람들은 모두 알만한 시퀀스가 보이기 시작한다. 100% 확실하지는 않았지만 피보나치 시퀀스를 구현하여 제출하니 싱겁게 AC를 받았다...

## 코드
```cpp
#include <iostream>
#include <algorithm>
using namespace std;

long long dp[91];

int main()
{
    cin.tie(NULL);
    ios_base::sync_with_stdio(false);

    /*
    n = 1: 1 == 1
    n = 2: 10, 11 == 1
    n = 3: 100, 101, 110, 111 == 2 (100, 101) 
    n = 4: 1000, 1001, 1010, 1011, 1100, 1101, 1110, 1111 == 3 (1000, 1001, 1010)
    n = 5: 10000, 10001, 10010, 10101, 10100

    마지막 숫자가 0이라면 0과 1 모두 들어갈 수 있지만, 1일 때는 0밖에 들어갈 수 없다.
    그냥 피보나치 수열인데 dp를 int로 선언했어서 바로 틀려버렸다.
    long long으로 선언하니 바로 해결...
    */

    int num;
    long long ans;

    cin >> num;
    
    dp[1] = 1;
    dp[2] = 1;

    for (int i = 3; i <= num; i++) {
        dp[i] = dp[i - 1] + dp[i - 2];
    }

    ans = dp[num];
    cout << ans;

    return 0;
}
```


```toc

```