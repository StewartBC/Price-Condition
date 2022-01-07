let bearer = "MqzsATPrEe3ZeZ-37B3-It2WKCQm1cGlwC5m3t6anDhKGYZb1eTUP9h-ANk0QnUebWuRN6qPqH0ix99zzlipUB39LUnFTVELVDk4Zgi06-8g_KBDGjlsENqy2NwFMRHdtt14RBcZwA2BqkdkzL6c7AWs-qN72sEtNlvHM7JlhlClAUP1lQMv_dYHwJeFM4DXuJbu8EPl4X-29Po1H2PWpB6L_M_16vUDX8a0v46T8dYEQpU53zbIW4jZnw5GsaCzHCaOeanHHFTqlKnhMHQ6hndCHvrp6LXObtHQowD00skIL9yygWh8oRERiQ1-HygLMT4sUg";
let search = "";
let groupIDs = [1397, 1455, 1373, 630, 1418, 604, 1663, 605, 1375, 1440, 1441, 635, 1374, 1444, 1434, 1396, 1389, 1372, 648];
let products = [];
let total = 0;

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
    $(this).remove();
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
            console.log(total)
            if (total % 1 === 0) {
                $("#total").html(`$${Math.round(total)}`);
            } else {
                $("#total").html(`$${total.toFixed(2)}`);
            }
            }
        });
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
                }
                product.name = product.name.toLowerCase();
                products.push(product);
            });
            products.sort((a, b) => a.set - b.set);
        });
    }
    });
});
