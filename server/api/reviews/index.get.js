import prisma from '../../utils/prisma'

export default defineEventHandler(async (event) => {
  // Получаем query-параметры
  const query = getQuery(event)
  const schoolId = query.schoolId ? parseInt(query.schoolId) : null
  const includeUnapproved = query.includeUnapproved === 'true'
  const userId = query.userId ? parseInt(query.userId) : null
  
  try {
    // Строим условие фильтрации
    const where = {}
    
    if (schoolId) {
      where.schoolId = schoolId
    }
    
    // Если не запрошены неодобренные отзывы, показываем только одобренные
    if (!includeUnapproved) {
      where.isApproved = true
    }
    
    // Если запрашиваем отзывы конкретного пользователя
    if (userId) {
      where.userId = userId
    }
    
    // Запрос к базе данных через Prisma
    const reviews = await prisma.review.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        school: {
          select: {
            name: true,
            logoUrl: true
          }
        }
      }
    })
    
    return {
      statusCode: 200,
      body: reviews
    }
  } catch (error) {
    console.error('Ошибка при получении отзывов:', error)
    return {
      statusCode: 500,
      body: { message: 'Внутренняя ошибка сервера' }
    }
  }
}) 