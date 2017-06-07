require('bootstrap-webpack');
var $ = require('jquery');

window.$ = $;

$(function (){
    $('button.delete').on('click', function() {
        console.log("I'm deleted!");
    });
    $('button#add').click(function(e) {
        e.preventDefault();

        var newItem = $('input[name=newTodo]').val();
        var newListItem = $('<li>' + newItem + '<button class="delete">x</button></li>');
        $('ul').append(newListItem);

        $('input[name=newTodo]').val('');
    });
});

// $(function() {
//   $('button#add').click(function(e) {
//     // Make sure the form does not get submitted
//     e.preventDefault();
//
//     // extract the current value of the todo
//     var newTodo = $('input[name=todo]').val();
//
//     // create a completely new (unattached)
//     // list item element (<li>)
//     var newListElement = $('<li></li>');
//
//     // Set its text
//     newListElement.text(newTodo);
//
//     // And add it to the end of the list
//     $('ul').append(newListElement);
//
//     // Then clear out the input element
//     $('input[name=todo]').val("");
//   });
// });
