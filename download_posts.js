axios=require('axios') // We use axios for http requests

var list_of_posts = [];

function getPosts() {
    axios.get('https://jsonplaceholder.typicode.com/posts'). // we make a get request and downloads last 100 posts
    then(function (json) {temp = json.data;
			  list_of_posts = mergePosts(list_of_posts,temp) ;
			  return list_of_posts;}).   // we get the response as a json
    catch(function(error) {console.log('Something went wrong.\nError: '+error)}); // or an error
}

function mergePosts(oldPosts,newPosts) {
    var mergedPosts = [];
    var i=0, j=0, counter=1;

    // We sort the list of posts to implement merge-sort
    oldPosts.sort( (o1,o2) => o1.id < o2.id ? -1 : (o1.id === o2.id ? 0 : 1)  );
    newPosts.sort( (o1,o2) => o1.id < o2.id ? -1 : (o1.id === o2.id ? 0 : 1)  );

    while (i < oldPosts.length && j < newPosts.length) {
	if (oldPosts[i].id < newPosts[j].id) {
	    mergedPosts.push(oldPosts[i]);
	    i++;
	}
	else if (oldPosts[i].id === newPosts[j].id) {
	    mergedPosts.push(oldPosts[i]);
	    i++;
	    j++;
	}
	else if (oldPosts[i].id > newPosts[j].id) {
	    mergedPosts.push(newPosts[j]);
	    j++;
	}
    }
    /* when we reached this part of the code we can be in one of the following situations
     1. i === oldPosts.length but j < newPosts.length, in this case we need to add
     the rest of the newPosts to mergedPosts
     2. j === newPosts.length but i < oldPosts.length (very unlikely) in this case we need
     to add the rest of oldPosts to mergedPosts
     3. both i === oldPosts.length and j === newPosts.length, in this case we have copied everything in mergedPost */
    if ( j < newPosts.length ) {
	for( ; j < newPosts.length; j++)
	    mergedPosts.push(newPosts[j]);
    }
    if ( i < oldPosts.length ) {
	for( ; i < oldPosts.length; i++)
	    mergedPosts.push(oldPosts[i]);
    }
    // Once we reach this part of the code the two arrays have been merged in mergedPosts
    return mergedPosts;
}




exports.getPosts = getPosts;
exports.lists = function () {return list_of_posts;}

