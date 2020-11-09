let dbPromised = idb.open("balbalan", 1, (upgradeDb) => {
    let articlesObjectStore = upgradeDb.createObjectStore("klub", {
        keyPath: "id"
    });
    articlesObjectStore.createIndex("nama_klub", "nama_klub", { unique: false });
});

function saveForLater(klub) {
    dbPromised
        .then((db) => {
            let tx = db.transaction("klub", "readwrite");
            let store = tx.objectStore("klub");
            store.add(klub);
            return tx.complete;
        })
        .then(() => {
            console.log("Klub berhasil disimpan.");
            M.toast({html: 'Klub berhasil disimpan.'});
        });
}

function getAll() {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                let tx = db.transaction("klub", "readonly");
                let store = tx.objectStore("klub");
                return store.getAll();
            })
            .then((klub) => {
                resolve(klub);
            });
    });
}

function getById(id) {
    return new Promise((resolve, reject) => {
        dbPromised
            .then((db) => {
                var tx = db.transaction("klub", "readonly");
                var store = tx.objectStore("klub");
                return store.get(Number(id));
            })
            .then((klub) => {
                resolve(klub);
            });
    });
}

function deleteById(id){
    dbPromised
        .then((db) => {
            var tx = db.transaction('klub', 'readwrite');
            var store = tx.objectStore('klub');
            store.delete(Number(id));
            return tx.complete;
          })
        .then(() => {
            console.log("Klub berhasil dihapus.");
            M.toast({html: 'Klub berhasil dihapus.'});
        });
}