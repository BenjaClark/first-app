export const _getById = "SELECT usr.id, usr.login, per.id as person_id, per.rut, per.name, per.paternallastname, per.maternallastname, per.address, per.district, per.email, per.phone FROM app.user usr INNER JOIN app.person per ON usr.person_id = per.id WHERE usr.id = $1";

export const _getByRut = "SELECT per.id, cus.type, per.rut, concat(per.name,' ', per.paternallastname,' ', per.maternallastname) as name, per.address, per.district, per.email, per.phone FROM app.customer cus INNER JOIN app.person per ON cus.person_id = per.id WHERE cus.type = 'P' and cus.isactive = true and per.rut = $1 union all select com.id, cus.type, com.rut, com.name, com.address, com.district, com.email, com.phone from app.customer cus inner join app.company com on cus.company_id = com.id where cus.type = 'C' and cus.isactive = true and com.rut = $1";

export const _getAll = "SELECT per.id,cus.type,per.rut,concat(per.name,' ', per.paternallastname,' ', per.maternallastname) as name,per.address,per.district,per.email,per.phone FROM app.customer cus INNER JOIN app.person per ON cus.person_id = per.id WHERE cus.type = 'P' and cus.isactive = true union all select com.id,cus.type,com.rut,com.name,com.address,com.district,com.email, com.phone from app.customer cus inner join app.company com on cus.company_id = com.id where cus.type = 'C' and cus.isactive = true";

export const _insert = "INSERT INTO app.customer (type, person_id, company_id) VALUES ($1, $2, $3) RETURNING *";

export const _deleteById = "UPDATE app.customer SET isactive = false WHERE id= $1";

export const _updateById = "UPDATE app.customer SET person_id = $2 , company_id = $3 WHERE id = $1 RETURNING *";

