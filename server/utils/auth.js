import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Секретный ключ для JWT (в реальном приложении должен храниться в env переменных)
const JWT_SECRET = 'edugate_secret_key';

// Хеширование пароля
export async function hashPassword(password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

// Проверка пароля
export async function comparePasswords(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// Генерация JWT токена
export function generateToken(userId) {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
}

// Верификация токена
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}

// Получение ID пользователя из токена
export function getUserIdFromToken(token) {
  if (!token) return null;
  
  const decoded = verifyToken(token);
  return decoded ? decoded.userId : null;
}

// Middleware для проверки аутентификации
export function requireAuth(event) {
  const authHeader = event.node.req.headers.authorization;
  const token = authHeader ? authHeader.replace('Bearer ', '') : null;
  
  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Требуется авторизация'
    });
  }
  
  const userId = getUserIdFromToken(token);
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: 'Недействительный токен'
    });
  }
  
  return userId;
}

// Функция для получения текущего пользователя
export function getCurrentUser(event) {
  try {
    return requireAuth(event);
  } catch (e) {
    return null;
  }
} 