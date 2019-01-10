document.getElementById('myform').addEventListener('submit',saveBookmark);
function saveBookmark(e)
{
	var siteName =document.getElementById('siteName').value;
	var siteURL=document.getElementById('siteURL').value;


if(!ValidateForm(siteName,siteURL))
{
	return false;
}
var bookmark=
{
Name:siteName,
URL :siteURL
}

//localStorage.setItem('test','helloworld');
//console.log(localStorage.getItem('test'));
//localStorage.removeItem('test');
//console.log(localStorage.getItem('test'));
if(localStorage.getItem( 'bookmarks') === null)
{
	var bookmarks = [];
	bookmarks.push(bookmark);
	localStorage.setItem('bookmarks', JSON.stringify( bookmarks));

}
else
{
	var bookmarks =  JSON.parse(localStorage.getItem( 'bookmarks'));
	bookmarks.push(bookmark);
	localStorage.setItem('bookmarks', JSON.stringify( bookmarks));
}
    document.getElementById('myform').reset();
	fetchBookmarks();

	e.preventDefault();
}
function DeleteBookmark(URL)
{
	var bookmarks = JSON.parse(localStorage.getItem( 'bookmarks' ));
	for(var i=0; i<bookmarks.length; i++)
	{
		if(bookmarks[i].URL==URL){
			bookmarks.splice(i, 1);

		}
	}
	localStorage.setItem('bookmarks', JSON.stringify( bookmarks));
	fetchBookmarks();

}

function fetchBookmarks()
{
	var bookmarks = JSON.parse(localStorage.getItem( 'bookmarks' ));
	var bookmarksResults = document.getElementById('bookmarksResults')

    bookmarksResults.innerHTML='';
	for ( var i =0 ; i< bookmarks.length; i++)
	{
		var Name = bookmarks[i].Name;
	    var URL = bookmarks[i].URL;
	
	console.log(URL);
console.log(Name);
	bookmarksResults.innerHTML +=     '<div class = "well">'+
	                             '<h3>'+Name+ 
	                              
	                              '<a class= "btn btn-default" target="_blank" href="'+URL+'"> Visit</a>' +
	                              '<a onclick="DeleteBookmark(\''+URL+'\')" class= "btn btn-danger"  href="#"> Delete</a>' +
	                              '</h3>'+
	                              '</div>';
     }
}

function ValidateForm(siteName,siteURL)
{
if(!siteName || !siteURL)
{
	alert("please fill in the form");
	return false;
}
var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);
if(!siteURL.match(regex))
{
	alert('please enter a valid URL');
	return false;
}
return true;
}

