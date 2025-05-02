import db from '../../db/index.js';
import { getUserIdFromToken } from '../../utils/auth.js';

export default defineEventHandler((event) => {
  try {
    // Получаем токен авторизации из заголовка запроса
    const authHeader = getHeader(event, 'Authorization');
    const token = authHeader ? authHeader.replace('Bearer ', '') : null;
    
    // Если токен не передан
    if (!token) {
      return {
        statusCode: 401,
        body: { error: 'Требуется авторизация' }
      };
    }
    
    // Получаем ID пользователя из токена
    const userId = getUserIdFromToken(token);
    
    if (!userId) {
      return {
        statusCode: 401,
        body: { error: 'Недействительный токен' }
      };
    }
    
    // Получаем данные пользователя из базы данных
    const user = db.prepare(
      'SELECT id, name, email, avatar FROM users WHERE id = ?'
    ).get(userId);
    
    // Если пользователь не найден
    if (!user) {
      return {
        statusCode: 404,
        body: { error: 'Пользователь не найден' }
      };
    }
    
    // Возвращаем данные пользователя
    return {
      statusCode: 200,
      body: { user }
    };
  } catch (error) {
    console.error('Ошибка при получении данных пользователя:', error);
    
    return {
      statusCode: 500,
      body: { error: 'Ошибка сервера при получении данных пользователя' }
    };
  }
}); 