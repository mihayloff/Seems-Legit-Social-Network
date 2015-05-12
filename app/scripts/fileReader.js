var selector = document.body;

// Trigger file selection window
$(selector).on('click', '#upload-file-button', function() {
	$('#picture').click();
});

// Reads the selected file and returns the data as a base64 encoded string
$(selector).on('change', '#picture', function () {
    sessionStorage['pictureHasChanged'] = true;
	var file = this.files[0],
		reader;
	
	if (file.type.match(/image\/.*/)) {
		reader = new FileReader();
		reader.onload = function () {
		    console.log(reader);
		    $('.picture-preview').attr('src', reader.result);
		    $('#profilePictureData').attr('value', reader.result);
		    // TODO: set file name to picture name paragraph
		    $('.picture-name').text();
		    // TODO: set read image data for image preview
		};
		reader.readAsDataURL(file);
	} else {
	    poppy.pop('error', 'Error', 'Type mismatch');
	}
});

// Cover image events
$(selector).on('click', '#upload-cover-file-button', function () {
    $('#coverPicture').click();
});

// Reads the selected file and returns the data as a base64 encoded string
$(selector).on('change', '#coverPicture', function () {
    sessionStorage['pictureHasChanged'] = true;
    var file = this.files[0],
		reader;

    if (file.type.match(/image\/.*/)) {
        reader = new FileReader();
        reader.onload = function () {
            console.log(reader);
            $('.chooseCover').attr('src', reader.result);
            $('#coverPictureData').attr('value', reader.result);
        };
        reader.readAsDataURL(file);
    } else {
        poppy.pop('error', 'Error', 'Type mismatch');
    }
});