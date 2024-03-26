const cards = document.querySelector('.cards')
const category = document.querySelector('.category')
const categorySpan = document.querySelectorAll('.category span')

const baseUrl = 'https://newsapi.org/v2'
const apiKey = '&apiKey=5ee17f74aa2d470fa884359265a03b7d'

const backupImage = 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmV3c3xlbnwwfHwwfHx8MA%3D%3D'

async function dataRequest(url) {
    try {
        const response = await fetch(baseUrl + url + apiKey);
        const json = response.json()
        return json;
    } catch (error) {
        console.log(error);
    }
}

function urlRequest(url) {
    dataRequest(url).then(data => {
        data.articles.forEach(item => {
            const date = item.publishedAt.slice(0, 10)
            const time = item.publishedAt.slice(11, 19)


            if (item.title !== '[Removed]') {
                cards.innerHTML += `<div class="card">
                                        <div class="image">
                                            <img src="${item.urlToImage ? item.urlToImage : backupImage}" alt="Default News Image">
                                        </div>
                                        <div class="information">
                                            <div>
                                                <p class="title">${item.title}</p>
                                                <p class="description">${item.description}</p>
                                                <p class="time">
                                                    <span>${time}</span>
                                                    <span>${date}</span>
                                                </p>
                                            </div>
                                            <div class="other">
                                                <span class="source">${item.source.name}</span>
                                                <a class="url" href="${item.url}" target="_blank">Read Article <i class="bi bi-arrow-right"></i></a>
                                            </div>
                                        </div>
                                    </div>`
            }
        });
    })
}

category.addEventListener('click', event => {
    if (event.target.tagName === 'SPAN') {
        cards.innerHTML = ''
        urlRequest(event.target.dataset.id)
        categorySpan.forEach(element => element.classList.remove('active'));
        event.target.classList.add('active')
    }
})

urlRequest("/top-headlines?country=us")
