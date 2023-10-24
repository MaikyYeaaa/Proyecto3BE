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

$("#menuAddBtn").click(addMenu);

function addMenu(){
    document.getElementById('menuModal').style.display = 'none';
}


const scrollContainers = document.querySelectorAll('.scroll-container');

function scrollRight(scrollContainer) {
    scrollContainer.scrollLeft += 1; // Ajusta la velocidad de desplazamiento aquí
    if (scrollContainer.scrollLeft < scrollContainer.scrollWidth - scrollContainer.clientWidth) {
        requestAnimationFrame(() => scrollRight(scrollContainer));
    } else {
        setTimeout(() => scrollLeft(scrollContainer), 2000);
    }
}

function scrollLeft(scrollContainer) {
    scrollContainer.scrollLeft -= 1; // Ajusta la velocidad de desplazamiento aquí
    if (scrollContainer.scrollLeft > 0) {
        requestAnimationFrame(() => scrollLeft(scrollContainer));
    } else {
        setTimeout(() => scrollRight(scrollContainer), 2000);
    }
}

scrollContainers.forEach((scrollContainer) => {
    scrollContainer.addEventListener('mouseenter', () => {
        cancelAnimationFrame(() => scrollLeft(scrollContainer));
        cancelAnimationFrame(() => scrollRight(scrollContainer));
    });

    scrollContainer.addEventListener('mouseleave', () => {
        setTimeout(() => scrollRight(scrollContainer), 2000);
    });

    setTimeout(() => scrollRight(scrollContainer), 2000);
});