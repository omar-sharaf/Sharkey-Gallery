document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    const triggerWarningHeading = document.querySelector('h2:nth-of-type(2)'); // Select the Trigger Warning heading

    // Select all gallery items across all gallery grids
    const galleryItems = document.querySelectorAll('.gallery-grid .gallery-item');
    const galleryArray = Array.from(galleryItems);
    let currentIndex = 0;

    // Open modal when an image is clicked
    galleryItems.forEach((item, index) => {
        const image = item.querySelector('img');
        image.addEventListener('click', () => {
            modalImage.src = image.src;
            modal.style.display = 'flex';
            currentIndex = index;
            updateArrowVisibility();
            console.log('Modal opened with image:', image.src, 'Index:', currentIndex);
        });
    });

    // Close modal functionality
    function closeModalFunction() {
        modal.style.display = 'none';
        console.log('Modal closed');
    }

    closeModal.addEventListener('click', closeModalFunction);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalFunction();
        }
    });

    // Navigation arrows
    leftArrow.addEventListener('click', () => {
        // Circular navigation, wrapping around to the end/beginning
        currentIndex = (currentIndex - 1 + galleryArray.length) % galleryArray.length;
        modalImage.src = galleryArray[currentIndex].querySelector('img').src;
        updateArrowVisibility();
        console.log('Left arrow clicked, new index:', currentIndex);
    });

    rightArrow.addEventListener('click', () => {
        // Circular navigation, wrapping around to the beginning/end
        currentIndex = (currentIndex + 1) % galleryArray.length;
        modalImage.src = galleryArray[currentIndex].querySelector('img').src;
        updateArrowVisibility();
        console.log('Right arrow clicked, new index:', currentIndex);
    });

    // Update arrow visibility based on current index
    function updateArrowVisibility() {
        // Always show both arrows if there's more than one image
        if (galleryArray.length > 1) {
            leftArrow.classList.remove('hidden');
            rightArrow.classList.remove('hidden');
        } else {
            // Hide arrows if there's only one or no images
            leftArrow.classList.add('hidden');
            rightArrow.classList.add('hidden');
        }
    }

    // Filter buttons functionality
    const filterButtons = document.querySelectorAll('.filter-btn');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and add it to the clicked button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filter = button.dataset.filter;

            // Handle Trigger Warning heading visibility
            if (filter === 'trigger-warning' || filter === 'all') {
                triggerWarningHeading.style.display = 'block';
            } else {
                triggerWarningHeading.style.display = 'none';
            }

            // Show or hide gallery items based on the filter
            galleryArray.forEach(item => {
                const category = item.dataset.category;
                if (filter === 'all' || filter === category) {
                    item.style.display = 'block'; // Show item
                } else {
                    item.style.display = 'none'; // Hide item
                }
            });
        });
    });
});