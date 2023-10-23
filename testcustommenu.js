// JavaScript to show the modal
document.querySelectorAll('#menuBody').forEach(function (menuBody) {
    menuBody.addEventListener('click', function () {
        document.getElementById('menuModal').style.display = 'block';
    });
});

// JavaScript to hide the modal
document.querySelector('.close-modal').addEventListener('click', function () {
    document.getElementById('menuModal').style.display = 'none';
});