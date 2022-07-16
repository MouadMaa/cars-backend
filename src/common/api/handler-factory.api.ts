import { NotFoundException } from '@nestjs/common'
import { FilterQueryDto } from '../dto/filter-query.dto'

export const getAll = async (
  model: any,
  filterQueryDto: FilterQueryDto,
  popOptions?: string[],
): Promise<any[]> => {
  const { take, skip, orderBy, searchBy } = filterQueryDto

  const filter: any = {}

  // Include all fields for a specific relation
  if (popOptions) {
    const include = {}
    popOptions.forEach((option) => (include[option] = true))
    filter.include = include
  }

  // pagination (?take=2&skip=1)
  if (take) filter.take = Number(take)
  if (skip) filter.skip = Number(skip)

  // order by
  // ?orderBy=name[desc]
  if (orderBy) {
    const sortByField = orderBy.split('[')[0]
    const sortByValue = orderBy.includes('asc') ? 'asc' : 'desc'
    filter.orderBy = { [sortByField]: sortByValue }
  } else {
    filter.orderBy = {} /* Or { createdAt: 'desc' } */
  }

  // string search on given field
  // ?searchBy=name[1],model[2022]
  if (searchBy) {
    const searchesArray = searchBy.split(',')
    filter.where = searchesArray.length
      ? {
          OR: searchesArray.map((item) => {
            const searchByField = item.split('[')[0]
            const searchByValue = item.split('[')[1].replace(']', '')
            return {
              [searchByField]: { contains: searchByValue, mode: 'insensitive' },
            }
          }),
        }
      : {}
  }

  return model.findMany(filter)
}

export const getOne = async (
  model: any,
  where: any,
  popOptions?: string[],
): Promise<any> => {
  // Include all fields for a specific relation
  let include = undefined
  if (popOptions) {
    include = {}
    popOptions.forEach((option) => (include[option] = true))
  }

  const doc = await model.findUnique({ where, include })

  if (!doc) {
    throw new NotFoundException('No document found with that ID')
  }

  return doc
}

export const createOne = (model: any, data: any): Promise<any> => {
  return model.create({ data })
}

export const updateOne = async (
  model: any,
  where: any,
  data: any,
): Promise<any> => {
  try {
    return await model.update({ where, data })
  } catch {
    throw new NotFoundException('No document found with that ID')
  }
}

export const deleteOne = async (model: any, where: any): Promise<any> => {
  try {
    return await model.delete({ where })
  } catch {
    throw new NotFoundException('No document found with that ID')
  }
}
