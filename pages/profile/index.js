/* Desenvolva sua lógica aqui...*/

async function findUser(nameUser) {
  try {
    let user = await fetch(`https://api.github.com/users/${nameUser}`);
    let userJson = await user.json();

    createProfileUser(userJson);

    let userRepository = await fetch(
      `https://api.github.com/users/${nameUser}/repos`
    );
    let userRepositoryJson = await userRepository.json();
    showMyRepo(userRepositoryJson);
  } catch {}
}

function createProfileUser(user) {
  let firstLetterUpperCase =
    user.login.charAt(0).toUpperCase() + user.login.slice(1);
  let titlePage = document.querySelector("title");

  titlePage.innerText = `Perfil ${firstLetterUpperCase}`;

  let headerProfile = document.querySelector("#userInfo");
  headerProfile.insertAdjacentHTML(
    "beforeEnd",
    `

<div id="userData" class="flex columnGap alignCenter">
      <img class="profileImg" src="${user.avatar_url}" alt="">
      <div  class="flex column rowGapMin">
        <h2 class="title2">${user.login}</h2>
        <span class="text4 myBio">${user?.bio || "-"}</span>
      </div>
    </div>

    <div>
      <a id ="mail" href="mailto:${user.email}" class="button">Email</a>
      <a href="../../index.html" class="button">Trocar de usuário</a>
    </div>
`
  );
}

function showMyRepo(repoList) {
  let myRepo = document.querySelector("#myRepo");
  repoList.forEach((repo) => {
    myRepo.insertAdjacentHTML(
      "beforeEnd",
      `<li class="flex wrap rowGap columnGap">
        <h3 class="text1 min250 ">${repo.name}</h3>
        <p class="text5 min250"><span>Sobre: </span>${
          repo?.description || "-"
        }</p>
        <a  class="buttonLink" href="${repo.svn_url}">Repositório</a>
        <a  class="buttonLink" href="${repo.homepage}">Demo</a>
      </li>`
    );
  });
}

let teste = localStorage.getItem("mySearch");

findUser(JSON.parse(teste));
