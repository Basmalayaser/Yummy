
// npx tailwindcss -i ./src/input.css -o ./src/output.css --watch


let navWidth= $(".navbody").innerWidth();

$(document).ready(function(){
      $(".lds-default").fadeOut(200,function(){
        $("#loading").remove()
        $("body").css({overflow:"auto"})
  })
})


$(".navbar").animate({left:-navWidth},500);

function openNavbar(){
    $(".navbar").animate({left:0},500)
    $(".fa-bars").hide()
    $(".fa-xmark").show()
    for (let i = 0; i < 5; i++) {
      $("ul li").eq(i).animate({top: 0}, (i + 5) * 100)
  }
 
}

function closeNavbar(){
  $(".navbar").animate({left:-navWidth},500);
    $(".fa-xmark").hide(10)
    $(".fa-bars").show(10)

    for (let i = 0; i < 5; i++) {
      $("ul li").eq(i).animate({top:100}, 100)
  }

}

let grid=`<div id="gridsystem" class="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4"></div>`


getMeal()

async function getMeal(){
   let responce=await fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
   let meals=await responce.json()
   console.log(meals)
   displayAll(meals)
}


function displayAll(meal){
  let  cartoona=""
  let length
  if(meal.meals.length>20){
    length=20
  }else{
    length=meal.meals.length
  }
  for (let i = 0; i < length; i++) {
    cartoona+=`
         <div class="meal relative overflow-hidden rounded-md" onclick="getrecipeDetails(${
          meal.meals[i].idMeal})">
            <img src="${meal.meals[i].strMealThumb}" alt="" class="w-full">
            <div class="child absolute top-full w-[100%] h-[100%] bg-[#ffffffd3] transition-all duration-700 ps-2">
              <h2 class="text-3xl font-semibold text-black">${meal.meals[i].strMeal}</h2>
            </div>
        </div>
    `
  }
  gridsystem.innerHTML=cartoona
  closeNavbar()
}


async function getrecipeDetails(id){

let responce=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
let details=await responce.json()
   displayRecipeDetails(details)
}


function displayRecipeDetails(meal){

    let ingredients=""
    for (let i = 0; i <20; i++) {
        if(meal.meals[0][`strIngredient${i}`]){
            ingredients+=`
                <p class="bg-[#cff4fc] text-[#055160] font-normal p-3 rounded me-4 mb-9">${meal.meals[0][`strMeasure${i}`]} ${meal.meals[0][`strIngredient${i}`]}</p>
            `
        }   
    }

    let cartoona=` 
       <div class="flex  gap-5">
          <div class="w-4/12">
          <img src="${meal.meals[0].strMealThumb}" alt="" class="w-full rounded-md">
           <h2 class="text-3xl font-semibold pt-5">${meal.meals[0].strMeal}</h2>
        </div>
        <div class="w-8/12">
          <p class="title">Instructions</p>
          <p class="pb-8">${meal.meals[0].strInstructions}</p>
          <p class="title pb-5">Area :${meal.meals[0].strArea}</p>
          <p class="title pb-5">Category :${meal.meals[0].strCategory}</p>
          <p class="title pb-5">Recipes :</p>
          <div class=" flex flex-wrap">${ingredients}</div>
          <p class="title mb-10">Tags :</p>
          <div class="">
            <a href="${meal.meals[0].strSource}" class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">Source</a>
            <a href="${meal.meals[0].strYoutube}" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Youtube</a>
          </div>
        </div>
       </div>

    `
    container.innerHTML=cartoona
    
}

function search(){
  let cartoona=""
  cartoona+=`
      <div class="searchInput text-center">
            <input type="text"  name="searchByName" id="searchByNameinp" placeholder="Search By Name"  class=" focus:drop-shadow-[0_0_.25rem_rgba(40,125,252,0.8)] py-1.5  pr-20  text-gray-900 placeholder:text-gray-400 rounded-md pl-6 bg-black focus:text-white me-5 w-5/12 border border-white">
            <input type="text"  name="searchByFirstLitter" id="searchByFirstLitterinp" maxlength="1" placeholder="Search By First Litter"  class=" focus:drop-shadow-[0_0_.25rem_rgba(40,125,252,0.8)] py-1.5  pr-20  text-gray-900 placeholder:text-gray-400 rounded-md pl-6 bg-black focus:text-white w-5/12  border border-white">
            <div class="grid gap-5 grid-cols-1 md:grid-cols-2 xl:grid-cols-4 pt-20" id="displaySearchedMeal">
  
            </div>
      </div>
  `
  container.innerHTML=cartoona
  closeNavbar()
  
  searchByNameinp.addEventListener("input",function(e){
    searchByNameFun(e.target.value)
})


 searchByFirstLitterinp.addEventListener("input",function(e){
  searchByFirstLitter(e.target.value)
})
}

