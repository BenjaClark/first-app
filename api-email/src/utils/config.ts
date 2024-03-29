import cnf from "dotenv";
cnf.config();

const config = {
    apiPort : process.env.API_PORT || "",
    host : process.env.HOST || "",
    port : process.env.PORT || "",   
    user : process.env.USER || "",
    pass : process.env.PASS || "",
    from : process.env.FROM || ""
}
export default config;