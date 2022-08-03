//html 불러오기
const searchInput = document.querySelector('#search-input')
const resultsList = document.querySelector('#results-list')

//api 연결
function searchArticle(query){
  fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=llGOUtDUMBAK2FPvG9cF77CSSgvv1dEe`)
  .then(response => response.json())
  .then( data => {
    const showData = data.response.docs.map(({abstract, pub_date, web_url}) => ({ abstract, pub_date,web_url }))
    renderResults(showData)
  });
}


//정보 출력하기
function renderResults(e){
  resultsList.innerHTML = ''
  e.forEach(({abstract, pub_date, web_url}) => {
    const liEl = document.createElement('li')
    liEl.innerHTML = `<span>${abstract}</span><span>${pub_date}</span>
    <div><input type="button" value="Clip this"><input type="button" value="See Detail" onClick="window.open('${web_url}')"></div>`
    resultsList.append(liEl)
  })
  
}


// 타이머 함수
let searchTimeout = 0;

window.onload = () => {
  searchInput.onkeyup = (event) => {

    clearTimeout(searchTimeout);

    if(searchInput.value.trim().length === 0){
      return;
    }

    searchTimeout = setTimeout(()=>{
    searchArticle(searchInput.value);
    }, 500 );
  };
}