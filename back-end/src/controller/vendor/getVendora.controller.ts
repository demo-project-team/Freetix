import { Request, Response } from 'express';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getVendora = async (req: Request, res: Response): Promise<void> => {
  const { name, districtId, category } = req.query;
  const searchTerm = typeof name === 'string' ? name : ''; // Ensure searchTerm is a string

  // category-уудыг string array болгох
  const categoryIds: string[] = Array.isArray(category)
    ? category.map((id) => String(id))
    : category
      ? [String(category)]
      : [];

  // AND нөхцлүүдийг динамикаар угсрах
  const andConditions: Prisma.VendorWhereInput[] = [];

  if (categoryIds.length > 0) {
    andConditions.push({
      categories: {
        some: {
          id: {
            in: categoryIds,
          },
        },
      },
    });
  }

  if (districtId) {
    andConditions.push({
      address: {
        district: {
          id: districtId as string,
        },
      },
    });
  }

  if (searchTerm) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: searchTerm,
            mode: 'insensitive',
          },
        },
        {
          phone: {
            contains: searchTerm,
          },
        },
        {
          address: {
            street: {
              contains: searchTerm,
              mode: 'insensitive',
            },
          },
        },
      ],
    });
  }

  // Шаардлагатай бол дээд талын filter-ийг байгуулж байна
  const filter: Prisma.VendorWhereInput = {
    AND: andConditions,
  };

  try {
    // Vendor-г мэдээлэл авч байна
    const vendors = await prisma.vendor.findMany({
      where: filter,
      include: {
        categories: true,
        reviews: true,
      },
    });

    // Амжилттай хариу буцаах
    res.status(200).json({ data: vendors, success: true });
  } catch (error) {
    console.error('❌ Error fetching vendors:', error);

    // Алдаа гарсан тохиолдолд
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
};
