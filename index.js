// https://api.unsplash.com/search/photod?page=1&query=dog&client_id=accesskey

const accessKey = "D9erMs7I_mBP0JUIIlI-3oEFKRxJ42l5IItNKNUITqw";

let searchForm = document.getElementById("search_form");
let searchBox = document.getElementById("search_box");
let searchResults = document.getElementById("search_results");
let showMorebtn = document.getElementById("show_more_btn");

let keyword = "";
let page = 1;

async function searchImage()
{
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results;
    
    if(page === 1)
    {
        searchResults.innerHTML = "";
    }

    results.map(result=>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        searchResults.append(image);
    });
    showMorebtn.style.display="block";
}


searchForm.addEventListener("submit",e=>{
    e.preventDefault();
    searchImage();
});

showMorebtn.addEventListener("click",e=>{
    page++;
    searchImage();
})