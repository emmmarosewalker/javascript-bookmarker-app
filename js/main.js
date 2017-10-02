// listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save bookmark
function saveBookmark(e){
    // get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl,
    } 

    /*    //local storage test
    localStorage.setItem('test','hello world');
    localStorage.removeItem('test');*/

    //test if bookmarks is null
    if(localStorage.getItem('bookmarks') === null){
        //init array
        var bookmarks = [];
        // add to array
        bookmarks.push(bookmark);
        //set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else{
        //get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);
        //re-set back to local storage
        localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
    }
    
    //clear form
    document.getElementById('myForm').reset();
    
    //re-fetch bookmarks
    fetchBookmarks();


    //prevent form from submitting
    e.preventDefault();
}

//delete bookmarks
function deleteBookmark(url){
    //get bookmarks from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //loop through bookmarks
    for (var i = 0; i < bookmarks.length; i++){
        if (bookmarks[i].url == url){
            //remove from array
            bookmarks.splice(i, 1);
        }
    }

    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

    //re-fetch bookmarks
    fetchBookmarks();
}

//fetch bookmarks
function fetchBookmarks(){
    //get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //get output id
    var bookmarksResults = document.getElementById('bookmarksResults');

    //build output
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<h4>' +
            name+'</h4>'
            +'<a class"btn" target ="_blank" href="'+url+'">'+'visit</a>'
            +'<a id="btn-delete" onclick="deleteBookmark(\''+url+'\')" href="#">delete</a>'
        ;
    }
}

function validateForm(siteName, siteUrl){
    if (!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)){
        alert('Please use a valid url');
        return false;
    }
    return true;
}