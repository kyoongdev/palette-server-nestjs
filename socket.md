# Chatting Socket API



## joinRoom

### 설명
채팅방에 입장할 때 사용합니다.
### 요청


| Name | 타입 | Nullable | 설명 |
| --- | --- | --- | --- |
| opponentId | string | true | 채팅방이 없을 경우 상대방 user id |
| roomId | string | true | 채팅방이 있을 경우 채팅방 id |


### 응답


| Name | 타입 | Nullable | 설명 |
| --- | --- | --- | --- |
| roomId | string | true | 채팅방 id |
## sendMessage

### 설명
-
### 요청


| Name | 타입 | Nullable | 설명 |
| --- | --- | --- | --- |
| content | string | undefined | 메세지 내용 |
| roomId | string | undefined | 채팅방 id |
| opponentId | string | undefined | 상대방 id |


### 응답


| Name | 타입 | Nullable | 설명 |
| --- | --- | --- | --- |
---