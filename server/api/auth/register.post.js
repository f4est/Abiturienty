import db from '../../db/index.js';
import { hashPassword, generateToken } from '../../utils/auth.js';

export default defineEventHandler(async (event) => {
  try {
    const { name, email, password } = await readBody(event);
    
    // Проверка наличия всех необходимых полей
    if (!name || !email || !password) {
      return {
        statusCode: 400,
        body: { error: 'Необходимо указать имя, email и пароль' }
      };
    }
    
    // Проверяем, не занят ли email
    const existingUser = db.prepare('SELECT 1 FROM users WHERE email = ?').get(email);
    
    if (existingUser) {
      return {
        statusCode: 409,
        body: { error: 'Пользователь с таким email уже существует' }
      };
    }
    
    // Хешируем пароль
    const hashedPassword = await hashPassword(password);
    
    // Создаем нового пользователя
    const result = db.prepare(
      'INSERT INTO users (name, email, password, avatar) VALUES (?, ?, ?, ?)'
    ).run(name, email, hashedPassword, '/images/default-avatar.png');
    
    // Получаем ID нового пользователя
    const userId = result.lastInsertRowid;
    
    // Получаем данные созданного пользователя
    const user = db.prepare('SELECT id, name, email, avatar FROM users WHERE id = ?').get(userId);
    
    // Генерируем JWT токен
    const token = generateToken(userId);
    
    // Возвращаем данные пользователя и токен
    return {
      statusCode: 201,
      body: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          avatar: user.avatar
        },
        token
      }
    };
  } catch (error) {
    console.error('Ошибка при регистрации:', error);
    
    return {
      statusCode: 500,
      body: { error: 'Ошибка сервера при регистрации пользователя' }
    };
  }
}); 