## MongoDB

## mac 에서 mongoDB 설치

```

- mongo 설치
- 참고
- https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/

- brew 사용 (https://brew.sh/#install)
1. xcode-select --install
2. brew tap mongodb/brew
3. brew tap | grep mongodb
4. brew install mongodb-community

 - services 시작
 brew services start mongodb-community
 brew services stop mongodb-community

- mongod 를 통한 서비 기동시
mongod --config /usr/local/etc/mongod.conf --fork

- mongo 서버 기동
1. brew services list 에서 기동중인지 확인
    => 기동중이 아닐 경우 brew services start mongodb-community 실행
    => 기동중일 경우 mongo
2. mondod => mongo

```

### mongodb 테스트

```
# 테스트 collection 생성 : app 이라는 collection 명으로 생성
db.createCollection("app");

# 테스트 데이터 입력
db.test.insert([
    {"name": "test1", "lecture": "nodejs"},
    {"name": "test2", "lecture": "python"},
    {"member": "test3", "lecture": "python"}
]);
```

### test collection 임시데이터 삽입

```
db.test.insert([
    {
        "title" : "Hello",
        "content" : "첫번째글입니다.",
        "writer" : "admin",
        "hit" : 2
    },
    {
        "title" : "Hi",
        "content" : "두번째 글입니다.",
        "writer" : "admin",
        "hit" : 23
    },
    {
        "title" : "test",
        "content" : "세번째 글입니다.",
        "writer" : "test",
        "hit" : 10
    }
])
```

### 데이터 조회

```
# 기본 test conllection 데이터 조회
db.test.find()

# pretty() 시 깔끔한 형태로 조회가 된다.
db.test.find().pretty()

db.test.find( { "writer" : "admin" } ).pretty()

db.test.find( { "writer" : "admin" , "title" : "Hello" } ).pretty()

조회수 > 20 조회
db.test.find( { "hit" : { $gt : 20 }} ).pretty()

조회수 < 20 조회
db.test.find( { "hit" : { $lt: 20 }} ).pretty()

5 < 조회수 < 20
db.test.find( { "hit" : { $gt : 5 , $lt:20 }} ).pretty()


```

### and 조회

admin 이면서 조회수 10아래

```
db.test.find(
     {
            $and : [
                 { "writer" : "admin" },
                 { "hit" : { $lt:10 } }
             ]
     }
).pretty()

```

### count, sort, limit

```
db.test.find().count()

db.test.find().sort( { "hit" : -1 })

db.test.find().limit(2)

db.test.find().skip(1)
```

### update

```
# 전체 변경 => 명시되지 않음 컬럼은 사라진다.
db.test.update({ "title" : "test" } , {  "content": "content update!" } );

# 명시된 ($set) 한 컬럼만 변경, 명시되지 않아도 값의 변동은 없음
db.test.update(
    { "title" : "Hello" } ,
    {
        $set : {  "content": "content update!" }
    }
)
```

### remove

```
db.test.remove({ "writer" : "test2" })
```

### 연산자

```
- 비교 연산자 정리
$eq 	: 값을 비교하여 동일한 값을 찾는 연산자
$gt 	: 값을 비교하여 지정된 값보다 큰 값을 찾는 연산자
$gte 	: 값을 비교하여 지정된 값보다 크거나 같은 값을 찾는 연산자
$in 	: 배열 안의 값을 비교하여 동일한 값을 찾는 연산자
$lt 	: 값을 비교하여 지정된 값보다 작은 값을 찾는 연산자
$lte 	: 값을 비교하여 지정된 값보다 작거나 큰 값을 찾는 연산자
$ne 	: 값을 비교하여 동일하지 않은 값을 찾는 연산자
$nin    : 배열 안의 값을 비교하여 동일하지 않는 값을 찾는 연산자

- 논리 연산자 정리
$and 	: 배열안 두개 이상의 조건이 모두 참인 경우를 반환
$not 	: 해당 조건이 맞지 않는 경우와 해당 필드가 없는 경우를 모두 반환
$nor 	: 배열안 두개 이상의 조건이 모두 아닌 경우 를 반환
$or 	: 배열안 두개 이상의 조건 중 하나라도 참이면 반환


```
