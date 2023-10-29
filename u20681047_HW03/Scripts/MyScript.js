//////////////////////MODAL/////////////////
$("#modal-content").on("submit", "form", function (e) {
    e.preventDefault();
    var form = $(this);
    var url = form.attr("action");
    var formData = form.serialize();

    $.post(url, formData, function (data) {
        $("#myModal").modal("hide");
        location.reload();
    });
});

$(".create-link, .create-book-link").click(function (e) {
    e.preventDefault();
    var url = $(this).data("url");

    $.get(url, function (data) {
        $("#modal-content").empty();
        $("#modal-content").html(data);
        $("#myModal").modal("show");
    });
});

///////////////////////PAGINATION///////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", function () {
    const studentTableRows = document.querySelectorAll("#StudentTable tr");
    const bookTableRows = document.querySelectorAll("#BookTable tr");
    const itemsPerPage = 5; // Adjust the number of items per page as needed.
    let currentStudentPage = 1;
    let currentBookPage = 1;

    // Pagination functions for Student Table
    function showStudentPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        for (let i = 0; i < studentTableRows.length; i++) {
            studentTableRows[i].style.display = (i >= startIndex && i < endIndex) ? "table-row" : "none";
        }
    }

    function updateStudentPaginationInfo() {
        const totalStudentPages = Math.ceil(studentTableRows.length / itemsPerPage);
        document.getElementById("currentStudentPage").textContent = currentStudentPage;
        document.getElementById("totalStudentPages").textContent = totalStudentPages;
    }

    function prevStudentPage() {
        if (currentStudentPage > 1) {
            currentStudentPage--;
            showStudentPage(currentStudentPage);
            updateStudentPaginationInfo();
        }
    }

    function nextStudentPage() {
        const totalStudentPages = Math.ceil(studentTableRows.length / itemsPerPage);
        if (currentStudentPage < totalStudentPages) {
            currentStudentPage++;
            showStudentPage(currentStudentPage);
            updateStudentPaginationInfo();
        }
    }

    // Pagination functions for Book Table
    function showBookPage(page) {
        const startIndex = (page - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        for (let i = 0; i < bookTableRows.length; i++) {
            bookTableRows[i].style.display = (i >= startIndex && i < endIndex) ? "table-row" : "none";
        }
    }

    function updateBookPaginationInfo() {
        const totalBookPages = Math.ceil(bookTableRows.length / itemsPerPage);
        document.getElementById("currentBookPage").textContent = currentBookPage;
        document.getElementById("totalBookPages").textContent = totalBookPages;
    }

    function prevBookPage() {
        if (currentBookPage > 1) {
            currentBookPage--;
            showBookPage(currentBookPage);
            updateBookPaginationInfo();
        }
    }

    function nextBookPage() {
        const totalBookPages = Math.ceil(bookTableRows.length / itemsPerPage);
        if (currentBookPage < totalBookPages) {
            currentBookPage++;
            showBookPage(currentBookPage);
            updateBookPaginationInfo();
        }
    }

    // Initialize both tables and their pagination controls
    showStudentPage(currentStudentPage);
    updateStudentPaginationInfo();
    showBookPage(currentBookPage);
    updateBookPaginationInfo();

    // Add event listeners for pagination buttons for both tables
    document.getElementById("studentPagination").querySelector("#prevStudentPage").addEventListener("click", prevStudentPage);
    document.getElementById("studentPagination").querySelector("#nextStudentPage").addEventListener("click", nextStudentPage);
    document.getElementById("bookPagination").querySelector("#prevBookPage").addEventListener("click", prevBookPage);
    document.getElementById("bookPagination").querySelector("#nextBookPage").addEventListener("click", nextBookPage);
});


