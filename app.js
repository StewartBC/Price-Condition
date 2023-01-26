let bearer = "AA54Xj_YNgtNKmOzksNT4GRjQy5eVwxxQwMIgpUX8t-z4CikDNDUgfbpCVRKjvZz2GJ3BATTJZTLeBP6YJR6hRo-AXFO5p3UFTmP_bsmpKfIVpJAwRLpfx9rzOjwvcTTAZaMiUX_Z4fBUGiBvK4r4LK102dWJfgx7oyQGGXJL2DFIjz17AoLMQyjeX0q9vFdsKBIvC07YbQbHpRySZ9wbL6-12xTvRWyj2aS2k4pblvr_UEnGEdJtExAMxvQ006pCEY1R-Q3EQKlsdV3geb4kYuDsP3QwQy2yA9ObFapXnTa6ZOqgS2F6VNNxCO3yM-dMDT0HA";
let search = "";
// let WOTCgroupIDs = [1397, 1455, 1373, 630, 1418, 604, 1663, 605, 1375, 1440, 1441, 635, 1374, 1444, 1434, 1396, 1389, 1372, 648];
let groupIDs = [3040, 3068, 1397,1455,1373,630,1418,604,1663,605,1375,1440,1441,635,1374,1444,1434,1396,1389,1372,648,2906,2867,2931,2848,2807,2765,2776,2754,2781,2782,2948,2685,2675,2686,2626,2585,2545,2534,2555,2480,2594,2701,1576,1534,1536,1528,1525,1509,1533,1494,1481,1692,1464,1532,1387,1451,1409,1938,1919,2069,1863,1861,1842,1840,1815,1539,1780,2464,2420,2409,2377,2328,2364,2374,2295,2278,1796,1728,1729,1701,1694,2282,2209,2208,2178,2148,2071,2054,1957,1661,1401,1427,1368,1412,1423,1406,1422,2332,1381,1403,2205,1399,1453,1391,1384,2175,2155,1394,1386,1385,1538,1424,1400,1415,1416,1379,1522,1378,1390,1417,1405,1541,1430,1421,1411,1395,1429,1370,1382,1413,1408,1465,1398,1410,1404,1853,2214,2289,1407,609,610,1426,1543,1447,1377,1376,1542,1419,1402,1540,1442,1452,1439,1432,1414,1450,1383,1367,1393,1433,1392,1380,1369,1428,1446,3020,3064,3170,3118,3172,3179,3150,17674,17688,17689]
let products = [];
let total = 0;
let exports = [];
let exportString = [];
let baseUrl = "";

$(document).keydown(function (event) {
    var key = (event.keyCode ? event.keyCode : event.which);
    if (key === 13) {
        event.preventDefault();
        setTimeout(function () {
            
                searchCards();
            
            
        }, 1);
    }
    if (key === 8) {
        setTimeout(function () {
            
                searchCards();
            
        }, 1);
    }
});

function searchCards() {
    $("#img1").empty();
    $("#img2").empty();
    $("#img3").empty();
    $("#img4").empty();
    let count = 1;
    var input = $("#cardSearch").val().toLowerCase();
    if (input.length > 2) {
        products.forEach(product => {
            if (product.name.includes(input)) {
                product.show = true;
            } else {
                product.show = false;
            }
            if (product.show) {
                if (count > 4) {
                    count = 1;
                }
                $(`#img${count}`).append(`
                <div class="row cardRow">
                    <div class="col-md-6">
                        <a href="https://www.tcgplayer.com/product/${product.productId}" target="_blank"><img class="cardImage" src="${product.imageUrl}" alt="${product.name}" data-id="${product.productId}"></a>
                    </div>
                    <div class="col-md-6">

                        <div class="row">
                            <div class="btn-group btn-group-toggle pink-background" data-toggle="buttons">
                                <label data-id=${product.productId} data-condition="NM" class="btn btn-secondary condition pink-background">
                                    <input class="condition" type="radio" name="options" autocomplete="off"> NM
                                </label>
                                <label data-id=${product.productId} data-condition="LP" class="btn btn-secondary condition pink-background">
                                    <input class="condition" type="radio" name="options" autocomplete="off"> LP
                                </label>
                                <label data-id=${product.productId} data-condition="MP" class="btn btn-secondary condition pink-background">
                                    <input class="condition" type="radio" name="options" autocomplete="off"> MP
                                </label>
                                <label data-id=${product.productId} data-condition="HP" class="btn btn-secondary condition pink-background">
                                    <input class="condition" type="radio" name="options" autocomplete="off"> HP
                                </label>
                                <label data-id=${product.productId} data-condition="DMG" class="btn btn-secondary condition pink-background">
                                    <input class="condition" type="radio" name="options" autocomplete="off"> DMG
                                </label>
                            </div>
                        </div>
                        <div class="row">
                            <h4 id=${product.productId}Price>
                            </h4>
                        </div>     
                    </div>       
                </div>    
                `);
                count++;
            }
        });
    }
}

