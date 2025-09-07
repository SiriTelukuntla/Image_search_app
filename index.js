// https://api.unsplash.com/search/photod?page=1&query=dog&client_id=accesskey

const accessKey = "D9erMs7I_mBP0JUIIlI-3oEFKRxJ42l5IItNKNUITqw";

let searchForm = document.getElementById("search_form");
let searchBox = document.getElementById("search_box");
let searchResults = document.getElementById("search_results");
let showMorebtn = document.getElementById("show_more_btn");
let loader = document.getElementById("loader");

let keyword = "";
let page = 1;

function showLoader() {
  loader.style.display = "block";
}
function hideLoader() {
  loader.style.display = "none";
}

async function searchImage(){
    keyword = searchBox.value.trim();
    if (!keyword) return;

    showLoader(); // 🔥 show loading

    try {
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results;
    
    if(page === 1){
        searchResults.innerHTML = "";
    }

    if(!results || results.length === 0){
            searchResults.innerHTML = "<p>No images found 😕</p>";
            showMorebtn.style.display = "none";
        }else{

    results.forEach(result=>{
        const image = document.createElement("img");
        image.src = result.urls.small;
        image.alt = result.alt_description || keyword;
        searchResults.append(image);
    });
    showMorebtn.style.display="block";
}
} catch (err) {
    console.error(err);
        searchResults.innerHTML = "<p> Something went wrong. Try again later.</p>";
        showMorebtn.style.display = "none";
    } finally {
        hideLoader(); // 🔥 hide loading
    }
}


searchForm.addEventListener("submit",e=>{
    e.preventDefault();
     if(searchBox.value.trim() === ""){    // 🔥 prevent empty search
        alert("Please enter a keyword 😊");
        return;
     }
     page = 1;
    searchImage();
});

showMorebtn.addEventListener("click",()=>{
    page++;
    searchImage();
});