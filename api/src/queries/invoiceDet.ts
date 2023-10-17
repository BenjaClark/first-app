export const _getByInvoiceId = `
    SELECT  id, number, customer_id, date 
    FROM    app.invoicedet 
    WHERE   invoicecab_id = $1`;

export const _insert = `
    INSERT INTO app.invoicedet 
            (invoicecab_id, quantity, product_id, price) 
    VALUES      ($1, $2, $3, $4) RETURNING *`;

export const _updateById = `
    UPDATE  app.invoicedet 
    SET     invoicecab_id = $2, quantity = $3, product_id = $4, price = $5 
    WHERE   person_id = $1 RETURNING *`;