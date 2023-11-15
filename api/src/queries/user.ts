export const _getById = `
    SELECT  usr.id, 
            usr.login, 
            per.id as person_id, 
            per.rut, 
            per.name, 
            per.paternallastname, 
            per.maternallastname, 
            per.address, 
            per.district, 
            per.email, 
            per.phone 
    FROM    app.user usr 
    INNER JOIN app.person per ON usr.person_id = per.id 
    WHERE   usr.id = $1`;

export const _getByRut = `
    SELECT  usr.id, 
            usr.login, 
            per.id as person_id, 
            per.rut, 
            per.name, 
            per.paternallastname, 
            per.maternallastname, 
            per.address, 
            per.district, 
            per.email, 
            per.phone 
    FROM    app.user usr 
    INNER JOIN app.person per ON usr.person_id = per.id 
    WHERE   per.rut = $1`;

export const _getAll = `
    SELECT  usr.id, 
            usr.login, 
            per.id as person_id, 
            per.rut, 
            per.name, 
            per.paternallastname, 
            per.maternallastname, 
            per.address, 
            per.district, 
            per.email, 
            per.phone 
    FROM    app.user usr 
    INNER JOIN app.person per ON usr.person_id = per.id 
    WHERE   usr.isactive = true`;

export const _getByLogin = `
    SELECT  usr.id, 
            usr.person_id, 
            usr.login, 
            usr.hash,
            per.rut, 
            per.name, 
            per.paternallastname, 
            per.maternallastname, 
            per.address, 
            per.district, 
            per.email, 
            per.phone 
    FROM    app.user usr
    INNER JOIN app.person per ON usr.login = per.email
    WHERE   usr.login = $1`;

export const _insert = `
    INSERT INTO app.user (person_id, login) 
    VALUES  ($1, $2) RETURNING *`;

export const _deleteById = `
    UPDATE  app.user 
    SET     isactive = false WHERE id= $1`;

export const _updateById = `
    UPDATE  app.user 
    SET     login = $2 
    WHERE   person_id = $1 RETURNING *`;