async function searchByNameFun(name){
  let responce=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
  let data=await responce.json()
  console.log(data)
  displaySerchedMeal(data)
 
}
async function searchByFirstLitter(litter){
  let responce=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${litter}`)
  let data=await responce.json()
  console.log(data)
  displaySerchedMeal(data)
 
}
function displaySerchedMeal(meal){
  let  cartoona=""
  let length
  if(meal.meals.length>20){
    length=20
  }else{
    length=meal.meals.length
  }
  for (let i = 0; i < length; i++) {
    cartoona+=`
         <div class="meal relative overflow-hidden rounded-md" onclick="getrecipeDetails(${meal.meals[i].idMeal})">
            <img src="${meal.meals[i].strMealThumb}" alt="" class="w-full">
            <div class="child absolute top-full w-[100%] h-[100%] bg-[#ffffffd3] transition-all duration-700 ps-2">
              <h2 class="text-3xl font-semibold text-black">${meal.meals[i].strMeal}</h2>
            </div>
         </div>
    `
  }
  displaySearchedMeal.innerHTML=cartoona
}


async function getCategory(){
  let responce=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  let data=await responce.json()
  displayCategory(data)
}

function displayCategory(list){
  console.log(list)
  let  cartoona=""
  for (let i = 0; i < list.categories.length; i++){
    cartoona+=`
         <div class="meal relative overflow-hidden rounded-md" onclick="filterByCategory('${list.categories[i].strCategory}')">
            <img src="${list.categories[i].strCategoryThumb}" alt="" class="w-full">
            <div class="child catlist text-center absolute top-full w-[100%] h-[100%] bg-[#ffffffd3] transition-all duration-700 p-2">
              <h2 class="text-3xl font-semibold text-black">${list.categories[i].strCategory}</h2>
              <p class="text-black">${list.categories[i].strCategoryDescription.split(" ").slice(0,20).join(" ")} </p>
            </div>
        </div>
    `
  }
  closeNavbar()

  container.innerHTML=grid
  gridsystem.innerHTML=cartoona

}

async function filterByCategory(cat){
  let responce=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`)
  let data=await responce.json()
   displayAll(data)
}


async function getArea(){
  let responce=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  let data=await responce.json()
  displayArea(data)
}


function displayArea(area){
  let length
  if(area.meals.length>20){
    length=20
  }else{
    length=area.meals.length
  }
  let cartoona=""
  for (let i = 0; i < length; i++){
    cartoona+=`
    <div onclick="getAreaMeal('${area.meals[i].strArea}')" class=" text-center rounded-md cursor-pointer text-3xl pb-5">
            <i class="fa-solid fa-house-laptop"></i>
            <h3>${area.meals[i].strArea}</h3>
    </div>
    
    `
  }  
  closeNavbar()

  container.innerHTML=grid
  gridsystem.innerHTML=cartoona

}

async function getAreaMeal(area){
  let responce=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
  let data=await responce.json()
  displayAll(data)
}

async function getAllIngredients(){
  let responce=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  let data=await responce.json()
  displayIngredients(data)

  closeNavbar()
}

function displayIngredients(list){

  let length
  if(list.meals.length>20){
    length=20
  }else{
    length=list.meals.length
  }
  console.log(list)
  let  cartoona=""
  for (let i = 0; i < length; i++) {
    cartoona += `
            <div onclick="getIngredientsMeal('${list.meals[i].strIngredient}')" class="text-center cursor-pointer pb-5 text-4xl">
                    <i class="fa-solid fa-drumstick-bite"></i>
                    <h3>${list.meals[i].strIngredient}</h3>
                    <p class="text-sm pt-3">${list.meals[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
            </div>
    `
}
  container.innerHTML=grid
  gridsystem.innerHTML=cartoona

}



