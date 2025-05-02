import db from '../../db.js';

export default defineEventHandler(async (event) => {
  try {
    const id = parseInt(event.context.params.id);
    
    if (isNaN(id)) {
      return {
        statusCode: 400,
        body: { error: 'Некорректный идентификатор учебного заведения' }
      };
    }
    
    // Получаем основную информацию об учебном заведении
    const institution = db.prepare(`
      SELECT i.id, i.name, i.description, i.image, i.logo, i.rating, 
             i.address, i.phone, i.email, i.website,
             t.code as type, t.name as type_name
      FROM institutions i
      JOIN institution_types t ON i.type_id = t.id
      WHERE i.id = ?
    `).get(id);
    
    if (!institution) {
      return {
        statusCode: 404,
        body: { error: 'Учебное заведение не найдено' }
      };
    }
    
    // Получаем направления обучения
    institution.directions = db.prepare(`
      SELECT d.code, d.name
      FROM directions d
      JOIN institution_directions id ON d.id = id.direction_id
      WHERE id.institution_id = ?
    `).all(id).map(d => d.code);
    
    // Получаем фотографии
    institution.photos = db.prepare(`
      SELECT photo_url
      FROM institution_photos
      WHERE institution_id = ?
    `).all(id).map(p => p.photo_url);
    
    // Получаем программы обучения
    institution.programs = db.prepare(`
      SELECT id, code, name, duration, price
      FROM programs
      WHERE institution_id = ?
    `).all(id);
    
    // Для каждой программы получаем список экзаменов
    for (const program of institution.programs) {
      program.exams = db.prepare(`
        SELECT name, min_score as minScore
        FROM exams
        WHERE program_id = ?
      `).all(program.id);
      
      // Удаляем идентификатор, так как он не нужен клиенту
      delete program.id;
    }
    
    // Получаем отзывы
    institution.reviews = db.prepare(`
      SELECT author, rating, text, date
      FROM reviews
      WHERE institution_id = ?
      ORDER BY date DESC
    `).all(id);
    
    return {
      statusCode: 200,
      body: institution
    };
  } catch (error) {
    console.error('Ошибка при получении информации об учебном заведении:', error);
    
    return {
      statusCode: 500,
      body: { error: 'Ошибка сервера при получении информации об учебном заведении' }
    };
  }
}); 