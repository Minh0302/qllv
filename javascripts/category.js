const apiBoMon = 'http://localhost:8120/api/bomon';
fetch(apiBoMon)
    .then(function(response) {
        return response.json();
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