$(document).on("click", ".cardImage", function () {

});

$(document).on("click", "#export", function () {
    let copyText = baseUrl;
    exports.forEach(exportCard => {
        copyText = copyText + "+id=" + exportCard.id + "price=" + exportCard.price;
    });
    navigator.clipboard.writeText(copyText);
});

$(document).on("click", ".footerImage", function () { 
    let id = $(this).attr("data-id");
    id = parseInt(id);
    let price = $(this).attr("data-price");
    price = parseFloat(price);
    total = total - price;
    if (total % 1 === 0) {
        $("#total").html(`$${Math.round(total)}`);
    } else {
        $("#total").html(`$${total.toFixed(2)}`);
    }
    for (i = 0; i < exports.length; i++) {
        console.log(parseInt(exports[i].id) + "," + id + "," + parseFloat(exports[i].price) + "," + price);
        if (parseInt(exports[i].id) === id && parseFloat(exports[i].price) === price) {
            exports.splice(i, 1);
        }
    }
    $(this).remove();
});

$(document).on("click", "#clear", function () { 
    let copyText = baseUrl;
    exports.forEach(exportCard => {
        copyText = copyText + "+id=" + exportCard.id + "price=" + exportCard.price;
    });
    navigator.clipboard.writeText(copyText);
    $("#chosen").empty();
    exports = [];
    total = 0;
        $("#total").html('0');
});

window.onload = (event) => {
    console.log(window.location.href);
    exportString = window.location.href.split("+");
    baseUrl = exportString[0] + "?";
    exportString.splice(0, 1);
    console.log(exportString)
    exportString.forEach(string => {
        console.log(string.split("id="))
        string.split("id=").forEach(firstSplit => {
            let exportArray = firstSplit.split("price=");
            console.log(exportArray)
            let makeExport = {
                id: 0,
                price: 0
            }
            if (exportArray.length === 2) {
                exports.push(
                    {
                        id: parseInt(exportArray[0]),
                        price: parseFloat(exportArray[1])
                    }          
                )
            }
        });
    });
    exports.forEach(exportCard => {
        $("#chosen").append(`
        <img class="footerImage" src='https://tcgplayer-cdn.tcgplayer.com/product/${exportCard.id}_200w.jpg' data-price="${exportCard.price}" data-id="${exportCard.id}">
    `);
    total = total + parseFloat(exportCard.price);
    });
    if (total % 1 === 0) {
        $("#total").html(`$${Math.round(total)}`);
    } else {
        $("#total").html(`$${total.toFixed(2)}`);
    }
};

$(document).on("click", ".add", function () { 
    let id = $(this).attr("data-id");
    id = parseInt(id);
    let price = $(this).attr("data-price");
    price = parseFloat(price);
    if (!Number.isInteger(Math.round(price))) {
        price = 0;
    } else {
        total = total + parseFloat(price);
        products.forEach(product => {
            if (product.productId === id) {
                if (product.price === 0) {
                    product.price = product.price + price;
                }
                product.chosenCount++
                $("#chosen").append(`
                <img class="footerImage" src="${product.imageUrl}" data-price="${price}" data-id="${product.productId}">
            `);
            exports.push(
                {
                    id: product.productId,
                    price: price
                }
            );
            console.log(total)
            if (total % 1 === 0) {
                $("#total").html(`$${Math.round(total)}`);
            } else {
                $("#total").html(`$${total.toFixed(2)}`);
            }
            }
        });
    }
    let copyText = baseUrl;
    exports.forEach(exportCard => {
        copyText = copyText + "+id=" + exportCard.id + "price=" + exportCard.price;
    });
    navigator.clipboard.writeText(copyText);
});

