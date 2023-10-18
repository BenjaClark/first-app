export const _getByInvoiceId = `
    SELECT  id, invoicecab_id, subtotal, tax, total 
    FROM    app.invoicetot 
    WHERE invoicecab_id = $1`;

export const _insert = `
    INSERT INTO app.invoicetot (invoicecab_id, subtotal, tax, total) 
    VALUES      ($1, $2, $3, $4) RETURNING *`;

export const _updateById = `
    UPDATE  app.invoicetot 
    SET     invoicecab_id = $2, quantity = $3, product_id = $4, price = $5 
    WHERE   person_id = $1 RETURNING *`;
