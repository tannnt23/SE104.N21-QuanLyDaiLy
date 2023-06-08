import models from '../models/init-models.js'

const { QUAN } = models

// Sử dụng model để query
const newQuan = {
    TenQuan: 'Quan 9'
}
QUAN.create(newQuan).then((quan) => {
    console.log(quan);
}).catch((error) => {
    console.error(error);
});