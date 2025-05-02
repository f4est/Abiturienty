// Модуль для работы с SQLite
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';

// Путь к базе данных
const dbDirectory = path.resolve('server', 'database');
const dbPath = path.join(dbDirectory, 'edugate.db');

// Создаем директорию, если она не существует
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

// Инициализация базы данных
const db = new Database(dbPath);

// Включаем внешние ключи
db.pragma('foreign_keys = ON');

// Инициализация таблиц при первом запуске
const initDb = () => {
  // Таблица пользователей
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Таблица типов учебных заведений
  db.exec(`
    CREATE TABLE IF NOT EXISTS institution_types (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      code TEXT UNIQUE NOT NULL
    )
  `);

  // Таблица направлений обучения
  db.exec(`
    CREATE TABLE IF NOT EXISTS directions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      code TEXT UNIQUE NOT NULL
    )
  `);

  // Таблица учебных заведений
  db.exec(`
    CREATE TABLE IF NOT EXISTS institutions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      type_id INTEGER NOT NULL,
      description TEXT,
      image TEXT,
      logo TEXT,
      rating REAL,
      address TEXT,
      phone TEXT,
      email TEXT,
      website TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (type_id) REFERENCES institution_types(id)
    )
  `);

  // Таблица фотографий учебных заведений
  db.exec(`
    CREATE TABLE IF NOT EXISTS institution_photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      institution_id INTEGER NOT NULL,
      photo_url TEXT NOT NULL,
      FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE
    )
  `);

  // Таблица связи учебных заведений и направлений обучения
  db.exec(`
    CREATE TABLE IF NOT EXISTS institution_directions (
      institution_id INTEGER NOT NULL,
      direction_id INTEGER NOT NULL,
      PRIMARY KEY (institution_id, direction_id),
      FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE,
      FOREIGN KEY (direction_id) REFERENCES directions(id) ON DELETE CASCADE
    )
  `);

  // Таблица программ обучения
  db.exec(`
    CREATE TABLE IF NOT EXISTS programs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      institution_id INTEGER NOT NULL,
      code TEXT,
      name TEXT NOT NULL,
      duration TEXT,
      price INTEGER,
      FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE
    )
  `);

  // Таблица вступительных экзаменов
  db.exec(`
    CREATE TABLE IF NOT EXISTS exams (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      program_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      min_score INTEGER,
      FOREIGN KEY (program_id) REFERENCES programs(id) ON DELETE CASCADE
    )
  `);

  // Таблица отзывов
  db.exec(`
    CREATE TABLE IF NOT EXISTS reviews (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      institution_id INTEGER NOT NULL,
      author TEXT NOT NULL,
      rating INTEGER NOT NULL,
      text TEXT,
      date TEXT NOT NULL,
      FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE
    )
  `);

  // Таблица избранных учебных заведений пользователей
  db.exec(`
    CREATE TABLE IF NOT EXISTS favorites (
      user_id INTEGER NOT NULL,
      institution_id INTEGER NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (user_id, institution_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (institution_id) REFERENCES institutions(id) ON DELETE CASCADE
    )
  `);

  // Таблица результатов тестов пользователей
  db.exec(`
    CREATE TABLE IF NOT EXISTS test_results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      technical INTEGER,
      humanitarian INTEGER,
      natural INTEGER,
      social INTEGER,
      economic INTEGER,
      artistic INTEGER,
      date DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `);

  // Заполняем типы учебных заведений
  const insertInstitutionType = db.prepare(`
    INSERT OR IGNORE INTO institution_types (code, name) VALUES (?, ?)
  `);
  
  insertInstitutionType.run('university', 'Университет');
  insertInstitutionType.run('institute', 'Институт');
  insertInstitutionType.run('college', 'Колледж');

  // Заполняем направления обучения
  const insertDirection = db.prepare(`
    INSERT OR IGNORE INTO directions (code, name) VALUES (?, ?)
  `);
  
  insertDirection.run('tech', 'Технические науки');
  insertDirection.run('humanitarian', 'Гуманитарные науки');
  insertDirection.run('natural', 'Естественные науки');
  insertDirection.run('economics', 'Экономика и финансы');
  insertDirection.run('medical', 'Медицина');
  insertDirection.run('arts', 'Искусство и культура');

  console.log('База данных успешно инициализирована');
};

// Инициализируем базу данных
initDb();

export default db; 