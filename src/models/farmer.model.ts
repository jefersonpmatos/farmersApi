import { Crop } from "./crop.model";

export interface Farmer {
  cpfCnpj: string;
  name: string;
  farmName: string;
  city: string;
  state: string;
  totalAreaHectares: number;
  cultivableAreaHectares: number;
  vegetationAreaHectares: number;
  crops: Crop[];
}
