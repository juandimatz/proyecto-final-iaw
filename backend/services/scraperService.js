const fetch = require('node-fetch');
const cheerio = require('cheerio');

const urlDafiti = "https://www.dafiti.com.ar/calzado/";
const urlNetshoes = "https://www.netshoes.com.ar/zapatillas/";

function searchDafiti(marca) {
    
    return fetch(makeUrlDafiti(marca))
            .then(response => response.text())
            .then(body => {
                const $ = cheerio.load(body);
                
                let zapatillas = [];
                $('.productsCatalog li.itm').each((index, element) => {
                    
                    let $element = $(element);
                    
                    let $brand = $element.find('.itm-brand').text();
                    
                    let $title = $element.find('.itm-title').text();
                    
                    let $price = parseFloat($element.find('.itm-priceBox').attr('data-price')).toFixed(2);
                    
                    let $shipping = $element.find('.itm-free-shipping').text();
                    
                    if ($shipping == '') {
                        $shipping = 'Cargo de envio';
                    }
                    
                    let $image = $element.find('div.itm-product-gallery a').attr('data-thumb');
                    
                    let $detailUrl = $element.find('div.itm-product-main-info a').attr('href'); 
                    let $urlArray = $detailUrl.split("/");
                    
                    var calzado = {
                        brand: $brand,
                        title: $title,
                        price: $price,
                        shipping: $shipping,
                        image: $image,
                        id: $urlArray[3],
                        page: 'DAFITI'
                    }
                    
                    zapatillas.push(calzado);
                });

                return zapatillas;
            });
}

function searchNetshoes(marca) {
    return fetch(makeUrlNetshoes(marca))
            .then(response => response.text())
            .then(body => {
                const $ = cheerio.load(body);
                
                let zapatillas = [];
                $('#item-list .item').each((index, element) => {
                    
                    let $element = $(element);
                    
                    let $title = $element.find('.card-link').attr('title');
                    
                    let $brand = $title.split(" ")[1];
                    
                    let $price = parseFloat($element.find('div.pr').attr('data-final-price').substr(0,4)).toFixed(2);
                    
                    let $image = $element.find('.card-link img').attr('data-src');
                    
                    let $detailUrl = $element.find('.card-link').attr('href');
                    let $urlArray = $detailUrl.split("/");
                    
                    var calzado = {
                        brand: $brand,
                        title: $title,
                        price: $price,
                        shipping: 'Cargo de envio',
                        image: $image,
                        id: $urlArray[3],
                        page: 'NETSHOES'

                    }
                    
                    zapatillas.push(calzado);
                });
                
                return zapatillas;
    });
}

function productDetailsDafiti(url) {
    return fetch("https://www.dafiti.com.ar/" + url)
            .then(response => response.text())
            .then(body => {
                const $ = cheerio.load(body);
                
                let $brand = $('.prd-details .prd-brand').text();
                
                let $title = $('.prd-details .prd-title').text();
                
                let $price = $('.prd-details #mainSizeSelector').attr('data-price');
                
                let $images = [];
                $('#prdMedia ul#productMoreImagesList li').each((index, element) => {
                    let $element = $(element);
                    let $image = $element.attr('data-image-product');
                    $images.push($image);
                });
                
                let $details = [];
                $('.prd-description #productDetails .prm .prd-attributes tr').each((index, element) => {
                    let $element = $(element);
                    let detail = {}
                    detail[$element.find('.name').text()] = $element.find('.name').next().text();
                    $details.push(detail);          
                });
                
                var zapatilla = {
                    brand: $brand,
                    title: $title,
                    price: $price,
                    images: $images,
                    details: $details,
                    url: "https://www.dafiti.com.ar/" + url
                }
                
                return zapatilla;
            });
}

function productDetailsNetshoes(url) {
    return fetch("https://www.netshoes.com.ar/" + url)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        let $price = $('#buy-box .price strong').attr('content');
        
        let $images = [];
        $('.photo ul li').each((index, element) => {
            let $element = $(element);
            let $image = $element.find('img').attr('data-src-large');
            $images.push($image);
        });
        
        let $details = [];
        $('#features ul li').each((index, element) => {
            let $element = $(element);
            
            let detalle = $element.text().split(':');
            let detail = {};
            if (detalle[0] == 'Nombre') {
                $title = detalle[1];
            } else if (detalle[0] == 'Marca'){
                $brand = detalle[1];
            } else {
                detail[detalle[0]] = detalle[1];
                $details.push(detail);
            }
        });
        var zapatilla = {
            brand: $brand,
            title: $title,
            price: $price,
            images: $images,
            details: $details,
            url: "https://www.netshoes.com.ar/" + url
        }
        
        return zapatilla;
    });
}

function makeUrlDafiti(parametros) {
    if (parametros != null) {
        return urlDafiti + parametros;
    } else {
        return urlDafiti;
    }
}

function makeUrlNetshoes(parametros) {
    if (parametros != null) {
        return urlNetshoes + parametros;
    } else {
        return urlNetshoes;
    }
}

module.exports = {
    searchDafiti,
    searchNetshoes,
    productDetailsDafiti,
    productDetailsNetshoes
};