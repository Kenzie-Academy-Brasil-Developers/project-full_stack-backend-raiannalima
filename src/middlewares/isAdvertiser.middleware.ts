import { Request, Response, NextFunction } from "express";

export const isAdvertiser = async (req: Request, res: Response, next: NextFunction) => {
  const typeAccount = res.locals.typeAccount;
  console.log("--------------------------" + typeAccount)

  if (typeAccount == 'Anunciante') {
    return next();
  }

  return res.status(401).json({ message: "User is not Advertiser." });
};

