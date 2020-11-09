const BASE_URL = "https://api.football-data.org/v2/";
const API_KEY = "0247d0d7280c4599b8527d59b0522578"

const fetchAPI = url => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': API_KEY
        }
    })
    .then(res => {
        if (res.status !== 200) {
            console.log("Error: " + res.status);
            return Promise.reject(new Error(res.statusText))
        } else {
            return Promise.resolve(res)
        }
    })
    .then(res => res.json())
    .catch(err => {
        console.log(err)
    })
};

function getKelasemen() {
    let urlParams = new URLSearchParams(window.location.search);
    let idParam = urlParams.get("id");

    if ("caches" in window) {
        caches.match(`${BASE_URL}competitions/${idParam}/standings`).then((response) => {
            if (response) {
                response.json().then((data) => {
                    showKelasemen(data);
                })
            }
        })
    }

    fetchAPI(`${BASE_URL}competitions/${idParam}/standings`)
        .then(data => {
            showKelasemen(data);
        })
        .catch(error => {
            console.log(error)
        })
}

function getDetailKlub() {
    return new Promise((resolve, reject) => {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");
    
        if ("caches" in window) {
            caches.match(`${BASE_URL}teams/${idParam}`).then((response) => {
                if (response) {
                    response.json().then((data) => {
                        showDetailKlub(data)
                        resolve(data);
                    })
                }
            })
        }
    
        fetchAPI(`${BASE_URL}teams/${idParam}`)
            .then(data => {
                showDetailKlub(data);
                resolve(data);
            })
            .catch(error => {
                console.log(error)
            })
    });
}

function getKlubTersimpan() {
    getAll().then((data) => {
        let klubHTML = "";
        data.forEach((klub) => {
            klubHTML += `
                <div class="col s12 m4 center-align">
                    <div class="card">
                        <a href="./detailklub.html?id=${klub.id}&saved=true">
                            <img class="gambar-klub-tersimpan"src="${klub.crestUrl}">
                            <div class="card-content">
                                <p>${klub.name}</p>
                            </div>
                        </a>
                    </div>
                </div>
            `;
        });
        document.getElementById("tersimpan").innerHTML = klubHTML;
    });
}

function getDetailKlubTersimpan() {
    return new Promise((resolve, reject) => {
        let urlParams = new URLSearchParams(window.location.search);
        let idParam = urlParams.get("id");
    
        getById(idParam).then((data) => {
            showDetailKlub(data)
            resolve(data);
        });
    }); 
}

function showKelasemen(data){
    let kelasemenHTML = "";
    data.standings[0].table.forEach((kelasemen) => {
        kelasemenHTML += `
            <tr>
                <td>${kelasemen.position}</td>
                <td><img src="${kelasemen.team.crestUrl}" alt="" style="max-height: 40px"></td>
                <td>
                    <a href="./detailklub.html?id=${kelasemen.team.id}">
                        ${kelasemen.team.name}        
                    </a>
                </td>
                <td>${kelasemen.playedGames}</td>
                <td>${kelasemen.won}</td>
                <td>${kelasemen.draw}</td>
                <td>${kelasemen.lost}</td>
                <td>${kelasemen.goalsFor}</td>
                <td>${kelasemen.goalsAgainst}</td>
                <td>${kelasemen.goalDifference}</td>
                <td>${kelasemen.points}</td>
                <td>${kelasemen.form}</td>
            </tr>
        `;
    });
    document.getElementById("body-content").innerHTML = kelasemenHTML;
}

function showDetailKlub(data){
    let detailKlubHTML = "";
        detailKlubHTML += `
            <div class="row">
                <div class="col s12 m6 center-align">
                    <img class="detail-gambar" src="${data.crestUrl}">
                </div>
                <div class="col s12 m6 detail-info-klub">
                    <table>
                        <tr>
                            <th>Nama</th>
                            <td>${data.name}</td>
                        </tr>
                        <tr>
                            <th>Tahun berdiri</th>
                            <td>${data.founded}</td>
                        </tr>
                        <tr>
                            <th>Stadion</th>
                            <td>${data.venue}</td>
                        </tr>
                        <tr>
                            <th>Alamat</th>
                            <td>${data.address}</td>
                        </tr>
                        <tr>
                            <th>No Telp</th>
                            <td>${data.phone}</td>
                        </tr>
                        <tr>
                            <th>Website</th>
                            <td>${data.website}</td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>${data.email}</td>
                        </tr>
                    </table>
                </div>
            </div>
            
        `;
    document.getElementById("body-content").innerHTML = detailKlubHTML;
}