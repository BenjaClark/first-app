const config = {
    host : process.env.HOST || "",
    port : process.env.API_PORT || "",   
    user : process.env.USER || "",
    pass : process.env.PASS || "",
    from : process.env.FROM || ""
}
export default{config};