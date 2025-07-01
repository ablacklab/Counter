console.log("hola");

const div = document.querySelector(".divall");
const divmsj = document.querySelector(".divmsj");
const msjs = document.querySelector(".msjs");
let content = " ";

function esrol(mensaje) {
  if (
    mensaje.startsWith(" //") ||
    mensaje.startsWith(" _//") ||
    mensaje.endsWith("//") ||
    mensaje.endsWith("//_") ||
    mensaje.startsWith(" ||") ||
    mensaje.endsWith("||") ||
    mensaje.startsWith(" |") ||
    mensaje.startsWith(" _•||") ||
    mensaje.includes("\\") ||
    mensaje.startsWith(" ;") ||
    mensaje.endsWith("/") ||
    mensaje.endsWith(";;") ||
    mensaje.startsWith(` #`) ||
    mensaje.startsWith(` _#`) ||
    mensaje.startsWith(" &&") ||
    mensaje.startsWith(" -") ||
    mensaje === " ." ||
    mensaje.endsWith("|") ||
    mensaje.endsWith("//•")
  ) {
    return false;
  } else {
    return true;
  }
}

function contarEmojis(mensajes) {
  const contador = {};

  for (const mensaje of mensajes) {
    const emojis = mensaje.match(/\p{Emoji}/gu);

    if (emojis) {
      for (const emojinum of emojis) {
        const emoji = emojinum.toLowerCase();
        if (!contador[emoji]) {
          contador[emoji] = 0;
        }
        contador[emoji]++;
      }
    }
  }
  return contador;
}

function clickrol(stats, divcel) {
  console.log("clickrol");
  divcel.innerHTML = " ";
  stats.rol.forEach((element) => {
    const mensaje = document.createElement("p");
    mensaje.textContent = element;
    divcel.appendChild(mensaje);
  });
}

function clickoff(stats, divcel) {
  divcel.innerHTML = " ";
  stats.off.forEach((element) => {
    const mensaje = document.createElement("p");
    mensaje.textContent = element;
    divcel.appendChild(mensaje);
  });
}

function clickmedia(stats, divcel) {
  divcel.innerHTML = " ";
  stats.spam.forEach((element) => {
    const mensaje = document.createElement("p");
    mensaje.textContent = element;
    divcel.appendChild(mensaje);
  });
}

function details(stats) {
  msjs.innerHTML = " ";
  msjs.classList.remove("statsmode");

  const nameuss = document.createElement("h2");
  nameuss.textContent = stats.uss;
  msjs.appendChild(nameuss);

  const buttonsdiv = document.createElement("div");
  buttonsdiv.classList.add("buttonsdiv");

  const btnrol = document.createElement("button");
  btnrol.textContent = "Rol";
  btnrol.addEventListener("click", () => clickrol(stats, divcel));
  const btnoff = document.createElement("button");
  btnoff.textContent = "Offrol";
  btnoff.addEventListener("click", () => clickoff(stats, divcel));
  const btnmedia = document.createElement("button");
  btnmedia.textContent = "Media";
  btnmedia.addEventListener("click", () => clickmedia(stats, divcel));

  buttonsdiv.appendChild(btnrol);
  buttonsdiv.appendChild(btnoff);
  buttonsdiv.appendChild(btnmedia);

  msjs.appendChild(buttonsdiv);

  const roldiv = document.createElement("div");
  roldiv.classList.add("mjspc");
  roldiv.textContent = "Rol";
  stats.rol.forEach((element) => {
    const mensaje = document.createElement("p");
    mensaje.textContent = element;
    roldiv.appendChild(mensaje);
  });
  msjs.appendChild(roldiv);

  const offdiv = document.createElement("div");
  offdiv.classList.add("mjspc");
  offdiv.textContent = "Off-rol";
  stats.off.forEach((element) => {
    const mensaje = document.createElement("p");
    mensaje.textContent = element;
    offdiv.appendChild(mensaje);
  });
  msjs.appendChild(offdiv);

  const divcel = document.createElement("div");
  divcel.classList.add("divcel");
  msjs.appendChild(divcel);
}

