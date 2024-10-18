const categoryBtnContainer = document.getElementById("categoryBtnContainer");
const loading = document.getElementById("loading");
const modal = document.getElementById("modalContainer");

let trackPets;

const fetchCategoryBtns = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/categories"
  );
  const btns = await res.json();
  showBtns(btns.categories);
};

fetchCategoryBtns();

function showBtns(btns) {
  btns.forEach((btn) => {
    const button = document.createElement("button");
    button.type = "button";
    button.classList =
      "categoryBtn py-3 px-5 gap-x-2 rounded-2xl border flex justify-center items-center hover:bg-[#0E7A811A] hover:border hover:border-primaryColor transition-colors duration-200";
    button.innerHTML = `
      <img class="w-1/4" src="${btn.category_icon}" alt="img" /> <span class="text-2xl font-bold">${btn.category}</span>`;

    categoryBtnContainer.append(button);
  });
}

categoryBtnContainer.addEventListener("click", (e) => {
  handleCategoryBtn(e);
});

const handleCategoryBtn = (e) => {
  const categoryBtns = document.querySelectorAll(".categoryBtn");

  const targetBtn = e.target.closest(".categoryBtn");

  //   set active status
  if (targetBtn) {
    categoryBtns.forEach((btn) => {
      btn.classList.remove("active");
    });

    targetBtn.classList.add("active");
  }

  //fetch pets by category

  petsByCategory(targetBtn.innerText.toLowerCase());
};

async function petsByCategory(category) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${category}`
  );
  const pets = await res.json();
  showPets(pets.data);
}

const petCollectionContainer = document.getElementById("petContainer");

// fetching all pet

const fetchAllPets = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/peddy/pets"
  );
  const pets = await res.json();
  showPets(pets.pets);
};
fetchAllPets();

function showPets(pets) {
  petCollectionContainer.innerHTML = `<div class='col-span-12 flex justify-center items-center'>
            <span
                id="loading"
                class="loading loading-bars loading-lg mx-auto col-span-12"
              ></span></div>`;
  trackPets = pets;

  setTimeout(() => {
    petCollectionContainer.innerHTML = "";
    pets.length === 0
      ? handleNotFoundPets()
      : pets.forEach((pet) => {
          const cardContainer = document.createElement("div");
          cardContainer.classList = "p-5 border rounded-xl";

          cardContainer.innerHTML = `   <img class="w-full mb-1 rounded-md" src="${
            pet.image
          }" alt="" />

                <!-- content -->
                <div>
                  <h4 class="text-lg md:text-xl font-bold mb-2">
                    ${pet.pet_name}
                  </h4>
                  <div>
                    <ul class="text-gray-500">
                      <li class="flex justify-start items-center gap-x-2">
                        <img src="./images/breed.png" alt="" />
                        <p>Bred: ${pet.breed ? pet.breed : "Not Available"}</p>
                      </li>

                      <li class="flex justify-start items-center gap-x-2">
                        <img src="./images/birth.png" alt="" />
                        <p>Birth: ${
                          pet.date_of_birth
                            ? pet.date_of_birth
                            : "Not Available"
                        }</p>
                      </li>

                      <li class="flex justify-start items-center gap-x-2">
                        <img src="./images/gender.png" alt="" />
                        <p>Gender: ${
                          pet.gender ? pet.gender : "Not Available"
                        }</p>
                      </li>

                      <li class="flex justify-start items-center gap-x-2">
                        <img src="./images/dollar.png" alt="" />
                        <p>Price: <span id="price">${
                          pet.price ? `${pet.price}$` : "Not Available"
                        }</span></p>
                      </li>
                    </ul>
                  </div>
                </div>
                <hr class="my-3 shadow" />

                <!-- footer -->
                <div
                  class="grid grid-cols-4 justify-center items-center mt-5 gap-3"
                >
                  <button id="likeBtn"
                  onclick="hanldeLikeBtn(event,'${pet.image}')"
                    class="col-span-2 lg:col-span-1 xl:col-span-2 p-2 rounded-lg border text-lg font-bold flex justify-center hover:bg-[#0E7A811A]"
                    type="button"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="currentColor"
                      class="size-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z"
                      />
                    </svg>
                  </button>
                  <button

                    class="adoptBtn col-start-3 lg:col-start-2 xl:col-start-3 col-end-5 px-4 py-2 rounded-lg border text-primaryColor text-lg font-bold hover:bg-[#0E7A811A]"
                    type="button"
                  >
                    Adopt
                  </button>
                  <button

                  onclick = "handleShowModal(${pet.petId})"
                    class="detailsBtn col-span-4 px-4 py-2 rounded-lg border text-primaryColor text-lg font-bold hover:bg-[#0E7A811A]"
                    type="button flex items-center justify-center"
                  >
                    Details
                  </button>
                </div>`;

          petCollectionContainer.append(cardContainer);
        });
  }, 2000);
}

const handleNotFoundPets = () => {
  const layout = document.createElement("div");
  layout.classList = "col-span-12 text-center py-24 bg-[#f8f8f8] rounded-2xl";

  layout.innerHTML = `<img class="mx-auto" src="./images/error.png" alt="not found" />

  <h3 class="text-3xl my-3 font-bold">No Information Available</h3>
  <p class="text-base text-gray-600">
    Sorry, we couldn’t find any pets matching your search. Please try again
    later or explore other options.
  </p>`;

  petCollectionContainer.append(layout);
};

// handle like pet

const hanldeLikeBtn = (e, image) => {
  const likedContainer = document.getElementById("likedPetContainer");

  const img = document.createElement("img");

  img.src = image;
  img.classList = "rounded-md";
  img.alt = "image";
  likedContainer.append(img);

  //set active status
  const targetBtn = e.target.closest("#likeBtn");
  targetBtn && targetBtn.classList.add("active");
};

const sortBtn = document.getElementById("sortPets");
sortBtn.addEventListener("click", handleSort);

function handleSort() {
  const sortedPets = trackPets.sort((a, b) => {
    const priceA = a.price ? parseInt(a.price) : 0;
    const priceB = b.price ? parseInt(b.price) : 0;
    return priceB - priceA;
  });
  showPets(sortedPets);
}

async function handleShowModal(id) {
  let detailsBtn;
  petCollectionContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("detailsBtn")) {
      detailsBtn = e.target;
      detailsBtn.innerHTML = `<span class="loading loading-spinner loading-sm"></span>`;
    }
  });

  const fetchPet = await fetch(
    `https://openapi.programming-hero.com/api/peddy/pet/${id}`
  );

  const pet = await fetchPet.json();

  setTimeout(() => {
    detailsBtn.innerText = "Details";
    showModal(pet.petData);
  }, 500);
}

