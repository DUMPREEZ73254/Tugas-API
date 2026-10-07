import { Elysia } from "elysia";
import { mahasiswaRoute } from "./routes/mahasiswa";

const app = new Elysia();

app.get("/", () => {
    return {
        message: "Halo dunia!"
    };
});

app.use(mahasiswaRoute);

app.listen(3001, () => {
    console.log(
        `Server running on http://${app.server?.hostname}:${app.server?.port}`
    );
});