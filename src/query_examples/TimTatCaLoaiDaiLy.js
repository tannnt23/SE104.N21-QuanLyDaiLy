import models from "../models/init-models.js";

const { LOAIDAILY } = models;

// Sử dụng model để query sử dụng promise
// LOAIDAILY.findAll().then((loaidaily) => {
//     console.log(loaidaily);
// }).catch((error) => {
//     console.error(error);
// });

/*--------------------------------------------*/
// Sử dụng async await
const timTatCaDaiLy = async () => {
    try {
        const cacDaiLy = await LOAIDAILY.findAll()
        console.log(cacDaiLy);
    }
    catch (error) {
        console.log(error);
    }
}

timTatCaDaiLy().then(() => {
    // Thực hiện hàm sau khi `timTatCaDaiLy()` hoàn thành
}).catch((error) => {
    console.error(error);
});