function showModal(pet) {
  console.log(pet);
  const {
    image,
    pet_name,
    breed,
    gender,
    vaccinated_status,
    date_of_birth,
    price,
    pet_details,
  } = pet;
  const modalBox = document.createElement("div");
  modalBox.classList = "p-6 rounded-xl bg-white max-w-lg w-full mx-auto my-5";

  modalBox.innerHTML = ` <img class="w-full rounded-lg" src="${image}" alt="${pet_name}" />

        <!-- pet information -->
        <div class="mt-4">
          <h3 class="mb-2 text-lg md:text-2xl font-bold">${pet_name}</h3>
          <div class="flex gap-8">
            <ul class="text-gray-500">
              <li class="flex justify-start items-center gap-x-2">
                <img src="./images/breed.png" alt="" />
                <p>Bred: ${breed ? breed : "Not Available"}</p>
              </li>

              <li class="flex justify-start items-center gap-x-2">
                <img src="./images/gender.png" alt="" />
                <p>Gender: ${gender ? gender : "Not Available"}</p>
              </li>
              <li class="flex justify-start items-center gap-x-2">
                <img src="./images/gender.png" alt="" />
                <p>Vaccinated Status: ${
                  vaccinated_status ? vaccinated_status : "Unknown"
                }</p>
              </li>
            </ul>

            <ul class="text-gray-500">
              <li class="flex justify-start items-center gap-x-2">
                <img src="./images/birth.png" alt="" />
                <p>Birth: ${
                  date_of_birth
                    ? new Date(date_of_birth).getFullYear()
                    : "Not Available"
                }</p>
              </li>
              <li class="flex justify-start items-center gap-x-2">
                <img src="./images/dollar.png" alt="" />
                <p>Price: ${price ? price + "$" : "Not Available"}</p>
              </li>
            </ul>
          </div>
        </div>

        <hr class="my-3" />

        <!-- pet details -->
        <div class="space-y-3">
          <h4 class="text-base font-semibold">Details Information</h4>
          <p class="text-sm">${pet_details ? pet_details : "Not Available"}
          </p>
          <button
            onclick="handleCloseModal()"
            class="w-full bg-[#0E7A811A] rounded-lg border border-primaryColor py-2 text-primaryColor text-lg font-bold"
            type="button"
          >
            Cancel
          </button>
        </div>`;

  modal.appendChild(modalBox);
  modal.classList.remove(
    "opacity-0",
    "-z-10",
    "pointer-events-none",
    "items-center"
  );
  modal.classList.add(
    "opacity-100",
    "z-10",
    "pointer-events-auto",
    "items-start"
  );
  document.body.style.overflow = "hidden";
}

function handleCloseModal() {
  modal.innerHTML = "";
  modal.classList.add(
    "opacity-0",
    "-z-10",
    "pointer-events-none",
    "items-center"
  );
  modal.classList.remove(
    "opacity-100",
    "z-10",
    "pointer-events-auto",
    "items-start"
  );
  document.body.style.overflow = "auto";
}

const handleAdoption = (e) => {
  if (e.target.classList.contains("adoptBtn")) {
    const modalBox = document.createElement("div");
    modalBox.classList = "p-5 rounded-lg bg-white max-w-sm mx-auto text-center";
    modalBox.innerHTML = `<img class="w-1/5 mx-auto" src="./images/handclasp.png" alt="icon" />
  <h2 class="text-3xl font-bold mb-2">Congrats!</h2>
  <p class="text-lg mb-2 font-bold">Adoption Proccess is Start For Your Pet</p>
  <span id="countdown" class="text-2xl font-bold">
    3
  </span>`;

    modal.append(modalBox);
    modal.classList.remove("opacity-0", "-z-10", "pointer-events-none");
    modal.classList.add("opacity-100", "z-10", "pointer-events-auto");
    document.body.style.overflow = "hidden";

    startCountdown(e.target);
  }
};

function startCountdown(btn) {
  const display = document.getElementById("countdown");

  let timer = 3;

  let interval = setInterval(() => {
    if (timer <= 0) {
      clearInterval(interval);
      handleCloseModal();
      btn.classList.add(
        "hover:bg-primaryColor",
        "hover:bg-opacity-50",
        "bg-primaryColor",
        "bg-opacity-50"
      );
      btn.disabled = true;
      btn.innerText = "Adopted";
    } else {
      timer -= 1;
      display.innerText = timer;
    }
  }, 1000);
}

// handle adoption
petCollectionContainer.addEventListener("click", handleAdoption);
