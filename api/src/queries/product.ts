export const _getById = `
    SELECT  id, code, name, price 
    FROM    app.product WHERE id = $1`;

export const _getAll = `
    SELECT  id, code, name, price 
    FROM    app.product ORDER BY name`;

export const _getByCode = `
    SELECT  id, code, name, price 
    FROM    app.product WHERE code = $1`;

export const _insert = `
    INSERT INTO app.product (code, name, price) 
    VALUES ($1, $2, $3) RETURNING *`;

export const _updateById = `
    UPDATE  app.product 
    SET     code= $2, name = $3, price = $4 
    WHERE   id = $1 RETURNING *`;

export const _deleteById = `
    DELETE FROM app.product WHERE id=$1`;