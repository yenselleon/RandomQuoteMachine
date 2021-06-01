const blockquote = document.querySelector('.blockquote');
const btnNewQuote = document.querySelector('#new-quote');
const tweetQuote = document.getElementById('tweet-quote');
const backgroundColors = [
    '#343f56',
    '#fb9300',
    '#f54748',
    '#0a1931',
    '#1eae98',
    '#21094e',
    '#344fa1',
    '#00adb5',
    '#02475e',
    '#ff6701',
    '#810000',
    '#206a5d',
    '#222831',
];
let randonNumerUsed;

window.onload = () =>{
    getNewQuote();

}

const startLoader = ()=> {
    btnNewQuote.setAttribute('disabled', 'true');

    htmlPureHtmlLoadingBody = `
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;

    let createHtmlDivRotate = document.createElement('div');
    createHtmlDivRotate.innerHTML = htmlPureHtmlLoadingBody;

    return createHtmlDivRotate.firstElementChild;
}

const loading = ()=> {
    console.log('loader component')
    let loader = startLoader()
    blockquote.append(loader);

    loader.classList.add('loading')
    
    updateBackgroundColor();
    let randonNumber = Math.floor(Math.random() * (2000 - 1000)) + 1000;
    
    /* setTimeout(()=>{
        
        getNewQuote();
        btnNewQuote.removeAttribute('disabled');

    }, randonNumber); */
}


const updateBackgroundColor = () => {
    // let radomBackgroundColorIndex = Math.floor(Math.random() * backgroundColors.length);
    const randonIndex = randomUnique(backgroundColors.length -1, 2);

    if(randonNumerUsed === undefined) {
        randonNumerUsed = randonIndex[0];
    } else{
        console.log('nuevo numero')
        randonNumerUsed = randonIndex.filter(n => n !== randonNumerUsed)[0];
    }

    document.documentElement.style.setProperty(`--base`, `${backgroundColors[randonNumerUsed]}` );
}

const getNewQuote = () => {
    
    btnNewQuote.removeAttribute('disabled');
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        .then(response => response.json())
        .then(data => {
            blockquote.innerHTML = '';
            loading();
            let randomNumber = Math.floor(Math.random() * 99);
            /* let loader = document.querySelector('.lds-roller');
            loader.classList.remove('loading')
            loader.classList.add('hiden') */
            

            let randonNumber = Math.floor(Math.random() * (2000 - 1000)) + 1000;
    
            setTimeout(()=>{
                blockquote.innerHTML = '';
                
                btnNewQuote.removeAttribute('disabled');
                createNewQuote(data.quotes[randomNumber])

            }, randonNumber);
            
        }).catch(console.log);
        
}


const createNewQuote = (dataQuote) => {
    let htmlQuoteBody = `
        <p id="text">${dataQuote.quote}</p>
        <footer class="blockquote-footer" id="author">${dataQuote.author}</footer>
    `;

    let createHtmlDiv = document.createElement('div');
    createHtmlDiv.innerHTML = htmlQuoteBody;

    tweetQuote.setAttribute('href',`
    https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${encodeURIComponent('"'+dataQuote.quote+'" '+'- '+dataQuote.author)}
    `)
    return blockquote.append(createHtmlDiv);
}

btnNewQuote.addEventListener('click', ()=> {

    getNewQuote();

});


const randomUnique = (range, count) => {
    let nums = new Set();
    while (nums.size < count) {
        nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
    }
    return [...nums];
}