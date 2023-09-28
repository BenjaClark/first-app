export const _getById = "SELECT id, rut, paternallastname, maternallastname, address, district, email, phone FROM app.person WHERE id = $1";

export const _getAll = "SELECT id, rut, paternallastname, maternallastname, address, district, email, phone FROM app.person WHERE isActive = true ORDER BY paternallastname, maternallastname";

export const _getByRut = "SELECT id, rut, paternallastname, maternallastname, address, district, email, phone FROM app.person WHERE rut = $1";

export const _insert = "INSERT INTO app.person (rut, paternallastname, maternallastname, address, district, email, phone) VALUES ($1, $2, $3, $4, $5, $6, $7)";

export const _updateById = "UPDATE app.person SET rut= $2, paternallastname = $3, maternallastname = $4, address = $5, district = $6, email = $7, phone = $8 WHERE id = $1";

export const _deleteById = "UPDATE app.person SET isactive = false WHERE id= $1"