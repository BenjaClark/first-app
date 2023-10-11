const reqLogger = (req: any, res: any, next:any) => {
    console.log(req)
    return next();
}

export default reqLogger;