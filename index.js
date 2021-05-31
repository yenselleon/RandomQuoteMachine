const blockquote = document.querySelector('.blockquote');
const btnNewQuote = document.querySelector('#new-quote');


window.onload = () =>{
    loading();

}

const loading = ()=> {
    btnNewQuote.setAttribute('disabled', 'true');

    htmlPureHtmlLoadingBody = `
        <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    `;

    let createHtmlDivRotate = document.createElement('div');
    createHtmlDivRotate.innerHTML = htmlPureHtmlLoadingBody;

    blockquote.append(createHtmlDivRotate.firstElementChild);

    setTimeout(()=>{
        blockquote.innerHTML = '';
        getNewQuote();
        btnNewQuote.removeAttribute('disabled');

    }, (Math.random() * (1500 - 3100) + 1500));
}


const getNewQuote = () => {

    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
        .then(response => response.json())
        .then(data => {
            let randomNumber = Math.floor(Math.random() * 99);
            createNewQuote(data.quotes[randomNumber])
        }).catch(console.log);
        
}


const createNewQuote = (dataQuote) => {
    let htmlQuoteBody = `
        <p id="text">${dataQuote.quote}</p>
        <footer class="blockquote-footer" id="author">${dataQuote.author}</footer>
    `;

    let createHtmlDiv = document.createElement('div');
    createHtmlDiv.innerHTML = htmlQuoteBody;

    return blockquote.append(createHtmlDiv);
}

btnNewQuote.addEventListener('click', ()=> {

    blockquote.innerHTML = '';
    loading();
    

});

