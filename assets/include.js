function include(File) {
    $.ajax({
        url: "/include/" + File,
        cache: false,
        async: false,
        dataType: 'html',
        success: function (html) {
            document.write(html);
        }
    });
}
