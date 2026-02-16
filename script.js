const apyKeys = "469ca68e1584c6c6a8f67a5e16308367";
const cidade = document.querySelector(".inputPesquisa");
const btnPesquisar = document.querySelector(".botaoLupa");
const divResultado = document.querySelector(".opcoes");
const infoCidade = document.querySelector(".containerResultado");
const gradosPrincipal = document.querySelector(".grados");
const humidade = document.querySelector(".Humidade");
const statusCidade = document.querySelector(".status");
const tempMAX = document.querySelector(".tempMAX");
const tempMIN = document.querySelector(".tempMIN");
const CidadePrincipal = document.querySelector(".cidade");



function ehDia(data) {
  const agora = data.dt;
  const nascer = data.sys.sunrise;
  const por = data.sys.sunset;

  return agora >= nascer && agora < por;
}



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
              const clima = data.weather[0].main;

                let emoji;
              
              switch (clima) {
                case "Clear":
                  emoji = "☀️";
                  break;
              
                case "Clouds":
                  emoji = "☁️";
                  break;
              
                case "Rain":
                  emoji = "🌧️";
                  break;
              
                case "Drizzle":
                  emoji = "🌦️";
                  break;
              
                case "Thunderstorm":
                  emoji = "⛈️";
                  break;
              
                case "Snow":
                  emoji = "❄️";
                  break;
              
                case "Mist":
                case "Fog":
                case "Haze":
                case "Smoke":
                case "Dust":
                case "Sand":
                case "Ash":
                  emoji = "🌫️";
                  break;
              
                case "Squall":
                  emoji = "💨";
                  break;
              
                case "Tornado":
                  emoji = "🌪️";
                  break;
              
                default:
                  emoji = "🌍";
              }

                gradosPrincipal.textContent = `${data.main.temp}°`;
                humidade.textContent = `Humidade: ${data.main.humidity}%`;
                tempMAX.textContent = `Temp MAX: ${data.main.temp_max}%`;
                tempMIN.textContent = `Temp MIN: ${data.main.temp_min}%`;
                CidadePrincipal.textContent = `${data.name} ${emoji}`;

                
                
                
                statusCidade.textContent = `Status: ${data.weather[0].description} `;

                if (ehDia(data)) {
                  document.body.style.backgroundImage = "url('images/Dia.jpg')";
                } else {
                  document.body.style.backgroundImage = "url('images/noite.jpg')";
                }
              
    
    

            })
        });
      });

    
    })

    .catch(err => console.error(err));

});

cidade.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    btnPesquisar.click();
  }
});