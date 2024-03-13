async function verDetalhes(){
  let buscar = await fetch("lista-produtos.json")
  let produtos = await buscar.json()

  let parametrosURL = new URLSearchParams(window.location.search)
  let idProduto = parametrosURL.get("produtoid")

  let indice = null
  for(let x in produtos){
    if(produtos[x].id == idProduto){
      indice = x
    }
  }

  document.title = produtos[indice].nome

  document.getElementById("detalhes").innerHTML += `
    <h1>${produtos[indice].nome}</h1>

    <div class="img-principal">
      <img src="${produtos[indice].img[0]}" id="img-frame" alt="não renderizou" width="auto" height="auto" style="border: 1px solid #000; border-radius: 10px">
    </div>

    <div class="mini-img" id="mini-img"></div>

    <p>${produtos[indice].descricao}</p>

    <div class="grupoValores">
      <span class="com-desc">
        R$ ${(produtos[indice].valorComDesconto).toFixed(2).replace(".", ",")}
      </span>

      <span class="sem-desc">
        R$ ${(produtos[indice].valorSemDesconto).toFixed(2).replace(".", ",")}
      </span>
    </div>
  `
  let divMini = document.getElementById("mini-img")
  for(let i of produtos[indice].img){
    divMini.innerHTML += `
      <div class="minatura-frame">
        <img src="${i}" class="miniatura" alt="não renderizou" width="auto" height="auto">
      </div>
    `
  }

  let miniCards = document.querySelectorAll(".miniatura")
  for(let card of miniCards){
    card.addEventListener("mouseover", alteraImg)
  }
}

function alteraImg(){
  let frame = document.getElementById("img-frame")
  frame.src = this.getAttribute("src")
}

verDetalhes()