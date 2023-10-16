export const _getAll = `SELECT invc.id,
invc.number,
invc.customer_id,
invc.date,
invd.quantity,
invd.product_id,
invd.price,
invt.subtotal,
invt.tax,
invt.total 
FROM app.invoicecab AS invc
JOIN app.invoicedet AS invd ON invc.id  = invd.invoicecab_id 
JOIN app.invoicetot AS invt ON invc.id  = invt.invoicecab_id`

export const _getById = `SELECT invc.id,
invc.number,
invc.customer_id,
invc.date,
invd.quantity,
invd.product_id,
invd.price,
invt.subtotal,
invt.tax,
invt.total  
FROM app.invoicecab AS invc
JOIN app.invoicedet AS invd ON invc.id  = invd.invoicecab_id 
JOIN app.invoicetot AS invt ON invc.id  = invt.invoicecab_id
WHERE invc.id = $1`;

export const _insert = "INSERT INTO app.invoicecab (number, customer_id, date) VALUES ($1, $2, $3) RETURNING *";

export const _deleteById = `UPDATE app.invoicecab AS invc SET isactive = false WHERE invc.id = $1`

export const _updateById = "UPDATE app.invoicecab SET number = $2, customer_id = $3, date = $4 WHERE person_id = $1 RETURNING *";