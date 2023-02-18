import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
type Location = {
  street: string;
  city: string;
  province: string;
  lat: number;
  lng: number;
};
export namespace LocationService {
  export const createLocation = async (location: Location) => {
    try {
      const newLocation = await prisma.location.create({
        data: location,
      });
      return newLocation;
    } catch (error) {
      throw error;
    }
  };
  export const getAllLocations = async () => {
    try {
      const locations = await prisma.location.findMany();
      return locations;
    } catch (error) {
      throw error;
    }
  };
  export const getLocationById = async (id: string) => {
    try {
      const location = await prisma.location.findFirst({
        where: { id: Number(id) },
      });
      return location;
    } catch (error) {
      throw error;
    }
  };
  export const updateLocationById = async (
    id: string,
    updateData: Partial<Location>
  ) => {
    try {
      const location = await prisma.location.update({
        where: { id: Number(id) },
        data: { ...updateData },
      });
      return location;
    } catch (error) {
      throw error;
    }
  };
  export const deleteLocationById = async (id: string) => {
    try {
      const location = await prisma.location.delete({
        where: { id: Number(id) },
      });
      return location;
    } catch (error) {
      throw error;
    }
  };
}
