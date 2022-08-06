# 🏢 프리온보딩 6차 과제 - 호텔 예약 사이트

1. [프로젝트 소개](#1-프로젝트-소개)
2. [구현 기능](#2-구현-기능)
3. [프로젝트 구조](#3-프로젝트-구조)
4. [역할](#4-역할)
5. [프로젝트 제작 과정](#5-프로젝트-제작-과정)
6. [프로젝트 설치 및 실행](#6-프로젝트-설치-및-실행)

<br/>

<!-- 배포 후 수정
<br /> -->

## 1. 프로젝트 소개

- 개요: 원티드 프리온보딩 5기 6번째 팀 과제
- 주제: Triptoz - 호텔 예약사이트 개발
- 기간: 2022.08.01 ~ 2022.08.05

<br />

## 2. 구현 기능

### 🔥 과제 요구 기능

- [x] 체크 인/아웃 날짜를 선택할 수 있는 캘린더 구현
- [x] 투숙객 수를 입력할 수 있는 인풋 폼 구현
- [x] 제공되는 hotels.json 파일의 데이터 중 체크 인/아웃 기간과 인원수에 해당하는 호텔들을 조회
- [x] 조회 된 호텔을 무한 스크롤로 노출
- [x] 호텔 하나를 선택하게 되면 선택한 (체크 인/아웃 - 투숙객 수 - 호텔명) 정보를 가지는 데이터를 로컬 스토리지에 json타입으로 저장.

<br />

## 3. 프로젝트 구조

```
📁 server
├── database
│   ├── db.json
└── index.js
📁 src
├── @types
├── api
│   ├── http
│   ├── instance
│   └── models
├── assets/icons
├── components
│   ├── @common
│   │   ├── Header
│   │   └── Layout
│   │   └── Spinner
│   ├── CheckInOutCalendar
│   │   ├── Body
│   │   └── Calendar
│   │   └── DateList
│   │   └── Header
│   │   └── CalendarInput
│   ├── HotelList
│   │   ├── HotelCart
│   │   └── HotelList
│   ├── Search
│   │   ├── GuestCounter
│   │   └── GuestCountInput
│   │   └── SearchInput
│   │   └── Search
│   ├── Skeleton
│   │   ├── Skeleton
│   │   └── SkeletonItem
├── hooks
│   ├── useCalendar
│   ├── useFetchHotel
│   ├── useInfiniteScroll
│   ├── useReservation
├── constants
│   ├── error
│   └── validation
├── hooks
│   ├── usePagination
│   ├── useSeearchUser
│   └── useToggleButton
├── pages
│   ├── ConfirmPage
│   ├── MainPage
├── recoil
│   ├── atoms
│   ├── selectors
├── routes
├── types
│   ├── api.d.ts
│   ├── calendar
│   ├── enum
│   ├── guest
│   ├── headerMenu
│   └── styled.d.ts
├── utils
│   ├── createArray
│   ├── formatCheckInOutText
│   ├── formatDateToString
│   ├── getDefaultSevenDayLater
│   ├── getFullSearchQuery
│   ├── getHotelImage
│   ├── getNights
│   ├── getTotalPage
├── App.tsx
└── index.tsx
```

<br />

## 4. 역할

| 성함                                     | 담당 역할                                                                       |
| ---------------------------------------- | ------------------------------------------------------------------------------- |
| [양아름](https://github.com/areumsheep)  | 검색창 호텔 입력 및 인원 선택, 검색시 호텔 리스트 변경                          |
| [조현호](https://github.com/hajun2)      | 기본 레이아웃 구축 및 localsotrage로 데이터 추가 삭제 구현                      |
| [최창열](https://github.com/pinkdumbbel) | 캘린더(체크인 / 체크아웃) 구현 및 스켈레톤 UI 구현                              |
| [최중재](https://github.com/joong8812)   | data fetching module 구현 및 호텔 목록 infinite 스크롤 개발, 모바일 반응형 대응 |

<br />

## 5. 프로젝트 제작 과정

### [1] 컨벤션은 협의하여 아래와 같이 정의하였습니다 🥳

| 커밋명      | 내용                                             |
| ----------- | ------------------------------------------------ |
| ✨ feat     | 파일, 폴더, 새로운 기능 추가                     |
| 🐛 fix      | 버그 수정                                        |
| 💄 style    | 코드 스타일 변경                                 |
| 📝 docs     | 문서 생성, 추가, 수정(README.md)                 |
| ♻️ refactor | 코드 리팩토링                                    |
| 💩 chore    | 코드 수정 (JSON 데이터 포맷 변경 / scss 변경 등) |

자세한 내용은 [여기](https://github.com/wanted-running-sheep/trip/issues/1)에서 확인해주세요!

### [2] 각자 원하는 컴포넌트를 선택한 뒤 정해진 기한까지 작업한 뒤 병합하였습니다 🏃

- 각자가 개발하고 싶은 기능을 나눠 개발 하였습니다.

<br/>

## 6. 프로젝트 설치 및 실행

1. Git Clone

```command
$ git clone
```

2. 프로젝트 실행

```
// window
$ npm install
$ npm run server
$ npm run start

// mac
$ npm install
$ npm run dev
```
