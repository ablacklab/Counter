console.log("hola");

const div = document.querySelector(".divall");
const divmsj = document.querySelector(".divmsj");
const msjs = document.querySelector(".msjs");
let content = " "

function esrol(mensaje){
  if (mensaje.includes("//") || mensaje.includes("||") || mensaje.includes("\\") || mensaje.startsWith(" ;") || mensaje.endsWith("/") || mensaje.startsWith(` #`)){
    return false
  } else { 
    return true
  }
}

function contarEmojis(mensajes) {
  const contador = {}

  for (const mensaje of mensajes) {
  const emojis = mensaje.match(/\p{Emoji}/gu);
  
  if (emojis){
    for (const emojinum of emojis) {
      const emoji = emojinum.toLowerCase();
      if (!contador[emoji]) {
        contador[emoji] = 0;
      }
      contador[emoji]++;
    }
  } }
  return contador;
}

function clickrol(stats, divcel){
  console.log("clickrol")
  divcel.innerHTML = " ";
  stats.rol.forEach(element => {
    const mensaje = document.createElement("p");
    mensaje.textContent = element;
    divcel.appendChild(mensaje);
  });
}

function clickoff(stats, divcel){
  divcel.innerHTML = " ";
  stats.off.forEach(element => {
    const mensaje = document.createElement("p");
    mensaje.textContent = element;
    divcel.appendChild(mensaje);
  });
}

function clickmedia(stats, divcel){
  divcel.innerHTML = " ";
  stats.spam.forEach(element => {
    const mensaje = document.createElement("p");
    mensaje.textContent = element;
    divcel.appendChild(mensaje);
  });
}

function details(stats){
  msjs.innerHTML = " "
  msjs.classList.remove("statsmode");

  const nameuss = document.createElement("h2");
  nameuss.textContent = stats.uss;
  msjs.appendChild(nameuss);

  const buttonsdiv = document.createElement("div");
  buttonsdiv.classList.add("buttonsdiv");

  const btnrol = document.createElement("button");
  btnrol.textContent = "Rol"
  btnrol.addEventListener(("click"), () => clickrol(stats, divcel));
  const btnoff = document.createElement("button");
  btnoff.textContent = "Offrol"
  btnoff.addEventListener(("click"), () => clickoff(stats, divcel));
  const btnmedia = document.createElement("button");
  btnmedia.textContent = "Media"
  btnmedia.addEventListener(("click"), () => clickmedia(stats, divcel));

  buttonsdiv.appendChild(btnrol);
  buttonsdiv.appendChild(btnoff);
  buttonsdiv.appendChild(btnmedia);

  msjs.appendChild(buttonsdiv);

  const roldiv = document.createElement("div");
  roldiv.classList.add("mjspc");
  roldiv.textContent = "Rol"
  stats.rol.forEach(element => {
    const mensaje = document.createElement("p");
    mensaje.textContent = element;
    roldiv.appendChild(mensaje);
  });
  msjs.appendChild(roldiv);

  const offdiv = document.createElement("div");
  offdiv.classList.add("mjspc");
  offdiv.textContent = "Off-rol"
  stats.off.forEach(element => {
    const mensaje = document.createElement("p");
    mensaje.textContent = element;
    offdiv.appendChild(mensaje);
  });
  msjs.appendChild(offdiv);

  const mediadiv = document.createElement("div");
  mediadiv.classList.add("mjspc");
  mediadiv.textContent = "Media"
  stats.spam.forEach(element => {
    const mensaje = document.createElement("p");
    mensaje.textContent = element;
    mediadiv.appendChild(mensaje);
  });
  msjs.appendChild(mediadiv);

  const divcel = document.createElement("div");
  divcel.classList.add("divcel");
  msjs.appendChild(divcel);


}

function stats(allinfo) {
  msjs.innerHTML = " ";
  msjs.classList.add("statsmode");

  const top5Objects = allinfo
  .sort((a, b) => b.rol.length - a.rol.length)
  .slice(0, 5);
  
  const ussNames = top5Objects.map(obj => obj.uss);

  console.log(ussNames);
  console.log(top5Objects);

  msjs.innerHTML = ` 
  <h3>Top 5 con más mjs (en rol):</h3>
  <p>1. ${top5Objects[0].uss} (${top5Objects[0].rol.length})</p>
  <p>2. ${top5Objects[1].uss} (${top5Objects[1].rol.length})</p>
  <p>3. ${top5Objects[2].uss} (${top5Objects[2].rol.length})</p>
  <p>4. ${top5Objects[3].uss} (${top5Objects[3].rol.length})</p>
  <p>5. ${top5Objects[4].uss} (${top5Objects[4].rol.length})</p>
  `
}

