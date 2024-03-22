console.log("hola");

const div = document.querySelector(".divall");
const divmsj = document.querySelector(".divmsj");
const msjs = document.querySelector(".msjs");
let content = " ";

function esrol(mensaje){
  if (mensaje.startsWith(" //") || mensaje.startsWith(" _//") || mensaje.endsWith("//") || mensaje.includes("||") || mensaje.includes("\\") || mensaje.startsWith(" ;") || mensaje.endsWith("/") || mensaje.endsWith(";;") || mensaje.startsWith(` #`) || mensaje.startsWith(` _#`) || mensaje.startsWith(' &&') || mensaje.startsWith(' -') || mensaje === ' .'){
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

  /*const mediadiv = document.createElement("div");
  mediadiv.classList.add("mjspc");
  mediadiv.textContent = "Media"
  stats.spam.forEach(element => {
    const mensaje = document.createElement("p");
    mensaje.textContent = element;
    mediadiv.appendChild(mensaje);
  });
  msjs.appendChild(mediadiv);*/

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

    //HACER EL NUEVO ARRAY CON LOS MENSAJES
    for (const [nombre, mensajes] of Object.entries(mjs)) {

        const stats = {
          uss: nombre,
          rol: [],
          off: [],
          spam: [],
        }

        //ahora calcular los off rol
        for (const mensajeobj of mensajes) {
          const mensaje = mensajeobj.mensaje;
          if(mensaje.includes("<Media omitted>") || mensaje === "" || mensaje === " null" || mensaje.includes("<View once voice message omitted>") || mensaje === " This message was deleted" || mensaje.includes("<Multimedia omitido>")){
            stats.spam.push(mensaje);
          } else {
            if (esrol(mensaje)){
              stats.rol.push(mensaje)
            } else {
              stats.off.push(mensaje);
            }
        }
      }

      allinfo.push(stats);

      //console.log(`${nombre} emojis:`);
      //console.log(contarEmojis(mensajes));

      /*div.textContent = `${nombre} - total: ${mensajes.length} - rol: ${msjrol} - offrol: ${mjsoff} - media: ${spam}`;
      div.addEventListener('click', ()=> {details(stats)})*/
      }

      const organizedarray = allinfo.sort((a, b) => b.rol.length - a.rol.length);
      for (const stats of organizedarray) {
        const div = document.createElement("div");
        div.classList.add("mensajediv");

        div.innerHTML = `
        <p><b>${stats.rol.length}</b> ${stats.uss}</p>
        <p>Total: ${stats.off.length + stats.rol.length + stats.spam.length} - Off: ${stats.off.length} - Media: ${stats.spam.length}</p>
        `
        
        div.addEventListener('click', ()=> {details(stats)})
        divmsj.appendChild(div);
      }

      statsbtn.addEventListener(("click"), () => stats(allinfo));
}

function separarMensajes(chatExport, date) {

  const chatfiltered = chatExport.filter(mensaje => mensaje.startsWith(date)); 
  const primerElemento = chatfiltered[0];
  const poselemento = chatExport.indexOf(primerElemento);

  const chatfinal = chatExport.slice((poselemento-1) + 1);

    const mensajesPorPersona = {};
    for (const mensaje of chatfinal) {
      const posraya = mensaje.indexOf("-");
      const texto = mensaje.slice(posraya + 1 );
      const datehour = mensaje.slice(0, posraya);

      const pospuntos = texto.indexOf(":");
      const msjtexto = texto.slice(pospuntos + 1 );
      const nombre = texto.slice(0, pospuntos);

      const poscoma = datehour.indexOf(",");
      const hora = datehour.slice(poscoma + 1 );
      const fecha = datehour.slice(0, poscoma);

      const mensajefull = {
        fecha: fecha,
        hora: hora,
        mensaje: msjtexto
      }

      if (nombre) {
        if (!mensajesPorPersona[nombre]) {
          mensajesPorPersona[nombre] = [];
        }
        mensajesPorPersona[nombre].push(mensajefull);
      }
    }
    return mensajesPorPersona;
}

function ignorarMensajesWhatsApp(objeto) {
    const objetoNuevo = {};
  for (const key in objeto) {
    const array = objeto[key];
    if (array.length > 1 && !key.includes("changed this group's settings") && !key.includes("pinned a messag") && !key.includes("requested to join") && !key.match(/୧ ✿ › .* lef/)) {
      objetoNuevo[key] = array;
    }
  }
  return objetoNuevo;
}


//este agarra el texto y lo pone en un array así bn bonito
function counter(texto, date) {
  // 2024-03-12 => input
  // 3/12/24 => output

  const formattedDate = date.split('-');
  var day = formattedDate[2];
  var month = formattedDate[1];
  const year = formattedDate[0].slice(2, 4);
  if (month.startsWith("0")) {
    month = month.slice(1);
  }
  if (day.startsWith("0")) {
    day = day.slice(1);
  }
  const dateFormatted = `${month}/${day}/${year}`;

  //const content = texto.split('CUT_HERE');

  const lines = texto.split('\n');

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

            const mjs = ignorarMensajesWhatsApp(separarMensajes(linessplit, dateFormatted));

            printmjs(mjs)
}

//acá el input solo manda el texto pa arriba

const forms = document.querySelector("#forms");
const fileInput = document.querySelector("#file");

forms.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dataforms = new FormData(forms);
    const date =  dataforms.get("date");
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            content = e.target.result;
            counter(content, date);
            };
        reader.readAsText(file);
    }
});



