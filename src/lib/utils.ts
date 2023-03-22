import React from 'react';
import { NotificationManager } from 'react-notifications';
/* Convert CSS time value to a number in milliseconds. "0.18s" => 180 */
export const cssTimeToMs = (time: string): number => {
  const unit = time.match(/m?s/)[0];
  const convertedNum = parseFloat(time.replace(/[^\d.-]/g, ''));
  let ms: number;

  switch (unit) {
    case 's': // seconds
      ms = convertedNum * 1000;
      break;
    case 'ms': // ms
      ms = convertedNum;
      break;
    default:
      ms = 0;
      break;
  }

  return ms;
};

/* Convert CSS length value to a number. "768px" => 768 */
export const cssLengthToNum = (length: string): number => {
  const unit = length.match(/[a-z%]+/)[0];
  const convertedNum = parseFloat(length.replace(/[^\d.-]/g, ''));
  let num: number;

  switch (unit) {
    case 'px': // px
      num = convertedNum;
      break;
    case '%': // %
      num = convertedNum / 100;
      break;
    default:
      num = 0;
      break;
  }

  return num;
};

/* Check to see if 2 components are of the same type */
export const enforceComponentType = (
  component1: React.ReactNode,
  component2: React.ReactNode | React.ReactNode[],
  message: string
): void => {
  React.Children.forEach(component1, (child) => {
    if (React.isValidElement(child) && process.env.NODE_ENV === 'development') {
      if (Array.isArray(component2)) {
        if (
          !component2.some(
            (component) =>
              child.type.toString() == component.toString() || child.type == React.Fragment
          )
        ) {
          throw new Error(message);
        }
      } else {
        if (child.type.toString() !== component2.toString() && child.type !== React.Fragment) {
          throw new Error(message);
        }
      }
    }
  });
};

/* Convert number to currency format */
export const currencyFormat = (num: number, currencyCode: string): string => {
  if (num == 0) return 'USD ' + '$' + num;
  if (!num) {
    return '-';
  }
  // return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

  if (!currencyCode) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  return (
    (currencyCode || 'USD') +
    ' ' +
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode || 'USD',
      currencyDisplay: 'symbol',
      minimumFractionDigits: 2,
    }).format(num)
  );
};

export const trimText = (arg1: string, len: number): string => {
  const trimmed = arg1;

  if (len < arg1.length) {
    return trimmed.substring(0, len) + '...';
  }

  return trimmed;
};

export const showErrorNotification = (errorText: string): void => {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  NotificationManager.error(errorText, 'Error', 10000, () => {});
};

export const logError = (error: any, ...optionalParams: any[]) => {
  log(error, true, ...optionalParams);
};

//later, we can implement logging file/service here
export const log = (message: any, isError?: boolean, ...optionalParams: any[]): void => {
  if (isError) {
    console.error(message, ...optionalParams);
  } else {
    console.info(message, ...optionalParams);
  }
};

export const pushToRoute = (route: string, push: any) => {
  push(route.toLowerCase());
};

export const moveToLocation = (route: string) => {
  window.location.href = route.toLowerCase();
};

export const logOnDev = (message: any, ...optionalParams: any[]): void => {
  if (process.env.NODE_ENV === 'development') {
    log(message, false, optionalParams);
  }
};

export enum ErrorKeys {
  Generic = 'generic',
  MaximumQuantity = 'MAX_QTY',
  AvailablePhysicalQuantity = 'Available_Physical_Quantity',
  AvailablePhysicalQuantityBackorder = 'Available_Physical_Quantity_Back',
  InvalidNumberofUsers = 'Invalid_Number_Of_Users_Message',
  FileDataValidation = 'File_Validation_Message',
  FileTypeValidation = 'File_Type_Validation',
  CreditCardCVVLength = 'Credit_Card_CVV_Length',
  CreditCardLength = 'Credit_Card_Length',
  ZipCodeCharacterValidation = 'Zip_Code_Character_Validation',
  LessNumberofUserEntries = 'Less_Number_Of_User_Entries',
  ShippingMethodValidation = 'shipping_method_validation_message',
  RequiredFieldsValidation = 'required_fields_validation',
  MandatoryFieldsMessage = 'mandatory_fields_message',
  FirstNameValidationMessage = 'first_name_validation_message',
  LastNameValidationMessage = 'last_name_validation_message',
  EmailValidationMessage = 'email_validation_message',
}

export enum PaymentDictionaryKeys {
  DEFAULT = 'DEFAULT',
  SET_AS_DEFAULT = 'SET_AS_DEFAULT',
  REMOVE = 'REMOVE',
  EDIT = 'EDIT',
  ADD = 'ADD',
  ADD_PAYMENT = 'ADD_PAYMENT',
  EXP_DATE = 'EXP_DATE',
  CARD_TYPE = 'CARD_TYPE',
  CARD_NUMBER = 'CARD_NUMBER',
  SELECT_YOUR_PAYMENT = 'SELECT_YOUR_PAYMENT',
  ADD_NEW_CREDIT_CARD = 'ADD_NEW_CREDIT_CARD',
  SELECT_CARD_TYPE = 'SELECT_CARD_TYPE',
  SAVE_NEW_CARD = 'SaveNewCard',
}

export enum ProductDictionaryKeys {
  Codefinder = 'codefinder',
  NFPAPublicationLink = 'nfpa-publication-link',
}

export const validateQuantity = (
  t,
  canExceed,
  quantity,
  maximumQuantity,
  quantityAvailable
): boolean => {
  logOnDev(
    'canExceed, quantity, maximumQuantity ,  quantityAvailable',
    canExceed,
    quantity,
    maximumQuantity,
    quantityAvailable
  );
  maximumQuantity =
    !quantityAvailable || quantityAvailable < maximumQuantity ? quantityAvailable : maximumQuantity;

  if (maximumQuantity && !canExceed && quantity > maximumQuantity) {
    let error = t(ErrorKeys.MaximumQuantity);
    error = error.replace('{qty}', maximumQuantity?.toString() || '');

    showErrorNotification(error);
    return false;
  }

  return true;
};

export const isValidHttpUrl = (string) => {
  let url;

  try {
    url = new URL(string);
  } catch (_) {
    return false;
  }

  return url.protocol === 'http:' || url.protocol === 'https:';
};
