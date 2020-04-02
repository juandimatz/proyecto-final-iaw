
const scraperService = require('../services/scraperService');

var controller = {

    searchDafiti: function(req, res) {
        return scraperService.searchDafiti(req.params.marca).then(response => {
            return res.status(200).send(response);
        }).catch(error => {
            if (error) {
                return res.status(404).send({
                    message: "Ocurrio un error en el metodo del controlador: searchDafiti"
                });
            }
        });
       
        
    },

    searchNetshoes: function(req, res) {
        return scraperService.searchNetshoes(req.params.marca).then(response => {
            return res.status(200).send(response);
        }).catch(error => {
            if (error) {
                return res.status(404).send({
                    message: "Ocurrio un error en el metodo del controlador: searchNetshoes"
                });
            }
        });
    },

    productDetailsDafiti: function(req, res) {
        return scraperService.productDetailsDafiti(req.params.id).then(response => {
            return res.status(200).send(response);
        }).catch(error => {
            if (error) {
                return res.status(404).send({
                    message: "Ocurrio un error"
                });
            }
        });
        
    },

    productDetailsNetshoes: function(req, res) {
        return scraperService.productDetailsNetshoes(req.params.id).then(response => {
            return res.status(200).send(response);
        }).catch(error => {
            if (error) {
                return res.status(404).send({
                    message: "Ocurrio un error"
                });
            }
        });
        
    }

}

module.exports = controller;