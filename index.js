const categoryContainer = document.getElementById('categoryContainer')

const loadCategory = () =>{

    fetch('https://news-api-fs.vercel.app/api/categories')
    .then(res => res.json())
    .then(data => showCategory(data.categories))

   .catch(err => console.log(err))
  
}

const showCategory = (categories) =>{
    // console.log(categories)
    categories.forEach(cat => {
        categoryContainer.innerHTML += `<li class="border-red-600">${cat.title}</li>`
    });
    categoryContainer.addEventListener('click', (e) =>{

        const allLi = document.querySelectorAll('li')
        console.log(allLi)

        allLi.forEach(li=>{
            li.classList.remove('border-b-4')
        })
        
        if(e.target.localName === 'li'){
          console.log(e.target);
          e.target.classList.add('border-b-4')
        }

    })    
}

loadCategory();