async function getIngredientsMeal(ingre){
  let responce=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingre}`)
  let data=await responce.json()
  console.log(data)
  displayAll(data)
}



function contactUs(){
  let cartoona="" 
  cartoona+=`

    <form class="text-center pt-40">
      <div class="grid grid-cols-2 gap-5">
        <div class="">
          <input class=" focus:drop-shadow-[0_0_.25rem_rgba(40,125,252,0.8)] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="yourUserName" type="text" placeholder="Enter Your Name">
          <p id="warningName" class="text-red-500 text-xs italic hidden">Special characters and numbers not allowed</p>
        </div>
        <div class="">
          <input class=" focus:drop-shadow-[0_0_.25rem_rgba(40,125,252,0.8)] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="yourEmail" type="email" placeholder="Enter Your Email">
          <p id="warningEmail" class="text-red-500 text-xs italic hidden">Email not valid *exemple@yyy.zzz</p>
        </div>
        <div class="">
          <input class=" focus:drop-shadow-[0_0_.25rem_rgba(40,125,252,0.8)] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="yourPhone" type="tel" placeholder="Enter Your Phone">
          <p  id="warningPhone" class="text-red-500 text-xs italic hidden">Enter valid Phone Number</p>
        </div>
        <div class="">
          <input class=" focus:drop-shadow-[0_0_.25rem_rgba(40,125,252,0.8)] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="yourAge" type="number" placeholder="Enter Your Age">
          <p id="warningAge" class="text-red-500 text-xs italic hidden">Enter valid age</p>
        </div>
        <div class="">
          <input class=" focus:drop-shadow-[0_0_.25rem_rgba(40,125,252,0.8)] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="userPassword" type="password" placeholder="Enter Your Password">
          <p id="warningPass" class="text-red-500 text-xs italic hidden">Enter valid password *Minimum eight characters, at least one letter and one number:*</p>
        </div>
        <div class="">
          <input class=" focus:drop-shadow-[0_0_.25rem_rgba(40,125,252,0.8)] appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="repassword" type="password" placeholder="Repassword">
          <p id="warningRepass" class="text-red-500 text-xs italic hidden">Enter valid repassword</p>
        </div>
      </div>
      <button id="submitBtn"  class=" cursor-auto mt-8 bg-transparent  text-blue-700 font-semibold  py-2 px-4 border border-blue-500  rounded">Submit</button>

      </form> 
  `
  container.innerHTML=cartoona
  closeNavbar()
  contactEvents()

}


function contactEvents(){

  submitBtn.addEventListener('click',function(e){
    e.preventDefault()

   if(sendUserData()){
    submitBtn.removeAttribute("disabled");
    submitBtn.classList.replace('cursor-auto','cursor-pointer')
    submitBtn.classList.add("hover:bg-blue-500")
    submitBtn.classList.add("hover:text-white")
    

   }else{
    submitBtn.classList.replace('cursor-pointer','cursor-auto')
    submitBtn.setAttribute("disabled", "");
    submitBtn.classList.remove("hover:bg-blue-500")
    submitBtn.classList.remove("hover:text-white")
   }
      
  })

  yourUserName.addEventListener('input',function(e){
    validateInput(/[a-zA-Z0-9]{2,}/,yourUserName,warningName)
  })

  yourEmail.addEventListener('input',function(e){
    validateInput(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,yourEmail,warningEmail)

  })
  yourPhone.addEventListener('input',function(e){
    validateInput(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{5})$/,yourPhone,warningPhone)

  })

  yourAge.addEventListener('input',function(e){
    validateInput(/^(1[89]|[2-9]\d)$/,yourAge,warningAge)
  })

  userPassword.addEventListener('input',function(e){
    validateInput(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,userPassword,warningPass)
  })
   
  repassword.addEventListener('input',function(e){
       validatePass()
  })

}

function validateInput(regex,element,massage){
    let regexPattern=regex;
    if(regexPattern.test(element.value)){
        massage.classList.replace('block','hidden')
        submitBtn.removeAttribute("disabled");
        return true;

    }else{
        massage.classList.replace('hidden','block')
        return false;
    }
   
}

function validatePass(){{
   
  if(userPassword.value==repassword.value){
    warningRepass.classList.replace('block','hidden')
    return true;
  }else{
    warningRepass.classList.replace('hidden','block')
    return false;
  }
  
}
}

function sendUserData(){
  if(
    validateInput(/[a-zA-Z0-9]{2,}/,yourUserName,warningName)==true &&
    validateInput(/^(1[89]|[2-9]\d)$/,yourAge,warningAge)==true &&
    validateInput(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{5})$/,yourPhone,warningPhone)==true &&
    validateInput(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,userPassword,warningPass)==true &&
    validateInput(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,yourEmail,warningEmail)==true&&
    validatePass()==true
  ){
    return true
  }else {
    return false
  }


}

