export const _getById = "SELECT id, type, person_id, company_id FROM app.customer WHERE id = $1";

export const _getByRut = "SELECT id FROM (SELECT id FROM app.person WHERE rut = $1 UNION SELECT id FROM app.company WHERE rut = $1) AS subquery";

export const _getAll = "SELECT id, person_id, login, hash FROM app.user WHERE isactive = true";

export const _getCustomerById = "SELECT id, type, person_id, company_id FROM app.customer WHERE person_id OR company_id = $1";

export const _insertCustomer = "INSERT INTO app.customer (type, person_id, company_id) VALUES ($1, $2, $3) RETURNING *"

export const _insertCompany = "INSERT INTO app.company (rut, fantasyname, name, activity, address, district, email, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

export const _insertPerson = "INSERT INTO app.person (rut, name, paternallastname, maternallastname, address, district, email, phone) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *";

export const _deleteById = "UPDATE app.customer SET isactive = false WHERE id= $1";

export const _updateById = "UPDATE app.customer SET type = $2, person_id = $3, company_id = $4 WHERE person_id = $1 RETURNING *";

export const _updatePersonById = "UPDATE app.person SET rut= $2, name = $3, paternallastname = $4, maternallastname = $5, address = $6, district = $7, email = $8, phone = $9 WHERE id = $1 RETURNING *";

export const _updateCompanyById = "UPDATE app.company SET rut= $2, fantasyname = $3, name = $4, activity = $5, address = $6, district = $7, email = $8, phone = $9 WHERE id = $1 RETURNING *";
