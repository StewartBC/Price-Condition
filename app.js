let bearer = "ntFYI2Wlw7byl460e5YoC7RLBLQn707VpCVkbunDP6zsmTZBr--63i6iQMhpTh-GRsuNahmsSqK0Ajm7eIYlxLP9zvQ_DjVXv-KE0ZwQFfAkUI3cCwKFh9ppf0r_sx1NKrvA687GcDuKezlIMZcdtP1qLzKpon75_QqzCOLfuehI0zyYQw8TI1nLoZpPfCQIWTavqm1C655rvhfF90Cr14-bEzwxnvMAzmVqI18__3ibI6xJy32QalbeaBVS7UiuCKMrzymHxCC6xGN6e02Fr-QMGF1qIjzPHWD1cXLer3xv6UImvDLglUX3UDsM0xyeOePtig";
let search = "";
let groupIDs = [1397, 1455, 1373, 630, 1418, 604, 1663, 605, 1375, 1440, 1441, 635, 1374, 1444, 1434, 1396, 1389, 1372, 648];
let products = [];
let total = 0;

function searchCards() {
    $("#img1").empty();
    $("#img2").empty();
    $("#img3").empty();
    $("#img4").empty();
    let count = 1;
    var input = $("#cardSearch").val().toLowerCase();
    if (input.length > 0) {
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
                        <img class="cardImage" src="${product.imageUrl}" alt="${product.name}" data-id="${product.productId}">
                    </div>
                    <div class="col-md-6">

                        <div class="row">
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                <label data-id=${product.productId} data-condition="NM" class="btn btn-secondary active condition">
                                    <input class="condition" type="radio" name="options" autocomplete="off" active> NM
                                </label>
                                <label data-id=${product.productId} data-condition="LP" class="btn btn-secondary condition">
                                    <input class="condition" type="radio" name="options" autocomplete="off"> LP
                                </label>
                                <label data-id=${product.productId} data-condition="MP" class="btn btn-secondary condition">
                                    <input class="condition" type="radio" name="options" autocomplete="off"> MP
                                </label>
                                <label data-id=${product.productId} data-condition="HP" class="btn btn-secondary condition">
                                    <input class="condition" type="radio" name="options" autocomplete="off"> HP
                                </label>
                                <label data-id=${product.productId} data-condition="DMG" class="btn btn-secondary condition">
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

// function displayChosen(price) {
//     $("#chosen").empty();
//     products.forEach(product => {
//         if (product.chosenCount > 0) {
//             for (i = 0; i < product.chosenCount; i++) {
//                 $("#chosen").append(`
//                     <img class="footerImage" src="${product.imageUrl}" alt="${product.name}" data-price="${price}" data-id="${product.productId}">
//             `);
//             }
//         }
//     });
//     $("#total").html(`$${total.toFixed(2)}`);
// };

$(document).on("click", ".footerImage", function () { 
    let id = $(this).attr("data-id");
    id = parseInt(id);
    let price = $(this).attr("data-price");
    price = parseFloat(price);
    total = total - price;
    $("#total").html(`$${total.toFixed(2)}`);
    $(this).remove();
    // products.forEach(product => {
    //     if (product.productId === id) {
    //         console.log(product.price);
    //         total = total - parseFloat(product.price);
    //         product.chosenCount = product.chosenCount - 1;
    //     }
    // });
    // displayChosen();
});

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
                <img class="footerImage" src="${product.imageUrl}" alt="${product.name}" data-price="${price}" data-id="${product.productId}">
            `);
            $("#total").html(`$${total.toFixed(2)}`);
            }
        });
        // displayChosen(price);

    }

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
                    html = html + `Unlimited: ${res.results[0].lowPrice}<button data-id=${id} data-price=${res.results[0].lowPrice} type="button" class="btn btn-secondary add">Add</button>`;
                    if (result.results.length > 5) {
                        $.ajax({
                            type: "GET",
                            url: `https://api.tcgplayer.com/pricing/sku/${result.results[index + 5].skuId}`,
                            headers: {
                                'Authorization': `Bearer ${bearer}`,
                            }
                        }).then(function (res) {
                            if (groupId === 1663 || groupId === 630 || groupId === 635 || groupId === 1373 || groupId === 1389 || groupId === 1396 || groupId === 1434 || groupId === 1440 || groupId === 1441 || groupId === 1444) {
                                html = html + `<br>1st: ${res.results[0].lowPrice}<button data-id=${id} data-price=${res.results[0].lowPrice} type="button" class="btn btn-secondary add">Add</button>`;
                            } else {
                                html = html + `<br>Reverse: ${res.results[0].lowPrice}<button data-id=${id} data-price=${res.results[0].lowPrice} type="button" class="btn btn-secondary add">Add</button>`;

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

groupIDs.forEach(id => {
    $.ajax({
        type: "GET",
        url: `https://api.tcgplayer.com/catalog/products?groupId=${id}&limit=10`,
        headers: {
            'Authorization': `Bearer ${bearer}`,
        }
    }).then(function (result) {
    for (i = 0; i < result.totalItems / 10; i++) {
        $.ajax({
            type: "GET",
            url: `https://api.tcgplayer.com/catalog/products?groupId=${id}&offset=${i * 10}&limit=10`,
            headers: {
                'Authorization': `Bearer ${bearer}`,
            }
        }).then(function (result) {
            result.results.forEach(product => {
                product.show = false;
                product.chosenCount = 0;
                product.condition = "NM";
                product.price = 0;
                product.name = product.name.toLowerCase();
                products.push(product);
            });
        });
    }
    });
});