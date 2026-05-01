const products = [
    {
        id: 1,
        name: "Beras Premium 5kg",
        category: "Sembako",
        price: 78000,
        stock: 12,
        description: "Beras pulen untuk stok toko harian."
    },
    {
        id: 2,
        name: "Minyak Goreng 2L",
        category: "Sembako",
        price: 36000,
        stock: 6,
        description: "Minyak goreng kemasan ekonomis."
    },
    {
        id: 3,
        name: "Kopi Sachet",
        category: "Minuman",
        price: 2500,
        stock: 45,
        description: "Produk cepat laku untuk rak depan."
    }
];

const state = {
    productToDelete: null
};

const refs = {
    tableBody: document.getElementById("product-table-body"),
    searchInput: document.getElementById("search-input"),
    categoryFilter: document.getElementById("filter-category"),
    createButton: document.getElementById("open-create-modal"),
    productModal: document.getElementById("product-modal"),
    deleteModal: document.getElementById("delete-modal"),
    productForm: document.getElementById("product-form"),
    productModalTitle: document.getElementById("product-modal-title"),
    productId: document.getElementById("product-id"),
    productName: document.getElementById("product-name"),
    productCategory: document.getElementById("product-category"),
    productPrice: document.getElementById("product-price"),
    productStock: document.getElementById("product-stock"),
    productDescription: document.getElementById("product-description"),
    deleteMessage: document.getElementById("delete-message"),
    confirmDeleteButton: document.getElementById("confirm-delete-button"),
    statTotal: document.getElementById("stat-total"),
    statLowStock: document.getElementById("stat-low-stock"),
    statCategories: document.getElementById("stat-categories")
};

function formatRupiah(value) {
    return new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0
    }).format(value);
}

function getFilteredProducts() {
    const keyword = refs.searchInput.value.trim().toLowerCase();
    const selectedCategory = refs.categoryFilter.value;

    return products.filter((product) => {
        const matchKeyword =
            product.name.toLowerCase().includes(keyword) ||
            product.category.toLowerCase().includes(keyword);

        const matchCategory = selectedCategory
            ? product.category === selectedCategory
            : true;

        return matchKeyword && matchCategory;
    });
}

function getProductStatus(stock) {
    return stock <= 10 ? "Stok Rendah" : "Aman";
}

function renderStats() {
    refs.statTotal.textContent = products.length;
    refs.statLowStock.textContent = products.filter((item) => item.stock <= 10).length;
    refs.statCategories.textContent = new Set(products.map((item) => item.category)).size;
}

function renderCategoryOptions() {
    const categories = [...new Set(products.map((product) => product.category))];
    const currentValue = refs.categoryFilter.value;

    refs.categoryFilter.innerHTML = '<option value="">Semua kategori</option>';

    categories.forEach((category) => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        if (category === currentValue) {
            option.selected = true;
        }
        refs.categoryFilter.appendChild(option);
    });
}

function renderTable() {
    const filteredProducts = getFilteredProducts();

    refs.tableBody.innerHTML = "";

    if (filteredProducts.length === 0) {
        refs.tableBody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center;">Belum ada data yang cocok.</td>
            </tr>
        `;
        return;
    }

    filteredProducts.forEach((product) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.id}</td>
            <td>
                <strong>${product.name}</strong><br>
                <span class="hint">${product.description || "-"}</span>
            </td>
            <td>${product.category}</td>
            <td>${formatRupiah(product.price)}</td>
            <td>${product.stock}</td>
            <td><span class="badge">${getProductStatus(product.stock)}</span></td>
            <td>
                <div class="table-actions">
                    <button class="btn btn-secondary" type="button" data-edit-id="${product.id}">Edit</button>
                    <button class="btn btn-danger" type="button" data-delete-id="${product.id}">Hapus</button>
                </div>
            </td>
        `;
        refs.tableBody.appendChild(row);
    });
}

function openModal(modal) {
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
}

function closeModal(modal) {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
}

function resetForm() {
    refs.productForm.reset();
    refs.productId.value = "";
}

function fillForm(product) {
    refs.productId.value = product.id;
    refs.productName.value = product.name;
    refs.productCategory.value = product.category;
    refs.productPrice.value = product.price;
    refs.productStock.value = product.stock;
    refs.productDescription.value = product.description;
}

function handleCreateClick() {
    refs.productModalTitle.textContent = "Tambah Produk";
    resetForm();
    openModal(refs.productModal);
}

function handleEdit(id) {
    const product = products.find((item) => item.id === id);
    if (!product) return;

    refs.productModalTitle.textContent = "Edit Produk";
    fillForm(product);
    openModal(refs.productModal);
}

function handleDeletePrompt(id) {
    const product = products.find((item) => item.id === id);
    if (!product) return;

    state.productToDelete = id;
    refs.deleteMessage.textContent = `Yakin ingin menghapus "${product.name}" dari inventaris?`;
    openModal(refs.deleteModal);
}

function handleSubmit(event) {
    event.preventDefault();

    const payload = {
        id: refs.productId.value ? Number(refs.productId.value) : Date.now(),
        name: refs.productName.value.trim(),
        category: refs.productCategory.value.trim(),
        price: Number(refs.productPrice.value),
        stock: Number(refs.productStock.value),
        description: refs.productDescription.value.trim()
    };

    if (!payload.name || !payload.category || Number.isNaN(payload.price) || Number.isNaN(payload.stock)) {
        alert("Lengkapi data produk terlebih dahulu.");
        return;
    }

    const existingIndex = products.findIndex((item) => item.id === payload.id);

    if (existingIndex >= 0) {
        products[existingIndex] = payload;
    } else {
        products.push(payload);
    }

    closeModal(refs.productModal);
    renderAll();
}

function handleConfirmDelete() {
    const index = products.findIndex((item) => item.id === state.productToDelete);
    if (index < 0) return;

    products.splice(index, 1);
    state.productToDelete = null;
    closeModal(refs.deleteModal);
    renderAll();
}

function renderAll() {
    renderStats();
    renderCategoryOptions();
    renderTable();
}

refs.createButton.addEventListener("click", handleCreateClick);
refs.searchInput.addEventListener("input", renderTable);
refs.categoryFilter.addEventListener("change", renderTable);
refs.productForm.addEventListener("submit", handleSubmit);
refs.confirmDeleteButton.addEventListener("click", handleConfirmDelete);

document.addEventListener("click", (event) => {
    const editId = event.target.getAttribute("data-edit-id");
    const deleteId = event.target.getAttribute("data-delete-id");
    const closeTarget = event.target.getAttribute("data-close");

    if (editId) {
        handleEdit(Number(editId));
    }

    if (deleteId) {
        handleDeletePrompt(Number(deleteId));
    }

    if (closeTarget) {
        closeModal(document.getElementById(closeTarget));
    }
});

window.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal")) {
        closeModal(event.target);
    }
});

renderAll();