function printmjs(mjs) {
    console.log("print");

    const allinfo = [ ];

    const statsbtn = document.createElement("button");
    statsbtn.textContent = "Stats :)";
    statsbtn.classList.add("statsbtn");
    divmsj.appendChild(statsbtn);

    for (const [nombre, mensajes] of Object.entries(mjs)) {
        const div = document.createElement("div");
        
        divmsj.appendChild(div);

        let msjrol = 0;
        let mjsoff = 0;
        let spam = 0;

        const stats = {
          uss: nombre,
          rol: [],
          off: [],
          spam: [],
        }

        //ahora calcular los off rol
        for (const mensaje of mensajes) {
          if(mensaje.includes("<Media omitted>") || mensaje === "" || mensaje === " null" || mensaje.includes("<View once voice message omitted>") || mensaje === " This message was deleted"){
            spam = spam+1;
            stats.spam.push(mensaje);
          } else {
            if (esrol(mensaje)){
              msjrol = msjrol+1;
              stats.rol.push(mensaje)
            } else {
              mjsoff = mjsoff+1;
              stats.off.push(mensaje);
            }
        }
      }

      allinfo.push(stats);

      //console.log(`${nombre} emojis:`);
      //console.log(contarEmojis(mensajes));

      div.textContent = `${nombre} - total: ${mensajes.length} - rol: ${msjrol} - offrol: ${mjsoff} - media: ${spam}`;
      div.addEventListener('click', ()=> {details(stats)})

      }

      statsbtn.addEventListener(("click"), () => stats(allinfo));
}

function separarMensajes(chatExport) {
    const mensajesPorPersona = {};
    for (const mensaje of chatExport) {

      const posraya = mensaje.indexOf("-");
      const texto = mensaje.slice(posraya + 1 );

      const pospuntos = texto.indexOf(":");
      const mensajeSinDosPuntos = texto.slice(pospuntos + 1 );
      const nombreSinDosPuntos = texto.slice(0, pospuntos);

      if (nombreSinDosPuntos) {
        if (!mensajesPorPersona[nombreSinDosPuntos]) {
          mensajesPorPersona[nombreSinDosPuntos] = [];
        }
        mensajesPorPersona[nombreSinDosPuntos].push(mensajeSinDosPuntos);
      }
    }
    return mensajesPorPersona;
}

function ignorarMensajesWhatsApp(objeto) {
    const objetoNuevo = {};
  for (const key in objeto) {
    const array = objeto[key];
    if (array.length > 1) {
      objetoNuevo[key] = array;
    }
  }
  return objetoNuevo;
}


//este agarra el texto y lo pone en un array así bn bonito
function counter(content) {
    const lines = content.split('\n');
    let combinedLines = [];
            let currentMessage = "";
            for (const line of lines) {
                if (line.match(/^\d{1,2}\/\d{1,2}\/\d{2,4}, \d{1,2}:\d{1,2}/)) {
                    // Es una nueva línea de mensaje
                    if (currentMessage !== "") {
                        combinedLines.push(currentMessage.trim());
                    }
                    currentMessage = line;
                } else {
                    // Pertenece al mensaje actual
                    currentMessage += " " + line;
                }
            }

            if (currentMessage !== "") {
                combinedLines.push(currentMessage.trim());
            }

            const chatLines = combinedLines.join('\n'); // Unir líneas combinadas

            const linessplit = chatLines.split('\n');
            

            const mjs = ignorarMensajesWhatsApp(separarMensajes(linessplit));

            printmjs(mjs)
}

//acá el input solo manda el texto pa arriba
const imgInput = document.createElement("input")
imgInput.type = "file";
imgInput.classList.add('imgInput');
imgInput?.addEventListener("change", async () => {
    const file = imgInput.files?.[0];
    if (file) { 
        const reader = new FileReader();
        reader.onload = function(e) {
            content = e.target.result;
            counter(content);
            };
        reader.readAsText(file);
    }
});     
div.appendChild(imgInput);


