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

$(".create-link, .edit-link, .delete-link, .create-book-link").click(function (e) {
    e.preventDefault();
    var url = $(this).data("url");

    $.get(url, function (data) {
        $("#modal-content").empty();
        $("#modal-content").html(data);
        $("#myModal").modal("show");
    });
});

///////////////////////////////PAGINATION////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    // Author Table
    const authorTableRows = document.querySelectorAll("#AuthorTable tr");
    const authorItemsPerPage = 5;
    let currentAuthorPage = 1;

    function showAuthorPage(page) {
        const startIndex = (page - 1) * authorItemsPerPage;
        const endIndex = startIndex + authorItemsPerPage;

        for (let i = 0; i < authorTableRows.length; i++) {
            authorTableRows[i].style.display = (i >= startIndex && i < endIndex) ? "table-row" : "none";
        }
    }

    function updateAuthorPaginationInfo() {
        const totalAuthorPages = Math.ceil(authorTableRows.length / authorItemsPerPage);
        document.getElementById("currentAuthorPage").textContent = currentAuthorPage;
        document.getElementById("totalAuthorPages").textContent = totalAuthorPages;
    }

    function prevAuthorPage() {
        if (currentAuthorPage > 1) {
            currentAuthorPage--;
            showAuthorPage(currentAuthorPage);
            updateAuthorPaginationInfo();
        }
    }

    function nextAuthorPage() {
        const totalAuthorPages = Math.ceil(authorTableRows.length / authorItemsPerPage);
        if (currentAuthorPage < totalAuthorPages) {
            currentAuthorPage++;
            showAuthorPage(currentAuthorPage);
            updateAuthorPaginationInfo();
        }
    }

    // Initialize Author Table and its pagination controls
    showAuthorPage(currentAuthorPage);
    updateAuthorPaginationInfo();

    document.getElementById("authorPagination").querySelector("#prevAuthorPage").addEventListener("click", prevAuthorPage);
    document.getElementById("authorPagination").querySelector("#nextAuthorPage").addEventListener("click", nextAuthorPage);

    // Types Table
    const typeTableRows = document.querySelectorAll("#TypeTable tr");
    const typeItemsPerPage = 5;
    let currentTypePage = 1;

    function showTypePage(page) {
        const startIndex = (page - 1) * typeItemsPerPage;
        const endIndex = startIndex + typeItemsPerPage;

        for (let i = 0; i < typeTableRows.length; i++) {
            typeTableRows[i].style.display = (i >= startIndex && i < endIndex) ? "table-row" : "none";
        }
    }

    function updateTypePaginationInfo() {
        const totalTypePages = Math.ceil(typeTableRows.length / typeItemsPerPage);
        document.getElementById("currentTypePage").textContent = currentTypePage;
        document.getElementById("totalTypePages").textContent = totalTypePages;
    }

    function prevTypePage() {
        if (currentTypePage > 1) {
            currentTypePage--;
            showTypePage(currentTypePage);
            updateTypePaginationInfo();
        }
    }

    function nextTypePage() {
        const totalTypePages = Math.ceil(typeTableRows.length / typeItemsPerPage);
        if (currentTypePage < totalTypePages) {
            currentTypePage++;
            showTypePage(currentTypePage);
            updateTypePaginationInfo();
        }
    }

    // Initialize Types Table and its pagination controls
    showTypePage(currentTypePage);
    updateTypePaginationInfo();

    document.getElementById("typePagination").querySelector("#prevTypePage").addEventListener("click", prevTypePage);
    document.getElementById("typePagination").querySelector("#nextTypePage").addEventListener("click", nextTypePage);

    // Borrows Table
    const borrowTableRows = document.querySelectorAll("#BorrowTable tr");
    const borrowItemsPerPage = 5;
    let currentBorrowPage = 1;

    function showBorrowPage(page) {
        const startIndex = (page - 1) * borrowItemsPerPage;
        const endIndex = startIndex + borrowItemsPerPage;

        for (let i = 0; i < borrowTableRows.length; i++) {
            borrowTableRows[i].style.display = (i >= startIndex && i < endIndex) ? "table-row" : "none";
        }
    }

    function updateBorrowPaginationInfo() {
        const totalBorrowPages = Math.ceil(borrowTableRows.length / borrowItemsPerPage);
        document.getElementById("currentBorrowPage").textContent = currentBorrowPage;
        document.getElementById("totalBorrowPages").textContent = totalBorrowPages;
    }

    function prevBorrowPage() {
        if (currentBorrowPage > 1) {
            currentBorrowPage--;
            showBorrowPage(currentBorrowPage);
            updateBorrowPaginationInfo();
        }
    }

    function nextBorrowPage() {
        const totalBorrowPages = Math.ceil(borrowTableRows.length / borrowItemsPerPage);
        if (currentBorrowPage < totalBorrowPages) {
            currentBorrowPage++;
            showBorrowPage(currentBorrowPage);
            updateBorrowPaginationInfo();
        }
    }

    // Initialize Borrows Table and its pagination controls
    showBorrowPage(currentBorrowPage);
    updateBorrowPaginationInfo();

    document.getElementById("borrowPagination").querySelector("#prevBorrowPage").addEventListener("click", prevBorrowPage);
    document.getElementById("borrowPagination").querySelector("#nextBorrowPage").addEventListener("click", nextBorrowPage);
});

