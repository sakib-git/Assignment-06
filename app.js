const navContainer = document.getElementById('navContainer');
const mainAllTress = document.getElementById('mainAllTress');
const alltressdiv = document.getElementById('alltressdiv');
const everyTreesName = document.getElementById('everyTreesName')

const loadNav = () => {
  const url = 'https://openapi.programming-hero.com/api/categories';
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.categories)
      showNav(data.categories);
    });
};

const showNav = (categories) => {
  // console.log(categories)
  categories.forEach((categorie) => {
    // console.log(categorie)
    const div = document.createElement('div');
    div.innerHTML = `
 <li id='${categorie.id}'> ${categorie.category_name}</li>
   `;
    navContainer.append(div);
  });
  navContainer.addEventListener('click', (e) => {
    // console.log(e)

    const allLi = document.querySelectorAll('li');

    allLi.forEach((li) => {
      li.classList.remove('bg-[#15803D]', 'text-white', 'p-1', 'rounded-md');
    });
    if (e.target.localName === 'li') {
      e.target.classList.add('bg-[#15803D]', 'text-white', 'p-1', 'rounded-md');
      loadTreesId(e.target.id)
    }
  });
};

const loadTreesId = (treesId) => {
  // console.log(treesId)
  fetch(`https://openapi.programming-hero.com/api/category/${treesId}`)
  .then((res) => res.json())
  .then(data => {
    showThreesId(data.plants)
  })
  
}

const showThreesId =(plants) => {
  alltressdiv.innerHTML = '';
  everyTreesName.innerHTML = '';
  // console.log(plants)
  plants.forEach(plant => {
    // console.log(plant)
    const div  = document.createElement('div')
    div.innerHTML = `
    <div class='flex flex-col gap-4 p-3 bg-white shadow-md rounded-md '>
          <img src="${plant.image}" alt="${plant.name}" class="w-full h-100  rounded-lg"/>
          <h2>${plant.name}</h2>
           <p class='line-clamp-3'>${plant.description}</p>
    <div class='flex justify-between'>
    <P class='bg-[#DCFCE7] p-1 px-2 rounded-full'>${plant.category}</P>
    <P>${plant.price}</P>
</div>
    <button class='bg-[#15803D] text-white p-2 rounded-full font-medium'>add to cart</button>
    
    </div>
    
    `;
    everyTreesName.append(div)
  })
  
}

const allTrees = () => {
  const url = 'https://openapi.programming-hero.com/api/plants';
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      showTrees(data.plants);
    });
};

const showTrees = (plants) => {
  // console.log(plants)
  plants.forEach((plant) => {
    // console.log(plant);
    const div = document.createElement('div');
    div.innerHTML = `
<div class='flex flex-col gap-2 p-3 bg-white shadow-md rounded-md'>

      <img src="${plant.image}" alt="${plant.name}" class="w-full h-100 rounded-lg"/>
    <h2 class='text-2xl'>${plant.name}</h2>
    <p class='line-clamp-3'>${plant.description}</p>
<div class='flex justify-between'>
    <P class='bg-[#DCFCE7] p-1 px-2 rounded-full'>${plant.category}</P>
    <P>${plant.price}</P>
</div>
    <button class='bg-[#15803D] text-white p-2 rounded-full font-medium'>add to cart</button>


</div>

    `;
    alltressdiv.append(div);
  });
};



allTrees();
loadNav();