$(document).on("click", ".condition", function () { 
            let condition = $(this).attr("data-condition");
            let id = $(this).attr("data-id");
            id = parseInt(id);
            let index = 0;
            let html = "";
            let groupId = 0;
            products.forEach(product => {
                if (product.productId === id) {
                    product.condition = condition;
                    groupId = product.groupId;
                }
            });
            if (condition === "NM") {
                index = 0;
            } else if (condition === "LP") {
                index = 1;
            } else if (condition === "MP") {
                index = 2;
            } else if (condition === "HP") {
                index = 3;
            } else if (condition === "DMG") {
                index = 4;
            }
            $.ajax({
                type: "GET",
                url: `https://api.tcgplayer.com/catalog/products/${id}/skus`,
                headers: { 
                    'Authorization': `Bearer ${bearer}`,
                }
            }).then(function (result) {
                console.log(result);
                $.ajax({
                    type: "GET",
                    url: `https://api.tcgplayer.com/pricing/sku/${result.results[index].skuId}`,
                    headers: {
                        'Authorization': `Bearer ${bearer}`,
                    }
                }).then(function (res) {
                    console.log(res)
                    html = html + `Unlimited: ${res.results[0].lowPrice}<button data-id=${id} data-price=${res.results[0].lowPrice} type="button" class="btn btn-secondary add pink-background">Add</button>`;
                    if (result.results.length > 5) {
                        $.ajax({
                            type: "GET",
                            url: `https://api.tcgplayer.com/pricing/sku/${result.results[index + 5].skuId}`,
                            headers: {
                                'Authorization': `Bearer ${bearer}`,
                            }
                        }).then(function (res) {
                            if (groupId === 1663 || groupId === 630 || groupId === 635 || groupId === 1373 || groupId === 1389 || groupId === 1396 || groupId === 1434 || groupId === 1440 || groupId === 1441 || groupId === 1444) {
                                html = html + `<br>1st: ${res.results[0].lowPrice}<button data-id=${id} data-price=${res.results[0].lowPrice} type="button" class="btn btn-secondary add pink-background">Add</button>`;
                            } else {
                                html = html + `<br>Reverse: ${res.results[0].lowPrice}<button data-id=${id} data-price=${res.results[0].lowPrice} type="button" class="btn btn-secondary add pink-background">Add</button>`;

                            }      
                            $(`#${id}Price`).html(html);
                        });
                    } else {
                        $(`#${id}Price`).html(html);
                    }
                });

            });
});

$.ajax({
    type: "GET",
    url: `https://api.tcgplayer.com/catalog/groups/1397,1455,1373,630,1418,604,1663,605,1375,1440,1441,635,1374,1444,1434,1396,1389,1372,648`,
    headers: { 
        'Authorization': `Bearer ${bearer}`,
    }
}).then(function (result) {
    console.log(result);

});




//   GET POKEMON GROUPS
$.ajax({
    type: "GET",
    url: `https://api.tcgplayer.com/catalog/categories/3/groups`,
    headers: { 
        'Authorization': `Bearer ${bearer}`,
    }
}).then(function (result) {
    console.log(result);

});

for (g = 0; g < 200; g++) {
    $.ajax({
        type: "GET",
        url: `https://api.tcgplayer.com/catalog/categories/3/groups?offset=${g}`,
        headers: { 
            'Authorization': `Bearer ${bearer}`,
        }
    }).then(function (result) {
        console.log(result);
        result.results.forEach(set => {
            if (!groupIDs.includes(set.groupId)){
                groupIDs.push(set.groupId);
            }
        });
        
    });
}

groupIDs.forEach(id => {
    $.ajax({
        type: "GET",
        url: `https://api.tcgplayer.com/catalog/products?groupId=${id}&limit=19`,
        headers: {
            'Authorization': `Bearer ${bearer}`,
        }
    }).then(function (result) {
    for (i = 0; i < result.totalItems / 19; i++) {
       
        $.ajax({
            type: "GET",
            url: `https://api.tcgplayer.com/catalog/products?groupId=${id}&offset=${i * 19}&limit=19`,
            headers: {
                'Authorization': `Bearer ${bearer}`,
            }
        }).then(function (result) {
            result.results.forEach(product => {
                product.show = false;
                product.chosenCount = 0;
                product.condition = "NM";
                product.price = 0;
                product.set = 0;
                if (product.groupId === 1663) {
                    product.set = 0;
                } else if (product.groupId === 604) {
                    product.set = 1;
                } else if (product.groupId === 605) {
                    product.set = 2;
                } else if (product.groupId === 635) {
                    product.set = 3;
                } else if (product.groupId === 630) {
                    product.set = 4;
                } else if (product.groupId === 1373) {
                    product.set = 5;
                } else if (product.groupId === 1441) {
                    product.set = 6;
                } else if (product.groupId === 1440) {
                    product.set = 7;
                } else if (product.groupId === 1374) {
                    product.set = 8;
                } else if (product.groupId === 1418) {
                    product.set = 9;
                } else if (product.groupId === 1396) {
                    product.set = 10;
                } else if (product.groupId === 1434) {
                    product.set = 11;
                } else if (product.groupId === 1389) {
                    product.set = 12;
                } else if (product.groupId === 1444) {
                    product.set = 13;
                } else if (product.groupId === 648) {
                    product.set = 14;
                } else if (product.groupId === 1375) {
                    product.set = 15;
                } else if (product.groupId === 1397) {
                    product.set = 16;
                } else if (product.groupId === 1372) {
                    product.set = 17;
                } else if (product.groupId === 1455) {
                    product.set = 18;
                } else {
                    product.set = 19;
                }
                product.name = product.name.toLowerCase();
                // if (product.name.includes("dratini")) {
                //     products.push(product);
                // }
                if (product.name.includes("booster") !== true && product.name.includes("deck") !== true && product.name.includes("pack") !== true && product.name.includes("code") !== true)  {
                products.push(product);
                }
            });
            products.sort((a, b) => a.set - b.set);
        });
  
    }
    });
});
