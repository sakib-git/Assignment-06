const navContainer = document.getElementById('navContainer');
const mainAllTress = document.getElementById('mainAllTress');
const alltressdiv = document.getElementById('alltressdiv');
// const everyTreesName = document.getElementById('everyTreesName');
const cartList = document.getElementById('cartList');
const count = document.getElementById('count');
const alltreespara = document.getElementById('alltreespara');
let cartListHisory = [];

const loadNav = () => {
  const url = 'https://openapi.programming-hero.com/api/categories';
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showNav(data.categories);
    });
};

const showNav = (categories) => {
  categories.forEach((categorie) => {
    const div = document.createElement('div');

    div.innerHTML = `
     <button class='category-btn hover:bg-[#35c068] px-3 py-2 rounded-md hover:text-white'  id='${categorie.id}'> ${categorie.category_name}</button>
   `;
    navContainer.append(div);
  });
};

navContainer.addEventListener('click', (e) => {
  const categoryBtn = e.target.closest('.category-btn');
  if (categoryBtn) {
    document.querySelectorAll('.category-btn').forEach((btn) => btn.classList.remove('active'));
    categoryBtn.classList.add('active');

    if (categoryBtn.id == 0) {
      showTrees(plants);
      return;
    }
    alltressdiv.innerHTML = `
      <div class="h-[300px] w-full bg-white rounded-lg shadow grid place-items-center">
        <div>
          <span class="loading loading-ring loading-md"></span>
          <span class="loading loading-ring loading-md"></span>
          <span class="loading loading-ring loading-md"></span>
        </div>
      </div>
    `;
    loadTreesId(categoryBtn.id);
  }
});

const loadTreesId = (treesId) => {
  fetch(`https://openapi.programming-hero.com/api/category/${treesId}`)
    .then((res) => res.json())
    .then((data) => {
      showThreesId(data.plants);
    });
};

const showThreesId = (plants) => {
  setTimeout(() => {
    alltressdiv.innerHTML = plants
      .map((plant) => {
        return `
        <div  class=' space-y-4 p-3 bg-white shadow-md rounded-md mt-4 '>
          <div class="aspect-[3/3]">
            <img src="${plant.image}" alt="${plant.name}" class="w-full h-full object-cover  rounded-lg"/>
          </div>
          <h2 onclick=" showModal('${plant.id}')" class='font-bold text-2xl'>${plant.name}</h2>
          <p class='line-clamp-3'>${plant.description}</p>
          <div class='flex justify-between'>
            <P class='bg-[#DCFCE7] py-1 px-3 text-[#15803D] rounded-full'>${plant.category}</P>
            <P><span>${plant.price}</span></P>
          </div>
          <button class='bg-[#15803D] hover:bg-[#166534] cursor-pointer text-white p-2 rounded-full w-full font-medium'>Add to Cart</button>
        </div>`;
        // alltressdiv.append(div);
      })
      .join('');
  }, 300);
};

const showCartList = (cartListHisory) => {
  cartList.innerHTML = '';
  let totalPrice = 0;
  cartListHisory.forEach((list) => {
    totalPrice += list.price;
    // console.log(list)
    const div = document.createElement('div');
    div.innerHTML = `
<div  class='flex justify-between items-center bg-[#f0fdf4] mt-2 p-2 rounded-md'>
<div>
  <h2>${list.name}</h2>
<div class='flex gap-1'>
  <p>${list.price}</p>
   <span>×</span>
   <span>1</span>
</div>
</div>
<button onclick='dlt(${list.id})' >❌ </button>
</div>
  
  `;
    cartList.append(div);
  });
  count.innerText = '৳' + totalPrice;
};

const dlt = (id) => {
  cartListHisory = cartListHisory.filter((item) => item.id !== id);

  showCartList(cartListHisory);
};

alltressdiv.addEventListener('click', (e) => {
  // console.log(e.target.parentNode.children[3].children[1])
  console.log(e.target);
  if (e.target.innerText === 'Add to Cart') {
    const name = e.target.parentNode.children[1].innerText;
    const price = parseInt(e.target.parentNode.children[3].children[1].innerText);
    const id = Date.now();
    cartListHisory.push({
      name: name,
      price: price,
      id: id,
    });

    showCartList(cartListHisory);
  }
});

//! Main plants data array
let plants = [];

const allTrees = () => {
  const url = 'https://openapi.programming-hero.com/api/plants';
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showTrees(data.plants);
      plants = data.plants;
    });
};

const showTrees = (plants) => {
  alltressdiv.innerHTML = plants
    .map((plant) => {
      return `
      <div id=${plant.id} class='space-y-4  p-3 bg-white shadow-md rounded-md'>
        <div class='aspect-[3/3]'>
          <img src="${plant.image}" alt="${plant.name}" class="w-full h-full object-cover rounded-lg"/>
        </div>
        <h2 onclick="showModal('${plant.id}')"  class='font-bold text-2xl'>${plant.name}</h2>
        <p class='line-clamp-3'>${plant.description}</p>
        <div class='flex justify-between'>
          <P class='bg-[#DCFCE7] text-[#15803D] py-1 px-3 rounded-full'>${plant.category}</P>
          <P class="font-bold"><span>${plant.price}</span></P>
        </div>
        <button class='bg-[#15803D] hover:bg-[#166534] cursor-pointer text-white w-full p-2 rounded-full font-medium'>Add to Cart</button>
      </div>`;
    })
    .join('');
};

const modal = document.getElementById('modal');

const showModal = (id) => {
  modal.classList.remove('hidden');
  const selectedPlant = plants.find((eachPlant) => eachPlant.id == id);
  if (selectedPlant) {
    const { name, category, description, image, price } = selectedPlant;
    const modalDataContainer = document.querySelector('.modal-container');
    modalDataContainer.innerHTML = `
    
    <div class='space-y-2'>
      <h3 class="title font-medium text-xl">${name}</h3>
      <div class="aspect-[4/3] rounded-lg overflow-hidden ">
        <img src="${image}" alt="" />
      </div>
        <p> <span class='font-medium'>Category:</span> ${category}</p>
        <p>  <span class='font-medium'>Price: </span> ${price}</p>
        <p > <span class='font-medium'>description: </span> ${description}</p>
     </div> `;
  }
};

const hideModal = () => {
  modal.classList.add('hidden');
};

modal.addEventListener('click', () => {
  hideModal();
});

allTrees();
loadNav();
