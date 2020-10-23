// 값이 변하지 않는 변수 const a =
// 값이 변하는 변수 let b =

const targetForm = document.querySelector('.jss_content_form')
const counted_text = document.querySelector('.counted_text')

targetForm.addEventListener("keyup", function(){
    counted_text.innerHTML = targetForm.value.length
})