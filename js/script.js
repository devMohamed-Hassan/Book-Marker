//alert("script is working....")
const bookmarkForm = document.getElementById('bookmarkForm');
const siteName = document.getElementById('siteName');
const siteURL = document.getElementById('siteURL');
const bookmarksList = document.getElementById('bookmarksList');

let bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

updateBookmarksTable();

bookmarkForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addBookmark();
});

function addBookmark() {
    const name = siteName.value.trim();
    const url = siteURL.value.trim();
    if (!name || !url) {
        alert('Please fill in both fields.');
        return;
    }
    if (!isValidURL(url)) {
        alert('Please enter a valid URL (e.g., https://example.com).');
        return;
    }
    
    bookmarks.push({ name, url });
    saveBookmarksToLocalStorage();
    updateBookmarksTable();
    bookmarkForm.reset();
}

function updateBookmarksTable() {
    bookmarksList.innerHTML = '';
    bookmarks.forEach((bookmark, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${bookmark.name}</td>
                <td><a href="${bookmark.url}" target="_blank" class="btn btn-success btn-sm">Visit</a></td>
                <td><button class="btn btn-danger btn-sm" onclick="deleteBookmark(${index})">Delete</button></td>
            </tr>
        `;
        bookmarksList.insertAdjacentHTML('beforeend', row);
    });
}

// Delete a bookmark
function deleteBookmark(index) {
    bookmarks.splice(index, 1);
    saveBookmarksToLocalStorage();
    updateBookmarksTable();
}

// Save bookmarks to localStorage
function saveBookmarksToLocalStorage() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

//https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
// URL Validation Function
function isValidURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

