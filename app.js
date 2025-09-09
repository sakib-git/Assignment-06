const navContainer = document.getElementById('navContainer');
const mainAllTress = document.getElementById('mainAllTress');
const alltressdiv = document.getElementById('alltressdiv');
const everyTreesName = document.getElementById('everyTreesName');
const cartList = document.getElementById('cartList');
const count = document.getElementById('count');
const alltreespara = document.getElementById('alltreespara');
let cartListHisory = [];

const loadNav = () => {
  const url = 'https://openapi.programming-hero.com/api/categories';
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.categories);
      showNav(data.categories);
    });
};

const showNav = (categories) => {
  // console.log(categories)
  categories.forEach((categorie) => {
    // console.log(categorie)
    const div = document.createElement('div');
   
    div.innerHTML = `
     <button class='category-btn hover:bg-[#35c068] px-3 py-2 rounded-md hover:text-white'  id='${categorie.id}'> ${categorie.category_name}</button>
   `;
    navContainer.append(div);
  });
  navContainer.addEventListener('click', (e) => {
    const categoryBtn = e.target.closest('.category-btn');
    if (categoryBtn) {
      document.querySelectorAll('.category-btn').forEach((btn) => btn.classList.remove('active'));
      categoryBtn.classList.add('active');

      if (categoryBtn.id == 0) {
        showTrees(plants);
        return;
      }
      loadTreesId(categoryBtn.id);
    }
  });

};

const loadTreesId = (treesId) => {
  // console.log(treesId)
  fetch(`https://openapi.programming-hero.com/api/category/${treesId}`)
    .then((res) => res.json())
    .then((data) => {
      showThreesId(data.plants);
    });
};

const showThreesId = (plants) => {
  alltressdiv.innerHTML = '';
  everyTreesName.innerHTML = '';
  // console.log(plants)
  plants.forEach((plant) => {
    // console.log(plant)
    const div = document.createElement('div');
    div.innerHTML = `
      <div class=' space-y-4 p-3 bg-white shadow-md rounded-md mt-4 '>
        <div class="aspect-[3/3]">
          <img src="${plant.image}" alt="${plant.name}" class="w-full h-full object-cover  rounded-lg"/>
        </div>
        <h2 onclick=" showModal('${plant.id}')" class='font-bold text-2xl'>${plant.name}</h2>
        <p class='line-clamp-3'>${plant.description}</p>
        <div class='flex justify-between'>
          <P class='bg-[#DCFCE7] p-1 px-2 text-[#15803D] rounded-full'>${plant.category}</P>
          <P><span>${plant.price}</span></P>
        </div>
        <button class='bg-[#15803D] text-white p-2 rounded-full w-full font-medium'>add to cart</button>
      </div>`;
    everyTreesName.append(div);
  });
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
  count.innerText =   '৳' + totalPrice;
};


const dlt = (id) => {
  cartListHisory = cartListHisory.filter(item => item.id !== id);

  showCartList(cartListHisory);
};



everyTreesName.addEventListener('click', (e) => {
  // console.log(e.target.parentNode.children[3].children[1])
  console.log(e.target);
  if (e.target.innerText === 'add to cart') {
    const name = e.target.parentNode.children[1].innerText;
    const price = parseInt(e.target.parentNode.children[3].children[1].innerText);
    const id = Date.now()
    cartListHisory.push({
      name: name,
      price: price,
      id: id
    });

    showCartList(cartListHisory);
  }
});

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
  // console.log(plants)
  plants.forEach((plant) => {
    // console.log(plant);
    const div = document.createElement('div');
    div.innerHTML = `
<div id=${plant.id} class='space-y-4  p-3 bg-white shadow-md rounded-md'>

      <div class='aspect-[3/3]'>
      <img src="${plant.image}" alt="${plant.name}" class="w-full h-full object-cover rounded-lg"/>
      </div>


    <h2 onclick="showModal('${plant.id}')"  class='font-bold text-2xl'>${plant.name}</h2>
    <p class='line-clamp-3'>${plant.description}</p>
<div class='flex justify-between'>
    <P class='bg-[#DCFCE7] text-[#15803D] p-1 px-2 rounded-full'>${plant.category}</P>
   
    <P class="font-bold"><span>${plant.price}</span></P>
</div>
    <button class='bg-[#15803D] text-white w-full p-2 rounded-full font-medium'>add to cart</button>


</div>

    `;
    alltressdiv.append(div);
  });

};

alltressdiv.addEventListener('click', (e) => {
  // console.log(e.target.parentNode)
  if (e.target.innerText === 'add to cart') {
    const name = e.target.parentNode.children[1].innerText;
    const price = parseInt(e.target.parentNode.children[3].children[1].innerText);
    id = Date.now()
    cartListHisory.push({
      name: name,
      price: price,
      id:id

    });

    showCartList(cartListHisory);
  }
});

const modal = document.getElementById('modal');

const showModal = (id) => {
  modal.classList.remove('hidden');
  const selectedPlant = plants.find((eachPlant) => eachPlant.id == id);
  if (selectedPlant) {
    const { name, category, description, image, price } = selectedPlant;
    const modalDataContainer = document.querySelector('.modal-container');
    modalDataContainer.innerHTML = `
      <h3 class="title font-medium text-xl">${name}</h3>
      <div class="aspect-[3/2] rounded-lg overflow-hidden ">
        <img src="${image}" alt="" />
      </div>
      <div>
        <p> <span class='font-medium'>Category:</span> ${category}</p>
        <p>  <span class='font-medium'>Price: </span> ${price}</p>
        <p > <span class='font-medium'>description: </span> ${description}</p>
      </div>`;
  }
};

const hideModal = () => {
  modal.classList.add('hidden');
};


modal.addEventListener('click', () => {
  hideModal()
})
allTrees();
loadNav();
