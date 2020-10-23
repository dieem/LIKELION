# Dreamary_Class


### URL Path의 구조
* Path의 구조  
  ` path('URL', views 내부의 함수, name="url의 이름"), `

### Template 언어란?
Python 변수 & 문법을 HTML에서 쓸 수 있도록 Django에서 제공하는 언어

### Static File이란?
이미지나 CSS, JS 파일처럼 내용이 고정되어 있어, 응답을 할 때 파일 그대로를 보내주면 되는 파일

---

### Model이란?
데이터에 접속하고 관리하도록 도와주는 객체
장고와 DB가 소통할 수 있도록 도와주는 역할을 함

### Model 생성 & 적용
* __modes.py__    # 모델명의 첫 글자는 무조건 대문자!
```
class Designer(models.Model):
	image = models.ImageField(upload_to = 'images/'
	name = models.CharField(max_length = 50)
	address = models.CharField(max_length = 255)
	description = models.TextField()
```
* __Terminal__
  - DB가 알아듣도록 번역하기  
  ` python manage.py makemigrations (+ App 이름) `
  - 번역한 내용을 DB에 적용  
  ` python manage.py migrate (+ App 이름) `

---

### Admin 기능
* Django는 웹 서비스 관리를 위한 admin 기능 기본 제공
* __Terminal__  
  ` python manage.py createsuperuser `

* Admin에게 Model 알려주기
  - __admin.py__
    ```
    from . models import Designer
    admin.site.register(Designer)
    ```
    
---
### QuerySet이란?
전달받은 모델의 객체 목록
* __views.py__ 
  ```
  # Model의 존재 알려주기
  from .models import Designer
  
  # Queryset을 Templates로 보내기
	def home(request):
	designers = Designer.objects.all()
	return render(request, 'home.html', {'designers':designers})
   ```
  
---
### Detail Page 구현
* 각각의 글을 어떻게 분류하지?  ->  __PK(Primary Key)__  

  > PK (Primary Key): Model을 통해 생성된 객체들을 구분할 수 있는 "고유한" key
  
* urls.py에서 글마다 Path를 만들어야 하는 건가?  ->  __Path Convertor__  

  > Path Convertor: 여러 객체의 url을 "계층적으로, 효율적으로" 다룰 수 있도록 도와주는 도구  
  * __urls.py__  
	` path('profile/<int:designer_id>/', views.detail, name="detail"), `
  * __Template__  
	` {% url 'detail' designer.id %} `  
	
* 만약 없는 글을 불러오려고 하면 어쩌지?  ->  __get_object_or_404__  

  > get_object_or_404: Object를 가져오려 했는데 없을 경우 나타나는 에러
  * views.py
  ```
  from django.shortcuts import render, get_object_or_404
  def detail(request, designer_id):
	designer = get_object_or_404(Designer, pk=designer_id)
	return render(request, 'detail.html', {'designer':designer}
  # views.py의 pk 변수명과 urls.py의 변수명은 같아야 함!
  ```
### Detail Page 구현 정리
1. Server에게 특정 객체를 달라고 Request
2. 이에 대한 URL을 서버에게 알림
3. 객체 반환 or 404 Error 호출

---
### URL Include
App 별로 URL을 관리할 수 있도록 구조화
* __Cinema /urls.py__
```
path('movie/action/1', Movie.~~),
path('movie/action/2', Movie.~~),
path('movie/romance/1', Movie.~~),
path('user/register', User.~~),
path('user/delete', User.~~),
path('ticket/purchase', Ticket.~~),
path('ticket/change', Ticket.~~),
```  
  
▼  
▼  
     
* __Cinema /urls.py__
```
path('movie/', include('Movies.urls)),
path('user/', include('User.urls)),
path('ticket/', include('Ticket.urls)),
```
* __Movie /urls.py__  
` path('', views.introduce.~~), `

* __User /urls.py__  
` path('register/', views.~), `

* __App  App 폴더 내에 urls.py 생성 후,__
```
from django.urls import path
from . import views

Urlpatterns = [~~~]
```

* __Project /urls.py__  
```
from django.urls import path, include

urlpatterns = [
	path('url/', include('app이름.urls'),
]
```

---
### Template 상속
중복 코드를 base.html에 작성  
home.html과 new.html에 미리 작성된 base.html을 연결   
  
---
## CRUD
### Create Read Update Delete
  
### GET / POST
클라이언트에서 서버로 요청을 보내는 방법

| GET | POST |
|-----|-------|
| Data를 "URL"에 포함시켜 전송 | Date를 "Body"에 넣어 전송(URL에서 노출 X) |
| 전송하는 길이에 제약 O | 전송하는 길이에 제약 X |
| Caching 가능 | Caching 불가능 |
| (REST에서 데이터 조회에 활용) | (REST에서 데이터 생성에 활용) |
| -> READ에서 활용 | -> CREATE / UPDATE 에서 활용 |

---
### CREATE
새로운 객체를 생성해 Data를 저장

* __객체 생성__  
```
if request.method == 'POST':
	post = Designer()
```  

* __입력 Data 저장__
```
post.name = request.POST['name']
post.address = request.POST['address'] ...

post.save()
```  
---
### UPDATE
정보 수정이 필요한 객체를 찾아 Data를 새롭게 저장

* __객체 탐색__
```
post = get_object_or_404(Designer, pk=designer_id)
if request.method == 'POST':
```
  
* __입력 Data 저장__
```
post.name = request.POST['name']
post.address = request.POST['address'] ...

post.save()
```

---
### DELETE
제거가 필요한 객체를 찾아 삭제

* __객체 탐색__  
 ` post = get_object_or_404(Designer, pk=designer_id) `

* __객체 삭제__  
 ` post.delete() `
 
 * __Home으로 이동__  
 ` return redirect('home') `
 
 ---
 ## 패키지 종속성 관리
내 환경에서 어떤 패키지를 어떤 버전으로 사용하고 있는지 알려주는 것

* __패키지 설치__  
  ` pip install -r requirements.txt `  
 
* __패키지 정의__  
  ` pip freeze > requirements.txt `
 
 ---
