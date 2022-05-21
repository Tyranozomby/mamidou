const fs = require("fs");
const ParseDate = require("date-fns/parse");

function deleteData(req, res, path) {
    const child = req.params.child;

    fs.readFile(path, 'utf8', function (err, data) {
        let json = JSON.parse(data)
        delete json[child];

        const txt = JSON.stringify(json, null, 2);
        fs.writeFile(path, txt, (err) => {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                res.send(txt);
            }
        })
    });
}

function dataSort(a, b) {
    const date1 = ParseDate(a.date, 'dd/MM/yyyy', new Date())
    const date2 = ParseDate(b.date, 'dd/MM/yyyy', new Date())

    if (date1 < date2)
        return -1
    else
        return 1
}

module.exports = {deleteData, dataSort}