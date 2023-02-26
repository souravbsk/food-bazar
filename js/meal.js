const mealDbDataLoad = async (foodName) => {
    loadingCheack(true)
    const foodWarper = document.getElementById('foodWarper');
    const errorMessage = document.getElementById('error-message');
    
    foodWarper.textContent = ' ';
    document.getElementById('show-All').style.display = 'none';
    let serachName = 'chicken'
    if(foodName){
        serachName = foodName;
    }
    else{
        serachName = 'chicken'
    }
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${serachName}`
    const res = await fetch(url);
    const data = await res.json();
    if(!data.meals){
        loadingCheack(false)
        errorMessage.classList.remove('hidden')
        return;
    }
    else{
        errorMessage.classList.add('hidden')
    displayUi(data.meals)


    }

    
}

const displayDataShow = (foodArraY) => {
    const foodWarper = document.getElementById('foodWarper');
    foodWarper.textContent = ' ';
    
    foodArraY.forEach(data => {
        const foodDiv = document.createElement('div');
        foodDiv.classList.add("card","card-side","bg-base-100","shadow-xl")
        foodDiv.innerHTML = `
        <figure><img class="" src=${data.strMealThumb} alt="Movie"/></figure>
        <div class="card-body">
          <h2 class="card-title" title=${data.strMeal}>${data.strMeal.length > 50 ? data.strMeal.slice(0,50) + '...' : data.strMeal}</h2>
          <p>${data.strInstructions.length > 150 ? data.strInstructions.slice(0,150) + '...' : data.strInstructions}</p>
          <div class="card-actions">
          <label for="my-modal">
          <a onclick="foodDetail(${data.idMeal})" class="link link-warning font-semibold">View Details</a>
          </label>
          </div>
        </div>
        `
        foodWarper.appendChild(foodDiv)
       });
       loadingCheack(false)
}

const errorHandling = (data) => {
    
}
const displayUi = (datas) => {
    console.log(datas)
   
    const button = document.getElementById('show-All');
  
    let showData;
    if(datas.length > 6){
        showData = datas.slice(0,6);
        button.style.display = 'block'
        button.style.margin = '0 auto'
    }
    else{
        showData = datas;
        button.style.display = 'none'
    }
    displayDataShow(showData)
    document.getElementById('show-All').addEventListener('click',() =>{
        const button = document.getElementById('show-All');
        
        const btnClasses = button.className;
       
        if(btnClasses.includes('hidebtn')){
            displayDataShow(datas)
            button.innerText = "Less More"
            button.classList.remove('hidebtn')
        }
        else{
            displayDataShow(showData)
            button.innerText = "Show More"
            button.classList.add('hidebtn')
        }
    })
   

}

const loadingCheack = (isLoading) => {
    const progressId = document.getElementById('progress-bar');
    if(isLoading){
        progressId.classList.remove('hidden')
    }
    else{
        progressId.classList.add('hidden')

    }
}

const foodDetail = async (mealId) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    const res = await fetch(url);
    const data = await res.json();
    displaySingleData(data.meals[0])
console.log(mealId)
}


const displaySingleData = (item)=>{
    const modelWarper = document.getElementById('model-warper');
    modelWarper.textContent = ' ';

    const itemDiv = document.createElement('div');
    itemDiv.innerHTML = `
    <h2 class="card-title" id="title-item">${item.strMeal}</h2>
                        <figure class="pt-10">
                            <img  src=${item.strMealThumb} alt="Shoes"
                                class="rounded-xl w-full" />
                        </figure>
                        <div class="card-body px-0">
                            <p class="font-medium">Category : <span class="font-normal" id="category-name">${item.strCategory}</span></p>
                            <p class="font-medium">Area : <span class="font-normal" id="area-name">${item.strArea}</span></p>
                            <p class="font-medium">Instructions : <span class="font-normal" id="Instructions-text">${item.strInstructions}</span></p>
                            <button class=""><a id="youtube-link" src=${item.strYoutube} class="link link-secondary">Youtube</a></button>
                        </div>
                        <div class="modal-action">
                            <label for="my-modal" class="btn">X</label>
                        </div>
    `
    modelWarper.appendChild(itemDiv)
 
}

document.getElementById('getSearchInput').addEventListener('click',function(e){
    e.preventDefault()
    loadingCheack(true)
    const getInputValue = document.getElementById('getInputField').value;
    mealDbDataLoad(getInputValue)
 })
 mealDbDataLoad()