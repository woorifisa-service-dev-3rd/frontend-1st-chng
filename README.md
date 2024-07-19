### 프로젝트명

![chng_mainlogo](https://github.com/woorifisa-service-dev-3rd/frontend-1st-chng/assets/128590006/1b0e79cd-1281-42cb-9202-755808c9ddcd)

**chng(챈지)**

프로젝트명 “chng(챈지)”는 “exchange(환전)”의 줄임말로, 사용자에게 간단한 환율 계산기를 제공하는 웹 애플리케이션입니다.



### 프로젝트 시연 영상

![1  시연자료](https://github.com/woorifisa-service-dev-3rd/frontend-1st-chng/assets/123541776/a8f7bc09-633b-4896-a52f-cc5346294c94)



### 프로젝트 개요 및 목적

chng는 누구나 간편하게 사용할 수 있으며, 실시간 환율을 토대로 여러 국가의 통화 간 정확한 환율 계산 기능을 제공합니다.

- 실시간 환율 업데이트

회신 환율 데이터를 실시간으로 반영하여 신뢰성 있는 결과를 제공합니다.

- 다양한 통화 변환

미국(달러), EU(유로), 한국(원), 일본(엔), 중국(위안) 총 5가지 대표적인 국가의 통화를 지원하여 다양한 환율 계산이 가능합니다.

- 간편한 사용법

금액을 입력한 뒤 “환율 계산” 버튼 한 번만 클릭하면 됩니다. 직관적이고 사용자 친화적인 인터페이스를 제공합니다.

  

### 팀원 구성

정석진

임지혁

이현아

  

### 사용 스택

Front: `HTML`, `CSS`

버전 및 이슈 관리: `Github`, `Github Issues`, `Github Project`

협업 툴: `Notion`

  

### 이용 방법

https://woorifisa-service-dev-3rd.github.io/frontend-1st-chng/
혹은
git clone https://github.com/woorifisa-service-dev-3rd/frontend-1st-chng.git

환율계산기에 금액을 입력하고 “환율 계산” 버튼을 클릭하기만 하면 선택하신 기준 환율을 알려드립니다.

  

## UI 스타일 가이드라인

### 폰트 서체

Main font

- Noto Sans KR

Sub font (로고에 사용)

- Black Han Sans

  

### 폰트 사이즈

15px ~ 20px 상황에 따라 사용

- “환율 계산기”는 가시성을 위해 20px 사용
- 대부분의 폰트 사이즈는 15px로 고정함

  

### 컬러 배색

BACKGROUND COLOR : black

MAIN COLOR:  #15F4EE 

SUB COLOR: #12FFD8

  

### 여백 및 정렬 여부

중앙 정렬 기본

상황에 따라 양쪽 정렬, 좌측 정렬 사용

margin 및 padding으로 기본 10px 여백 적용


### LightHouse 성능 개선


#### 최초 1회
![image](https://github.com/woorifisa-service-dev-3rd/frontend-1st-chng/assets/123541776/560bd3cd-bb57-4094-b6b9-1c8a649a7b87)

1. Document 변경
2. 기능 추가 전 a태그 -> "#"추가
3. LABELING 추가

#### 이후 성능 향상

![image](https://github.com/woorifisa-service-dev-3rd/frontend-1st-chng/assets/123541776/7c186cdf-0006-41e3-b759-dc1acac28ba6)


#### GitHub 협업 전략
1. Pull Request 포멧 설정
2. Merge시 함께 코드 리뷰

#### Eslint 협업 규칙
1. No Var : 중복 선언을 방지하기 위하여
2. No unused Vars : 의미 없는 변수 생성 방지를 위해서
3. no-underscore-dange : 가능한 변수명의 범위
4. prefer-arrow-callback : 주로 콜백함수를 활용, 활용시 화살표를 사용하는 방식으로 구현을 습관화
5. require-await: async 함수에서 await를 활용하는 습관화.
