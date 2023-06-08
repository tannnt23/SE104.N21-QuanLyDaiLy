import models from '../models/init-models.js';
import { Sequelize } from 'sequelize';

const { LOAIDAILY } = models;

LOAIDAILY.findAll({
    where: {
        MaLoaiDaiLy: 2,
        SoNoToiDa: {
            [Sequelize.Op.gte]: 1000000,
        },
    },
})
    .then((loaidailies) => {
        console.log(loaidailies);
    })
    .catch((error) => {
        console.error(error);
    });
