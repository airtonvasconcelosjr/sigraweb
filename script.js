// scripts.js
const content = document.getElementById("content");

// Função para carregar produtos do localStorage
function loadProducts() {
    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
        products = JSON.parse(savedProducts);
    }
}

// Função para salvar produtos no localStorage
function saveProducts() {
    localStorage.setItem("products", JSON.stringify(products));
}

// Array para armazenar os produtos
let products = [];

// Carregar produtos ao inicializar
loadProducts();

function showInstructions() {
    content.innerHTML = `
        <div id="instructions">
            <h1>Instruções</h1>
            <h2>Tarefa Prática - Desenvolvedor Frontend Júnior</h2>
            <p>Seu objetivo é criar uma página web responsiva, com uma barra de cabeçalho (header bar), um menu lateral esquerdo com 2 opções de acesso: Instruções e Produtos. A página de Instruções deve exibir essas instruções para o teste. A página de produtos deve exibir uma tabela de produtos com opção para adicionar, editar e remover produtos.</p>
            <p>Este modelo base utiliza HTML, CSS e Javascript para criar a estrutura básica da tarefa. Você é livre para seguir apenas com HTML/CSS/Javascript para finalizar, ou utilizar outras ferramentas caso desejado. Você é livre para utilizar a internet e copiar códigos, porém não poderá copiar um template completo.</p>
            <p>Os atributos do produto devem ser: Fabricante, Código, Descrição, Peso Líquido, Peso Bruto e Valor.</p>
            <p>Utilize sua criatividade para deixar o mais elegante e eficiente possível sua tarefa.</p>
        </div>
    `;
}

function showProducts() {
    content.innerHTML = "";
    renderProductTable();
}

function renderProductTable() {
    const tableHTML = `
    <div id="products">
        <h1>Produtos</h1>
        <table>
            <tr>
                <th class="table-title-small">Fab</th>
                <th class="table-title-small">Cód</th>
                <th class="table-title-small">Desc</th>
                <th class="table-title-small">P.Líq.</th>
                <th class="table-title-small">P.Bru</th>
                <th class="table-title-small">R$</th>
                <th class="table-title-small">Ação</th>
                <th class="table-title-large">Fabricante</th>
                <th class="table-title-large">Código</th>
                <th class="table-title-large">Descrição</th>
                <th class="table-title-large">Peso Líquido</th>
                <th class="table-title-large">Peso Bruto</th>
                <th class="table-title-large">Valor</th>
                <th class="table-title-large">Ações</th>
            </tr>
            ${products.map((product, index) => `
                <tr>
                    <td>${product.fabricante}</td>
                    <td>${product.codigo}</td>
                    <td>${product.descricao}</td>
                    <td>${product.pesoLiquido} g</td>
                    <td>${product.pesoBruto} g</td>
                    <td>R$ ${product.valor}</td>
                    <td>
                    <button class="btn" onclick="editProductForm(${index})"><i class="icon fas fa-edit"></i> </button>
                    <button class="btn" onclick="deleteProduct(${index})"><i class="icon fas fa-trash-alt"></i></button>
                    </td>
                </tr>
                `).join('')}
                </table>
                <button class="add-btn" onclick="addProductForm()">Adicionar Produto</button>
    </div>    
    `;

    content.innerHTML = tableHTML;
    saveProducts(); // Salvar produtos no localStorage
}

// Form de adicionar
function addProductForm() {
    content.innerHTML = `
    <div id="add-product">
        <h1>Adicionar Produto</h1>
        <form id="productForm" onsubmit="return validateProductForm()">
            <label for="fabricante">Fabricante:</label>
            <input type="text" id="fabricante" placeholder="Insira o fabricante do produto" required><br>
            <label for="codigo">Código:</label>
            <input type="text" id="codigo" placeholder="Insira o código do produto" required><br>
            <label for="descricao">Descrição:</label>
            <input type="text" id="descricao" placeholder="Insira a descrição do produto" required><br>
            <label for="pesoLiquido">Peso Líquido:</label>
            <input type="number" id="pesoLiquido" placeholder="Insira um peso em gramas" required><br>
            <label for="pesoBruto">Peso Bruto:</label>
            <input type="number" id="pesoBruto" placeholder="Insira um peso em gramas" required><br>
            <label for="valor">Valor:</label>
            <input type="number" id="valor" placeholder="Insira o valor em Reais" required><br>
            <button class="add-btn" type="button" onclick="addProduct()">Adicionar</button>
            <button class="cancel-btn" type="button" onclick="renderProductTable()">Cancelar</button>
        </form>
    </div>
    `;
}

