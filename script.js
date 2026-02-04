const apyKeys = "469ca68e1584c6c6a8f67a5e16308367";
const cidade = document.querySelector(".inputPesquisa");
const btnPesquisar = document.querySelector(".botaoLupa");
const divResultado = document.querySelector(".opcoes");
const infoCidade = document.querySelector(".containerResultado");

btnPesquisar.addEventListener("click", () => {

  fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cidade.value}&limit=5&appid=${apyKeys}`)
    .then(response => {
      if (!response.ok) {
        throw new Error("Erro ao buscar dados");
      }
      return response.json();
    })

    .then(data => {
       divResultado.innerHTML = ""; 

      data.forEach(local => {
        const p = document.createElement("p");
        

        p.textContent = `${local.name} - ${local.state ?? "Sem estado"} (${local.country})`;

        divResultado.appendChild(p);

        p.addEventListener("click", () => {

            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${local.name}&appid=${apyKeys}&units=metric&lang=pt_br`)
            .then(response => {
                if (!response.ok) {
                  throw new Error("Erro ao buscar dados");
                }
                return response.json();
              })

            .then(data =>{
                const umidade = document.createElement("p");

                umidade.textContent = `umidade: ${data.humidity}%`;

                infoCidade.appendChild(humidade);
            })
        });
      });

    
    })

    .catch(err => console.error(err));

});
