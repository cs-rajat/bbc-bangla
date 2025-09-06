const categoryContainer = document.getElementById('categoryContainer')
const newsContainer = document.getElementById('newsContainer')

const loadCategory = () =>{

    fetch('https://news-api-fs.vercel.app/api/categories')
    .then(res => res.json())
    .then(data => showCategory(data.categories))

   .catch(err => console.log(err))
  
}

const showCategory = (categories) =>{
    // console.log(categories)
    categories.forEach(cat => {
        categoryContainer.innerHTML += `<li id="${cat.id}" class="border-red-600">${cat.title}</li>`
    });
 }

    categoryContainer.addEventListener('click', (e) =>{

        const allLi = document.querySelectorAll('li')
        // console.log(allLi)

        allLi.forEach(li=>{
            li.classList.remove('border-b-4')
        })
        
        if(e.target.localName === 'li'){
        //   console.log(e.target.id);
          e.target.classList.add('border-b-4')
          loadNewsByCategory(e.target.id)
        }

    })
    
    const loadNewsByCategory = (categoryId) => {
       console.log(categoryId)
     fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
         .then(res => res.json())
         .then(data => showNews(data.articles))

      .catch(err => console.log(err))

    }
    const showNews = (articles) =>{
        console.log(articles)
    newsContainer.innerHTML="" 
    articles.forEach(article =>{
        newsContainer.innerHTML+= `
        <div>
            <div>
            <img src="${article.image.srcset[5].url}">
            </div>
           <h1>${article.title}</h1>
           <p>${article.time}</p>
        </div>

        `
      })
}


loadCategory();
loadNewsByCategory('main');