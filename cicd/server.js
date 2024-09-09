import express from 'express'
import Docker from 'dockerode';

let app = express()
app.listen(8888)

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

app.get("/demo", (req, res) => {
    res.send("hello")
})

// Hàm để chạy lệnh trong container
const execInContainer = async (containerId, cmd) => {
    const container = docker.getContainer(containerId);
    const exec = await container.exec({
        Cmd: ['sh', '-c', cmd],
        AttachStdout: true,
        AttachStderr: true,
    });

    return new Promise((resolve, reject) => {
        exec.start((err, stream) => {
            if (err) return reject(err);

            let output = '';
            stream.on('data', (data) => output += data.toString());
            stream.on('end', () => resolve(output));
            stream.on('error', (err) => reject(err));
        });
    });
};

app.get("/cicd", async (req, res) => {

    const containerId = "2e3031ae1cf1";
    try {
        // Bước 1: Thực hiện `git pull` và `yarn run build`
        const command = 'git pull && yarn run build';
        const output = await execInContainer(containerId, command);

        // Bước 2: Khởi động lại container
        const container = docker.getContainer(containerId);
        await container.restart();
        

        // Kết quả trả về bao gồm cả kết quả của lệnh và thông báo khởi động lại thành công
        res.send({
            message: `Container ${containerId} restarted successfully.`,
            output: output
        });
    } catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
})
