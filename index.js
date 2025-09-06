const categoryContainer = document.getElementById('categoryContainer')
const newsContainer = document.getElementById('newsContainer')
const bookmarkContainer = document.getElementById('bookmarkContainer')
let bookmarks =[];

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
    //    console.log(categoryId)
     fetch(`https://news-api-fs.vercel.app/api/categories/${categoryId}`)
         .then(res => res.json())
         .then(data => showNews(data.articles))

      .catch(err => console.log(err))

    }
    const showNews = (articles) =>{
        // console.log(articles)
    newsContainer.innerHTML="" 
    articles.forEach(article =>{
        newsContainer.innerHTML+= `
        <div class="border border-gray-300 rounded-b-md">
            <div>
            <img class="w-full block" src="${article.image.srcset[5].url}">
            </div>
            <div id="${article.id}" class="p-2">
                 <h1 class="font-bold">${article.title}</h1>
                 <p class="text-gray-500 my-2">${article.time}</p>
                 <button class="btn">Bookmark</button>
            </div>
         
        </div>

        `
      })
}
newsContainer.addEventListener('click',  (e)=>{
    //   console.log(e.target);
    if(e.target.innerText==='Bookmark'){
        // console.log('Bookmark Button Clicked')
       handleBookmark(e)
    }
        
})

const handleBookmark = (e)=> {
    const title = e.target.parentNode.children[0].innerText;
        const id = e.target.parentNode.id;
        // console.log(id);

        bookmarks.push({
            title : title,
            id : id,
        })
        showBookmark(bookmarks)
}

const showBookmark= (bookmarks) =>{
    console.log(bookmarks)
    bookmarkContainer.innerHTML='';
    bookmarks.forEach(bookmark => {
        bookmarkContainer.innerHTML+=`
        <div class="border border-gray-300 p-2">
            <h1>${bookmark.title}</h1>

            <button onclick="handleDeleteBookmark('${bookmark.id}')" class="btn btn-xs">Delete</button>
        </div>
        `
    })

};

const handleDeleteBookmark =(bookmarkID)=>{
    console.log(bookmarkID);

    const filterBookmark = bookmarks.filter(bookmark=> bookmark.id !== bookmarkID)
    console.log(filterBookmark)
    bookmarks = filterBookmark
    showBookmark(bookmarks);




}



loadCategory();
loadNewsByCategory('main');