function stats(allinfo) {
  msjs.innerHTML = " ";
  msjs.classList.add("statsmode");
  msjs.classList.remove("msjs");

  msjs.innerHTML += `<h2>Top 5</h2>`;
  const divTop = document.createElement("div");
  const top1Div = document.createElement("div");
  const top2Div = document.createElement("div");
  const top3Div = document.createElement("div");

  const divTaBien = document.createElement("div");
  const divMenos200 = document.createElement("div");
  const divRisk = document.createElement("div");
  const divDeath = document.createElement("div");

  let count = 0;

  allinfo.forEach((element) => {
    let usser = element.uss;
    if (usser.includes("୧ ✿ ›")) {
      usser = usser.split("୧ ✿ ›")[1].split("֗")[0];
      if (usser.includes("𝒶𝓃𝒹")) {
        usser = usser.replace("𝒶𝓃𝒹", "&");
      }
    }

    if (count < 5) {
      console.log(`top ${count + 1} ${usser}`);
      if (
        usser.includes("Ollie") ||
        usser.includes("Dan") ||
        usser.includes("Raqn") ||
        usser.includes("Jazz") ||
        usser.includes("Jaiden")
      ) {
        top3Div.innerHTML += `<p class="gray"><b>${element.rolnumber}</b> ${usser}</p>`;
      } else {
        switch (count) {
          case 0:
            top1Div.innerHTML += `<p class="top"><b>${element.rolnumber}</b> ${usser}</p>`;
            break;
          case 1:
            top2Div.innerHTML += `<p class="top"><b>${element.rolnumber}</b> ${usser}</p>`;
            break;
          case 2:
            top2Div.innerHTML += `<p class="top"><b>${element.rolnumber}</b> ${usser}</p>`;
            break;
          case 3:
            top3Div.innerHTML += `<p class="top"><b>${element.rolnumber}</b> ${usser}</p>`;
            break;
          case 4:
            top3Div.innerHTML += `<p class="top"><b>${element.rolnumber}</b> ${usser}</p>`;
            break;
          default:
            break;
        }
        count++;
      }
    } else if (element.rolnumber < 90) {
      divDeath.innerHTML += `<p class="death">${usser}</p>`;
    } else if (element.rolnumber < 110) {
      divRisk.innerHTML += `<p class="risk">${usser}</p>`;
    } else if (element.rolnumber < 200 && usser.includes("&")) {
      divMenos200.innerHTML += `<p class="minus">${usser}</p>`;
    } else {
      divTaBien.innerHTML += `<p class="kay">${usser}</p>`;
    }
  });

  divTop.appendChild(top1Div);
  divTop.appendChild(top2Div);
  divTop.appendChild(top3Div);
  msjs.appendChild(divTop);

  msjs.innerHTML += `<h2>Ta bien</h2>`;
  msjs.appendChild(divTaBien);

  msjs.innerHTML += `<h2>-200</h2>`;
  msjs.appendChild(divMenos200);

  msjs.innerHTML += `<h2>90 - 110</h2>`;
  msjs.appendChild(divRisk);

  msjs.innerHTML += `<h2>ur death</h2>`;
  msjs.appendChild(divDeath);
}

function statsHora(mjs) {
  const statsxHora = {
    AM: {},
    PM: {},
  };

  for (const uss in mjs) {
    for (const mensaje of mjs[uss]) {
      const hora = mensaje.hora;

      const mainhora = hora.split(":")[0];
      const ampm = hora.split(" ")[1].split(" ")[1];

      if (ampm === "AM") {
        if (!statsxHora.AM[mainhora]) {
          statsxHora.AM[mainhora] = { mjs: 0, uss: {} };
        }
        statsxHora.AM[mainhora].mjs++;
        if (!statsxHora.AM[mainhora].uss[uss]) {
          statsxHora.AM[mainhora].uss[uss] = 0;
        }
        statsxHora.AM[mainhora].uss[uss]++;
      } else {
        if (!statsxHora.PM[mainhora]) {
          statsxHora.PM[mainhora] = { mjs: 0, uss: {} };
        }
        statsxHora.PM[mainhora].mjs++;
        if (!statsxHora.PM[mainhora].uss[uss]) {
          statsxHora.PM[mainhora].uss[uss] = 0;
        }
        statsxHora.PM[mainhora].uss[uss]++;
      }
    }
  }
}

