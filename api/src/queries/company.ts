export const _getById = `
    SELECT  id,    
            rut, 
            fantasyname, 
            name, 
            activity, 
            address, 
            district, 
            email, 
            phone 
    FROM    app.company 
    WHERE   id = $1`;

export const _getAll = `
    SELECT  id, 
            rut,
            fantasyname, 
            name, 
            activity, 
            address, 
            district, 
            email, 
            phone 
    FROM    app.company 
    WHERE   isActive = true 
    ORDER BY name, fantasyname`;

export const _getByRut = `
    SELECT  id,
            rut, 
            fantasyname, 
            name, 
            activity, 
            address, 
            district, 
            email, 
            phone 
    FROM    app.company 
    WHERE   rut = $1`;

export const _insert = `
    INSERT INTO app.company (
            rut, 
            fantasyname, 
            name, 
            activity, 
            address, 
            district, 
            email, 
            phone
            ) 
VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

export const _updateById = `
    UPDATE  app.company 
    SET     rut= $2, 
            fantasyname = $3, 
            name = $4, 
            activity = $5, 
            address = $6, 
            district = $7, 
            email = $8, 
            phone = $9 
    WHERE   id = $1 RETURNING *`;

export const _deleteById = `
    UPDATE      app.company 
    SET         isactive = false 
    WHERE       id= $1`;
