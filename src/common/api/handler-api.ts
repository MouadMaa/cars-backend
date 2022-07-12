import { NotFoundException } from '@nestjs/common'

export const getAll = (model: any, queryFilter: any): Promise<any[]> => {
  const { take, skip, orderBy, searchBy } = queryFilter

  const filter: any = {}

  // pagination
  if (take) filter.take = +take
  if (skip) filter.skip = +skip

  // order by
  const sort = orderBy?.split(',')
  filter.orderBy = sort ? { [sort[0]]: sort[1] } : {} // { createdAt: 'desc' }

  // string search on given field
  if (searchBy) {
    const searchArray = searchBy.split('-')
    filter.where = searchArray.length
      ? {
          OR: searchArray.map((search) => {
            const str = search.split(',')
            return { [str[0]]: { contains: str[1] } }
          }),
        }
      : {}
  }

  return model.findMany(filter)
}

export const getOne = async (model: any, where: any): Promise<any> => {
  const doc = await model.findUnique({ where })

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
  const doc = await model.update({ where, data })

  if (!doc) {
    throw new NotFoundException('No document found with that ID')
  }

  return doc
}

export const deleteOne = async (model: any, where: any): Promise<any> => {
  const doc = await model.delete({ where })

  if (!doc) {
    throw new NotFoundException('No document found with that ID')
  }

  return doc
}
