
const button = document.querySelector(".btn")
let numeroConselho = document.querySelector(".advice-number")
let areaMsg = document.querySelector(".advice")

button.addEventListener('click', function () {
    generatorAdvice()
})

async function generatorAdvice() {
    const url = "https://api.adviceslip.com/advice"

    numeroConselho.innerText = "Buscando conselho...";
    areaMsg.innerHTML = `<span class="loader"></span>`;

    try {
        const resposta = await fetch(url)

    /* 
      A propriedade .ok é responsável por verificar se a resposta (Response) foi feita com sucesso ou não, 
  
      nesse caso estamos negando a resposta, ou seja, se a resposta não foi feita com sucesso, retornamos um erro.
    
      Ela está presente no objeto Response, que é retornado pela função fetch. 
    */

        if (!resposta.ok) {
            throw new Error(`Erro na requisição: ${resposta.status}`)
        }

        const data = await resposta.json()
        const idNumber = data.slip.id
        const advice = data.slip.advice

        numeroConselho.innerText = `Advice #${idNumber}`
        areaMsg.innerText = `"${advice}"`

        // console.log(idNumber)
        // console.log(advice)


    } catch (erro) {
        console.error("Erro ao buscar o conselho:", erro);
        numeroConselho.innerText = "Erro";
        areaMsg.innerText = "Não foi possível carregar o conselho. Tente novamente.";
    }
}


/*
async function generatorAdvice() {
    const url = "https://api.adviceslip.com/advice"
    const resposta = await fetch(url)
    const data = await resposta.json()
    const idNumber = data.slip.id
    const advice = data.slip.advice

    numeroConselho.innerText = `Advice #${idNumber}`
    areaMsg.innerText = `"${advice}"`

    // console.log(idNumber)
    // console.log(advice)

}
*/
