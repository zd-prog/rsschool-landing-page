let productsData = [];

fetch('data/products.json')
    .then(response => response.json())
    .then(data => {
        productsData = data;

        data.forEach(item => {
            const grid = document.getElementById(item.category);

            const previewDiv = document.createElement('div');
            previewDiv.className = 'preview';
            previewDiv.setAttribute("data-id", item.id);

            const imageDiv = document.createElement('div');
            imageDiv.className = 'image-box';
            imageDiv.innerHTML = `<img src=${item.imagePath} alt=${item.imageAlt} width="310" height="310">`;
            previewDiv.appendChild(imageDiv);

            previewDiv.addEventListener('click', () => {
                showModal(item.category, item.id);
            });

            const descriptionDiv = document.createElement('div');
            descriptionDiv.className = 'description';
            descriptionDiv.innerHTML = `<div class="title">
                    <h3>${item.name}</h3>
                    <div class="medium">${item.description}</div>
                </div>
                <h3>${item.price}</h3>`;
            previewDiv.appendChild(descriptionDiv);

            if (item.category === selectedCategory.toLowerCase()) {
                grid.classList.add("current");
            }

            grid.appendChild(previewDiv);
        });
    })
    .catch(error => console.error('Ошибка загрузки:', error));

function showModal(category, id) {
    function closeModal() {
        modal.classList.remove("open");
        modal.innerHTML = "";
        body.classList.remove("modal-open");
    }

    const product = productsData.find(product => product.category === category && product.id === id);

    let size = "s";
    let additive = undefined;
    let total = +product.price + +(product.sizes[size]["add-price"]) + +(product.additives[additive] ? product.additives[additive]["add-price"] : 0);

    const modal = document.getElementById("modal");
    modal.classList.add('open');
    body.classList.add("modal-open");

    modal.addEventListener("click", (e) => {
        if (!e.defaultPrevented) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeModal();
        }
    });

    const previewDiv = document.createElement('div');
    previewDiv.className = 'preview';

    previewDiv.addEventListener("click", (e) => {
        e.preventDefault();
    })

    const imageDiv = document.createElement('div');
    imageDiv.className = 'image-box';
    imageDiv.innerHTML = `<img src=${product.imagePath} alt=${product.imageAlt}>`;
    previewDiv.appendChild(imageDiv);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.className = 'description';

    const titleDiv = document.createElement('div');
    titleDiv.className = 'title';
    titleDiv.innerHTML = `<h3>${product.name}</h3>
                    <div class="medium">${product.description}</div>`
    descriptionDiv.appendChild(titleDiv);

    const sizeDiv = document.createElement('div');
    sizeDiv.className = "size";
    sizeDiv.innerHTML = `<div class="medium">Size</div>`;

    const tabsDiv = document.createElement('div');
    tabsDiv.className = "tabs";

    for (var property in product) {
        if (property === "sizes" && product.hasOwnProperty(property)) {
            const keys = Object.keys(product.sizes);
            const values = Object.values(product.sizes);

            keys.forEach((key) => {
                const value = values[keys.indexOf(key)];

                const tabDiv = document.createElement('div');
                tabDiv.className = "tab";

                if (size === key) {
                    tabDiv.classList.add("current");
                }

                tabDiv.innerHTML = `<div class="icon">${key.toUpperCase()}</div>${value.size}`;

                tabDiv.addEventListener('click', () => {
                    const current = tabsDiv.querySelector(".current");

                    if (current) {
                        current.classList.remove("current");
                    }

                    tabDiv.classList.add("current");

                    size = key;
                    total = +product.price + +(product.sizes[size]["add-price"]) + +(product.additives[additive] ? product.additives[additive]["add-price"] : 0);
                    const totalDiv = descriptionDiv.querySelector(".total");
                    totalDiv.innerHTML = `<h3>Total:</h3><h3>$${(total).toFixed(2)}</h3>`;
                });

                tabsDiv.appendChild(tabDiv);
            })
        }
    }

    sizeDiv.appendChild(tabsDiv);
    descriptionDiv.appendChild(sizeDiv);

    const additivesDiv = document.createElement('div');
    additivesDiv.className = "additives";
    additivesDiv.innerHTML = `<div class="medium">Additives</div>`;

    const additivesTabsDiv = document.createElement('div');
    additivesTabsDiv.className = "tabs";

    if (property === "additives" && product.hasOwnProperty(property)) {
        const keys = Object.keys(product.additives);
        const values = Object.values(product.additives);

        keys.forEach((key) => {
            const value = values[keys.indexOf(key)];

            const tabDiv = document.createElement('div');
            tabDiv.className = "tab";

            if (additive === key) {
                tabDiv.classList.add("current");
            }

            tabDiv.innerHTML = `<div class="icon">${+key + 1}</div>${value.name}`;
            tabDiv.addEventListener('click', () => {

                const current = additivesTabsDiv.querySelector(".current");

                if (current) {
                    current.className = "tab";
                }

                tabDiv.classList.add("current");

                additive = key;
                total = +product.price + +(product.sizes[size]["add-price"]) + +(product.additives[additive] ? product.additives[additive]["add-price"] : 0);
                const totalDiv = descriptionDiv.querySelector(".total");
                totalDiv.innerHTML = `<h3>Total:</h3><h3>$${(total).toFixed(2)}</h3>`;
            });

            additivesTabsDiv.appendChild(tabDiv);
        })
    }

    additivesDiv.appendChild(additivesTabsDiv);
    descriptionDiv.appendChild(additivesDiv);

    const totalDiv = document.createElement('div');
    totalDiv.className = "total";
    totalDiv.innerHTML = `<h3>Total:</h3><h3>$${(total).toFixed(2)}</h3>`;
    descriptionDiv.appendChild(totalDiv);

    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert';
    alertDiv.innerHTML = `<img class="info" src="images/info-empty.svg" alt="info" width="16" height="16">
        <img class="info-dark" src="images/info-empty-dark.svg" alt="info" width="16" height="16">
        <div class="caption">The cost is not final. Download our mobile app to see the final price and place your order. Earn loyalty points and enjoy your favorite coffee with up to 20% discount.</div>`;
    descriptionDiv.appendChild(alertDiv);

    const button = document.createElement('a');
    button.className = "button";
    button.innerText = "Close"
    button.addEventListener("click", () => {
        closeModal();
    });
    descriptionDiv.appendChild(button);
    previewDiv.appendChild(descriptionDiv);
    modal.appendChild(previewDiv);
}

