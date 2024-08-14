let products = [];
let totalPrice = 0;

function addProduct() {
    const code = document.getElementById('product-code').value;
    const name = document.getElementById('product-name').value;
    const quantity = parseFloat(document.getElementById('product-quantity').value);
    const price = parseFloat(document.getElementById('product-price').value);

    if (code && name && quantity && price) {
        const product = { code, name, quantity, price, subTotal: quantity * price };
        products.push(product);
        updateProductList();
        updateTotalPrice();
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

function removeProduct() {
    const code = document.getElementById('product-code').value;
    products = products.filter(product => product.code !== code);
    updateProductList();
    updateTotalPrice();
}

function updateProductList() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';
    products.forEach(product => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>Código: ${product.code}</span>
            <span>Nome: ${product.name}</span>
            <span>Quantidade/Peso: ${product.quantity}</span>
            <span>Preço: R$ ${product.price.toFixed(2)}</span>
            <span>Sub-total: R$ ${product.subTotal.toFixed(2)}</span>
        `;
        li.addEventListener('click', () => selectProduct(product.code));
        productList.appendChild(li);
    });
}

function selectProduct(code) {
    const selectedProduct = products.find(product => product.code === code);
    if (selectedProduct) {
        document.getElementById('product-code').value = selectedProduct.code;
        document.getElementById('product-name').value = selectedProduct.name;
        document.getElementById('product-quantity').value = selectedProduct.quantity;
        document.getElementById('product-price').value = selectedProduct.price;
    }
}

function updateTotalPrice() {
    totalPrice = products.reduce((sum, product) => sum + product.subTotal, 0);
    document.getElementById('total-price').innerText = totalPrice.toFixed(2);
    calculateChange();
}

function calculateChange() {
    const amountPaid = parseFloat(document.getElementById('amount-paid').value);
    const change = amountPaid - totalPrice;
    document.getElementById('change').innerText = change >= 0 ? change.toFixed(2) : '0.00';
}

document.getElementById('amount-paid').addEventListener('input', calculateChange);
