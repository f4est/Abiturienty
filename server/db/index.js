import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Определяем корневую директорию проекта (два уровня вверх от server/db)
const rootDir = path.resolve(__dirname, '..', '..');

// Создаем директорию для базы данных, если её нет
const dbDir = path.join(rootDir, 'data');
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, 'edugate.db');
// Используем абсолютные пути к файлам в исходной директории проекта
const schemaPath = path.join(rootDir, 'server', 'db', 'schema.sql');
const seedPath = path.join(rootDir, 'server', 'db', 'seed.sql');

console.log('Пути к файлам:');
console.log('- База данных:', dbPath);
console.log('- Схема:', schemaPath);
console.log('- Данные:', seedPath);

// Инициализация базы данных
const db = new Database(dbPath);

// Включаем поддержку внешних ключей
db.pragma('foreign_keys = ON');

// Функция для инициализации базы данных
export function initDatabase() {
  console.log('Инициализация базы данных...');
  
  try {
    // Проверяем существование файлов
    if (!fs.existsSync(schemaPath)) {
      throw new Error(`Файл схемы не найден по пути: ${schemaPath}`);
    }
    
    // Чтение и выполнение SQL-схемы
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schemaSQL);
    console.log('Схема базы данных создана успешно');
    
    // Проверка, есть ли уже данные в таблице пользователей
    const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
    
    // Если данных нет, заполняем базу начальными данными
    if (userCount.count === 0) {
      if (!fs.existsSync(seedPath)) {
        throw new Error(`Файл с начальными данными не найден по пути: ${seedPath}`);
      }
      const seedSQL = fs.readFileSync(seedPath, 'utf8');
      db.exec(seedSQL);
      console.log('База данных заполнена начальными данными');
    } else {
      console.log('База данных уже содержит данные, пропускаем заполнение');
    }
  } catch (error) {
    console.error('Ошибка при инициализации базы данных:', error);
    throw error;
  }
}

// Инициализируем базу данных при импорте модуля
try {
  initDatabase();
  console.log('База данных успешно инициализирована');
} catch (error) {
  console.error('Ошибка инициализации базы данных:', error.message);
}

export default db; 