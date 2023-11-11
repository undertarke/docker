import multer, { diskStorage } from 'multer';

export const upload = multer({
    storage: diskStorage({
        destination: process.cwd() + "/public/img", // đường dẫn mà file sẽ được lưu
        filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)  // đổi tên file
    })
});
// file system
import fs from 'fs';

import compress_images from 'compress-images';

export const toiUuHinh = (file) => {

    if (file.size > 500000)
        // lớn hơn 500 Kb
        compress_images(
            process.cwd() + "/public/img/" + file.filename,
            process.cwd() + "/public/file/",
            { compress_force: false, statistic: true, autoupdate: true }
            , false,
            { jpg: { engine: "mozjpeg", command: ["-quality", "20"] } },
            { png: { engine: "pngquant", command: ["--quality=20-50", "-o"] } },
            { svg: { engine: "svgo", command: "--multipass" } },
            { gif: { engine: "gifsicle", command: ["--colors", "64", "--use-col=web"] } },
            function (error, completed, statistic) {
                // xóa file hình chưa tối ưu
            }
        );

}