// Funções para adicionar
function addProduct() {
    const fabricante = document.getElementById("fabricante").value;
    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const pesoLiquido = document.getElementById("pesoLiquido").value;
    const pesoBruto = document.getElementById("pesoBruto").value;
    const valor = document.getElementById("valor").value;

    // Verificações
    if (fabricante.length < 3) {
        alert("O fabricante deve ter pelo menos 3 caracteres.");
        return;
    }

    if (descricao.length < 3) {
        alert("A descrição deve ter pelo menos 3 caracteres.");
        return;
    }

    if (isNaN(pesoLiquido) || isNaN(pesoBruto) || isNaN(valor)) {
        alert("Os campos numéricos devem conter apenas números.");
        return;
    }

    // Converte os campos numéricos para números
    const pesoLiquidoNumber = parseFloat(pesoLiquido);
    const pesoBrutoNumber = parseFloat(pesoBruto);
    const valorNumber = parseFloat(valor);

    const newProduct = {
        fabricante,
        codigo,
        descricao,
        pesoLiquido: pesoLiquidoNumber,
        pesoBruto: pesoBrutoNumber,
        valor: valorNumber
    };

    products.push(newProduct);
    showProducts();
}

function validateProductForm() {
    const fabricante = document.getElementById("fabricante").value;
    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const pesoLiquido = document.getElementById("pesoLiquido").value;
    const pesoBruto = document.getElementById("pesoBruto").value;
    const valor = document.getElementById("valor").value;

    // Verificações
    if (fabricante.length < 3) {
        alert("O fabricante deve ter pelo menos 3 caracteres.");
        return false; 
    }

    if (descricao.length < 3) {
        alert("A descrição deve ter pelo menos 3 caracteres.");
        return false; 
    }

    if (isNaN(pesoLiquido) || isNaN(pesoBruto) || isNaN(valor)) {
        alert("Os campos numéricos devem conter apenas números.");
        return false; 
    }

    return true; 
}

 // Função de edição
function editProductForm(index) {
    content.innerHTML = `
    <div id="edit">
        <h1>Editar Produto</h1>
        <form id="productForm">
            <label for="fabricante">Fabricante:</label>
            <input type="text" id="fabricante" value="${products[index].fabricante}" required><br>
            <label for="codigo">Código:</label>
            <input type="text" id="codigo" value="${products[index].codigo}" required><br>
            <label for="descricao">Descrição:</label>
            <input type="text" id="descricao" value="${products[index].descricao}" required><br>
            <label for="pesoLiquido">Peso Líquido:</label>
            <input type="number" id="pesoLiquido" value="${products[index].pesoLiquido}" required><br>
            <label for="pesoBruto">Peso Bruto:</label>
            <input type="number" id="pesoBruto" value="${products[index].pesoBruto}" required><br>
            <label for="valor">Valor:</label>
            <input type="number" id="valor" value="${products[index].valor}" required><br>
            <button class="add-btn" type="button" onclick="updateProduct(${index})">Salvar</button>
            <button class="cancel-btn" type="button" onclick="renderProductTable()">Cancelar</button>
        </form>
    </div>
    `;
}

function updateProduct(index) {
    const fabricante = document.getElementById("fabricante").value;
    const codigo = document.getElementById("codigo").value;
    const descricao = document.getElementById("descricao").value;
    const pesoLiquido = document.getElementById("pesoLiquido").value;
    const pesoBruto = document.getElementById("pesoBruto").value;
    const valor = document.getElementById("valor").value;

    // Verificações
    if (fabricante.length < 3) {
        alert("O fabricante deve ter pelo menos 3 caracteres.");
        return;
    }

    if (descricao.length < 3) {
        alert("A descrição deve ter pelo menos 3 caracteres.");
        return;
    }

    if (isNaN(pesoLiquido) || isNaN(pesoBruto) || isNaN(valor)) {
        alert("Os campos numéricos devem conter apenas números.");
        return;
    }

    const updatedProduct = {
        fabricante,
        codigo,
        descricao,
        pesoLiquido,
        pesoBruto,
        valor
    };

    products[index] = updatedProduct;
    showProducts();
}

function deleteProduct(index) {
    products.splice(index, 1);
    showProducts();
}

// Obtém o elemento com o id "year"
const yearElement = document.getElementById("year");

// Obtém o ano atual
const currentYear = new Date().getFullYear();

// Define o ano atual no elemento
yearElement.textContent = currentYear;


//Define a página inicial.
showInstructions();
