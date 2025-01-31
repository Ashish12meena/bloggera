
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TokenService } from "../../services/TokenService";

const TokenValidator = ({onValidationResult }) => {

  useEffect(() => {
    const validateToken = async () => {

      const isValid = await TokenService();
        onValidationResult(isValid);
    };

    validateToken();
  }, [onValidationResult]);

  return (
    <>
    </>
  );
};

export default TokenValidator;
