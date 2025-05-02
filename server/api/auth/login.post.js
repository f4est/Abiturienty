import db from '../../db/index.js';
import { comparePasswords, generateToken } from '../../utils/auth.js';

export default defineEventHandler(async (event) => {
  try {
    const { email, password } = await readBody(event);
    
    // Проверка наличия всех необходимых полей
    if (!email || !password) {
      return {
        statusCode: 400,
        body: { error: 'Необходимо указать email и пароль' }
      };
    }
    
    // Ищем пользователя в базе данных
    const user = db.prepare('SELECT id, email, password, name, avatar FROM users WHERE email = ?').get(email);
    
    // Если пользователь не найден
    if (!user) {
      return {
        statusCode: 401,
        body: { error: 'Неверный email или пароль' }
      };
    }
    
    // Проверяем пароль
    const passwordMatch = await comparePasswords(password, user.password);
    
    if (!passwordMatch) {
      return {
        statusCode: 401,
        body: { error: 'Неверный email или пароль' }
      };
    }
    
    // Генерируем JWT токен
    const token = generateToken(user.id);
    
    // Возвращаем информацию о пользователе и токен
    return {
      statusCode: 200,
      body: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          avatar: user.avatar
        },
        token
      }
    };
  } catch (error) {
    console.error('Ошибка при авторизации:', error);
    
    return {
      statusCode: 500,
      body: { error: 'Ошибка сервера при авторизации' }
    };
  }
}); 