import models from "../models/init-models.js";

const { LOAIDAILY } = models;

// Sử dụng model để query
LOAIDAILY.findAll().then((loaidaily) => {
    console.log(loaidaily);
}).catch((error) => {
    console.error(error);
});