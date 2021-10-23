const apiBoMon = 'http://localhost:8122/api/bomon';
fetch(apiBoMon)
    .then(function(response) {
        return response.json();
    })
    .catch(function(error) {
        console.log(error);
    })
    .then(function(posts) {
        var htmls = posts.map(function(post) {
            return `<li> 
                        <a href="">${post.tenBoMon}</a>
                    </li>`;
        })
        var html = htmls.join('');
        document.getElementById('ulRSKeyword').innerHTML = html;
    })