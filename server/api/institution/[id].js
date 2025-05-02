// Импортируем тестовые данные из основного API
import institutions from '../institutions';

export default defineEventHandler((event) => {
  // Получаем ID из параметров URL
  const id = parseInt(event.context.params.id);
  
  // Находим учебное заведение по ID
  const institution = institutions.find(item => item.id === id);
  
  // Если учреждение не найдено, возвращаем ошибку
  if (!institution) {
    event.node.res.statusCode = 404;
    return {
      error: 'Учебное заведение не найдено'
    };
  }
  
  // Возвращаем данные учреждения
  return institution;
}); 