function printmjs(mjs) {
  console.log(mjs);
  //statsHora(mjs);

  const allinfo = [];

  //HACER EL NUEVO ARRAY CON LOS MENSAJES
  for (const [nombre, mensajes] of Object.entries(mjs)) {
    const stats = {
      uss: nombre,
      rolnumber: 0,
      bonus: 0,
      rol: [],
      off: [],
      spam: [],
    };

    //ahora calcular los off rol
    for (const mensajeobj of mensajes) {
      const mensaje = mensajeobj.mensaje;
      if (
        mensaje.includes("<Media omitted>") ||
        mensaje === "" ||
        mensaje === " null" ||
        mensaje.includes("<View once voice message omitted>") ||
        mensaje === " This message was deleted" ||
        mensaje.includes("<Multimedia omitido>")
      ) {
        stats.spam.push(mensaje);
      } else {
        if (esrol(mensaje)) {
          if (mensaje.length > 766) {
            stats.rolnumber = stats.rolnumber + 15;
            stats.bonus++;
          } else {
            stats.rolnumber++;
          }
          stats.rol.push(mensaje);
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

  const organizedarray = allinfo.sort((a, b) => b.rolnumber - a.rolnumber);
  let i = 1;
  for (const stats of organizedarray) {
    const div = document.createElement("div");
    div.classList.add("mensajediv");

    div.innerHTML = `
        <p><b>${stats.rolnumber}</b> ${stats.uss}</p>
        <p>Total: ${
          stats.off.length + stats.rol.length + stats.spam.length
        } - Off: ${stats.off.length + stats.spam.length} - Bonus: ${
      stats.bonus
    }</p>
        `;

    div.addEventListener("click", () => {
      details(stats);
    });
    divmsj.appendChild(div);
    i++;
  }
}

function separarMensajes(chatExport, date) {
  const chatfiltered = chatExport.filter((mensaje) => mensaje.startsWith(date));
  const primerElemento = chatfiltered[0];
  const poselemento = chatExport.indexOf(primerElemento);

  const chatfinal = chatExport.slice(poselemento - 1 + 1);

  const mensajesPorPersona = {};
  for (const mensaje of chatfinal) {
    const posraya = mensaje.indexOf("-");
    const texto = mensaje.slice(posraya + 1);
    const datehour = mensaje.slice(0, posraya);

    const pospuntos = texto.indexOf(":");
    const msjtexto = texto.slice(pospuntos + 1);
    const nombre = texto.slice(0, pospuntos);

    const poscoma = datehour.indexOf(",");
    const hora = datehour.slice(poscoma + 1);
    const fecha = datehour.slice(0, poscoma);

    const mensajefull = {
      fecha: fecha,
      hora: hora,
      mensaje: msjtexto,
    };

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
    if (
      array.length > 1 &&
      !key.includes("changed this group's settings") &&
      !key.includes("pinned a messag") &&
      !key.includes("requested to join") &&
      !key.match(/୧ ✿ › * lef/) &&
      !key.match("joined using this") &&
      !key.match("added") &&
      !key.match("removed")
    ) {
      objetoNuevo[key] = array;
    }
  }

  console.log(objetoNuevo);
  return objetoNuevo;
}

//este agarra el texto y lo pone en un array así bn bonito
function counter(texto, date) {
  console.log(texto);
  // 2024-03-12 => input
  // 3/12/24 => output

  const formattedDate = date.split("-");
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

  const lines = texto.split("\n");

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

  const chatLines = combinedLines.join("\n"); // Unir líneas combinadas

  const linessplit = chatLines.split("\n");

  console.log(linessplit);
  console.log(`Fecha: ${dateFormatted}`);

  const mjs = ignorarMensajesWhatsApp(
    separarMensajes(linessplit, dateFormatted)
  );

  console.log(mjs);

  printmjs(mjs);
}

//acá el input solo manda el texto pa arriba

const forms = document.querySelector("#forms");
const fileInput = document.querySelector("#file");
//const fileInput2 = document.querySelector("#file2");

forms.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dataforms = new FormData(forms);
  const date = dataforms.get("date");
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      content = e.target.result;
      counter(content, date);
    };
    reader.readAsText(file);
  }
});

function combine(content1, content2, date) {
  const combinedContent = content1 + "\n" + content2;
  counter(combinedContent, date);
}
