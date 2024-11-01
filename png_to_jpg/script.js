const uploadButton = document.getElementById('uploadButton');
const clearQueueButton = document.getElementById('clearQueueButton');
const imagePreview = document.getElementById('imagePreview');
const downloadLink = document.getElementById('downloadLink');

uploadButton.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/png';
    input.onchange = function(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = new Image();
                img.onload = function() {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0);

                    canvas.toBlob(function(blob) {
                        const url = URL.createObjectURL(blob);
                        imagePreview.innerHTML = ''; // Clear previous text
                        imagePreview.style.backgroundImage = `url(${url})`;
                        imagePreview.style.backgroundSize = 'cover';
                        imagePreview.style.color = 'transparent'; // Hide text
                        downloadLink.href = url;
                        downloadLink.style.display = 'block';
                    }, 'image/jpeg', 1);
                };
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };
    input.click();
});

clearQueueButton.addEventListener('click', () => {
    imagePreview.style.backgroundImage = 'none'; // Clear image
    imagePreview.innerHTML = 'Drop your files here'; // Reset text
    downloadLink.style.display = 'none'; // Hide download link
});
