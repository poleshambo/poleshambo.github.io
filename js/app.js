
var pokeAPI = "http://pokeapi.co/api/v1/pokemon/?limit=10";
var photoLink = "http://pokeapi.co/media/img/";
var pokeLink = "http://pokeapi.co/api/v1/pokemon/"
var off = 10;
$('.pkmnInfo').hide();


function displayPhotos(data) {    // Display the grid of photos
  $('.pkmnInfo').empty();
  $('.infoTable').remove();

  $.each(data.objects, function(index){
    var pkmnPageLnk = pokeLink + data.objects[index].pkdx_id;
    var pkmnPhotoLnk = photoLink + data.objects[index].pkdx_id;
    var pkmnType1 = data.objects[index].types;
    var types = [];

    $.each(pkmnType1, function(index){
      if (pkmnType1[index].name == undefined) {
        brake }
        else {
          types.push(pkmnType1[index].name)
        };
      });


    photoHTML = '<div class="pkmnContainer">';
    photoHTML += '<div class="singlePkmn">';
    photoHTML += '<div class="pkmnIcon"><a href="' + pkmnPageLnk + '" class="image">';
    photoHTML += '<img src="' + pkmnPhotoLnk + '.png' + '"></a></div>';
    photoHTML +=  '<div class="pkmnName">' + '<a href="' + pkmnPageLnk + '"> ' 
    + data.objects[index].name + ' </a></div>';  
    photoHTML += '<div class="pkmnType ' + types[0] + '">'  + types[0] + '</div>';
    photoHTML += '<div class="pkmnType ' + types[1] + '">' + types[1];
    photoHTML += '</div></div></div>';
    $('.pkmnList').append(photoHTML);
  });


$('.singlePkmn a').click(function(event){   // Display single pokemon table with stats
  event.preventDefault();
  $('.pkmnInfo').hide();
  $('.infoTable').remove();
  var href = $(this).attr("href");
  var coordinates = $(this).parent().parent().parent().position();

  var top = coordinates.top - 78;


  function displayInfo(data1) {
    var movesTotal = 0;
    var types ='';

    $.each(data1.moves, function(index){
      movesTotal ++;
    });

    $.each(data1.types, function(index){
     types += data1.types[index].name + ' ';
   });

    var infoHTML = '<div class="infoTable">';
    infoHTML +=  '<img src="' + photoLink + data1.pkdx_id + '.png"' + '/>'; 
    infoHTML += '<span class="nameInTable">' + data1.name + '</span>';
    infoHTML += '<table>';
    infoHTML += '<tr><td> Type  </td> <td>'  + types + '</td></tr>'; 
    infoHTML += '<tr><td>Attack </td><td>'  + data1.attack + '</td></tr>';
    infoHTML += '<tr><td>Defense </td><td>'  + data1.defense + '</td></tr>';
    infoHTML += '<tr><td>HP </td><td>'  + data1.hp + '</td></tr>';
    infoHTML += '<tr><td>SP Attack </td><td>'  + data1.sp_atk + '</td></tr>';
    infoHTML += '<tr><td>SP Defence </td><td>'  + data1.sp_def + '</td></tr>';
    infoHTML += '<tr><td>Speed </td><td>'  + data1.speed + '</td></tr>';
    infoHTML += '<tr><td>Weight </td><td>'  + data1.weight + '</td></tr>';
    infoHTML += '<tr><td>Total Moves </td><td>'  + movesTotal + '</td></tr>';
    infoHTML += '</table></div>';

    $('.pkmnInfo').append(infoHTML);
    $(".pkmnInfo").css({"top":top, "display":"inline-block"});
  }
  $.getJSON(href, displayInfo);
});

}

$.getJSON(pokeAPI, displayPhotos);



$('#loadMore').click(function(evt) {  // Load more button
  var limit = 36;
  var pokeAPINew = "http://pokeapi.co/api/v1/pokemon/?limit=" + limit + "&offset=" + off; 
  $('.pkmnInfo').hide();
  $('.pkmnInfo').empty();
  $('.infoTable').remove();
  off += 36;
  $.getJSON(pokeAPINew, displayPhotos);
});





