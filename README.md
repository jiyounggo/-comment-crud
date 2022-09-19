# week3-2 과제

## 7팀 소개

| [팀장 김유영](https://github.com/ezn6) | [구자덕](https://github.com/ted-jv) | [박정훈](https://github.com/Malza0408) | [송창석](https://github.com/SongChangseok) | [이지영](https://github.com/jiyounggo) | [최수진](https://github.com/ssujinc) |
| -------------------------------------- | ----------------------------------- | -------------------------------------- | ------------------------------------------ | -------------------------------------- | ------------------------------------ |

<br>

## 과제 소개

- API 서버와 통신해서 작동하는 댓글 프로젝트를 Redux를 통해 구현
- [과제 안내 링크](https://younuk.notion.site/a8d75feeb90040a1b64bef5944664969)

<br>

## 배포 링크 및 데모 영상

- https://drive.google.com/file/d/1l1UGAMUA84G6pB_HtA9rew5DXGr2LJCI/view?usp=sharing

<br>

## 목차

- [실행 방법](#실행-방법)
- [폴더 구조](#폴더-구조)
- [프로젝트 기능 구현](#프로젝트-기능-구현)
- [프로젝트 설명](#프로젝트-설명)

<br>

<br>

## 실행 방법

```
$ git clone https://github.com/pre-on-boarding-fe-7team/pre-onboarding-assignment-week-3-2-team-7.git
```

```
/* step 1 */

 $ npm i


/* step 2 */

  .env.sample을 참고하여 API 연동한다.


/* step 3 */

 $ npm run api
 $ npm start
```

<br>

## 폴더 구조

<details><summary>폴더 구조
</summary>

```
📦src
 ┣ 📂api
 ┃ ┗ 📜api.js
 ┣ 📂common
 ┃ ┣ 📂hooks
 ┃ ┃ ┗ 📜useAxios.js
 ┃ ┗ 📜constant.js
 ┣ 📂components
 ┃ ┣ 📜CommentList.js
 ┃ ┣ 📜Error.js
 ┃ ┣ 📜Form.js
 ┃ ┣ 📜Loading.js
 ┃ ┗ 📜PageList.js
 ┣ 📂containers
 ┃ ┣ 📜CommentListContainer.js
 ┃ ┣ 📜FormContainer.js
 ┃ ┗ 📜PageListContainer.js
 ┣ 📂modules
 ┃ ┣ 📜comments.js
 ┃ ┣ 📜page.js
 ┃ ┣ 📜rootReducer.js
 ┃ ┗ 📜target.js
 ┣ 📂util
 ┃ ┗ 📜async.utill.js
 ┣ 📜App.js
 ┗ 📜index.js

```

</details>

<br>

---

<br>

## 프로젝트 기능 구현

![https://user-images.githubusercontent.com/12206933/83601436-8e15b780-a5ab-11ea-91ad-04a302579c90.gif](https://user-images.githubusercontent.com/12206933/83601436-8e15b780-a5ab-11ea-91ad-04a302579c90.gif)

- 댓글 불러오기, 작성, 수정, 삭제가 API 서버와 통신하여 동작한다.
- 댓글을 작성하고 난 뒤 다른 페이지에 위치하고 있었더라도 1페이지로 이동되고, 입력 폼이 초기화 된다.
- 댓글 수정하고 난 뒤 현재 보고있는 페이지 유지되고, 입력 폼 초기화 된다.
- 삭제하고 난 뒤 1페이지로 이동된다.
- 페이지네이션 적용
- Redux logger, Redux-Devtools 적용

<br>

<br>

## 프로젝트 설명

<br>

### 기술 스택

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&amp;logo=React&amp;logoColor=black"> <img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&amp;logo=Redux&amp;logoColor=white"> <img src="https://img.shields.io/badge/Redux-Saga-999999?style=flat-square&amp;logo=Redux-Saga&amp;logoColor=white">

#### \* Redux-thunk vs. Redux-saga, saga를 선택한 이유❗❕

- Redux-thunk에서는 thunk함수를 만들어서 해당 함수에서 비동기 작업을 하고 필요한 시점에 특정 액션을 디스패치한다.
- 반면 Redux-saga는 **특정 액션에 대해 모니터링 가능하다.** 특정 액션이 발생했을 때 이에 따라 제너레이터 함수를 실행하여 비동기 작업을 처리 후, 액션이 디스패치 되게끔 하거나 자바스크립트 코드를 실행 할 수 있다.
- 비동기 작업을 할 때 기존 요청을 취소 처리 할 수 있다.
- API 요청이 실패했을 때 재요청하는 작업을 할 수 있다.
- 웹소켓을 사용하는 경우 Channel 이라는 기능을 사용하여 더욱 효율적으로 코드를 관리 할 수 있다.

<br>

<br>

### 👍 **Best Practice**

1. 프리젠테이셔널 컴포넌트와 컨테이너 컴포넌트로 분리

- 프리젠테이셔널 컴포넌트에서는 UI를 선언하는 것에 집중하며, 필요한 값들이나 함수는 props 로 받아와서 사용했다.
- 컨테이너 컴포넌트에서는 리덕스 스토어의 상태를 조회하거나, 액션을 디스패치 할 수 있는 컴포넌트 이다. 그리고 HTML 태그들을 사용하지 않고 프리젠테이셔널 컴포넌트들을 불러와서 사용한다.

2. 리덕스 모듈과 async.util 분리

- async.util.js에서 해당 액션에 따른 제너레이터 함수를 실행하여 비동기 작업을 처리 후 액션을 디스패치 한다.
- 또한 리덕스 모듈의 리듀서에서 조건에 따른 비동기 관련 액션들을 처리하는 리듀서가 있다.

3. immer 라이브러리를 통해 불변성관리를 하지 않은 이유.

- immer 를 사용하면 불변성관리가 간단해지지만, 성능적으로는 immer를 사용하지 않는게 코드가 더 빠르다.
- Immer 는 JavaScript 엔진의 Proxy 라는 기능을 사용하는데, 구형 브라우저 및 react-native 같은 환경에서는 지원되지 않으므로 (Proxy 처럼 작동하지만 Proxy는 아닌) ES5 fallback 을 사용하게 된다.
  그렇게 ES5 fallback 을 사용하게 되면 기존 immer 를 사용되지 않았을 때와 비교해 속도가 (성능) 두드러지게 느려진다.
