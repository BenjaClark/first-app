export const _getById = "SELECT id, person_id, login, hash FROM app.user WHERE id = $1";

export const _getByRut = "SELECT id, rut, name, paternallastname, maternallastname, address, district, email, phone FROM app.person WHERE rut = $1";

export const _getByLogin = "SELECT id, person_id, login, hash FROM app.user WHERE login = $1";

export const _getAll = "SELECT id, person_id, login, hash FROM app.user WHERE isactive = true";

export const _insertPerson = "INSERT INTO app.person (rut, name, paternallastname, maternallastname, address, district, email, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

export const _insertUser = "INSERT INTO app.user (person_id, login) VALUES ($1, $2) RETURNING *";

export const _deleteById = "UPDATE app.user SET isactive = false WHERE id= $1";

export const _updateById = "UPDATE app.user SET hash = $2, login = $3 WHERE person_id = $1 RETURNING *";



