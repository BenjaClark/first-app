export const _getById = "SELECT id, rut, name, paternallastname, maternallastname, address, district, email, phone FROM app.person WHERE id = $1";

export const _getAll = "SELECT id, rut, name, paternallastname, maternallastname, address, district, email, phone FROM app.person WHERE isActive = true ORDER BY paternallastname, maternallastname";

export const _getByRut = "SELECT id, rut, name, paternallastname, maternallastname, address, district, email, phone FROM app.person WHERE rut = $1";

export const _insert = "INSERT INTO app.person (rut, name, paternallastname, maternallastname, address, district, email, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

export const _updateById = "UPDATE app.person SET rut= $2, name = $3, paternallastname = $4, maternallastname = $5, address = $6, district = $7, email = $8, phone = $9 WHERE id = $1 RETURNING *";

export const _deleteById = "UPDATE app.person SET isactive = false WHERE id= $1";