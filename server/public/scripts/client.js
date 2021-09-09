$(document).ready(onReady);

function onReady() {
    getSongs();
    $('#add').on('click', postSong);
    $('#songsTableBody').on('click', '.delete-button', deleteSong);
    $('#songsTableBody').on('click', '.update-button', setRankToOne);
}

// get artist data from the server
function getSongs() {
    $("#songsTableBody").empty();
    $.ajax({
        type: 'GET',
        url: '/songs'
    }).then(function (response) {
        console.log("GET /songs response", response);
        // append data to the DOM
        for (let i = 0; i < response.length; i++) {
            $('#songsTableBody').append(`
                <tr>
                    <td>${response[i].artist}</td>
                    <td>${response[i].track}</td>
                    <td>${response[i].rank}</td>
                    <td>${response[i].published}</td>
                    <td>
                        <button 
                            data-id="${response[i].id}"
                            data-artist="${response[i].artist}"
                            class="delete-button">
                            Delete
                        </button>
                    </td>
                    <td>
                        <button
                        data-id="${response[i].id}"
                        class="update-button">
                        Change Rank to 1
                        </button>
                    </td>
                </tr>
            `); // TODO: Add .catch
        }
    });
}

function deleteSong() {
    // TODO: id of song to delete
    const songId = $(this).data('id');
    // Data with the attribute 'id'
    $.ajax({
        method: 'DELETE',
        url: `/songs/${songId}`,
    }).then(function (response) {
        console.log('Item deleted!');
        getSongs(); // Refresh list of songs
    }).catch(function (error) {
        alert('Something went wrong!')
        console.log('Error in DELETE', error);
    })
}

function setRankToOne(){
    const songId = $(this).data('id');
    $.ajax({
        method: 'PUT',
        url: `/songs/${songId}`
    }).then(function(response) {
        console.log('Rank set to 1!');
        getSongs();
    }).catch(function(error) {
        alert('something went wrong QQ');
        console.log('Error in PUT', error);
        
    })
}

/**
 * Send a song to the server when the user clicks on 'Add'
 */

function postSong() {
    let payloadObject = {
        artist: $('#artist').val(),
        track: $('#track').val(),
        rank: $('#rank').val(),
        published: $('#published').val()
    }
    console.log('Calling /songs POST');

    $.ajax({
        type: 'POST',
        url: '/songs',
        data: payloadObject
    }).then(function (response) {
        $('#artist').val(''),
            $('#track').val(''),
            $('#rank').val(''),
            $('#published').val('')
        getSongs();
    }); // TODO: Add .catch
}