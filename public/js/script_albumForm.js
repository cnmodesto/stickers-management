document.addEventListener("DOMContentLoaded", function () {
    const addItemBtn = document.getElementById("add-item-btn");
    const itemsContainer = document.getElementById("items-container");

    addItemBtn.addEventListener("click", function () {
        const newItemRow = document.createElement("div");
        newItemRow.classList.add("item-row");
        newItemRow.classList.add("form-row");
        newItemRow.innerHTML = `
            <div class="col-6"><input type="text" class="form-control" name="prefix" class="prefix-input" placeholder="Prefixo"></div>
            <div class="col-2"><input type="text" class="form-control" name="sticker_number_start" class="sticker_number_start-input" placeholder="Início"></div>
            <div class="col-2"><input type="text" class="form-control" name="sticker_number_end" class="sticker_number_end-input" placeholder="Fim"></div>
            <div class="col-2">
            <button type="button" class="remove-item-btn btn btn-primary button">
                <i class="fa fa-trash-o fa-lg"></i> Remover Item
            </button>
            </div>
        `;
        itemsContainer.appendChild(newItemRow);
    });

    itemsContainer.addEventListener("click", function (event) {
        if (event.target.classList.contains("remove-item-btn")) {
            event.target.closest(".item-row").remove();
        }
    });
});