const fetch = require('node-fetch');
const cheerio = require('cheerio');

const urlDafiti = "https://www.dafiti.com.ar/calzado/";
const urlNetshoes = "https://www.netshoes.com.ar/zapatillas/";

function searchDafiti(marca) {
    
    return fetch(makeUrlDafiti(marca))
            .then(response => response.text())
            .then(body => {
                const $ = cheerio.load(body);
                
                const zapatillas = [];
                $('.productsCatalog li.itm').each((index, element) => {
                    
                    $element = $(element);
                    
                    $brand = $element.find('.itm-brand').text();
                    
                    $title = $element.find('.itm-title').text();
                    
                    $price = parseFloat($element.find('.itm-priceBox').attr('data-price')).toFixed(2);
                    
                    $otro = $element.find('.itm-free-shipping').text();
                    if ($otro == '') {
                        $otro = 'Cargo de envio';
                    }
                    
                    $image = $element.find('div.itm-product-gallery a').attr('data-thumb');
                    
                    $detailUrl = $element.find('div.itm-product-main-info a').attr('href'); 
                    $urlArray = $detailUrl.split("/");
                    
                    var calzado = {
                        brand: $brand,
                        title: $title,
                        price: $price,
                        shipping: $otro,
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
                
                const zapatillas = [];
                $('#item-list .item').each((index, element) => {
                    
                    $element = $(element);
                    
                    $title = $element.find('.card-link').attr('title');
                    
                    $brand = $title.split(" ")[1];
                    
                    $price = parseFloat($element.find('div.pr').attr('data-final-price').substr(0,4)).toFixed(2);
                    //console.log($price);
                    $image = $element.find('.card-link img').attr('data-src');
                    
                    $detailUrl = $element.find('.card-link').attr('href');
                    $urlArray = $detailUrl.split("/");
                    
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
                
                $brand = $('.prd-details .prd-brand').text();
                
                $title = $('.prd-details .prd-title').text();
                
                $price = $('.prd-details #mainSizeSelector').attr('data-price');
                
                const $images = [];
                $('#prdMedia ul#productMoreImagesList li').each((index, element) => {
                    $element = $(element);
                    $image = $element.attr('data-image-product');
                    $images.push($image);
                });
                
                const $details = [];
                $('.prd-description #productDetails .prm .prd-attributes tr').each((index, element) => {
                    let $element = $(element);
                    var detail = {}
                    detail[$element.find('.name').text()] = $element.find('.name').next().text();
                    $details.push(detail);          
                });
                
                var zapatilla = {
                    brand: $brand,
                    title: $title,
                    price: $price,
                    images: $images,
                    details: $details
                }
                
                return zapatilla;
            });
}

function productDetailsNetshoes(url) {
    return fetch("https://www.netshoes.com.ar/" + url)
    .then(response => response.text())
    .then(body => {
        const $ = cheerio.load(body);
        
        const $price = $('#buy-box .price strong').attr('content');
        
        const $images = [];
        $('.photo ul li').each((index, element) => {
            $element = $(element);
            $image = $element.find('img').attr('data-src-large');
            $images.push($image);
        });
        
        const $details = [];
        $('#features ul li').each((index, element) => {
            let $element = $(element);
            
            var detalle = $element.text().split(':');
            var detail = {};
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
            details: $details
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