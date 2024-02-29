const loadPhone = async (searchText, isShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones, isShowAll) =>{

    const phoneContainer = document.getElementById('phone-container');
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    //display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');
    }
    else{
        showAllContainer.classList.add('hidden');
    }

    //display first 12 phones if not show All
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone =>{
        //console.log(phone);
        //2- create a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card bg-gray-300 p-4 shadow-xl`
        //3- set inner Html
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}"/></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-center">
                    <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary px-16">Show Details</button>
                </div>
            </div>
        `
        //4- append child
        phoneContainer.appendChild(phoneCard);
    })

    //hide loading spinner
    toggleLoadingSpinner(false);
}

//
const handleShowDetail = async(id) =>{
    //load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();

    const phone = data.data;
    showPhoneDetails(phone);
}

const showPhoneDetails = (phone) => {
    const phoneName = document.getElementById('show_detail_phone_name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}"/>
        <p class="text-xl my-1"><span class="font-bold">Brand:</span>${phone?.brand}</p>
        <p class="text-xl my-1"><span class="font-bold">Storage:</span>${phone?.mainFeatures?.storage}</p>
        <p class="text-xl my-1"><span class="font-bold">Display:</span>${phone?.mainFeatures?.displaySize}</p>
        <p class="text-xl my-1"><span class="font-bold">Memory:</span>${phone?.mainFeatures?.memory}</p>
        <p class="text-xl my-1"><span class="font-bold">Chip set:</span>${phone?.mainFeatures?.chipSet}</p>
        <p class="text-xl my-1"><span class="font-bold">GPS:</span>${phone?.others?.GPS || 'No GPS'}</p>
    `

    //show the modal
    show_details_modal.showModal();
}

// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    //console.log(searchText);
    loadPhone(searchText, isShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }
    else{
        loadingSpinner.classList.add('hidden');
    }
}

//handle show all
const handleShowAll = () => {
    handleSearch(true);
}


//loadPhone();