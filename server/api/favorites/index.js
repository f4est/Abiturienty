import db from '../../db/index.js';
import { getUserIdFromToken } from '../../utils/auth.js';

// Получение списка избранных учебных заведений
export default defineEventHandler(async (event) => {
  const method = event.node.req.method;
  
  if (method === 'GET') {
    return handleGetFavorites(event);
  } else if (method === 'POST') {
    return handleAddFavorite(event);
  } else if (method === 'DELETE') {
    return handleRemoveFavorite(event);
  } else {
    return {
      statusCode: 405,
      body: { error: 'Метод не поддерживается' }
    };
  }
});

// Обработчик GET запроса (получение списка избранных)
async function handleGetFavorites(event) {
  try {
    // Получаем токен авторизации
    const authHeader = getHeader(event, 'Authorization');
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    
    // Получаем ID пользователя из токена
    const userId = getUserIdFromToken(token);
    
    if (!userId) {
      return {
        statusCode: 401,
        body: { error: 'Требуется авторизация' }
      };
    }
    
    // Получаем избранные учебные заведения пользователя
    const favorites = db.prepare(`
      SELECT i.id, i.name, i.description, i.image, i.logo, i.rating, t.code as type
      FROM institutions i
      JOIN institution_types t ON i.type_id = t.id
      JOIN favorites f ON i.id = f.institution_id
      WHERE f.user_id = ?
      ORDER BY f.created_at DESC
    `).all(userId);
    
    return {
      statusCode: 200,
      body: favorites
    };
  } catch (error) {
    console.error('Ошибка при получении избранных учебных заведений:', error);
    
    return {
      statusCode: 500,
      body: { error: 'Ошибка сервера при получении избранных' }
    };
  }
}

// Обработчик POST запроса (добавление в избранное)
async function handleAddFavorite(event) {
  try {
    // Получаем токен авторизации
    const authHeader = getHeader(event, 'Authorization');
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    
    // Получаем ID пользователя из токена
    const userId = getUserIdFromToken(token);
    
    if (!userId) {
      return {
        statusCode: 401,
        body: { error: 'Требуется авторизация' }
      };
    }
    
    // Получаем ID учебного заведения из тела запроса
    const body = await readBody(event);
    const institutionId = parseInt(body.institutionId);
    
    if (isNaN(institutionId)) {
      return {
        statusCode: 400,
        body: { error: 'Некорректный идентификатор учебного заведения' }
      };
    }
    
    // Проверяем, существует ли такое учебное заведение
    const institution = db.prepare('SELECT id FROM institutions WHERE id = ?').get(institutionId);
    
    if (!institution) {
      return {
        statusCode: 404,
        body: { error: 'Учебное заведение не найдено' }
      };
    }
    
    // Проверяем, не добавлено ли уже это учебное заведение в избранное
    const existing = db.prepare(
      'SELECT 1 FROM favorites WHERE user_id = ? AND institution_id = ?'
    ).get(userId, institutionId);
    
    if (existing) {
      return {
        statusCode: 409,
        body: { error: 'Учебное заведение уже добавлено в избранное' }
      };
    }
    
    // Добавляем учебное заведение в избранное
    db.prepare(
      'INSERT INTO favorites (user_id, institution_id) VALUES (?, ?)'
    ).run(userId, institutionId);
    
    return {
      statusCode: 201,
      body: { success: true }
    };
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error);
    
    return {
      statusCode: 500,
      body: { error: 'Ошибка сервера при добавлении в избранное' }
    };
  }
}

// Обработчик DELETE запроса (удаление из избранного)
async function handleRemoveFavorite(event) {
  try {
    // Получаем токен авторизации
    const authHeader = getHeader(event, 'Authorization');
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    
    // Получаем ID пользователя из токена
    const userId = getUserIdFromToken(token);
    
    if (!userId) {
      return {
        statusCode: 401,
        body: { error: 'Требуется авторизация' }
      };
    }
    
    // Получаем ID учебного заведения из query параметров
    const query = getQuery(event);
    const institutionId = parseInt(query.id);
    
    if (isNaN(institutionId)) {
      return {
        statusCode: 400,
        body: { error: 'Некорректный идентификатор учебного заведения' }
      };
    }
    
    // Удаляем учебное заведение из избранного
    const result = db.prepare(
      'DELETE FROM favorites WHERE user_id = ? AND institution_id = ?'
    ).run(userId, institutionId);
    
    if (result.changes === 0) {
      return {
        statusCode: 404,
        body: { error: 'Учебное заведение не найдено в избранном' }
      };
    }
    
    return {
      statusCode: 200,
      body: { success: true }
    };
  } catch (error) {
    console.error('Ошибка при удалении из избранного:', error);
    
    return {
      statusCode: 500,
      body: { error: 'Ошибка сервера при удалении из избранного' }
    };
  }
} 