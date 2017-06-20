console.log('hello from the other side');

function deleteReview(id) {
  if (confirm("Delete Review?")) {
    var url = '/reviews/' + id + '/delete';
      fetch(url, { method: 'POST', credentials: 'include' })
        .then(function(response) {
          window.location.reload(true);
        })
  }
}
