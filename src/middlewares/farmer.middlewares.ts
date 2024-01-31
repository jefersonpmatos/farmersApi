import { Request, Response, NextFunction } from "express";
import { validationResult, param, check } from "express-validator";
import { isCNPJValid } from "../utils/cnpjValidator";
import { isCPFValid } from "../utils/cpfValidator";

class FarmerMiddleware {
  validateRegisterFarmerData = [
    check("cpfCnpj")
      .notEmpty()
      .withMessage("CPF/CNPJ é obrigatório")
      .custom((value: string) => {
        if (isCPFValid(value) || isCNPJValid(value)) {
          return true;
        }
        throw new Error("CPF/CNPJ inválido");
      }),
    check("name").notEmpty().withMessage("Nome é obrigatório"),
    check("farmName").notEmpty().withMessage("Nome da fazenda é obrigatório"),
    check("city").notEmpty().withMessage("Cidade é obrigatória"),
    check("state").notEmpty().withMessage("Estado é obrigatório"),
    check("totalAreaHectares")
      .notEmpty()
      .withMessage("Área total em hectares é obrigatória")
      .isNumeric()
      .withMessage("Área total deve ser numérica"),
    check("cultivableAreaHectares")
      .notEmpty()
      .withMessage("Área agricultável em hectares é obrigatória")
      .isNumeric()
      .withMessage("Área agricultável deve ser numérica"),
    check("vegetationAreaHectares")
      .notEmpty()
      .withMessage("Área de vegetação em hectares é obrigatória")
      .isNumeric()
      .withMessage("Área de vegetação deve ser numérica"),
    check("crops")
      .notEmpty()
      .withMessage("Nome da cultura é obrigatório")
      .isArray()
      .withMessage("Culturas devem ser um array de strings"),
    check(["cultivableAreaHectares", "vegetationAreaHectares"]).custom(
      (value, { req }) => {
        const {
          totalAreaHectares,
          cultivableAreaHectares,
          vegetationAreaHectares,
        } = req.body;

        const totalCultivableVegetationArea =
          cultivableAreaHectares + vegetationAreaHectares;

        if (totalCultivableVegetationArea > totalAreaHectares) {
          throw new Error(
            "A soma da área agricultável e da área de vegetação não pode ser maior que a área total da fazenda."
          );
        }

        return true;
      }
    ),
    (req: Request, res: Response, next: NextFunction): void => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
      } else {
        next();
      }
    },
  ];
}

export default new FarmerMiddleware();