const categories = { Coffee: "☕", Tea: "🫖", Dessert: "🍰" }

const categoriesTabs = document.querySelector(".menu").querySelector(".tabs");

const categoriesKeys = Object.keys(categories);

let selectedCategory = categoriesKeys[0];

categoriesKeys.forEach((category) => {
    const categoryTab = document.createElement('div');
    categoryTab.className = 'tab';
    categoryTab.innerHTML = `<div class="icon">${categories[category]}</div>${category}`;

    if (category === selectedCategory) {
        categoryTab.classList.add("current");
    }

    categoryTab.addEventListener("click", () => {
        const current = categoriesTabs.querySelector(".current");

        if (current) {
            current.classList.remove("current");
        }

        categoryTab.classList.add("current");

        const currentGrid = document.getElementById(selectedCategory.toLowerCase());

        if (currentGrid) {
            currentGrid.classList.remove("current");
        }

        selectedCategory = category;

        const selectedGrid = document.getElementById(category.toLowerCase());

        if (selectedGrid) {
            selectedGrid.classList.add("current");
        }
    })

    categoriesTabs.appendChild(categoryTab);
});

const loadMoreBtn = document.getElementById('load-more');
const loadMoreContainer = document.querySelector('.load-more-container');

if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        const grids = Array.from(document.querySelectorAll('.grid'));

        const activeGrid = grids.find(grid => {
            return window.getComputedStyle(grid).display !== 'none';
        });

        if (activeGrid) {
            activeGrid.classList.add('expanded');
        }

        if (loadMoreContainer) {
            loadMoreContainer.style.setProperty('display', 'none', 'important');
        }
    });
}