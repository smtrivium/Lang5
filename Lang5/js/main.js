// define tags
const player = document.querySelector(".player"),
    title = document.querySelector(".title"),
    en_t = document.querySelector("#en_t"),
    ru_t = document.querySelector("#ru_t"),
    de_t = document.querySelector("#de_t"),
    it_t = document.querySelector("#it_t"),
    es_t = document.querySelector("#es_t"),
    fr_t = document.querySelector("#fr_t"),
    btnPlay = document.querySelector(".btn_play"),
    btnPrew = document.querySelector(".btn_prev"),
    btnNext = document.querySelector(".btn_next"),

    audio = document.querySelector(".audio"),
    progress = document.querySelector(".progress");


var trackIndex = 0;
var index = 0;

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', playNext);

btnPlay.addEventListener('click', () => {
    const isPlaying = player.classList.contains('play');
    if (isPlaying) {
        stopTrack()
    } else {
        audio.src = `./audio/verbs/${data[trackIndex]['Ru_Title']}.mp3`;
        audio.play();
        audio.addEventListener('ended', playNext);
    }
    
})

btnNext.addEventListener('click', () => {
    trackIndex++;
    if (trackIndex > data.length - 1) {
        trackIndex = 0}

    changeTitles();
    audio.src = `./audio/verbs/${data[trackIndex]['Ru_Title']}.mp3`;
    audio.play();
    audio.addEventListener('ended', playNext);
})

btnPrew.addEventListener('click', () => {
    trackIndex--;
    if (trackIndex < 0) {
        trackIndex = data.length-1;
    }
    changeTitles();
    audio.src = `./audio/verbs/${data[trackIndex]['Ru_Title']}.mp3`;
    audio.play();
    audio.addEventListener('ended', playNext);
})

function changeTitles() {

    ru_t.textContent = data[trackIndex]['Ru_Title'];
    de_t.textContent = data[trackIndex]['De_Title'];
    en_t.textContent = data[trackIndex]['En_Title'];
    it_t.textContent = data[trackIndex]['It_Title'];
    es_t.textContent = data[trackIndex]['Es_Title'];
    fr_t.textContent = data[trackIndex]['Fr_Title'];
}

function playNext() {
    var audios = [
              `./audio/verbs/${data[trackIndex]['En_Title']}.mp3`,
              `./audio/verbs/${data[trackIndex]['De_Title']}.mp3`,
              `./audio/verbs/${data[trackIndex]['It_Title']}.mp3`,
              `./audio/verbs/${data[trackIndex]['Es_Title']}.mp3`,
              `./audio/verbs/${data[trackIndex]['Fr_Title']}.mp3`];
    if (index < audios.length) {
        
        // change src depending on index (local files like 1.mp3, 2.mp3 so on)
        audio.src = audios[index];
        audio.play();
        index += 1
        ;
    } else {
        index = 0; 
        audio.removeEventListener('ended', playNext, false);
        }
}
function playTrack() {
    player.classList.add('play');
}
function stopTrack() {

    player.classList.remove('play');
    audio.removeEventListener('ended', playNext, false);
    audio.pause();

}
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement,
        progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;
}


const sheetId = '1_quUxuWsaqjadhNvA-8-Q5jPDuiHK2mQjB7NApo7QBE';
const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
const sheetName = 'sheet1';
const query = encodeURIComponent('Select *')
const url = `${base}&sheet=${sheetName}&tq=${query}`
const data = []
document.addEventListener('DOMContentLoaded', init)
const output = document.querySelector('.output')

function init() {
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            //Remove additional text and extract only JSON:
            const jsonData = JSON.parse(rep.substring(47).slice(0, -2));
            console.log(rep)
            const colz = [];
            const tr = document.createElement('tr');
            //Extract column labels
            jsonData.table.cols.forEach((heading) => {
                if (heading.label) {
                    let column = heading.label;
                    colz.push(column);
                    const th = document.createElement('th');
                    th.innerText = column;
                    tr.appendChild(th);
                }
            })
            output.appendChild(tr);
            //extract row data:
            jsonData.table.rows.forEach((rowData) => {
                const row = {};
                colz.forEach((ele, ind) => {
                    row[ele] = (rowData.c[ind] != null) ? rowData.c[ind].v : '';
                })
                data.push(row);
            })
            processRows(data);
        })
}
function processRows(json) {
    json.forEach((row) => {
        const tr = document.createElement('tr');
        const keys = Object.keys(row);

        keys.forEach((key) => {
            const td = document.createElement('td');
            td.textContent = row[key];
            tr.appendChild(td);
        })
        output.appendChild(tr);

    })
    ru_t.textContent = data[0]['Ru_Title'];
    de_t.textContent = data[0]['De_Title'];
    en_t.textContent = data[0]['En_Title'];
    it_t.textContent = data[0]['It_Title'];
    es_t.textContent = data[0]['Es_Title'];
    fr_t.textContent = data[0]['Fr_Title'];
}

/* Когда пользователь нажимает на кнопку, переключаться раскрывает содержимое */
function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Закрыть раскрывающийся список, если пользователь щелкнет за его пределами.
window.onclick = function (e) {
    if (!e.target.matches('.dropbtn')) {
        var myDropdown = document.getElementById("myDropdown");
        if (myDropdown.classList.contains('show')) {
            myDropdown.classList.remove('show');
        }
    }
}