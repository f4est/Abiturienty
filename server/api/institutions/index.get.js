import db from '../../db.js';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    
    // Параметры для фильтрации и пагинации
    const page = parseInt(query.page || '1');
    const limit = parseInt(query.limit || '10');
    const offset = (page - 1) * limit;
    const type = query.type;
    const direction = query.direction;
    const search = query.search;
    
    // Начинаем конструировать SQL-запрос
    let sql = `
      SELECT i.id, i.name, i.description, i.image, i.logo, i.rating, 
             t.code as type, t.name as type_name
      FROM institutions i
      JOIN institution_types t ON i.type_id = t.id
    `;
    
    const params = [];
    
    // Если указано направление, добавляем JOIN с таблицей направлений
    if (direction) {
      sql += `
        JOIN institution_directions id ON i.id = id.institution_id
        JOIN directions d ON id.direction_id = d.id AND d.code = ?
      `;
      params.push(direction);
    }
    
    // Условия WHERE для фильтрации
    const whereConditions = [];
    
    // Фильтр по типу учебного заведения
    if (type) {
      whereConditions.push('t.code = ?');
      params.push(type);
    }
    
    // Поиск по названию или описанию
    if (search) {
      whereConditions.push('(i.name LIKE ? OR i.description LIKE ?)');
      params.push(`%${search}%`, `%${search}%`);
    }
    
    // Добавляем условия WHERE к запросу, если они есть
    if (whereConditions.length > 0) {
      sql += ' WHERE ' + whereConditions.join(' AND ');
    }
    
    // Добавляем сортировку и пагинацию
    sql += ' ORDER BY i.rating DESC, i.name LIMIT ? OFFSET ?';
    params.push(limit, offset);
    
    // Выполняем запрос к базе данных
    const institutions = db.prepare(sql).all(...params);
    
    // Для каждого учебного заведения получаем его направления
    for (const institution of institutions) {
      const directions = db.prepare(`
        SELECT d.code, d.name
        FROM directions d
        JOIN institution_directions id ON d.id = id.direction_id
        WHERE id.institution_id = ?
      `).all(institution.id);
      
      institution.directions = directions.map(d => d.code);
    }
    
    // Считаем общее количество записей для пагинации
    let countSql = `
      SELECT COUNT(DISTINCT i.id) as total
      FROM institutions i
      JOIN institution_types t ON i.type_id = t.id
    `;
    
    if (direction) {
      countSql += `
        JOIN institution_directions id ON i.id = id.institution_id
        JOIN directions d ON id.direction_id = d.id AND d.code = ?
      `;
    }
    
    if (whereConditions.length > 0) {
      countSql += ' WHERE ' + whereConditions.join(' AND ');
    }
    
    const countParams = params.slice(0, -2); // Убираем параметры limit и offset
    const countResult = db.prepare(countSql).get(...countParams);
    const total = countResult ? countResult.total : 0;
    
    return {
      statusCode: 200,
      body: {
        institutions,
        pagination: {
          total,
          page,
          limit,
          pages: Math.ceil(total / limit)
        }
      }
    };
  } catch (error) {
    console.error('Ошибка при получении списка учебных заведений:', error);
    
    return {
      statusCode: 500,
      body: { error: 'Ошибка сервера при получении списка учебных заведений' }
    };
  }
}); 