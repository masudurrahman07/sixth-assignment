
// dom elements here
const GridCard = document.getElementById('card-grid');
const categoriesList = document.getElementById('category-list');
const daisySpinner = document.getElementById('spinner');
const totalCart = document.getElementById('cartTotal');
const listCart = document.getElementById('carts-list');
const modal = document.getElementById('modal-el');
const modalBody = document.getElementById('modalBody');
let modalClose; 



let cart = [];
let activeCategoryId = null;
let plantsMap = {}; 



const showSpinner = () => {
  daisySpinner.classList.remove('hidden');
  GridCard.classList.add('hidden');
};




const hideSpinner = () => {
  daisySpinner.classList.add('hidden');
  GridCard.classList.remove('hidden');
};


const formatPrice = (price) => `$${price}`;

// category functionality
async function loadCategories() {
  showSpinner();
  try {
    const res = await fetch('https://openapi.programming-hero.com/api/categories');
    const data = await res.json();
    categoriesList.innerHTML = '';

    
    const allBtn = document.createElement('button');
    allBtn.className = 'cat-btn active';
    allBtn.textContent = 'All Trees';
    allBtn.dataset.id = 'all';
    allBtn.addEventListener('click', () => handleCategoryClick('all', allBtn));
    categoriesList.appendChild(allBtn);



    
    data.categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'cat-btn';
      btn.textContent = cat.category_name;
      btn.dataset.id = cat.id;
      btn.addEventListener('click', () => handleCategoryClick(cat.id, btn));
      categoriesList.appendChild(btn);
    });

    
    await handleCategoryClick('all', allBtn);

  } catch (err) {
    console.error(err);
    categoriesList.innerHTML = '<p>Failed to load categories.</p>';
  } finally {
    hideSpinner();
  }
}




async function handleCategoryClick(id, btn) {
  activeCategoryId = id;

  
  document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');


  showSpinner();
  try {
    let data;
    if (id === 'all') {
      const res = await fetch('https://openapi.programming-hero.com/api/plants');
      data = await res.json();
    } else {
      const res = await fetch(`https://openapi.programming-hero.com/api/category/${id}`);
      data = await res.json();
    }
    

    if (data.plants && data.plants.length > 0) {
      displayTrees(data.plants);
    } else {
      GridCard.innerHTML = '<p>No trees in this category.</p>';
    }
  } catch (err) {
    console.error(err);
    GridCard.innerHTML = '<p>Failed to load trees.</p>';
  } finally {
    hideSpinner();
  }
}


function displayTrees(trees) {
  GridCard.innerHTML = '';

  trees.forEach(tree => {
 
    plantsMap[tree.id] = tree;

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${tree.image}" alt="${tree.name}" />
      <h3 class="card-title" data-id="${tree.id}">${tree.name}</h3>
      <p class="card-desc">${tree.description.slice(0, 60)}...</p>
      <div class="card-footer" style="display:flex; justify-content:space-between; align-items:center;">
        <span style="background: rgba(220, 252, 231, 1); color: rgba(21, 128, 61, 1); padding: 4px 10px; border-radius: 400px; font-size: 12px;">
          ${tree.category}
        </span>
        <span class="price">${formatPrice(tree.price)}</span>
      </div>
      <button class="add-btn" data-id="${tree.id}" data-name="${tree.name}" data-price="${tree.price}" style="width:100%; margin-top:8px;">Add to Cart</button>
    `;

GridCard.appendChild(card);

   
    card.querySelector('.card-title').addEventListener('click', () => openModal(tree.id));

    
    card.querySelector('.add-btn').addEventListener('click', addToCart);
  });
}


// modal functionality
function openModal(id) {
  const tree = plantsMap[id];
  if (!tree) return;


  modalBody.innerHTML = `
    <h2 class="text-xl font-bold mb-2">${tree.name}</h2>
    <img src="${tree.image}" alt="${tree.name}" style="width:100%; max-height:300px; object-fit:cover; margin:12px 0; border-radius:6px;" />
    <p><strong>Category:</strong> ${tree.category}</p>
    <p><strong>Price:</strong> ${formatPrice(tree.price)}</p>
    <p>${tree.description}</p>
  `;

  modal.classList.remove('hidden'); 
}



function closeModal() {
  modal.classList.add('hidden'); 
}



// cart functionality
function addToCart(e) {
  const btn = e.target;
  const id = btn.dataset.id;
  const name = btn.dataset.name;
  const price = parseFloat(btn.dataset.price);

  cart.push({ id, name, price });
  updateCart();
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCart();
}



function updateCart() {
  listCart.innerHTML = '';
  let total = 0;

  cart.forEach((item, index) => {
    total += item.price;


    const li = document.createElement('li');
    li.className = 'cart-item';
    li.style.background = 'rgba(220, 252, 231, 1)';
    li.style.padding = '8px';
    li.style.marginBottom = '8px';
    li.style.borderRadius = '6px';
    li.style.display = 'flex';
    li.style.justifyContent = 'space-between';
    li.style.alignItems = 'center';

    li.innerHTML = `
      <div>
        <span style="font-weight:600; display:block;">${item.name}</span>
        <span style="color:#0b3a22; font-weight:500;">$${item.price}</span>
      </div>
      <button class="remove" style="background:transparent; border:none; cursor:pointer; color:#a33; font-weight:700;">❌</button>
    `;

    li.querySelector('.remove').addEventListener('click', () => removeFromCart(index));
    listCart.appendChild(li);
  });

  totalCart.textContent = `$${total}`;
}




document.addEventListener('DOMContentLoaded', () => {
 modalClose = document.getElementById('modalClose');
modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  loadCategories();
});



