// Get the modal
var modal = document.getElementById("myModal");
var btnOpenModal = document.getElementsByClassName('btn-modal')[0];
var btnCardsGetPosts = document.getElementsByClassName('btn')[0];
var btnModalGetPosts = document.getElementsByClassName('btn')[1];

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
let posts = [];

var form = document.getElementsByClassName("form")[0];
var container = document.createElement('div');
let count = 1;

function getPosts() {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then((json) => {
                posts = json
                resolve(json)
            })
    })
}

function outputPosts () {
    let postsModal = posts.slice(0, 10);
    console.log(postsModal)
    postsModal.forEach(el => {
        var element = document.createElement('div');
        element.append(`${el.id}: ${el.title}`);
        form.append(element);
    })
}

function outputCards () {
    if (count <= 10) {
        let postsModal = posts.slice(10*count - 10, 10*count);
        console.log(postsModal)
        postsModal.forEach(el => {
            var element = document.createElement('div');
            element.className = 'card';
            element.innerHTML = '<b>' + el.title + '</b><br>' + el.body;
            container.append(element);
        })
        count += 1
    }
}

function openModal () {
    modal.style.display = 'block';
}

function closeModal () {
    modal.style.display = 'none';
}

btnOpenModal.addEventListener('click', openModal);
span.addEventListener('click', closeModal);
btnModalGetPosts.addEventListener('click', () => {
    count = 1;
    container.innerHTML = '';
    form.innerHTML = '';
    closeModal();
    if (posts.length === 0) {
        getPosts()
            .then(() => {
                outputPosts()
            })
    } else {
        outputPosts()
    }
})
btnCardsGetPosts.addEventListener('click', () => {
    if (count === 1) {
        form.innerHTML = '';
        container.className = 'cards';
        form.append(container);
    }
    if (posts.length === 0) {
        getPosts()
            .then(() => {
                outputCards()
            })
    } else {
        outputCards();
    }
})

