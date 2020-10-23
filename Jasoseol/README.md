# Jasoseol

자소설 닷컴 클론코딩  
https://jasoseol.com/

---

### Django 기능 확인
* Django 공식 깃허브  
  > https://github.com/django
* Django 공식 문서  
  > https://docs.djangoproject.com/ko/3.0/

---
## Model & Database

### ORM 
python을 SQL처럼 사용할 수 있게 번역해주는 역할

### Model을 DB에 반영하기  
```
$ python manage.py makemigrations  
// database가 알아들을 수 있는 번역파일 생성  
$ python manage.py migrate  
// database 구성해달라고 명령
```  

### 다양한 Field들
| 속성 | Field |
|----|-----|
| Primary Key | AutoField |
| 문자열 | CharField, TextField, SlugField |
| 숫자 | IntegerField, PositiveIntegerField, FloatField |
| 날짜/시간 | DateField, TimeField, DateTimeField |
| 참/거짓 | BooleanField, NullBooleanField |
| 파일 | FileField, ImageField, FilePathField |  
