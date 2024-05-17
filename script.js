const apiKey = "Add your api key";

const blogContainer = document.getElementById("blog-container");
const searchButton = document.getElementById("search-button");
const searchField = document.getElementById("search-input");



async function fetchRandomNews(){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?domains=techcrunch.com,thenextweb.com&pageSize=30&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json();
        return data.articles
    } catch (error) {
        console.log("Error fetching random news",error);
        return[]        
    }
}

searchButton.addEventListener("click", async()=>{
    const query = searchField.value.trim();
    if( query !== ""){
        try {
            const articles = await fetchNewsQuery(query)   
            displayBlogs(articles);         
        } catch (error) {
            console.log("Error fetching news by query",error);            
        }
    }
})

async function fetchNewsQuery(query){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=30&apiKey=${apiKey}`
        const response = await fetch(apiUrl)
        const data = await response.json();
        return data.articles
    } catch (error) {
        console.log("Error fetching random news",error);
        return[]        
    }
}


function displayBlogs(articles) {
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");

        const img = document.createElement("img");
        const imgSrc = article.urlToImage ? img.src = article.urlToImage : img.src = "https://placehold.co/600x400"
        img.src = imgSrc; 
        img.alt = article.title;
        
        const title = document.createElement("h2");
        const truncatedTitle = article.title.length > 60 
        ? article.title.slice(0,60) + "..."
        : article.title;
        title.textContent =  truncatedTitle;
        
        const description = document.createElement("p");
        const truncatedDes = (article.description && article.description.length) > 110
        ? article.description.slice(0,110) + "..."
        : article.description ;
        description.textContent =  truncatedDes;
        
        blogCard.appendChild(img)
        blogCard.appendChild(title)
        blogCard.appendChild(description)
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"_blank")
        })
        blogContainer.appendChild(blogCard);


    })    
}





(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (error) {
        console.log("Error fetching random news", error);
    }
})();

