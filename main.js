//Function for fetch operation
const addToCart = (productId, productName) => {
    const productUrl = `https://www.wickes.co.uk/${productName}/p/${productId}`;

    return fetch("https://www.wickes.co.uk/cart/add", {
        method: "POST",
        headers: {
            "accept": "*/*",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        },
        referrer: productUrl,
        body: `productCodePost=${productId}&postcode=&CSRFToken=a33c0585-948b-4b9c-a869-7ccaadebd99b&addedForDelivery=true&qty=1`,
        credentials: "include"
    })
    .then(response => {
        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
        return response.json();
    });
};

// Create Button
const createButton = (text, onClick) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.style.padding = '10px';
    button.style.width= '100%';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.backgroundColor = '#67a509';
    button.style.borderRadius = '5px';
    button.classList.add("custom-button");
    button.addEventListener('click', onClick);
    return button;
};

// Main
const allData = window.impressionsEvent.ecommerce.impressions;
const placeSummaryLinksDiv = document.querySelectorAll(".product-card__content");

if (placeSummaryLinksDiv) {
    placeSummaryLinksDiv.forEach((card, index) => {
        const product = allData[index];
        const button = createButton('Add for delivery', () => {
            addToCart(product.id, product.name)
                .then(data => alert(`${product.name} ADDED!`))
                .catch(error => {
                    console.error("Error:", error);
                    alert("Ürün sepete eklenirken bir hata oluştu. Lütfen tekrar deneyin.");
                });
        });

        const newDiv = document.createElement('div');
        newDiv.appendChild(button);
        card.appendChild(newDiv);
    });
} else {
    console.log('Belirtilen div bulunamadı.');
}